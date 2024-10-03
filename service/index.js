import { toDoModel } from "../models/to-do-list";

export const getAllToDoList = () => {
  const toDoList = toDoModel.find();
};
