import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepagepostComponent } from './createpagepost.component';

describe('CreatepagepostComponent', () => {
  let component: CreatepagepostComponent;
  let fixture: ComponentFixture<CreatepagepostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatepagepostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatepagepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
