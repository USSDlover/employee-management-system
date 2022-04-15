import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'environment';
import {CreateEmployeeDto} from '../dtos/create-employee.dto';
import {map, Observable} from 'rxjs';
import {Employee} from '../models/employee';
import {IEmployeeAPI} from '../interfaces/employee-api.interface';
import {UpdateEmployeeDto} from '@data/employees';

@Injectable()
export class EmployeesService {
  private baseUrl = environment.api.baseUrl + 'employee';

  constructor(private http: HttpClient) { }

  create(employee: CreateEmployeeDto): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(this.baseUrl, { employee: employee });
  }

  update(employee: UpdateEmployeeDto): Observable<Employee> {
    return this.http.patch<Employee>(this.baseUrl, { employee: employee });
  }

  delete(id: string): Observable<Employee> {
    return this.http.delete<Employee>(this.baseUrl, { body: { id } });
  }

  find(id: string): Observable<Employee> {
    return this.http.get<Employee>(this.baseUrl + '/find', { params: { id } });
  }

  all(): Observable<Employee[]> {
    return this.http
      .get<IEmployeeAPI[]>(this.baseUrl)
      .pipe(map(employees => employees.map(employee => Employee.fromJson(employee))));
  }
}
