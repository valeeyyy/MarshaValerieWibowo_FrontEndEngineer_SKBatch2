# Role Explorer

Submission: MarshaValerieWibowo_FrontEndEngineer_SKBatch2

Halaman daftar lowongan yang bisa difilter berdasarkan departemen. Dibuat dengan HTML, CSS, dan JavaScript biasa tanpa framework dan tanpa build step. Satu-satunya library eksternal adalah Font Awesome (lewat CDN) untuk ikon.

## Fitur

- Filter departemen: All, Engineering, Design, Marketing, dan Product. Tiap tombol menampilkan jumlah role-nya.
- Kartu role tampil 1 kolom di mobile, 2 kolom mulai 640px, dan 3 kolom mulai 1024px.
- Tiga kondisi tampilan:
  - Default: "All" terpilih dan semua role tampil.
  - Filtered: hanya role dari departemen yang dipilih.
  - Empty: departemen tanpa role (sengaja Product) menampilkan pesan kosong dengan tombol "View all roles".
- Tema gelap dan terang, bisa diganti lewat tombol di pojok kanan atas. Default-nya gelap.
- Aksesibilitas: elemen semantik, `aria-pressed` dan `aria-label` pada tombol filter, live region untuk jumlah hasil, skip link, focus style yang jelas, dan dukungan `prefers-reduced-motion`.

## Struktur

```
index.html   markup dan wadah statis untuk grid dan empty state
style.css    variabel warna/tema, layout, grid responsif, transisi
script.js    data role, state filter, dan render ke DOM
```

## Cara menjalankan

Buka `index.html` langsung di browser. Ikon butuh koneksi internet karena dimuat dari CDN.

Kalau mau lewat server lokal:

```bash
python3 -m http.server 8000
```

lalu buka http://localhost:8000.

## Catatan implementasi

- `DEPARTMENTS` dan `ROLES` dipisah di `script.js`, jadi sebuah departemen tetap muncul sebagai filter walaupun belum punya role.
- Hanya ada satu state, yaitu `active`. `setActive()` mengubahnya, lalu `render()` memperbarui tombol, teks ringkasan, dan grid atau empty state.
- Klik filter ditangani satu event listener pada daftar tombol (event delegation).
- Teks role dimasukkan lewat `textContent` dan kartu dibuat dengan `document.createElement`.

## Penggunaan AI

Claude Code dipakai untuk membuat kerangka awal HTML/CSS dan logika filter serta render di JavaScript. Detail UX dan state (styling filter aktif, empty state dan tombol reset-nya, breakpoint, fokus keyboard, atribut aksesibilitas) saya cek dan uji sendiri secara manual.
