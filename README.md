# 🆔 Aadhaar OCR System

A full-stack application for extracting and parsing Aadhaar card data using the power of Tesseract.js, built with a modern TypeScript stack.

## 🚀 Overview

This system enables users to upload images of Aadhaar cards and instantly extract structured information like:

- 🔢 Aadhaar Number  
- 👤 Name  
- 🎂 Date of Birth  
- 🚻 Gender  
- 🏠 Address  
- 📮 Pincode  

OCR is handled using tesseract.js, with custom parsing logic to extract clean and accurate data from scanned Aadhaar cards.

---

## 🛠️ Tech Stack

| Layer       | Technology                       |
|-------------|----------------------------------|
| 🔧 Frontend | **React** + **TypeScript**       |
| 🔧 Backend  | **Node.js** + **Express** + **TypeScript** |
| ☁️ OCR      | **tesseract.js**      |
| 📦 Tools    | Vite, Axios, Tailwind CSS, Multer |

---

## 📸 Features

- 📤 Upload Aadhaar images (front & back)
- 🤖 OCR extraction using GCP Vision
- 🔍 Intelligent Aadhaar parser (regex + rule-based)
- 📄 View structured results in clean UI
- ⚠️ Handles noise & OCR errors gracefully

---

## 🌐 Live Demo

- Coming Soon! ✨  
- Link *https://aadhar-ocr-rust.vercel.app*

---

## ⚙️ Getting Started

### 🔽 Clone the Repo

```bash
git clone https://github.com/your-username/AadharOCR.git
cd AadharOCR

```

### 🧪 Prerequisites

- Node.js ≥ v18

-React.js

---

### 📦 Backend Setup

```bash
cd server
npm install
```

### 🛠️ Environment Variables

- Create a .env file in /server:

```bash
PORT=7000


```

- Then start the server:
```bash
npm run dev

```

### 🎨 Frontend Setup
```bash
cd client
npm install
npm run dev
```

## 📤 Upload Flow
 - User uploads front and/or back of Aadhaar card.

 - Extracted text is parsed using a custom regex engine.

- Parsed details are sent back and rendered in the UI.

## 📄 Response

```json
{
  "aadhaarNumber": "xxxxxxxxxxxx",
  "name": "Full Name",
  "dob": "DD/MM/YYYY",
  "gender": "Male | Female | Other",
  "address": "Full postal address extracted from Aadhaar",
  "pincode": "XXXXXX"
}

```


---

## 🌟 Support This Project



If you found this project helpful or interesting, please consider giving it a ⭐ on GitHub  😊

