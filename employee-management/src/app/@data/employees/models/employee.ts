import {IEmployee} from '../interfaces/employee.interface';
import {IEmployeeAPI} from '../interfaces/employee-api.interface';

export class Employee implements IEmployee {
  firstName: string = '';
  id: string = '';
  lastName: string = '';
  birthDate?: Date;
  officeName?: string;
  phoneNumber?: string;
  tags?: Array<string>;

  constructor() {}

  get name(): string {
    return this.firstName + ' ' + this.lastName;
  }

  static create(data: IEmployee): Employee {
    const employee = new Employee();
    return Object.assign(employee, data);
  }

  static fromJson(data: IEmployeeAPI): Employee {
    return Employee.create({
      id: data._id,
      firstName: data.firstName,
      lastName: data.lastName,
      officeName: data.officeName,
      birthDate: new Date(data.birthDate),
      phoneNumber: data.phoneNumber,
      tags: data.tags
    })
  }
}
