import { useEffect, useState } from 'react'
import { ambilAnggota, buatAnggota, ubahAnggota, hapusAnggotaApi } from './api'
import HeaderAplikasi from './components/HeaderAplikasi'
import BannerClub from './components/BannerClub'
import RingkasanStatistik from './components/RingkasanStatistik'
import FormTambahAnggota from './components/FormTambahAnggota'
import DaftarAnggota from './components/DaftarAnggota'
import KomunitasLink from './components/KomunitasLink'
import KembaliKeAtas from './components/KembaliKeAtas'

function App() {
  // State utama: daftar anggota (dari API) + pencarian + status loading/error
  const [anggota, setAnggota] = useState([])
  const [cari, setCari] = useState('')
  const [memuat, setMemuat] = useState(true)
  const [error, setError] = useState('')

  // Ambil data dari backend saat pertama kali tampil
  useEffect(() => {
    ambilAnggota()
      .then(setAnggota)
      .catch((e) => setError(e.message))
      .finally(() => setMemuat(false))
  }, [])

  // Setiap aksi memanggil API; state diperbarui hanya jika server berhasil
  const tambahAnggota = async (dataBaru) => {
    try {
      const dibuat = await buatAnggota(dataBaru)
      setAnggota((sebelumnya) => [dibuat, ...sebelumnya])
      setError('')
      return true
    } catch (e) {
      setError(e.message)
      return false
    }
  }
  const ubahAnggotaData = async (id, perubahan) => {
    try {
      const diubah = await ubahAnggota(id, perubahan)
      setAnggota((sebelumnya) => sebelumnya.map((a) => (a.id === id ? diubah : a)))
      setError('')
      return true
    } catch (e) {
      setError(e.message)
      return false
    }
  }
  const hapusAnggota = async (id) => {
    try {
      await hapusAnggotaApi(id)
      setAnggota((sebelumnya) => sebelumnya.filter((a) => a.id !== id))
      setError('')
    } catch (e) {
      setError(e.message)
    }
  }

  const anggotaTampil = anggota.filter((a) =>
    a.nama.toLowerCase().includes(cari.toLowerCase()),
  )

  return (
    <>
      <HeaderAplikasi />
      <main className="container py-4">
        <BannerClub />
        <RingkasanStatistik anggota={anggota} />
        {error && (
          <div className="alert alert-danger d-flex justify-content-between align-items-center" role="alert">
            <span><i className="bi bi-exclamation-triangle me-2"></i>{error}</span>
            <button type="button" className="btn-close" aria-label="Tutup" onClick={() => setError('')}></button>
          </div>
        )}
        <FormTambahAnggota onTambah={tambahAnggota} />
        <DaftarAnggota
          anggota={anggotaTampil}
          jumlahSemua={anggota.length}
          cari={cari}
          onCari={setCari}
          memuat={memuat}
          onUbah={ubahAnggotaData}
          onHapus={hapusAnggota}
        />
        <KomunitasLink />
      </main>
      <KembaliKeAtas />
    </>
  )
}

export default App
