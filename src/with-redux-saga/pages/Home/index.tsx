import React, { ReactNode } from "react";
import { connect } from "react-redux";
import { FilterType, ITodo, IState } from "@/with-redux-saga/redux/types";
import Todo from "@/with-redux-saga/components/Todo";
import { filter, createTodo } from "@/with-redux-saga/redux/actions";
import "./index.scss";

interface Props {
  todos: ITodo[];
  filter: FilterType;
  doFilter: typeof filter;
  createTodo: typeof createTodo;
}

class Home extends React.Component<Props> {
  state = { text: "" };

  render() {
    return (
      <div className="HomeContainer">
        <div className={"filter"}>
          <button onClick={() => this.props.doFilter("ALL")}>ALL</button>
          <button onClick={() => this.props.doFilter("COMPLETED")}>
            COMPLETED
          </button>
          <button onClick={() => this.props.doFilter("UNCOMPLETED")}>
            UNCOMPLETED
          </button>
        </div>
        {this.props.todos.length === 0 ? (
          <div>There is no todo. </div>
        ) : (
          <ul>
            {this.props.todos
              .map((todo, index): [ITodo, number] => [todo, index])
              .filter(([todo]) => {
                switch (this.props.filter) {
                  case "ALL":
                    return true;
                  case "COMPLETED":
                    return todo.completed;
                  default:
                    return !todo.completed;
                }
              })
              .map(([todo, index]) => (
                <li key={index}>
                  <Todo todo={todo} index={index} />
                </li>
              ))}
          </ul>
        )}
        <div>
          <input
            value={this.state.text}
            onChange={(e: any) =>
              this.setState({ ...this.state, text: e.target.value })
            }
          />
          <button
            onClick={() => {
              this.props.createTodo(this.state.text);
              this.setState({ ...this.state, text: "" });
            }}
          >
            ADD
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  (state: IState) => state,
  {
    doFilter: filter,
    createTodo: createTodo
  }
)(Home);
