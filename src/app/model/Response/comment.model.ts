import {UserModel} from "./user.model";

export interface CommentModel {
  id: string;
  content: string;
  createdAt: string;
  user: UserModel;
}
