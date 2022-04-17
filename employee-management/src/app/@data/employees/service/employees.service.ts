import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {environment} from 'environment';

import {CreateEmployeeDto} from '../dtos/create-employee.dto';
import {UpdateEmployeeDto} from '../dtos/update-employee.dto';
import {SearchEmployeeDto} from '../dtos/search-employee.dto';
import {Employee} from '../models/employee';
import {IEmployeeAPI} from '../interfaces/employee-api.interface';
import {IEmployeeArray} from '../interfaces/employee-array.interface';
import {IEmployeeArrayApiResponse} from '../interfaces/employee-array-api-response.interface';

@Injectable()
export class EmployeesService {
  private baseUrl = environment.api.baseUrl + 'employees';

  constructor(private http: HttpClient) { }

  create(employee: CreateEmployeeDto): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(this.baseUrl, { employee: employee });
  }

  update(employee: UpdateEmployeeDto): Observable<Employee> {
    return this.http.patch<IEmployeeAPI>(this.baseUrl, { employee: employee })
      .pipe(map(employee => Employee.fromJson(employee)));
  }

  delete(id: string): Observable<Employee> {
    return this.http.delete<Employee>(this.baseUrl, { body: { id } });
  }

  search(filter: SearchEmployeeDto, pageSize: number, pageNum: number): Observable<IEmployeeArray> {
    return this.http.post<IEmployeeArrayApiResponse>(this.baseUrl + '/search', { filter }, {
      params: {
        pageSize,
        pageNum
      }
    })
      .pipe(map(response => {
        return {
          employees: response.employees.map(employee => Employee.fromJson(employee)),
          totalCount: response.totalCount
        }
      }));
  }

  find(id: string): Observable<Employee> {
    return this.http.get<IEmployeeAPI>(this.baseUrl + '/find', { params: { id } })
      .pipe(map(employee => Employee.fromJson(employee)));
  }

  all(pageSize: number, pageNum: number): Observable<IEmployeeArray> {
    return this.http
      .get<IEmployeeArrayApiResponse>(this.baseUrl, { params: { pageSize, pageNum } })
      .pipe(map(response => {
        return {
          employees: response.employees.map(employee => Employee.fromJson(employee)),
          totalCount: response.totalCount
        }
      }));
  }
}
