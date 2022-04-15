import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListPage} from './pages/list/list.page';
import {CreateUpdatePage} from './pages/create-update/create-update.page';
import {EmployeeResolver} from './resolvers/employee.resolver';

const routes: Routes = [
  { path: '', component: ListPage },
  { path: 'new', component: CreateUpdatePage },
  {
    path: 'edit/:id',
    component: CreateUpdatePage,
    resolve: {
      employee: EmployeeResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
