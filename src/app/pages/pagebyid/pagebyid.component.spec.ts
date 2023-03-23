import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagebyidComponent } from './pagebyid.component';

describe('PagebyidComponent', () => {
  let component: PagebyidComponent;
  let fixture: ComponentFixture<PagebyidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagebyidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagebyidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
