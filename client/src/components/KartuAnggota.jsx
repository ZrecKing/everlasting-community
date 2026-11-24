import { useEffect, useRef, useState } from 'react'
import $ from 'jquery'

const warnaStatus = { Aktif: 'success', 'Jarang Aktif': 'warning', Nonaktif: 'secondary' }

// Props: anggota (objek), onUbah (fungsi PATCH), onHapus (fungsi DELETE)
function KartuAnggota({ anggota, onUbah, onHapus }) {
  const ref = useRef(null)
  const [edit, setEdit] = useState(false)
  const [form, setForm] = useState({})

  // jQuery: efek fade-in saat kartu muncul (kartu baru terlihat "masuk")
  useEffect(() => {
    $(ref.current).hide().fadeIn(400)
  }, [])

  const { nama, trainerId, totalFans, monthlyGain, status } = anggota

  const mulaiEdit = () => {
    setForm({ nama, totalFans, monthlyGain, status })
    setEdit(true)
  }
  const ubah = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const simpan = async (e) => {
    e.preventDefault()
    const berhasil = await onUbah(anggota.id, {
      nama: form.nama.trim(),
      totalFans: Number(form.totalFans),
      monthlyGain: Number(form.monthlyGain),
      status: form.status,
    })
    if (berhasil) setEdit(false)
  }

  return (
    <article className="member-card" ref={ref}>
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div className="d-flex align-items-center gap-2">
          <span className="avatar">{nama.slice(0, 2).toUpperCase()}</span>
          <div>
            <b>[ECM] {nama}</b>
            <div className="small text-muted-2">ID {trainerId}</div>
          </div>
        </div>
        <span className={`badge text-bg-${warnaStatus[status]}`}>{status}</span>
      </div>

      {edit ? (
        <form onSubmit={simpan} className="d-grid gap-2">
          <input name="nama" className="form-control form-control-sm" value={form.nama} onChange={ubah} minLength={2} maxLength={30} required aria-label="Nama" />
          <input name="totalFans" type="number" min="0" className="form-control form-control-sm" value={form.totalFans} onChange={ubah} required aria-label="Total fans" />
          <input name="monthlyGain" type="number" min="0" className="form-control form-control-sm" value={form.monthlyGain} onChange={ubah} required aria-label="Monthly gain" />
          <select name="status" className="form-select form-select-sm" value={form.status} onChange={ubah} aria-label="Status">
            <option>Aktif</option>
            <option>Jarang Aktif</option>
            <option>Nonaktif</option>
          </select>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-sm btn-gradient"><i className="bi bi-check-lg me-1"></i>Simpan</button>
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setEdit(false)}>Batal</button>
          </div>
        </form>
      ) : (
        <>
          <dl className="member-stats mb-3">
            <dt>Total Fans</dt><dd>{totalFans.toLocaleString('id-ID')} jt</dd>
            <dt>Monthly Gain</dt><dd className="text-up">+{monthlyGain.toLocaleString('id-ID')} jt</dd>
          </dl>
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-outline-primary" onClick={mulaiEdit}>
              <i className="bi bi-pencil me-1"></i>Edit
            </button>
            <button className="btn btn-sm btn-outline-danger" onClick={() => onHapus(anggota.id)}>
              <i className="bi bi-trash me-1"></i>Hapus
            </button>
          </div>
        </>
      )}
    </article>
  )
}

export default KartuAnggota
