import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListPage} from './pages/list/list.page';
import {CreateUpdatePage} from './pages/create-update/create-update.page';
import {EmployeeResolver} from './resolvers/employee.resolver';
import {EmployeesPage} from './pages/employees/employees.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeesPage,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListPage },
      { path: 'new', component: CreateUpdatePage },
      {
        path: 'edit/:id',
        component: CreateUpdatePage,
        resolve: {
          employee: EmployeeResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }

export const EmployeesRoutedComponents = [
  EmployeesPage,
  ListPage,
  CreateUpdatePage,
];
