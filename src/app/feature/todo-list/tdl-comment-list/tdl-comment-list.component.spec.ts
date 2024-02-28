import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdlCommentListComponent } from './tdl-comment-list.component';

describe('TdlCommentListComponent', () => {
  let component: TdlCommentListComponent;
  let fixture: ComponentFixture<TdlCommentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TdlCommentListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TdlCommentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
