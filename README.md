# Heisenberg.ai: AI-Powered Drug Discovery Platform

## Project Overview

Heisenberg.ai is an innovative web application that combines cutting-edge AI technology with molecular modeling to revolutionize the drug discovery process. This platform allows users to explore potential drug candidates for various diseases, visualize molecular structures, and gain AI-generated insights into hypothetical compounds.

## Features

- Disease search with autocomplete and autocorrect functionality
- 3D molecule visualization using 3Dmol.js
- AI-powered analysis of hypothetical drug compounds
- SMILES notation generation for molecular structures
- Interactive Q&A system for molecule-related queries

## Tech Stack

### Backend

- FastAPI: High-performance Python web framework
- SQLAlchemy: SQL toolkit and Object-Relational Mapping (ORM)
- Pydantic: Data validation and settings management
- Uvicorn: ASGI server for FastAPI
- PostgreSQL: Advanced open-source relational database

### Frontend

- Next.js: React framework for server-side rendering and static site generation
- React: JavaScript library for building user interfaces
- TypeScript: Typed superset of JavaScript
- Tailwind CSS: Utility-first CSS framework
- 3Dmol.js: JavaScript library for 3D molecular visualization

### AI and Machine Learning

- OpenAI GPT-4: Advanced language model for generating molecule descriptions and answering queries
- TensorFlow: Open-source machine learning framework (used in our custom ML model)
- ChEMBL database: Manually curated database of bioactive molecules with drug-like properties

## Project Story

Heisenberg.ai was born out of a desire to accelerate the drug discovery process and make it more accessible to researchers and enthusiasts alike. Inspired by the rapid advancements in AI and the pressing need for new treatments, we set out to create a platform that could generate and analyze hypothetical drug compounds for a variety of diseases.

Our journey began with the challenge of integrating multiple complex technologies into a cohesive system. We chose FastAPI for its high performance and ease of use, pairing it with Next.js on the frontend to create a responsive and dynamic user interface. The 3D molecule visualization, powered by 3Dmol.js, was a particularly exciting feature to implement, allowing users to interact with molecular structures in real-time.

One of the most significant challenges we faced was developing an AI system that could generate meaningful insights about hypothetical compounds. We leveraged the power of OpenAI's GPT-4 model, fine-tuning it with domain-specific knowledge in chemistry and pharmacology. This allowed us to create an AI assistant capable of describing molecular structures, proposing mechanisms of action, and answering user queries with scientific accuracy.

The autocomplete and autocorrect features for disease search were implemented to enhance user experience, drawing inspiration from modern search engines. We also incorporated a custom machine learning model, built with TensorFlow and trained on the ChEMBL database, to generate plausible SMILES notations for our hypothetical compounds.

Throughout the development process, we learned valuable lessons about integrating AI into practical applications, handling complex scientific data, and creating intuitive user interfaces for technical content. We're proud of what we've accomplished with Heisenberg.ai and excited about its potential to contribute to the field of drug discovery.

## Setup and Installation

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

## Future Enhancements

- Integration with real-world drug databases for more accurate predictions
- Collaboration features for researchers to share and discuss hypothetical compounds
- Machine learning models for predicting drug efficacy and side effects
- Integration with laboratory information management systems (LIMS) for seamless workflow

We welcome contributions from the open-source community to help make Heisenberg.ai an even more powerful tool for drug discovery!
