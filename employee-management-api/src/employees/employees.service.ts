import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from './employee.model';
import { CreateEmployeeDto } from './create-employee.dto';
import { UpdateEmployeeDto } from './update-employee.dto';
import { SearchEmployeeDto } from './search-employee.dto';

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

  async search(searchEmployeeDto: SearchEmployeeDto): Promise<Employee[]> {
    const nameRegex = new RegExp(searchEmployeeDto.name, 'ig');

    return this.employeeModel
      .find({
        $or: [{ firstName: nameRegex }, { lastName: nameRegex }],
      })
      .exec();
  }

  async findOne(employeeId: string): Promise<Employee> {
    return this.employeeModel.findOne({ _id: employeeId }).exec();
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }
}
