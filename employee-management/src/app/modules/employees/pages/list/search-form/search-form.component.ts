import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SearchEmployeeDto} from '@data/employees';
import {getOffices} from '@data/offices';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  searchModel: SearchEmployeeDto = {
    name: '',
    officeName: '',
  };
  offices = getOffices();

  @Output() submitted = new EventEmitter<SearchEmployeeDto>();
  @Output() cleared = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }
}
