import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    MongooseModule.forRoot(
      `${process.env.MONGO_ADDRESS ?? 'mongodb://localhost'}/${
        process.env.MONGO_DB ?? 'employees-management'
      }`,
    ),
    EmployeesModule,
  ],
})
export class AppModule {}
