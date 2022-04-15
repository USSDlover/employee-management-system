import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {environment} from 'environment';
import {getNewEmployeeFields, TNewEmployeeFields} from './required-employee-form-fields';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Employee, EmployeesService} from '@data/employees';

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
    private employeeService: EmployeesService
  ) { }

  ngOnInit(): void {
    this.setTitle();
    this.initForm();
  }

  onSubmit(): void {
    if (this.formGroup?.valid)
      this.employeeService.create(this.formGroup?.value)
        .subscribe({
          next: () => {},
          error: err => {
            console.log(err);
          },
          complete: () => {}
        });
  }

  private setTitle(): void {
    this.title.setTitle(environment.title.baseTitle + ' | Create New Employee')
  }

  private initForm(): void {
    this.formGroup = new FormGroup({
      firstName: new FormControl(this.employee?.firstName ?? null, [Validators.required] ),
      lastName: new FormControl(this.employee?.lastName ?? null, [Validators.required]),
      officeName: new FormControl(this.employee?.officeName ?? null, [Validators.required]),
      birthDate: new FormControl(this.employee?.birthDate ?? null, [Validators.required]),
      phoneNumber: new FormControl(this.employee?.phoneNumber ?? null, [Validators.required]),
      tags: new FormControl(this.employee?.tags ?? null, [Validators.required])
    })
  }

}
