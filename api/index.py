from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import openai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

### Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Set up OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

class Prompt(BaseModel):
    prompt: str

@app.get("/api/py/helloFastApi")
def hello_fast_api():
    return {"message": "Hello from FastAPI"}

@app.post("/api/py/openai")
async def process_openai(prompt: Prompt):
    try:
        print(f"Received prompt: {prompt.prompt}")
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",  # This is the GPT-4 mini model
            messages=[
                {"role": "system", "content": "You are a helpful assistant with expertise in chemistry and molecular structures."},
                {"role": "user", "content": prompt.prompt}
            ],
            max_tokens=150,
            n=1,
            temperature=0.7,
        )
        result = response.choices[0].message['content'].strip()
        print(f"OpenAI response: {result}")
        return {"result": result}
    except Exception as e:
        print(f"Error in OpenAI API call: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Add more endpoints as needed