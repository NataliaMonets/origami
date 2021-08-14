import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YakZamovitiComponent } from './yak-zamoviti.component';

describe('YakZamovitiComponent', () => {
  let component: YakZamovitiComponent;
  let fixture: ComponentFixture<YakZamovitiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YakZamovitiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YakZamovitiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
