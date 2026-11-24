import { PartialType } from '@nestjs/mapped-types';
import { CreateAnggotaDto } from './create-anggota.dto';

// Semua field opsional + aturan validasi diwarisi dari CreateAnggotaDto
export class UpdateAnggotaDto extends PartialType(CreateAnggotaDto) {}
