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
Baca AGENTS.md bagian aturan keamanan dan docs/user-stories.md bagian US-04.

Buat login admin memakai Supabase Auth (email dan password) dengan @supabase/ssr dan cookie, memakai SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY. Login diproses dengan Server Action di app/admin/actions.js dan disambungkan ke form di app/admin/login/page.jsx. Login berhasil diarahkan ke /admin; login gagal menampilkan pesan error yang jelas di halaman login. Buat juga tombol "Keluar" di components/NavAdmin.jsx berfungsi: mengakhiri sesi lalu kembali ke /admin/login. Jangan ubah tampilan. Hapus CatatanBelumAktif dari halaman login.

**Hasil:**
Sesuai dengan kriteria selesai US-04 dan aturan keamanan pada AGENTS.md, fitur login dan logout admin telah dibuat:

File yang Ditambahkan & Diubah
1. lib/supabase/auth.js & lib/supabase/index.js:
Menambahkan helper createAuthClient() menggunakan @supabase/ssr dengan cookies dari next/headers, SUPABASE_URL, dan SUPABASE_PUBLISHABLE_KEY untuk mengelola sesi otentikasi admin.
2. app/admin/actions.js:
Server Action login: memvalidasi input email & password, memproses login dengan signInWithPassword, dan mengarahkan ke /admin jika berhasil atau mengembalikan pesan error yang jelas jika gagal.
Server Action keluar: mengakhiri sesi autentikasi dengan signOut dan mengarahkan kembali ke /admin/login.
3. app/admin/login/page.jsx:
Menyambungkan form ke Server Action login dengan useActionState.
Menampilkan pesan error jika login gagal.
Menghapus komponen CatatanBelumAktif dengan tetap mempertahankan tampilan halaman.
4. components/NavAdmin.jsx:
Mengubah tombol "Keluar" agar memanggil Server Action keluar via form submit tanpa mengubah tampilan tombol atau navigasi.

**Perbaikan:**

## US-05 Ganti password

**Prompt:**
Baca docs/user-stories.md bagian US-05.

Buat Server Action ganti password di app/admin/actions.js untuk admin yang sedang login, memakai Supabase Auth. Validasi di server: password baru minimal 8 karakter dan harus sama dengan konfirmasi. Tampilkan pesan berhasil atau pesan error yang jelas di halaman. Sambungkan ke form di app/admin/password/page.jsx tanpa mengubah tampilannya. Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**
Sesuai kriteria selesai US-05 dan aturan keamanan pada AGENTS.md, fitur ganti password telah selesai dibuat:

File yang Diubah
1. app/admin/actions.js:
Menambahkan Server Action gantiPassword.
Memeriksa sesi admin di server (getUser()) sebelum memproses perubahan.
Melakukan validasi di server:
Password baru minimal 8 karakter.
Password baru harus cocok dengan konfirmasi password.
Mengubah password menggunakan supabase.auth.updateUser({ password }).
Mengembalikan pesan sukses atau pesan error yang jelas.
2. app/admin/password/page.jsx:
Menyambungkan form ke gantiPassword menggunakan useActionState.
Menampilkan pesan berhasil (text-utama) atau pesan error (text-bahaya) di atas form.
Menghapus komponen CatatanBelumAktif tanpa mengubah tata letak maupun tampilan elemen lainnya.

**Perbaikan:**

## US-06 Proteksi halaman admin

**Prompt:**

**Hasil:**

**Perbaikan:**

## Debugging dan fitur bonus

Tambahkan bagian baru untuk setiap error yang kamu perbaiki atau fitur bonus yang kamu kerjakan.
