import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import TodoPage from './features/todos/TodoPage';


export default function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 bg-slate-100">
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/todos">Todos</Link>
      </nav>
      <Routes>
        <Route path="/" element={<div className="p-6">Home</div>} />
        <Route path="/todos" element={<TodoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
