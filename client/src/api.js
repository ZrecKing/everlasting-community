// Lapisan akses API backend NestJS
const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

async function request(path, options = {}) {
  let res
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })
  } catch {
    throw new Error('Tidak dapat terhubung ke server. Pastikan backend berjalan di ' + BASE_URL)
  }
  const data = await res.json().catch(() => null)
  if (!res.ok) {
    const pesan = Array.isArray(data?.message) ? data.message.join(', ') : data?.message
    throw new Error(pesan ?? `Permintaan gagal (${res.status})`)
  }
  return data
}

export const ambilAnggota = () => request('/anggota')
export const buatAnggota = (body) => request('/anggota', { method: 'POST', body: JSON.stringify(body) })
export const ubahAnggota = (id, body) => request(`/anggota/${id}`, { method: 'PATCH', body: JSON.stringify(body) })
export const hapusAnggotaApi = (id) => request(`/anggota/${id}`, { method: 'DELETE' })
