import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VidgukiComponent } from './vidguki.component';

describe('VidgukiComponent', () => {
  let component: VidgukiComponent;
  let fixture: ComponentFixture<VidgukiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VidgukiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VidgukiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
