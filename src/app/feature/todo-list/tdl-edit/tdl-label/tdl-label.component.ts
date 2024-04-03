import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AbstractControl, FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ColorPickerModule, ColorPickerService} from "ngx-color-picker";
import {MatChipGrid, MatChipRemove, MatChipRow} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {DropdownModule} from "primeng/dropdown";
import {MatOption, MatSelect, MatSelectModule} from "@angular/material/select";
import {NgStyle} from "@angular/common";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatDivider} from "@angular/material/divider";
import {ThemePalette} from "@angular/material/core";
import {MAT_COLOR_FORMATS, NGX_MAT_COLOR_FORMATS, NgxMatColorPickerModule} from "@vipstorage/material-color-picker";
import {LabelService} from "../../service/label.service";
import {StorageService} from "../../../../core/service/storage.service";
import {pairwise} from "rxjs";

@Component({
  selector: 'app-tdl-label',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    ColorPickerModule,
    MatLabel,
    MatChipGrid,
    MatChipRemove,
    MatChipRow,
    MatIcon,
    DropdownModule,
    MatSelectModule,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    NgStyle,
    MatButtonToggleGroup,
    MatDivider,
    MatButtonToggle,
    NgxMatColorPickerModule,
  ],
  templateUrl: './tdl-label.component.html',
  styleUrl: './tdl-label.component.css',
  providers: [
    {provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS}
  ]
})
export class TdlLabelComponent implements OnInit, OnChanges {
  newLabelName = '';
  newLabelColor = '';
  labels: any[] = []
  @Input()
  listLabelSelected!: any[];

  @Input() todoId: any;
  userId: any;
  showCreateLabel = false;

  constructor(private labelService: LabelService,
              private storageService: StorageService,) {
    this.userId = storageService.getItem('user').id;
    console.log(this.listLabelSelected)
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadLabelsOfTodo()
    }

  ngOnInit(): void {
    this.loadLabelsOfTodo()
    this.loadAllLabels()
  }

  loadLabelsOfTodo() {
    this.labelService.getByTodoId(this.todoId).subscribe((data) => {
      //@ts-ignore
      this.listLabelSelected = data;
    })
  }

  loadAllLabels(){
    this.labelService.getByUserId(this.userId).subscribe((data) => {
      //@ts-ignore
      this.labels = data;
    });
  }

  // A method to handle the Create button click
  createLabel() {
    // Implement logic to create the group label
    let label: LabelRequest = {
      title: this.newLabelName,
      color: this.newLabelColor,
      todoId: this.todoId,
      userId: this.storageService.getItem('user').id
    };
    this.labelService.createLabel(label).subscribe((data) => {
      this.labels.push(data);
    });
    this.showCreateLabel = false;
  }
  cancelCreateLabel() {
    this.showCreateLabel = false;
  }

  openCreateLabel() {
    this.showCreateLabel = true;
  }



  cancel() {
    // Implement logic to close the window
  }

  remove(label: any): void {
    const index = this.listLabelSelected.indexOf(label);
    if (index >= 0) {
      this.labelService.removeLabelFromTodoId(this.todoId, label.id).subscribe((data) => {
        this.listLabelSelected.splice(index, 1);
      })


    }
  }

  selectLabel(label: any) {
    this.labelService.addLabelToTodoId(this.todoId, label.id).subscribe((data) => {
    })
  }

  labelSelectedChange() {
  }
}

export interface LabelRequest {
  title: string;
  color: string;
  todoId: string;
  userId: string;
}


