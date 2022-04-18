import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const url = process.env.MONGO_URL || 'localhost';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    MongooseModule.forRoot(
      `mongodb://${url}:27017?serverSelectionTimeoutMS=2000&authSource=admin`,
    ),
    EmployeesModule,
  ],
})
export class AppModule {}
