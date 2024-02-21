import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdlAddComponent } from './tdl-add.component';

describe('TdlAddComponent', () => {
  let component: TdlAddComponent;
  let fixture: ComponentFixture<TdlAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TdlAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TdlAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
