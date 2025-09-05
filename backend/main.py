# In SmartSummarizer/backend/main.py

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pypdf import PdfReader
import io

# Import our custom modules
from summarizer.models import SummarizeRequest, SummarizeResponse
from summarizer.engine import run_summarization

app = FastAPI(
    title="SmartSummarizer API",
    description="An API for text summarization using extractive and abstractive methods.",
    version="1.0.0"
)

# --- CORS Configuration ---
# This allows your React frontend to communicate with this backend
origins = [
    "http://localhost:3000",  # The default address for a React app
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# --- API Endpoints ---
@app.get("/api") # <--- CHANGE THIS
def read_root():
    return {"status": "API is running"}

@app.post("/api/summarize", response_model=SummarizeResponse) # <--- CHANGE THIS
def create_summary(request: SummarizeRequest):
    """
    Accepts text and a summary type, returns the generated summary.
    """
    # Pass the new sentence_count from the request to the engine
    summary = run_summarization(
        request.text, 
        request.type, 
        request.sentence_count
    )
    return SummarizeResponse(summary=summary)

@app.post("/api/summarize-file", response_model=SummarizeResponse) # <--- CHANGE THIS
async def create_summary_from_file(
    summary_type: str = Form(...),
    sentence_count: int = Form(3),
    file: UploadFile = File(...)
):
    """
    Accepts a file (txt or pdf) and summary parameters, 
    returns the generated summary.
    """
    text = ""
    contents = await file.read()

    if file.filename.endswith(".txt"):
        text = contents.decode("utf-8")
    elif file.filename.endswith(".pdf"):
        # Use an in-memory buffer to read the PDF
        pdf_stream = io.BytesIO(contents)
        reader = PdfReader(pdf_stream)
        for page in reader.pages:
            text += page.extract_text() or ""
    else:
        return SummarizeResponse(summary="Error: Unsupported file type.")

    if not text.strip():
        return SummarizeResponse(summary="Error: Could not extract text from file.")

    summary = run_summarization(text, summary_type, sentence_count)
    return SummarizeResponse(summary=summary)
