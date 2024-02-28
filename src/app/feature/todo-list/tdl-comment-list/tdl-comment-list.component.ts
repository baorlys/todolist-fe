import {Component, Input, OnInit} from '@angular/core';
import {CommentRequest, TodoListService} from "../service/todo-list.service";
import {CommentModel} from "../../../model/Response/comment.model";
import {ActiveComment, TdlCommentComponent} from "./tdl-comment/tdl-comment.component";
import {TdlCommentFormComponent} from "./tdl-comment-form/tdl-comment-form.component";
import {StorageService} from "../../../core/service/storage.service";

@Component({
  selector: 'app-tdl-comment-list',
  standalone: true,
  imports: [
    TdlCommentComponent,
    TdlCommentFormComponent
  ],
  templateUrl: './tdl-comment-list.component.html',
  styleUrl: './tdl-comment-list.component.css'
})
export class TdlCommentListComponent implements OnInit {
  @Input() currentTodoId!: string;
  activeComment: ActiveComment | null = null;
  commentList: CommentModel[] = [

  ];
  constructor(private todoListService: TodoListService,
              private storage: StorageService) {
  }

  ngOnInit() {
    this.todoListService.getComments(this.currentTodoId).subscribe((data: any) => {
      this.commentList = data;
    })
  }

  addComment($event: string) {
    let commentRequest : CommentRequest = {
      content: $event,
      userId: this.storage.getItem('user').id,
      todoListId: this.currentTodoId
    }

    this.todoListService.addComment(this.currentTodoId, commentRequest).subscribe((data: any) => {
      this.commentList.push(data);
    })
  }

  setActiveComment(activeComment: ActiveComment | null): void {
    this.activeComment = activeComment;
  }

  updateComment($event: { id: string; content: string }) {
    let commentRequest : CommentRequest = {
      userId: this.storage.getItem('user').id,
      content: $event.content,
      todoListId: this.currentTodoId
    }
    console.log($event);

    this.todoListService.updateComment(this.currentTodoId, $event.id, commentRequest).subscribe((data: any) => {
      this.commentList = this.commentList.map((comment) => {
        if(comment.id === data.id) {
          return data;
        }
        return comment;
      })
      this.activeComment = null;
    })

  }

  deleteComment($event: string) {
    this.todoListService.deleteComment(this.currentTodoId, $event).subscribe((data: any) => {
      debugger
      this.commentList = this.commentList.filter((comment) => comment.id !== data);
    })

  }
}


