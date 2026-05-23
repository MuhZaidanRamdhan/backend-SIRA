# Backend SIRA  
### Sistem Informasi Rekomendasi Akademik

Backend API untuk **SIRA (Sistem Informasi Rekomendasi Akademik)**, sebuah sistem rekomendasi mata kuliah berbasis **Retrieval-Augmented Generation (RAG)** yang dirancang untuk membantu mahasiswa memilih mata kuliah sesuai minat dan bidang peminatan.

Sistem ini dibangun menggunakan **Express.js**, terintegrasi dengan **FastAPI RAG Engine**, **MySQL**, dan **ChromaDB**.

---

## 📌 Tentang Proyek

SIRA merupakan backend service yang berfungsi sebagai penghubung antara frontend dan engine rekomendasi berbasis AI.

Fitur utama:
- Autentikasi dan otorisasi berbasis JWT
- Role-based access (Admin & Mahasiswa)
- Rekomendasi mata kuliah berbasis RAG
- Upload silabus melalui CSV
- Sinkronisasi embedding ke ChromaDB
- Activity logging
- Monitoring status embedding

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js

### Database
- MySQL

### Authentication
- JWT (JSON Web Token)
- bcrypt

### File Upload
- Multer
- csv-parser

### HTTP Client
- Axios

### AI Integration
- FastAPI
- ChromaDB
- LLaMA 3
- Sentence Transformers

---

## 📂 Struktur Project

```bash
backend-SIRA/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── services/
│
├── uploads/
├── app.js
├── package.json
└── .env
```

---

## 🚀 Fitur Utama

## 1. Authentication
- Register
- Login (username/email)
- Logout
- JWT Authentication

### Role
- Admin
- Mahasiswa

---

## 2. Sistem Rekomendasi Mata Kuliah
Endpoint rekomendasi berbasis Retrieval-Augmented Generation.

Mahasiswa dapat memasukkan minat atau preferensi, lalu sistem akan memberikan rekomendasi mata kuliah beserta alasan rekomendasinya.

---

## 3. Upload Silabus
Admin dapat mengunggah file silabus dalam format CSV.

Sistem akan:
- membaca file CSV
- memvalidasi data
- menyimpan ke database MySQL
- menandai status embedding perlu sinkronisasi

---

## 4. Sinkronisasi Embedding
Admin dapat melakukan sinkronisasi data silabus ke vector database.

Proses:
1. Ambil data dari MySQL
2. Kirim ke FastAPI
3. Chunking
4. Generate embedding
5. Simpan ke ChromaDB

---

## 5. Activity Log
Mencatat seluruh aktivitas rekomendasi pengguna.

### Mahasiswa
Hanya melihat riwayat miliknya

### Admin
Melihat seluruh riwayat pengguna

---

## 🔗 API Endpoint

## Authentication

### Register
```http
POST /api/auth/register
```

### Login
```http
POST /api/auth/login
```

### Logout
```http
POST /api/auth/logout
```

---

## Recommendation

### Get Recommendation
```http
POST /api/recommend
```

---

## Mata Kuliah

### Get Roadmap Mata Kuliah
```http
GET /api/mata-kuliah/roadmap
```

---

## Admin

### Upload Silabus
```http
POST /api/upload-silabus
```

### Sync Embedding
```http
POST /api/sync-embedding
```

### Embedding Status
```http
GET /api/embedding-status
```

### Get All Users
```http
GET /api/users
```

### Activity Logs
```http
GET /api/logs
```

---

## ⚙️ Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/username/backend-SIRA.git
cd backend-SIRA
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Setup Environment

Buat file `.env`

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=skripsi_db

JWT_SECRET=your_secret_key
```

---

### 4. Jalankan Server

```bash
npm run dev
```

atau

```bash
node app.js
```

---

## 🔐 Authentication Header

Gunakan Bearer Token:

```http
Authorization: Bearer YOUR_TOKEN
```

---

## 📊 Arsitektur Sistem

```text
Frontend (React)
   ↓
Express Backend
   ↓
FastAPI RAG Engine
   ↓
ChromaDB + LLaMA 3
```

---

## 🎯 Tujuan Sistem

SIRA dikembangkan untuk:

- membantu mahasiswa menentukan mata kuliah
- memberikan rekomendasi berbasis minat
- memanfaatkan teknologi Retrieval-Augmented Generation
- meningkatkan kualitas pengambilan keputusan akademik

---

## 👨‍💻 Developer

**Muhammad Zaidan Ramdhan**  
Program Studi Teknik Informatika

---

## 📚 Penelitian

Proyek ini dikembangkan sebagai bagian dari penelitian skripsi:

**Sistem Rekomendasi Mata Kuliah Berbasis Retrieval-Augmented Generation untuk Mendukung Penentuan Peminatan Mahasiswa**
