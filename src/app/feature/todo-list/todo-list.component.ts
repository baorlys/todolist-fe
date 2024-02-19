import {Component} from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  DragDropModule,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop'
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from '@angular/material/card'
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CdkDropList,
    CdkDrag,
    MatCardHeader,
    MatCardContent,
    MatCard
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  todos: any[] = [
    {
      id: 1,
      title: 'todo1',
      description: 'description1'
    },
    {
      id: 2,
      title: 'todo2',
      description: 'description2'
    },
    {
      id: 3,
      title: 'todo3',
      description: 'description3'
    }]
  done: any[] = []
  doings: any[] = []


  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
// export class Board {
//   constructor(
//     id: number,
//     title: string,
//     columns: Column[]
//   ) {}
// }
// export class Column {
//   constructor(
//     id: number,
//     title: string,
//     todos: any[],
//   ) {}
// }
