export interface IAction{
  type:string; 
  [key:string]:any;
}

export interface IState {
	todos: ITodo[];
	filter: FilterType;
}

export interface ITodo {
	text: string;
	completed: boolean;
}

export type FilterType = 'ALL' | 'COMPLETED' | 'UNCOMPLETED';