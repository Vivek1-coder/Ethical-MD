# EthicalMD Backend

EthicalMD is an advanced backend service designed to simplify and explain medical lab reports and health queries using AI, OCR, and NLP. It provides secure authentication, robust PDF/image parsing, and insightful medical explanations, making it unique for healthcare, telemedicine, and patient education platforms.

---

## 🚀 Features

- **User Authentication:** Secure signup and login with JWT.
- **AI-Powered Medical Explanations:** Uses generative AI to explain symptoms and lab results.
- **Lab Report Parsing:** Extracts and analyzes data from PDF and image lab reports using OCR (Tesseract.js) and PDF parsing.
- **Chat Sessions:** Users can create, rename, and manage chat sessions for ongoing medical queries.
- **Summary Management:** Retrieve and review summaries of previous analyses.
- **Rate Limiting & Security:** Helmet, CORS, and express-rate-limit for robust API security.

---

## 🛠️ Tech Stack

- **Node.js** & **Express.js**: Core backend framework
- **MongoDB** & **Mongoose**: Database and ODM
- **Tesseract.js**: OCR for image-based lab reports
- **pdf-parse** & **pdf-poppler**: PDF extraction
- **@google/generative-ai**: AI-powered explanations
- **JWT**: Authentication
- **Multer**: File uploads
- **Helmet, CORS, express-rate-limit**: Security

### Main Dependencies

- express, mongoose, bcryptjs, jsonwebtoken, multer, dotenv, helmet, cors, express-rate-limit, tesseract.js, pdf-parse, pdf-poppler, @google/generative-ai

---

## 🌟 Why EthicalMD is Unique

- **End-to-End Medical Data Flow:** From raw lab report (PDF/image) to actionable insights and explanations.
- **AI Integration:** Uses generative AI for both symptom and lab result explanations.
- **Multi-format Support:** Handles both PDF and image uploads for lab reports.
- **Session & Summary Management:** Users can track, review, and manage their medical queries and summaries.

---

## ⚡ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd EthicalMD-backend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment variables:**
   Create a `.env` file with:
   ```env
   PORT=4000
   JWT_SECRET=your_jwt_secret
   MONGO_URI=your_mongo_uri
   GEMINI_API_KEY=your_gemini_api_key
   GEMINI_API_KEY2=optional_second_key
   ```
4. **Start the server:**
   ```bash
   npm start
   ```

---

## 📚 API Routes

### Auth

- `POST /api/signup` — Register a new user
- `POST /api/login` — Login and receive JWT

### Chat

- `POST /api/chats/new-session` — Start a new chat session
- `GET /api/chats/allChats` — Get all user chat sessions
- `POST /api/chats/loadChat` — Load a specific chat by ID
- `PATCH /api/chats/:chatId/title` — Rename a chat session
- `DELETE /api/chats/:chatId` — Delete a chat session
- `POST /api/chats/query` — Add a message/query to a chat

### Messages

- `POST /api/messages/:chatId/message` — Add a message to a chat

### Medical Explanations

- `POST /api/explain/explain` — Get AI-powered explanation for symptoms/queries

### Lab Report Parsing

- `POST /api/pdfs/analyze-lab-report` — Upload and analyze a PDF lab report
- `POST /api/images/analyze-lab-report` — Upload and analyze an image lab report

### Summaries

- `GET /api/summary/all` — Get all summaries for a user
- `POST /api/summary/single` — Get a specific summary by ID

---

## 📄 Example Requests

### Signup

```json
POST /api/signup
{
  "username": "john",
  "email": "john@example.com",
  "password": "yourpassword"
}
```

### Login

```json
POST /api/login
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

### Analyze Lab Report (PDF)

- `POST /api/pdfs/analyze-lab-report` (form-data: pdf)

### Analyze Lab Report (Image)

- `POST /api/images/analyze-lab-report` (form-data: image)

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## 📜 License

ISC

---

## 👨‍⚕️ Authors & Credits

- Built by the  Team
- AI powered by Google Gemini

---

## 📬 Contact

For support or business inquiries, please contact the repository owner.
