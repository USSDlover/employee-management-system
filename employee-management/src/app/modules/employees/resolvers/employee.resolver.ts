import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {map, Observable, of, take} from 'rxjs';
import {Employee, EmployeesService} from '@data/employees';

@Injectable()
export class EmployeeResolver implements Resolve<boolean | Employee> {
  constructor(
    private service: EmployeesService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | Employee> {
    if (this.router.getCurrentNavigation()?.extras?.state?.['employee'])
      return this.router.getCurrentNavigation()?.extras?.state?.['employee'];

    if (route.params['id'])
      return this.service.find(route.params['id']);

    return of(true)
  }
}
