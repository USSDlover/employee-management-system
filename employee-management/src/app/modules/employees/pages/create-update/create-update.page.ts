import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {environment} from 'environment';
import {getNewEmployeeFields, TNewEmployeeFields} from './required-employee-form-fields';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Employee, EmployeesService, UpdateEmployeeDto} from '@data/employees';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.page.html',
  styleUrls: ['./create-update.page.scss']
})
export class CreateUpdatePage implements OnInit {
  formFields: TNewEmployeeFields = getNewEmployeeFields();
  formGroup: FormGroup | undefined;
  employee: Employee | undefined;

  constructor(
    private title: Title,
    private employeeService: EmployeesService,
    private route: ActivatedRoute
  ) {
    if (route.snapshot.data['employee'])
      this.employee = route.snapshot.data['employee'];
  }

  ngOnInit(): void {
    this.setTitle();
    this.initForm();
  }

  onSubmit(): void {
    if (this.employee) {
      const updatedEmployee: UpdateEmployeeDto = this.formGroup?.value;
      updatedEmployee.id = this.employee.id;

      this.employeeService.update(updatedEmployee)
        .subscribe({
          next: (res) => {
            console.log('Update result', res);
          },
          error: err => {
            console.log(err);
          },
          complete: () => {}
        });
    } else {
      this.employeeService.create(this.formGroup?.value)
        .subscribe({
          next: (res) => {
            console.log('Create result', res);
          },
          error: err => {
            console.log(err);
          },
          complete: () => {}
        });
    }
  }

  private setTitle(): void {
    this.title.setTitle(environment.title.baseTitle +
      ` | ${this.employee ? 'Update The' : 'Create New'} Employee`)
  }

  private initForm(): void {
    this.formGroup = new FormGroup({
      firstName: new FormControl(this.employee?.firstName ?? null, [Validators.required] ),
      lastName: new FormControl(this.employee?.lastName ?? null, [Validators.required]),
      officeName: new FormControl(this.employee?.officeName ?? null, [Validators.required]),
      birthDate: new FormControl(this.employee?.birthDate ?? null, [Validators.required]),
      phoneNumber: new FormControl(this.employee?.phoneNumber ?? null, [Validators.required]),
      tags: new FormControl(this.employee?.tags ?? null, [Validators.required])
    });
  }

}
