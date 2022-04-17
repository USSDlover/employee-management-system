import { Employee } from './employee.model';

export interface IEmployeeArrayResponse {
  totalCount: number;
  employees: Employee[];
}
