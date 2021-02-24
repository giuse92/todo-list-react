import './App.css';
import AggiungiTodo from './components/AggiungiTodo';
import ListaTodos from './components/ListaTodos';

function App() {
  return (
    <div className="d-flex flex-column mx-auto" style={{width: "45%"}}>
      <AggiungiTodo />
      <ListaTodos />
    </div>
  );
}

export default App;
