import {UserModel} from "./user.model";

export class AssigneeModel {
  constructor(
    public user: UserModel,
    public permissionAccess: number
  ) {
  }
}
