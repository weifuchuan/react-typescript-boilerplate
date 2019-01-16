import React, {
  ComponentType,
  FunctionComponent,
  ReactElement,
  ReactNode
} from "react";
import { connect } from "react-redux";
import { completeTodo } from "@/todo-app-with-redux/redux/actions";
import { IAction, ITodo } from "@/todo-app-with-redux/redux/types";
import "./Todo.less";

interface Props {
  todo: ITodo;
  index: number;
}

interface InjectedProps {
  complete: typeof completeTodo;
}

const Todo: FunctionComponent<Props & InjectedProps> = props => {
  return (
    <div className={"todo"}>
      <span>{props.todo.text}</span>
      {props.todo.completed ? (
        <span>completed</span>
      ) : (
        <button onClick={() => props.complete(props.index)}>complete</button>
      )}
    </div>
  );
};

export default connect(
  null,
  { complete: completeTodo }
)(Todo);