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
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { UpdateEmployeeDto } from './dtos/update-employee.dto';
import { Employee } from './employee.model';
import { SearchEmployeeDto } from './dtos/search-employee.dto';
import { IEmployeeArrayResponse } from './employee-array-response.interface';

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

  @Post('search')
  async search(
    @Body('filter') searchEmployeeDto: SearchEmployeeDto,
    @Query('pageSize') pageSize: number,
    @Query('pageNum') pageNum: number,
  ): Promise<IEmployeeArrayResponse> {
    return this.employeeService.search(searchEmployeeDto, pageSize, pageNum);
  }

  @Get('find')
  async findOne(@Query('id') employeeId: string): Promise<Employee> {
    return this.employeeService.findOne(employeeId);
  }

  @Get()
  getAllEmployee(
    @Query('pageSize') pageSize: number,
    @Query('pageNum') pageNum: number,
  ): Promise<IEmployeeArrayResponse> {
    return this.employeeService.findAll(pageSize, pageNum);
  }
}
