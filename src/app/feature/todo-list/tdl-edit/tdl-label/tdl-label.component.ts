import { Component } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ColorPickerModule} from "ngx-color-picker";
import {MatChipGrid, MatChipRemove, MatChipRow} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {DropdownModule} from "primeng/dropdown";
import {MatOption, MatSelect, MatSelectModule} from "@angular/material/select";
import {NgStyle} from "@angular/common";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatDivider} from "@angular/material/divider";

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
  ],
  templateUrl: './tdl-label.component.html',
  styleUrl: './tdl-label.component.css'
})
export class TdlLabelComponent {
  newLabelName = '';
  labelSelected = new FormControl();
  labels:any[] =[{
    name: 'Label 1',
    color: 'red'
  },{
    name: 'Label 2',
    color: 'blue'
  },{
    name: 'Label 3',
    color: 'green'
  },{
    name: 'Label 4',
    color: 'yellow'
  }]
  listLabelSelected: any[] = []

  // A method to handle the Create button click
  createLabel() {
    // Implement logic to create the group label
    console.log('Create label:', this.newLabelName);
    //  This could be a call to an API to create the label on the server.
  }

  // A method to handle the Cancel button click
  cancel() {
    // Implement logic to close the window
  }

  remove(label: any): void {
    const index = this.listLabelSelected.indexOf(label);
    if (index >= 0) {
      this.listLabelSelected.splice(index, 1);
      this.labelSelected.setValue(this.listLabelSelected);

      // this.todoService.removeAssignee(this.data.item.id, assignee).subscribe(
      //   data => {
      //     this.assignees.splice(index, 1);
      //     this.announcer.announce(`Removed ${assignee}`);
      //   })

    }
  }

  selectLabel() {
    this.listLabelSelected = this.labelSelected.value;

  }
}

export interface LabelResponse {
  name: string;
  color: string;
}
