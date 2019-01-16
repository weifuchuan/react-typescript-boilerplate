import { IState, ITodo, IAction, FilterType } from "./types";
import { ActionTypes } from "./actions";

const defaultState: IState = {
  todos: [],
  filter: "ALL"
};

export function todos(
  state: ITodo[] = defaultState.todos,
  action: IAction
): ITodo[] {
  switch (action.type) {
    case ActionTypes.ADD_TODO:
      return [...state, { text: action.text, completed: false }];
    case ActionTypes.COMPLETE_TODO:
      return state.map((todo, index) =>
        index === action.index ? { ...todo, completed: true } : todo
      );
    default:
      return state;
  }
}

export function filter(
  state: FilterType = defaultState.filter,
  action: IAction
): FilterType {
  switch (action.type) {
    case ActionTypes.FILTER:
      return action.filterType;
    default:
      return state;
  }
}
