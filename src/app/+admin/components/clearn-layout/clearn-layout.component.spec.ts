import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearnLayoutComponent } from './clearn-layout.component';

describe('ClearnLayoutComponent', () => {
  let component: ClearnLayoutComponent;
  let fixture: ComponentFixture<ClearnLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClearnLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearnLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
