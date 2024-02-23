import {StateModel} from "./state.model";
import {PriorityModel} from "./priority.model";
import {Timestamp} from "rxjs";
import {TaskModel} from "./task.model";
import {AssigneeModel} from "./assignee.model";
export interface Todo {
    id : number,
    title : string,
    description : string,
    order: number,
    state: StateModel,
    priority: PriorityModel,
    userId: number,
    estimation: Timestamp<Date>,
    task: [TaskModel]
    assignee: [AssigneeModel]
}
