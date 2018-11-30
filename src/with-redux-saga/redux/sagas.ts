import { IAction } from './types';
import Api from '../api/index';
import {} from 'redux-saga';
import { call, takeEvery, put ,fork} from 'redux-saga/effects';
import { ActionTypes } from './actions';

function* createTodo(action: IAction & { text: string }): IterableIterator<any> {
	const todo = yield call(Api.createTodo, action.text);
	yield put({ type: ActionTypes.ADD_TODO, todo });
}

export default function* rootSaga(): IterableIterator<any> {
	yield takeEvery(ActionTypes.CREATE_TODO, createTodo);
}
