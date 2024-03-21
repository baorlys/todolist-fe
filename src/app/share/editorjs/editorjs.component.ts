import {Component, OnInit} from '@angular/core';
import EditorJS from "@editorjs/editorjs";
import Header from '@editorjs/header';
@Component({
  selector: 'app-editorjs',
  standalone: true,
  imports: [],
  templateUrl: './editorjs.component.html',
  styleUrl: './editorjs.component.css'
})
export class EditorjsComponent implements OnInit {
  editor!: EditorJS;
  constructor() { }

  ngOnInit() {
    this.editor = new EditorJS({
      holder: 'editor-js',
      tools: {
        header: Header,
      },
      placeholder: 'Description...',
    })
  }

}
