import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdlConfirmCancelFormComponent } from './tdl-confirm-cancel-form.component';

describe('TdlConfirmCancelFormComponent', () => {
  let component: TdlConfirmCancelFormComponent;
  let fixture: ComponentFixture<TdlConfirmCancelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TdlConfirmCancelFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TdlConfirmCancelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
