import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {EmployeesRoutedComponents, EmployeesRoutingModule} from './employees-routing.module';
import {EmployeesDataModule} from '@data/employees';
import {HttpClientModule} from '@angular/common/http';
import {EmployeesMaterialModule} from './employees-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ColumnPipe} from './pages/list/column.pipe';
import {EmployeeResolver} from './resolvers/employee.resolver';
import {SearchFormComponent} from './pages/list/search-form/search-form.component';


@NgModule({
  declarations: [
    ColumnPipe,
    SearchFormComponent,
    ...EmployeesRoutedComponents
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    EmployeesDataModule,
    HttpClientModule,
    EmployeesMaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [EmployeeResolver]
})
export class EmployeesModule { }
