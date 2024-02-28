import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdlCommentFormComponent } from './tdl-comment-form.component';

describe('TdlCommentFormComponent', () => {
  let component: TdlCommentFormComponent;
  let fixture: ComponentFixture<TdlCommentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TdlCommentFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TdlCommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
