# Hana — AI Partner Hidup (Demo Gratis)

Website partner virtual anime yang berjalan sebagai **frontend statis**. Tidak perlu backend dan tidak memakai API berbayar. Balasan berasal dari pola lokal JavaScript, jadi ini prototipe chat—bukan model AI online sungguhan.

## Fitur
- UI responsif untuk desktop dan HP.
- Karakter ilustrasi Hana (SVG lokal).
- Balasan demo berdasarkan kata kunci, dengan gaya hangat/romantis.
- Riwayat chat dan ingatan pilihan pengguna disimpan di `localStorage` browser.
- Ekspor data JSON, mulai chat baru, dan hapus semua data.
- Manifest PWA dasar agar dapat ditambahkan ke layar utama pada browser yang mendukung.

## File
- `index.html` — struktur halaman
- `style.css` — desain
- `app.js` — balasan demo, penyimpanan lokal, dan interaksi
- `manifest.json` — metadata aplikasi web
- `assets/hana.svg` — avatar karakter orisinal berbasis SVG
- `assets/heart.svg` — ikon

## Jalankan di komputer
Buka `index.html` di browser. Sebagian fitur chat tetap jalan. Untuk uji yang lebih mirip hosting, jalankan server statis lokal, misalnya `python -m http.server 8000`, lalu buka `http://localhost:8000`.

## Upload ke GitHub Pages
1. Masuk ke GitHub dan buat repository baru, misalnya `hana-partner`.
2. Unggah seluruh isi folder ini ke root repository (pastikan `index.html` berada di root).
3. Buka **Settings → Pages**.
4. Pada **Build and deployment**, pilih **Deploy from a branch**.
5. Pilih branch `main` dan folder `/(root)`, lalu klik **Save**.
6. Tunggu workflow selesai. GitHub akan menampilkan URL Pages, biasanya `https://USERNAME.github.io/hana-partner/`.
7. Buka URL tersebut dari HP. Jika perubahan belum muncul, tunggu sebentar lalu refresh.

## Batasan penting
- **Tidak ada backend yang diperlukan** untuk versi demo ini.
- Ini bukan AI generatif sungguhan: responsnya dipilih dari beberapa template berdasarkan kata kunci dan tidak memahami konteks kompleks.
- `localStorage` hanya tersedia di browser/perangkat yang sama. Data dapat hilang jika data situs dibersihkan atau memakai mode privat. Tidak ada sinkronisasi lintas perangkat.
- Hindari menyimpan kata sandi, data keuangan, alamat, atau informasi sensitif.
- Google Fonts hanya digunakan untuk tipografi dan perlu internet; bila offline, browser memakai font cadangan.
- `manifest.json` tidak otomatis menjamin instalasi PWA penuh di semua browser. Service worker/offline cache belum disertakan.

## Jika ingin AI sungguhan nanti
GitHub Pages tidak boleh menyimpan API key rahasia di `app.js`. Tambahkan backend/proxy terpisah (misalnya Cloudflare Workers atau server sendiri), simpan kunci di environment secrets, dan panggil backend dari frontend. Backend tidak diperlukan untuk demo gratis ini.
