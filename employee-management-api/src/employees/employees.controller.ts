import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './create-employee.dto';
import { UpdateEmployeeDto } from './update-employee.dto';
import { Employee } from './employee.model';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeesService) {}

  @Post()
  async createEmployee(
    @Body('employee') createEmployeeDto: CreateEmployeeDto,
  ): Promise<{ id: string }> {
    const generatedId = await this.employeeService.create(createEmployeeDto);
    return { id: generatedId._id };
  }

  @Delete()
  async deleteEmployee(@Body('id') employeeId: string): Promise<Employee> {
    return this.employeeService.delete(employeeId);
  }

  @Patch()
  async patchEmployee(
    @Body('employee') updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    return this.employeeService.update(updateEmployeeDto);
  }

  @Get('find')
  async findOne(@Query('id') employeeId: string): Promise<Employee> {
    return this.employeeService.findOne(employeeId);
  }

  @Get()
  getAllEmployee(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }
}
