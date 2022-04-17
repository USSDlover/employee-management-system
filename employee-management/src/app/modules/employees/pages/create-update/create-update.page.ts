import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {environment} from 'environment';
import {getNewEmployeeFields, TNewEmployeeFields} from './required-employee-form-fields';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Employee, EmployeesService, UpdateEmployeeDto} from '@data/employees';
import {ActivatedRoute} from '@angular/router';
import {MatChipInputEvent} from '@angular/material/chips';
import {getOffices} from '@data/offices';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.page.html',
  styleUrls: ['./create-update.page.scss']
})
export class CreateUpdatePage implements OnInit {
  formFields: TNewEmployeeFields = getNewEmployeeFields();
  formGroup: FormGroup | undefined;
  employee: Employee | undefined;
  availableOffices: string[] = getOffices();
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(
    private title: Title,
    private employeeService: EmployeesService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    if (route.snapshot.data['employee'])
      this.employee = route.snapshot.data['employee'];
  }

  ngOnInit(): void {
    this.setTitle();
    this.initForm();
  }

  onSubmit(): void {
    if (this.employee)
      this.updateTheEmployee();
    else
      this.createTheEmployee();
  }

  private createTheEmployee(): void {
    this.employeeService.create(this.formGroup?.value)
      .subscribe({
        next: () => {
          this.snackBar.open('Employee successfully created', 'Okay!', { duration: 2500 });
        },
        error: err => {
          console.error(err);
          this.snackBar.open('Failed to create employee', 'Try Again!', { duration: 2500 });
        },
        complete: () => {}
      });
  }

  private updateTheEmployee(): void {
    const updatedEmployee: UpdateEmployeeDto = this.formGroup?.value;
    updatedEmployee.id = this.employee?.id!;

    this.employeeService.update(updatedEmployee)
      .subscribe({
        next: () => {
          this.snackBar.open('Employee successfully updated', 'Okay!', { duration: 2500 });
        },
        error: err => {
          console.error(err)
          this.snackBar.open('Failed to update employee', 'Try Again!', { duration: 2500 });
        },
        complete: () => {}
      });
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.formGroup?.get('tags')?.value.push(value);
    }

    event.chipInput!.clear();
  }

  removeTag(tag: string): void {
    const index = this.formGroup?.get('tags')?.value.indexOf(tag);

    if (index >= 0) {
      this.formGroup?.get('tags')?.value.splice(index, 1);
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
      tags: new FormControl(this.employee?.tags ?? [])
    });
  }

}
