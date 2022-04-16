import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Employee, EmployeesService, SearchEmployeeDto} from '@data/employees';
import {Subscription} from 'rxjs';
import {environment} from 'environment';
import {EmployeeTableColumns} from './employee-table-columns';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class ListPage implements OnInit, OnDestroy {
  employees: Employee[] = [];
  tableColumns = EmployeeTableColumns;
  displayedColumns: string[] = EmployeeTableColumns.map(column => column.col);

  private subscriptions = new Subscription();

  constructor(
    private title: Title,
    private employeesService: EmployeesService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.setTitle();
    this.getEmployees();
    this.displayedColumns.push('action');
  }

  private setTitle(): void {
    this.title.setTitle(environment.title.baseTitle + ' | List Employees');
  }

  getEmployees(): void {
    this.subscriptions.add(
      this.employeesService.all()
        .subscribe(employees => this.employees = employees)
    );
  }

  onEdit(employee: Employee): void {
    this.router.navigate(['edit', employee.id], {
      relativeTo: this.route,
      state: { employee }
    }).then();
  }

  onDelete(employee: Employee): void {
    const confirmed = window.confirm(`Delete "${employee.name}"?`);

    if (confirmed)
      this.subscriptions.add(
        this.employeesService.delete(employee.id).subscribe({
          next: () => {
            this.snackBar.open(`"${employee.name}" Successfully deleted`, 'Okay!', { duration: 2500 });
            this.getEmployees();
          },
          error: err => console.error(err),
          complete: () => {}
        })
      )
  }

  onSearchFormSubmit(searchModel: SearchEmployeeDto): void {
    this.employeesService.search(searchModel)
      .subscribe({
        next: matchedEmployees => this.employees = matchedEmployees,
        error: err => console.error(err),
        complete: () => {}
      })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
