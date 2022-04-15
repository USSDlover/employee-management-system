import {CreateEmployeeDto} from '../dtos/create-employee.dto';

export interface IEmployee extends CreateEmployeeDto {
  id: string;
}
