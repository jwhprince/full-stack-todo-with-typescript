import { call, Effect, put, takeEvery } from 'redux-saga/effects'
import { TodoApi } from '../../api';
import { ICompleteAction, ICreateAction, IDeleteAction, IEditAction, ITodo, ITodoActionTypes } from "../../types/types";
import { hideAlert, showAlert } from '../actions';

const delay = (time: number) => new Promise(resolve => setTimeout(resolve, time))

function* sagaGetTodos(): Generator<Effect, void, ITodo[]> {
    try {
        
           
           const todos = yield call(TodoApi.getTodos)

           yield put({ type: ITodoActionTypes.GET_TODOS_SUCCESS, payload: todos})
           yield put(showAlert('Tasks have been successfully uploaded', 'success'))
           yield call(delay, 4000) 
           yield put(hideAlert())
    } catch (error) {
        yield put(showAlert(`Failed to load tasks: ${error}`, 'warning'));
    }
}

function* sagaCreateTodo(action: ICreateAction): Generator<Effect, void> {
    try {
        const todoObject: Partial<ITodo> = {
            title: action.payload,
            done: false
           }
           
           const todo = yield call(TodoApi.createTodo, todoObject)

           yield put({ type: ITodoActionTypes.CREATE_TODO_SUCCESS, payload: todo})
           yield put(showAlert('Task created successfully', 'success'))
           yield call(delay, 4000) 
           yield put(hideAlert())
    } catch (error) {
        yield put(showAlert(`Failed to create task: ${error}`, 'warning'));
    }
}

function* sagaDeleteTodo(action: IDeleteAction): Generator<Effect, void> {
    try {
       
           
           yield call(TodoApi.deleteTodo, action.payload)

           yield put({ type: ITodoActionTypes.DELETE_TODO_SUCCESS, payload: action.payload})
           yield put(showAlert('Task deleted successfully', 'success'))
           yield call(delay, 4000) 
           yield put(hideAlert())
    } catch (error) {
        yield put(showAlert(`Failed to delete task: ${error}`, 'warning'));
    }
}

function* sagaCompleteTodo(action: ICompleteAction<ITodo>): Generator<Effect, void> {
    try {
        const todoObject: Partial<ITodo> = {
            
            done: action.payload.done,
            id: action.payload.id
           }
           
           yield call(TodoApi.completeTodo, todoObject)

           yield put({ type: ITodoActionTypes.COMPLETE_TODO_SUCCESS, payload: action.payload.id})
           yield put(showAlert(`Task successfully ${action.payload.done ? 'completed' : 'reopen'} `, 'success'))
           yield call(delay, 4000) 
           yield put(hideAlert())
    } catch (error) {
        yield put(showAlert(`Failed to complete task: ${error}`, 'warning'));
    }
}

function* sagaEditTodo(action: IEditAction): Generator<Effect, void, ITodo> {
    try {
        const todoObject: Partial<ITodo> = {
            
            done: action.payload.done,
            id: action.payload.id,
            title: action.payload.title
           }
           
           const todo = yield call(TodoApi.editTodo, todoObject)

           yield put({ type: ITodoActionTypes.EDIT_TODO_SUCCESS, payload: todo, id: action.payload.id})
           yield put(showAlert('Task changed successfully', 'success'))
           yield call(delay, 4000) 
           yield put(hideAlert())
    } catch (error) {
        yield put(showAlert(`Failed to complete task: ${error}`, 'warning'));
    }
}

export function* sagaWatcher(): Generator<Effect, void> {
    yield takeEvery(ITodoActionTypes.CREATE_TODO, sagaCreateTodo)
    yield takeEvery(ITodoActionTypes.DELETE_TODO, sagaDeleteTodo)
    yield takeEvery(ITodoActionTypes.GET_TODOS, sagaGetTodos)
    yield takeEvery(ITodoActionTypes.COMPLETE_TODO, sagaCompleteTodo)
    yield takeEvery(ITodoActionTypes.EDIT_TODO, sagaEditTodo)
   
}
