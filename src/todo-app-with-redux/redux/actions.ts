import { ITodo, IAction, FilterType } from "./types";

export namespace ActionTypes {
  export const ADD_TODO = "ADD_TODO";
  export const COMPLETE_TODO = "COMPLETE_TODO";
  export const FILTER = "FILTER";
}

export function addTodo(text: string): IAction {
  return {
    type: ActionTypes.ADD_TODO,
    text
  };
}

export function completeTodo(index: number): IAction {
  return {
    type: ActionTypes.COMPLETE_TODO,
    index
  };
}

export function filter(filterType: FilterType): IAction {
  return {
    type: ActionTypes.FILTER,
    filterType
  };
}
