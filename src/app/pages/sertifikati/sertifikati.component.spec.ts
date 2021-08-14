import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SertifikatiComponent } from './sertifikati.component';

describe('SertifikatiComponent', () => {
  let component: SertifikatiComponent;
  let fixture: ComponentFixture<SertifikatiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SertifikatiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SertifikatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
