import {IEmployeeAPI} from './employee-api.interface';


export interface IEmployeeArrayApiResponse {
  employees: IEmployeeAPI[];
  totalCount: number;
}
