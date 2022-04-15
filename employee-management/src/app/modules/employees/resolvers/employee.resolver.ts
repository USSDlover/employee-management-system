import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, of, take} from 'rxjs';
import {EmployeesService} from '@data/employees';

@Injectable()
export class EmployeeResolver implements Resolve<boolean> {
  constructor(
    private service: EmployeesService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log(this.router.getCurrentNavigation()?.extras.state);
    console.log(state.root);

    if (route.params['id'])
      this.service.find(route.params['id'])
        .pipe(take(1))
        .subscribe(res => {
          console.log(res);
        });

    return of(true);
  }
}
