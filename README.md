# 🚀 SmartSummarizer: An Intelligent Text Summarization App

[![Project Status: Complete](https://img.shields.io/badge/status-complete-brightgreen.svg)](https://smart-summarizer-six.vercel.app/) [![Vercel Deployment](https://vercel.com/button)](https://smart-summarizer-six.vercel.app/)

An intelligent full-stack web application that leverages Natural Language Processing to generate concise summaries of long texts and documents.

### ✨ **[View the Live Demo Here](https://smart-summarizer-six.vercel.app/)** ✨

---

![Project Screenshot](https://i.imgur.com/kS5A4iW.png)
*(**Action Required:** Replace the image link above with a screenshot of your own running application. To do this, take a screenshot, add it to a folder in your project (e.g., `docs/screenshot.png`), and update the path here: `![Project Screenshot](docs/screenshot.png)`)*

## 📝 About The Project

In an age of information overload, the ability to quickly grasp the essence of lengthy articles, reports, and documents is crucial. SmartSummarizer is a tool designed to solve this problem by providing users with two distinct modes of summarization:

* **Extractive Summarization:** This method identifies and pulls out the most important sentences from the original text to form a coherent summary. It's fast, factually consistent, and ideal for formal documents.
* **Abstractive Summarization:** This method uses a neural network (Hugging Face T5 model) to generate new sentences that capture the core meaning of the source text, much like a human would. It's great for creative summaries and understanding broader concepts.

This project demonstrates a full-stack skill set, from a responsive React frontend to a powerful Python backend with integrated machine learning models, all deployed seamlessly on Vercel.

## 🌟 Key Features

* **Dual Summarization Modes:** Choose between Extractive (TextRank) and Abstractive (T5 Transformer) summaries.
* **Flexible Input:** Paste raw text directly or upload `.txt` and `.pdf` documents.
* **Adjustable Summary Length:** Control the number of sentences for extractive summaries.
* **Copy to Clipboard:** Easily copy the generated summary with a single click.
* **Real-time Processing:** Get summaries instantly without leaving the browser.
* **Responsive Design:** A clean and modern UI that works on all devices.

## 🛠️ Tech Stack

This project was built using a modern MERN-like stack (without the database) and NLP libraries:

* **Frontend:** React.js, Axios, CSS3
* **Backend:** Python 3, FastAPI
* **ML/NLP Engine:**
    * Hugging Face `transformers` (for the T5 abstractive model)
    * `sumy` & `nltk` (for the TextRank extractive model)
    * `pypdf` (for PDF text extraction)
* **Deployment:** Vercel (for hosting both the frontend and the Python serverless backend)

## ⚙️ Getting Started: Running Locally

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your machine:
* Git
* Python (3.10 or higher)
* Node.js and npm (or yarn)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Setup the Python Backend:**
    ```sh
    # Navigate to the backend directory
    cd backend

    # Create and activate a virtual environment
    python3 -m venv venv
    source venv/bin/activate  # On Windows, use: `.\venv\Scripts\activate`

    # Install the required Python packages
    pip install -r requirements.txt

    # Download necessary NLP data packages for NLTK
    python -c "import nltk; nltk.download('punkt'); nltk.download('punkt_tab')"

    # Start the backend server (on port 8000)
    uvicorn main:app --reload
    ```
    *Note: The first time you run the abstractive summarizer, the Hugging Face model (~240MB) will be downloaded automatically. This may take a few minutes.*

3.  **Setup the React Frontend:**
    *Open a new terminal window for this step.*
    ```sh
    # Navigate to the frontend directory from the root
    cd frontend

    # Install the required npm packages
    npm install

    # Start the frontend development server (on port 3000)
    npm start
    ```

4.  **You're all set!** Open your browser and navigate to `http://localhost:3000` to see the application running.

## 🚀 How to Use the App

1.  Navigate to the live demo link: **[https://smart-summarizer-six.vercel.app/](https://smart-summarizer-six.vercel.app/)**
2.  Either paste your text into the text area or click "Choose File" to upload a `.txt` or `.pdf` document.
3.  Select your desired "Summary Type" from the dropdown (Extractive or Abstractive).
4.  If you chose "Extractive," you can also specify the desired number of sentences for the summary.
5.  Click the **"Summarize"** button.
6.  Your summary will appear below. Use the "Copy" button to easily copy it to your clipboard.

---