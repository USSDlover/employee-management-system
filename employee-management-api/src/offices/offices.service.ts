import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Office } from './office.model';
import { CreateOfficeDto } from './create-office.dto';
import { UpdateOfficeDto } from './update-office.dto';

@Injectable()
export class OfficesService {
  constructor(
    @InjectModel('Office') private readonly officeModel: Model<Office>,
  ) {}

  async create(createOfficeDto: CreateOfficeDto): Promise<Office> {
    const createdOffice = new this.officeModel({ ...createOfficeDto });
    return createdOffice.save();
  }

  async update(updatedOfficeDto: UpdateOfficeDto): Promise<Office> {
    return this.officeModel
      .findByIdAndUpdate(updatedOfficeDto.id, updatedOfficeDto)
      .exec();
  }

  async delete(userId: string): Promise<Office> {
    return this.officeModel.findByIdAndDelete(userId).exec();
  }

  async findAll(): Promise<Office[]> {
    return this.officeModel.find().exec();
  }
}
