export const TodoForm = () => {
    return (
    <form className="mb-3 d-flex align-items-end justify-content-between">
         <div className="form-group" style={{width: '92%', marginRight: '10px'}}>
           <label htmlFor="" className="form-label">Введите название дела</label>
           <input 
               type="text"
               className="form-control"
            />
         </div>
            <button className="btn btn-dark">создать</button>
    </form>
    )
}
