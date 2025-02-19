import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoText(event.target.value);
  };

  const handleAddTodo = () => {
    if (newTodoText.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(), 
        text: newTodoText.trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setNewTodoText('');
    }
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setNewTodoText(todo.text); 
  };

  const handleUpdateTodo = () => {
    if (editingTodo && newTodoText.trim() !== '') {
      const updatedTodos = todos.map((todo) =>
        todo.id === editingTodo.id
          ? { ...todo, text: newTodoText.trim() }
          : todo
      );
      setTodos(updatedTodos);
      setEditingTodo(null);
      setNewTodoText('');
    }
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
    setNewTodoText('');
  };


  return (
    <div>
      <h3>Todo App</h3>
      <input
        type="text"
        value={newTodoText}
        onChange={handleInputChange}
        placeholder="Enter todo"
      />
      {editingTodo ? (
        <>
          <button onClick={handleUpdateTodo}>Update</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </>
      ) : (
        <button onClick={handleAddTodo}>Add</button>
      )}

      <ul>
        {todos.map((todo) => (
          <p key={todo.id}>
            {todo.text}
            <button onClick={() => handleEditTodo(todo)}>Edit</button>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </p>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;