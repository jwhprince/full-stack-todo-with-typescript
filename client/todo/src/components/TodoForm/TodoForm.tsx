import { ChangeEvent, FormEvent, useState } from "react"
import { useDispatch } from "react-redux"
import { createTodo } from "../../redux/actions"


export const TodoForm = () => {
    const [title, setTitle] = useState('')
    const dispatch = useDispatch()
    
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
       event.preventDefault()

       if (!title.trim()) {
         return
       }
       
      
       // @ts-ignore
       dispatch(createTodo(title))
       setTitle('')
    }

    const handleChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }
    
    return (
    <form onSubmit={handleSubmit} className="mb-3 d-flex align-items-end justify-content-between">
         <div className="form-group" style={{width: '92%', marginRight: '10px'}}>
           <label htmlFor="" className="form-label">Введите название дела</label>
           <input
               onChange={handleChangeInputValue} 
               type="text"
               className="form-control"
            />
         </div>
            <button className="btn btn-dark">создать</button>
    </form>
    )
}
