import { ITodo } from "../../types/types";
import './styles.css'

interface ITodoProps {
    todo: ITodo;
    deleteTodo: (arg0: string) => void;
    doneTodo: (arg0: string, arg1: boolean) => void;
}

export const TodoItem = ({ todo, deleteTodo, doneTodo }: ITodoProps) => {
    const handleDelete = () => deleteTodo(todo.id) 
    const handleComplete = () => doneTodo(todo.id, !todo.done)

    return (
        <li className={
            `list-group-item d-flex justify-content-between align-items-center
            ${todo.done ? 'list-group-item-success' : ''}`
            }>
            <div className="">
               <span className={`${todo.done ? 'title-done' : ''}`}>{todo.title}</span>
            </div>
            <div>
                <button style={{ marginRight: '10px' }} className="btn btn-primary">Изменить</button>
                <button onClick={handleComplete} style={{ marginRight: '10px' }}  className="btn btn-success">Завершить</button>
                <button onClick={ handleDelete } className="btn btn-danger">Удалить</button>
            </div>
        </li>
    )
}
