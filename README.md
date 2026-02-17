# Sistem Peminjaman Ruangan – Frontend

Frontend dikembangkan menggunakan **React + TypeScript + Vite** sebagai antarmuka pengguna untuk sistem peminjaman ruangan.

Frontend terhubung ke backend ASP.NET Core API melalui REST API.


## Tech Stack

- React
- TypeScript
- Vite
- Axios
- React Router


## Requirements

Pastikan sudah terinstall:

- **Node.js** (disarankan versi terbaru LTS)

Download Node.js:
https://nodejs.org/

Cek versi Node:

```bash
node -v
```

Cek versi npm:

```bash
npm -v
```

---

## 📥 Installation

Masuk ke folder frontend:

```bash
cd 2026--peminjaman_ruangan--frontend
```

Install dependencies:

```bash
npm install
```


## Environment Configuration

Frontend menggunakan environment variable untuk menentukan URL backend.

File `.env` **tidak di-push ke repository**.

Buat file `.env` berdasarkan `.env.example`:

```bash
cp .env.example .env
```

Isi default:

```env
VITE_API_BASE_URL=http://localhost:5023/api
```


## Running the Application

Jalankan development server:

```bash
npm run dev
```

Lalu click url port, contoh:

```
http://localhost:5173
```

Pastikan backend sudah berjalan sebelum mengakses frontend.

---

## Core Features

### Dashboard
- Summary Card:
  - Total Active Bookings (Pending + Approved)
  - Pending
  - Approved
  - Rejected
- Recent Booking Table (5 data terbaru)

---

### Booking Page
- Menampilkan booking aktif (Pending & Approved)
- Create Booking
- Edit Booking
- Detail Booking
- Approve / Reject
- Complete / Cancel
- Auto refresh setelah perubahan status

---

### 3️⃣ History Page
- Menampilkan riwayat booking:
  - Rejected
  - Completed
  - Cancelled
- Search berdasarkan:
  - Nama peminjam
  - Nama ruangan
  - Kode ruangan
  - Tujuan
  - Status
- Filter berdasarkan:
  - Status
  - Rentang tanggal
- Sorting berdasarkan:
  - StartTime
  - CreatedAt
  - Status

---

## 🔗 API Integration

Base URL diambil dari:

```ts
import.meta.env.VITE_API_BASE_URL
```

Pastikan backend berjalan pada port yang sama dengan konfigurasi `.env`.


## 📁 Folder Structure (Simplified)

```
FRONTEND/
│
├── src/
│   ├── api/
│   ├── components/
│   ├── pages/
│   ├── routes/
│   └── types/
│
├── public/
├── package.json
├── vite.config.ts
└── .env.example
```

## Troubleshooting

Jika terjadi error:

1. Pastikan backend sudah berjalan
2. Pastikan `VITE_API_BASE_URL` sesuai
3. Jalankan ulang `npm install`
4. Restart development server setelah mengubah `.env`

Frontend siap digunakan.