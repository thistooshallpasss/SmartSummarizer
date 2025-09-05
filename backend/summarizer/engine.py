# In SmartSummarizer/backend/summarizer/engine.py

# --- Extractive Summarizer (TextRank) ---
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.text_rank import TextRankSummarizer

# --- Abstractive Summarizer (Hugging Face Transformers) ---
from transformers import pipeline

# Initialize the abstractive summarization pipeline once
# Using a smaller model like 't5-small' for faster performance
try:
    abstractive_summarizer = pipeline("summarization", model="t5-small")
except Exception as e:
    print(f"Error initializing abstractive summarizer: {e}")
    abstractive_summarizer = None


def summarize_extractive(text, sentences=3): # The parameter name is already 'sentences'
    """
    Performs extractive summarization on the text using TextRank.
    """
    # The default value is 3, but it will be overridden by the user's input
    parser = PlaintextParser.from_string(text, Tokenizer("english"))
    summarizer = TextRankSummarizer()
    summary = summarizer(parser.document, sentences) # Use the 'sentences' variable
    
    return " ".join([str(sentence) for sentence in summary])

def summarize_abstractive(text):
    """
    Performs abstractive summarization using Hugging Face's T5 model.
    """
    if abstractive_summarizer is None:
        return "Abstractive summarizer is not available."
        
    summary_list = abstractive_summarizer(
        text, 
        max_length=150, 
        min_length=30, 
        do_sample=False
    )
    return summary_list[0]['summary_text']

# UPDATE THIS FUNCTION
def run_summarization(text: str, summary_type: str, sentence_count: int = 3):
    """
    Dispatcher function to run the correct summarizer based on type.
    """
    if summary_type == "extractive":
        # Pass the sentence_count to the extractive function
        return summarize_extractive(text, sentence_count)
    elif summary_type == "abstractive":
        return summarize_abstractive(text)
    else:
        return "Invalid summary type specified."