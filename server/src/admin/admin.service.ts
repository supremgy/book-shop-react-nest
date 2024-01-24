import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminRepository } from './admin.repository';
import { BookRequestDto } from './dto/book-request.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminRepository)
    private adminRepository: AdminRepository,
  ) {}

  async addBook(bookRequestDto: BookRequestDto): Promise<void> {
    return this.adminRepository.createBook(bookRequestDto);
  }
}
