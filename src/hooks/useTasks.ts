import { useState, useEffect } from "react";

export type Task = {
  id: number;
  text: string;
  completed: boolean;
  duration: number;   
  remaining: number;  
  running: boolean;
};

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });


  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]); //convert to text and save to localStorage


  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now(),
      text:text,
      completed: false,
      duration: 25,
      remaining: 25 * 60,
      running: false,
    };
    setTasks([...tasks, newTask]);
  };

  //check if id is correct, and do some operations
  const updateDuration = (id: number, minutes: number) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, duration: minutes, remaining: minutes * 60 } : t
    ));
  };

  const startTask = (id: number) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, running: true } : t)));
  };

  const cancelTask = (id: number) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, running: false, remaining: t.duration * 60 } : t
    ));
  };

  const completeTask = (id: number) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, running: false, completed: true } : t
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(t => !t.completed));
  };

  return {
    tasks,
    setTasks, 
    addTask,
    updateDuration,
    startTask,
    cancelTask,
    completeTask,
    deleteTask,
    clearCompleted,
  };
}
