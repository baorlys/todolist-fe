import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommentModel} from "../../../../model/Response/comment.model";
import {DatePipe, NgOptimizedImage} from "@angular/common";
import {StorageService} from "../../../../core/service/storage.service";
import {TdlCommentFormComponent} from "../tdl-comment-form/tdl-comment-form.component";
import {AvatarModule} from "primeng/avatar";

@Component({
  selector: 'app-tdl-comment',
  standalone: true,
  imports: [
    NgOptimizedImage,
    DatePipe,
    TdlCommentFormComponent,
    AvatarModule
  ],
  templateUrl: './tdl-comment.component.html',
  styleUrl: './tdl-comment.component.css'
})
export class TdlCommentComponent implements OnInit {

  createdAt: string | null = null;
  canReply: boolean = false;
  canEdit: boolean = false;
  canDelete: boolean = false;
  activeCommentType = ActiveCommentType
  @Input()
  comment!: CommentModel;
  @Input()
  activeComment: ActiveComment | null = null;
  @Output()
  setActiveComment = new EventEmitter<ActiveComment | null>();
  @Output()
  updateComment = new EventEmitter<{ id: string; content: string }>();
  @Output()
  deleteComment = new EventEmitter<string>();
  constructor(public storage: StorageService) {
  }

  ngOnInit(): void {
    this.createdAt = new DatePipe('en-US').transform(this.comment.createdAt, 'MMM d, y - h:mm:ss a');
    let currentUserId = this.storage.getItem('user').id;
    const fiveMinutes =  5 * 60 * 1000;
    const timePassed =
      new Date().getMilliseconds() -
      new Date(this.comment.createdAt).getMilliseconds() >
      fiveMinutes;
    this.canEdit = currentUserId === this.comment.user.id &&
      !timePassed;
    this.canDelete =
      currentUserId === this.comment.user.id &&
      !timePassed;
  }

  isEditing(): boolean {
    if (!this.activeComment) {
      return false;
    }
    return (
      this.activeComment.id === this.comment.id &&
      this.activeComment.type === this.activeCommentType.editing
    );
  }
}

export enum ActiveCommentType {
  replying = 'replying',
  editing = 'editing',
}
export interface ActiveComment {
  id: string;
  type: ActiveCommentType;
}
