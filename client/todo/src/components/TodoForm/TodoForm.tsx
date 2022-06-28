import React, { ChangeEvent, FormEvent, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createTodo, showAlert } from "../../redux/actions"
import { IAlertReducer } from "../../types/types"
import { Alert } from "../Alert/Alert"


export const TodoForm = () => {
   const [title, setTitle] = useState('')
   const ref = useRef<any>()

   const alertState = useSelector((state: IAlertReducer) => state.alertReducer)
   const dispatch = useDispatch()

   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()


      if (!title.trim()) {
         dispatch(showAlert('Task name cannot be empty', 'warning'))
         return
      }

      dispatch(createTodo(title))
      setTitle('')
      ref.current.value = ''

   }

   const handleChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value)
   }


   return (
      <form onSubmit={handleSubmit} >
         {alertState.alertText.length > 0 && <Alert props={alertState} />}
         <div className="mb-3 d-flex align-items-end justify-content-between">
            <div className="form-group" style={{ width: '92%', marginRight: '10px' }}>
               <label htmlFor="" className="form-label">Add new task</label>
               <input
                  onChange={handleChangeInputValue}
                  ref={ref}
                  type="text"
                  className="form-control"
               />
            </div>
            <button className="btn btn-dark">create</button>
         </div>
      </form>
   )
}
