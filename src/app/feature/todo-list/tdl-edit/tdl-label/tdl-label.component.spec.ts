import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdlLabelComponent } from './tdl-label.component';

describe('TdlLabelComponent', () => {
  let component: TdlLabelComponent;
  let fixture: ComponentFixture<TdlLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TdlLabelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TdlLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
