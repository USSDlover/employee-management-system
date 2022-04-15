import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { ListPage } from './pages/list/list.page';
import { CreateUpdatePage } from './pages/create-update/create-update.page';
import {EmployeesDataModule} from '@data/employees';
import {HttpClientModule} from '@angular/common/http';
import {EmployeesMaterialModule} from './employees-material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ColumnPipe} from './pages/list/column.pipe';
import {EmployeeResolver} from './resolvers/employee.resolver';


@NgModule({
  declarations: [
    ListPage,
    CreateUpdatePage,
    ColumnPipe
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    EmployeesDataModule,
    HttpClientModule,
    EmployeesMaterialModule,
    ReactiveFormsModule
  ],
  providers: [EmployeeResolver]
})
export class EmployeesModule { }
