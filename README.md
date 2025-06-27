# Task Management App

Aplikasi manajemen tugas berbasis web dengan fitur drag-and-drop menggunakan Next.js dan TypeScript.

## Cara Menjalankan Aplikasi

### Prerequisites

- Node.js (versi 18 atau lebih baru)
- npm, yarn, atau pnpm

### Langkah-langkah

1. Clone repository atau download kode
2. Buka terminal di folder project
3. Install dependencies:
   ```bash
   npm install
   # atau
   yarn install
   ```
4. Jalankan aplikasi:
   ```bash
   npm run dev
   # atau
   yarn dev
   ```
5. Buka browser dan akses `http://localhost:3000`

## Penjelasan Pendekatan Teknis

### State Management

- **Jotai**: Dipilih karena ringan dan mudah digunakan untuk aplikasi yang simpel
- Atom-based state management yang memungkinkan state yang terisolasi dan mudah di-debug
- Atoms terpisah untuk tasks, loading state, modal state, dll.

### Storage Solution

- **localStorage**: Menyimpan data tasks secara lokal di browser
- Data otomatis tersimpan setiap ada perubahan (create, update, delete, drag-drop)
- Fallback ke initial data jika localStorage kosong atau error

### UI Components

- **Tailwind CSS**: Untuk styling yang cepat dan konsisten
- **Lucide React**: Icon library yang ringan dan modern
- **@hello-pangea/dnd**: Library drag-and-drop yang stabil
- Komponen modular dan reusable (Button, Badge, Modal, dll.)

### Folder Structure

```
src/
├── app/                 # Next.js App Router
├── atoms/              # Jotai state atoms
├── components/         # UI components
│   ├── badge/         # Priority badge component
│   ├── button/        # Reusable button component
│   ├── kanban/        # Kanban board components
│   └── modal/         # Modal components
├── hooks/             # Custom hooks
└── types/             # TypeScript type definitions
```

### Handling Data

- **CRUD Operations**: Create, Read, Update, Delete tasks
- **Drag & Drop**: Mengubah status task dengan drag-drop antar kolom
- **Real-time Updates**: Perubahan langsung tersimpan ke localStorage

## Fitur Utama

- ✅ Drag and drop tasks antar kolom (TO DO → IN PROGRESS → DONE)
- ✅ Create task baru di setiap kolom
- ✅ Edit task title inline dan di modal detail
- ✅ Delete task dengan konfirmasi
- ✅ Mark task sebagai complete/incomplete
- ✅ Set priority task (Low, Medium, High)
- ✅ Modal detail untuk edit lengkap task
- ✅ Data persist dengan localStorage
- ✅ Loading state dan animasi
- ✅ Responsive design

### Future Considerations

1. **Advanced Features** (jika requirements berkembang):
   - Due dates dan calendar integration
   - Task dependencies (prerequisite tasks)
   - Time tracking per task

## Tech Stack

- **Framework**: Next.js 15 dengan App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Jotai
- **Drag & Drop**: @hello-pangea/dnd
- **Icons**: Lucide React
