import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, fetchTodos, toggleTodo } from '../../redux/slices/todosSlice';
import type { RootState } from '../../redux/store';

export default function TodoPage() {
  const dispatch = useDispatch<any>();
  const { items, loading, error } = useSelector((s: RootState) => s.todos);
  const [title, setTitle] = useState('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const onAdd = async () => {
    if (!title.trim()) return;
    await dispatch(addTodo({ title: title.trim() }));
    setTitle('');
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Todos</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={onAdd}>
          Add
        </button>
      </div>

      {loading && <p>Loading…</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      <ul className="space-y-2">
        {items.map(t => (
          <li key={t._id} className="flex items-center justify-between border rounded px-3 py-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => dispatch(toggleTodo({ id: t._id, completed: !t.completed }))}
              />
              <span className={t.completed ? 'line-through text-gray-500' : ''}>{t.title}</span>
            </label>
            <button
              className="text-sm text-white bg-red-600 rounded px-2 py-1"
              onClick={() => dispatch(deleteTodo({ id: t._id }))}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
