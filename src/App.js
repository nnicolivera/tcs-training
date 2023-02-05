import './App.css';
import { Routes, Route } from "react-router-dom"
import Login from './containers/Login/Login'
import Home from './containers/Home/Home'
import TodoForm from './containers/TodoForm/TodoForm'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="todoform" element={<TodoForm />} />
      </Routes>
    </div>
  );
}

export default App;
