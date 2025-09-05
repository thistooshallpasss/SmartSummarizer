# In SmartSummarizer/backend/download_model.py

from transformers import pipeline

print("Downloading and caching the t5-small model. This might take a few minutes...")

# This line will download the model from the internet and save it locally
# for future use.
pipeline('summarization', model='t5-small')

print("✅ Model has been downloaded successfully!")