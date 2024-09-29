# Drug Discovery AI Assistant

This project is a web application that combines a FastAPI backend with a Next.js frontend to create an AI-assisted drug discovery platform. It features a 3D molecule viewer and a disease search functionality.

## Features

- Disease search with autocomplete and autocorrect
- 3D molecule visualization using 3Dmol.js
- FastAPI backend for handling API requests
- Next.js frontend for a responsive and interactive user interface

## Tech Stack

### Backend

- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn
- PostgreSQL

### Frontend

- Next.js
- React
- TypeScript
- 3Dmol.js

## Setup

### Backend

1. Create a virtual environment:

   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

2. Install dependencies:

   ```
   pip install -r requirements.txt
   ```

3. Set up your PostgreSQL database and update the connection string in your `.env` file.

4. Run migrations:

   ```
   alembic upgrade head
   ```

5. Start the FastAPI server:
   ```
   uvicorn main:app --reload
   ```

### Frontend

1. Navigate to the frontend directory:

   ```
   cd frontend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

## Project Structure
