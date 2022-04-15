import { Module } from '@nestjs/common';
import { OfficesController } from './offices.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OfficeSchema } from './office.model';
import { OfficesService } from './offices.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Office', schema: OfficeSchema }]),
  ],
  controllers: [OfficesController],
  providers: [OfficesService],
})
export class OfficesModule {}
