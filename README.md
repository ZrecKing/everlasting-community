# Everlasting Community — Frontend

Aplikasi manajemen anggota club Uma Musume (React + Vite + Bootstrap + jQuery).
Entitas data utama: **Anggota**.

## TAHAP TAHAPAN
1. Untuk tampilan awal wesbitenya adalah sebagai berikut
![alt text](./gambar/gambar1.png)

2. Dan kode frontend saya pindahkan ke folder assets agar lebih efesien

![alt text](./gambar/gambar2.png)

3. Memperbarui isi package.json dan cek versi npx nest
![alt text](./gambar/gambar3.png)

4. Data utama yang dipakai adalah data anggota, ini untuk resource datanya Resource data
![alt text](./gambar/gambar4.1.png)
![alt text](./gambar/gambar4.2.png)

5. Implementasi service
![alt text](./gambar/gambar5.1.png)
![alt text](./gambar/gambar5.2.png)

6. Implementasi controller
![alt text](./gambar/gambar6.png)

7. Membuat DTO untuk operasi create dan update
![alt text](./gambar/gambar7.1.png)
![alt text](./gambar/gambar7.2.png)

8. Menangani minimal dua skenario error menggunakan exception bawaan NestJS.
- Implementasi ConflictException
![alt text](./gambar/gambar8.1.png)
![alt text](./gambar/gambar8.2.png)

- Implementasi NotFoundException
![alt text](./gambar/gambar8.3.png)
![alt text](./gambar/gambar8.4.png)

- Pengujian ValidationPipe
![alt text](./gambar/gambar8.5.png)

9. Uji COBA seluruh endpoint menggunakan REST Client
- GET semua anggota
![alt text](./gambar/gambar9.1.png)

- GET satu anggota
![alt text](./gambar/gambar9.2.png)

- POST tambah anggota
![alt text](./gambar/gambar9.3.png)

- PATCH ubah anggota
![alt text](./gambar/gambar9.4.png)

- DELETE hapus anggota
![alt text](./gambar/gambar9.5.png)

membuktikan bahwa data benar benar telah dihapus
![alt text](./gambar/gambar9.6.png)

10. menyambungkan backend dan frontend
data anggota awal
![alt text](./gambar/gambar10.1.png)

menambah anggota
![alt text](./gambar/gambar10.2.png)

tampilan setelah ditambah
![alt text](./gambar/gambar10.3.png)

backend juga ikut berubah
![alt text](./gambar/gambar10.4.png)