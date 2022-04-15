import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdatePage } from './create-update.page';

describe('CreateUpdateComponent', () => {
  let component: CreateUpdatePage;
  let fixture: ComponentFixture<CreateUpdatePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdatePage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
