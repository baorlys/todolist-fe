import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdlCommentComponent } from './tdl-comment.component';

describe('TdlCommentComponent', () => {
  let component: TdlCommentComponent;
  let fixture: ComponentFixture<TdlCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TdlCommentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TdlCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
