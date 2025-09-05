# In SmartSummarizer/backend/summarizer/models.py

from pydantic import BaseModel

class SummarizeRequest(BaseModel):
    text: str
    type: str
    sentence_count: int | None = 3 # Add this line (default to 3 sentences)

class SummarizeResponse(BaseModel):
    summary: str