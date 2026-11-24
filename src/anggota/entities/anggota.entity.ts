export type StatusAnggota = 'Aktif' | 'Jarang Aktif' | 'Nonaktif';

export const DAFTAR_STATUS: StatusAnggota[] = ['Aktif', 'Jarang Aktif', 'Nonaktif'];

// Entity: bentuk data Anggota club Uma Musume (disimpan di array memori)
export class Anggota {
  id!: number; // number
  nama!: string; // string
  trainerId!: string; // string (9-12 digit angka)
  totalFans!: number; // number (dalam juta)
  monthlyGain!: number; // number (dalam juta)
  status!: StatusAnggota; // enum string
  tanggalBergabung!: string; // string tanggal ISO (YYYY-MM-DD)
  aktifDiClub!: boolean; // boolean (turunan dari status)
}
