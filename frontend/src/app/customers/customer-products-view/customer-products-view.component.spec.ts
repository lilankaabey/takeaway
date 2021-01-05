import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerProductsViewComponent } from './customer-products-view.component';

describe('CustomerProductsViewComponent', () => {
  let component: CustomerProductsViewComponent;
  let fixture: ComponentFixture<CustomerProductsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerProductsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerProductsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
