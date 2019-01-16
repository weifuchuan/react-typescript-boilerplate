import React from "react";
import { connect } from "react-redux";
import { completeTodo } from "@/with-redux-saga/redux/actions";
import { ITodo } from "@/with-redux-saga/redux/types";
import "./Todo.less";

function Todo(props: {
  complete: typeof completeTodo;
  todo: ITodo;
  index: number;
}) {
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
}

export default connect(
  null,
  { complete: completeTodo }
)(Todo);
