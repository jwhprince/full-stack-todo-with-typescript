import { call, Effect, put, takeEvery } from 'redux-saga/effects'
import { TodoApi } from '../../api';
import { ICreateAction, ITodo, ITodoActionTypes } from "../../types/types";

function* sagaCreateTodo(action: ICreateAction): Generator<Effect, void> {
    try {
        const todoObject: Partial<ITodo> = {
            title: action.payload,
            done: false
           }
           
           const todo = yield call(TodoApi.createTodo, todoObject)

           yield put({ type: ITodoActionTypes.CREATE_TODO_SUCCESS, payload: todo})
    } catch (error) {
        console.log('error', error);
    }
}

export function* sagaWatcher(): Generator<Effect, void> {
    yield takeEvery(ITodoActionTypes.CREATE_TODO, sagaCreateTodo)
}
