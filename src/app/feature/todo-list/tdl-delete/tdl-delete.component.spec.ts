import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdlDeleteComponent } from './tdl-delete.component';

describe('TdlDeleteComponent', () => {
  let component: TdlDeleteComponent;
  let fixture: ComponentFixture<TdlDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TdlDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TdlDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
