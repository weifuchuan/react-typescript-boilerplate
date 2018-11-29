import React, { ReactNode } from 'react';
import './index.scss';
import { connect } from 'react-redux';
import { FilterType, ITodo, IState } from '@/todo-app-with-redux/redux/types';
import Todo from '@/todo-app-with-redux/components/Todo';
import { filter, addTodo } from '@/todo-app-with-redux/redux/actions';

interface Props {
	todos: ITodo[];
	filter: FilterType;
	doFilter: typeof filter;
	addTodo: typeof addTodo;
}

class Home extends React.Component<Props> {
	state = { text: '' };

	render() {
		return (
			<div className="HomeContainer">
				<div className={'filter'}>
					<button onClick={() => this.props.doFilter('ALL')}>ALL</button>
					<button onClick={() => this.props.doFilter('COMPLETED')}>COMPLETED</button>
					<button onClick={() => this.props.doFilter('UNCOMPLETED')}>UNCOMPLETED</button>
				</div>
				{this.props.todos.length === 0 ? (
					<div>There is no todo. </div>
				) : (
					<ul>
						{this.props.todos
							.map((todo, index): [ITodo, number] => [ todo, index ])
							.filter(([ todo ]) => {
								switch (this.props.filter) {
									case 'ALL':
										return true;
									case 'COMPLETED':
										return todo.completed;
									default:
										return !todo.completed;
								}
							})
							.map(([ todo, index ]) => (
								<li key={index}>
									<Todo todo={todo} index={index} />
								</li>
							))}
					</ul>
				)}
				<div>
					<input
						value={this.state.text}
						onChange={(e: any) => this.setState({ ...this.state, text: e.target.value })}
					/>
					<button
						onClick={() => {
							this.props.addTodo(this.state.text);
							this.setState({ ...this.state, text: '' });
						}}
					>
						ADD
					</button>
				</div>
			</div>
		);
	}
}

export default connect((state: IState) => state, {
	doFilter: filter,
	addTodo: addTodo
})(Home);
