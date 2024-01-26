import {StateModel} from "./state.model";
import {PriorityModel} from "./priority.model";
import {Timestamp} from "rxjs";
import {AssigneeModel} from "./assignee.model";

export interface TaskModel {
  id:number,
  title : string,
  description : string,
  order: number,
  state: StateModel,
  priority: PriorityModel,
  estimation: Timestamp<any>,
  assignee: [AssigneeModel]

}
