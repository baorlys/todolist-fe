import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdlEditComponent } from './tdl-edit.component';

describe('TdlEditComponent', () => {
  let component: TdlEditComponent;
  let fixture: ComponentFixture<TdlEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TdlEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TdlEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
