import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from './employee.model';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { UpdateEmployeeDto } from './dtos/update-employee.dto';
import { SearchEmployeeDto } from './dtos/search-employee.dto';
import { IEmployeeArrayResponse } from './employee-array-response.interface';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel('Employee') private readonly employeeModel: Model<Employee>,
  ) {}

  async create(createEmployee: CreateEmployeeDto): Promise<Employee> {
    const createdEmployee = new this.employeeModel({ ...createEmployee });
    return createdEmployee.save();
  }

  async update(updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    return this.employeeModel
      .findByIdAndUpdate(updateEmployeeDto.id, updateEmployeeDto)
      .exec();
  }

  async delete(employeeId: string): Promise<Employee> {
    return this.employeeModel.findByIdAndDelete(employeeId).exec();
  }

  async search(
    searchEmployeeDto: SearchEmployeeDto,
    pageSize: number,
    pageNum: number,
  ): Promise<IEmployeeArrayResponse> {
    const nameRegex = new RegExp(searchEmployeeDto.name, 'ig');
    const officeRegex = new RegExp(searchEmployeeDto.officeName, 'ig');
    const query = {
      $and: [
        { $or: [{ firstName: nameRegex }, { lastName: nameRegex }] },
        { officeName: officeRegex },
      ],
    };

    return {
      employees: await this.employeeModel
        .find(query)
        .skip(pageNum * pageSize)
        .limit(pageSize)
        .exec(),
      totalCount: await this.employeeModel.count(query).exec(),
    };
  }

  async findOne(employeeId: string): Promise<Employee> {
    return this.employeeModel.findOne({ _id: employeeId }).exec();
  }

  async findAll(
    pageSize: number,
    pageNum: number,
  ): Promise<IEmployeeArrayResponse> {
    return {
      employees: await this.employeeModel
        .find()
        .skip(pageNum * pageSize)
        .limit(pageSize)
        .exec(),
      totalCount: await this.employeeModel.estimatedDocumentCount().exec(),
    };
  }
}
