import { Header } from './components/Header/Header';
import { TodoForm } from './components/TodoForm/TodoForm';
import './App.css';

function App() {
  return (
    <>
     <Header />
     <main>
      <section>
        <div className="container pt-3">
           <TodoForm />
           <h2 className='pt-3'> Новые дела </h2>
        </div>
      </section>
     </main>
    </>
  );
}

export default App;
