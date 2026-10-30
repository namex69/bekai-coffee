# Jurnal Prompt

Catat prompt penting selama membangun aplikasi: apa yang kamu minta, hasilnya, dan perbaikan yang dilakukan. Beri tanda **[SENDIRI]** untuk prompt yang kamu tulis sendiri (bukan dari lembar kerja).

## US-01 Katalog dari database

**Prompt:**
Baca AGENTS.md dan docs/user-stories.md bagian US-01.

Ubah app/page.jsx supaya daftar produk diambil dari tabel "produk" di Supabase, di sisi server, memakai SUPABASE_URL dan SUPABASE_SECRET_KEY dari environment variable. Buat koneksi Supabase untuk server di folder lib/supabase.

Tampilkan produk dengan komponen KartuProduk yang sudah ada, tanpa mengubah tampilannya. Kalau gagal mengambil data, tampilkan pesan error yang jelas di halaman. Kalau tabel kosong, tampilkan tulisan "Belum ada produk". Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**
Sesuai instruksi dan kriteria selesai pada US-01, perubahan telah selesai dilakukan:

File yang Ditambahkan & Diubah
1. lib/supabase/server.js & lib/supabase/index.js:
Membuat fungsi createServerClient() untuk menginisialisasi klien Supabase di sisi server menggunakan SUPABASE_URL dan SUPABASE_SECRET_KEY dari environment variable.
Dilengkapi normalisasi URL agar tetap berfungsi dengan baik jika URL diakhiri dengan /rest/v1 atau garis miring.
2. app/page.jsx:
Diubah menjadi Server Component (async function HalamanKatalog) yang mengambil data produk langsung dari tabel produk di Supabase.
Komponen KartuProduk digunakan untuk menampilkan setiap produk tanpa mengubah tampilannya.
Menampilkan tulisan "Belum ada produk" jika tabel kosong.
Menampilkan kotak pesan error jika koneksi atau query Supabase gagal.
Menghapus komponen CatatanBelumAktif.

**Perbaikan:**

## US-02 Detail produk

**Prompt:**
Baca docs/user-stories.md bagian US-02.

Ubah app/produk/[id]/page.jsx supaya mengambil satu produk dari tabel "produk" di Supabase berdasarkan id di URL, di sisi server, memakai koneksi Supabase yang sudah dibuat di lib/supabase. Kalau produk tidak ditemukan, panggil notFound(). Jangan ubah tampilannya. Hapus CatatanBelumAktif dari halaman ini, tapi biarkan tombol WhatsApp.

**Hasil:**
Sesuai dengan kriteria selesai US-02, halaman detail produk telah diperbarui:

File yang Diubah
app/produk/[id]/page.jsx:
Mengambil data satu produk dari tabel produk di Supabase berdasarkan parameter id URL di sisi server menggunakan createServerClient dari lib/supabase.
Memanggil notFound() jika produk tidak ditemukan di database atau jika format id tidak valid.
Menghapus komponen CatatanBelumAktif.
Mempertahankan tampilan halaman serta komponen TombolWhatsApp.

**Perbaikan:**

## US-03 Pesan via WhatsApp

**Prompt:**
Baca docs/rancangan-teknis.md bagian "Pesan WhatsApp (US-03)".

Ubah components/TombolWhatsApp.jsx menjadi tautan yang membuka https://wa.me/ ke nomor di lib/toko.js, dengan pesan otomatis berisi nama dan harga produk dalam format rupiah. Pesan di-encode dengan encodeURIComponent dan dibuka di tab baru. Pertahankan tampilan tombolnya. Hapus CatatanBelumAktif yang menyebut US-03 di halaman detail produk.

**Hasil:**
Sesuai bagian "Pesan WhatsApp (US-03)" pada docs/rancangan-teknis.md dan kriteria US-03, pembaruan telah selesai dilakukan:

File yang Diubah
components/TombolWhatsApp.jsx:
Mengubah elemen <button> menjadi elemen <a> (tautan) dengan mempertahankan seluruh styling tombol (kelas Tailwind).
Tautan mengarah ke https://wa.me/<nomor>?text=<pesan> menggunakan nomor dari lib/toko.js.
Pesan otomatis memuat nama dan harga produk (dalam format rupiah) yang di-encode menggunakan encodeURIComponent.
Membuka tautan di tab baru dengan atribut target="_blank" dan rel="noopener noreferrer".
Memastikan komponen CatatanBelumAktif tidak ada pada halaman detail produk (app/produk/[id]/page.jsx).

**Perbaikan:**

## US-04 Login admin

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-05 Ganti password

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-06 Proteksi halaman admin

**Prompt:**

**Hasil:**

**Perbaikan:**

## Debugging dan fitur bonus

Tambahkan bagian baru untuk setiap error yang kamu perbaiki atau fitur bonus yang kamu kerjakan.
