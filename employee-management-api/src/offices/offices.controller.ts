import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { OfficesService } from './offices.service';
import { CreateOfficeDto } from './create-office.dto';
import { UpdateOfficeDto } from './update-office.dto';

@Controller('offices')
export class OfficesController {
  constructor(private readonly officesService: OfficesService) {}

  @Post()
  async createUser(
    @Body('office') createOfficeDto: CreateOfficeDto,
  ): Promise<{ id: string }> {
    const generatedId = await this.officesService.create(createOfficeDto);
    return { id: generatedId._id };
  }

  @Delete()
  async deleteOffice(@Body('id') officeId: string): Promise<any> {
    return this.officesService.delete(officeId);
  }

  @Patch()
  async patchOffice(
    @Body('office') updateOfficeDto: UpdateOfficeDto,
  ): Promise<any> {
    return this.officesService.update(updateOfficeDto);
  }

  @Get()
  getAllUsers() {
    return this.officesService.findAll();
  }
}
