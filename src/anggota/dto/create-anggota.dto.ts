import {
  IsDateString,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { DAFTAR_STATUS } from '../entities/anggota.entity';
import type { StatusAnggota } from '../entities/anggota.entity';

export class CreateAnggotaDto {
  @IsString()
  @IsNotEmpty({ message: 'nama tidak boleh kosong' })
  @MinLength(2, { message: 'nama minimal 2 karakter' })
  @MaxLength(30, { message: 'nama maksimal 30 karakter' })
  nama!: string;

  @IsString()
  @Matches(/^[0-9]{9,12}$/, { message: 'trainerId harus 9-12 digit angka' })
  trainerId!: string;

  @IsInt({ message: 'totalFans harus bilangan bulat' })
  @Min(0, { message: 'totalFans tidak boleh negatif' })
  totalFans!: number;

  @IsOptional()
  @IsInt({ message: 'monthlyGain harus bilangan bulat' })
  @Min(0, { message: 'monthlyGain tidak boleh negatif' })
  monthlyGain?: number;

  @IsOptional()
  @IsIn(DAFTAR_STATUS, {
    message: `status harus salah satu dari: ${DAFTAR_STATUS.join(', ')}`,
  })
  status?: StatusAnggota;

  @IsOptional()
  @IsDateString({}, { message: 'tanggalBergabung harus format tanggal ISO (YYYY-MM-DD)' })
  tanggalBergabung?: string;
}
