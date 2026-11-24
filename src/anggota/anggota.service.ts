import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnggotaDto } from './dto/create-anggota.dto';
import { UpdateAnggotaDto } from './dto/update-anggota.dto';
import { Anggota, StatusAnggota } from './entities/anggota.entity';

@Injectable()
export class AnggotaService {
  // Penyimpanan sementara di memori (hilang saat server restart)
  private anggota: Anggota[] = [
    this.buat(1, 'Akira', '600101778', 5260, 466, 'Aktif', '2024-03-10'),
    this.buat(2, 'Rinoa', '879467156', 1990, 440, 'Aktif', '2024-05-21'),
    this.buat(3, 'Kaizen', '881261443', 3100, 438, 'Aktif', '2024-06-02'),
    this.buat(4, 'Sakura', '283532046', 3090, 210, 'Jarang Aktif', '2024-08-15'),
    this.buat(5, 'Dren', '787971954', 940, 35, 'Nonaktif', '2025-01-09'),
  ];
  private idBerikutnya = 6;

  private buat(
    id: number,
    nama: string,
    trainerId: string,
    totalFans: number,
    monthlyGain: number,
    status: StatusAnggota,
    tanggalBergabung: string,
  ): Anggota {
    return {
      id,
      nama,
      trainerId,
      totalFans,
      monthlyGain,
      status,
      tanggalBergabung,
      aktifDiClub: status !== 'Nonaktif',
    };
  }

  private pastikanTrainerIdUnik(trainerId: string, kecualiId?: number) {
    const dobel = this.anggota.find(
      (a) => a.trainerId === trainerId && a.id !== kecualiId,
    );
    if (dobel) {
      throw new ConflictException(
        `Trainer ID ${trainerId} sudah terdaftar atas nama ${dobel.nama}`,
      );
    }
  }

  create(dto: CreateAnggotaDto): Anggota {
    this.pastikanTrainerIdUnik(dto.trainerId);
    const baru = this.buat(
      this.idBerikutnya++,
      dto.nama.trim(),
      dto.trainerId,
      dto.totalFans,
      dto.monthlyGain ?? 0,
      dto.status ?? 'Aktif',
      dto.tanggalBergabung ?? new Date().toISOString().slice(0, 10),
    );
    this.anggota.unshift(baru);
    return baru;
  }

  findAll(): Anggota[] {
    return this.anggota;
  }

  findOne(id: number): Anggota {
    const a = this.anggota.find((x) => x.id === id);
    if (!a) throw new NotFoundException(`Anggota dengan id ${id} tidak ditemukan`);
    return a;
  }

  update(id: number, dto: UpdateAnggotaDto): Anggota {
    const a = this.findOne(id);
    if (dto.trainerId !== undefined) this.pastikanTrainerIdUnik(dto.trainerId, id);
    Object.assign(a, dto);
    if (dto.nama !== undefined) a.nama = dto.nama.trim();
    a.aktifDiClub = a.status !== 'Nonaktif';
    return a;
  }

  remove(id: number): { message: string; data: Anggota } {
    const a = this.findOne(id);
    this.anggota = this.anggota.filter((x) => x.id !== id);
    return { message: `Anggota ${a.nama} berhasil dihapus`, data: a };
  }
}
