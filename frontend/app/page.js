"use client";  // Adicione essa linha para marcar este componente como cliente

import { useState, useEffect } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    // Use a variável de ambiente para o URL do backend
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    fetch(`${backendUrl}/tasks`)
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  const addTask = async () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTask })
    });
    const task = await res.json();
    setTasks([...tasks, task]);
    setNewTask('');
  };

  return (
    <div>
      <h1>Task List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New task"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}
