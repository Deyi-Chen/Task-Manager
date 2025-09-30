import { useState, useEffect } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTaskById,
  clearCompletedTasksFromServer,
} from "../api"; 

export type Task = {
  _id: string;
  text: string;
  completed: boolean;
  duration: number;
  remaining: number;
  running: boolean;
};

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

// Fetch tasks from backend on load
  useEffect(() => {
    getTasks().then(setTasks).catch(console.error);
  }, []);

  const addTask = async (text: string) => {
    const newTask = {
      text,
      completed: false,
      duration: 25,
      remaining: 25 * 60,
      running: false,
    };
    const created = await createTask(newTask);
    setTasks([...tasks, created]);
  };

  const updateDuration = async (id: string, minutes: number) => {
    const updated = await updateTask(id, {
      duration: minutes,
      remaining: minutes * 60,
    });
    setTasks(tasks.map(t => (t._id === id ? updated : t)));
  };

  const startTask = async (id: string) => {
    const updated = await updateTask(id, { running: true });
    setTasks(tasks.map(t => (t._id === id ? updated : t)));
  };

  const cancelTask = async (id: string) => {
    const task = tasks.find(t => t._id === id);
    if (!task) return;
    const updated = await updateTask(id, {
      running: false,
      remaining: task.duration * 60,
    });
    setTasks(tasks.map(t => (t._id === id ? updated : t)));
  };

  const completeTask = async (id: string) => {
    const updated = await updateTask(id, {
      running: false,
      completed: true,
    });
    setTasks(tasks.map(t => (t._id === id ? updated : t)));
  };

  const deleteTask = async (id: string) => {
    await deleteTaskById(id);
    setTasks(tasks.filter(t => t._id !== id));
  };

  const clearCompleted = async () => {
    await clearCompletedTasksFromServer();
    setTasks(tasks.filter(t => !t.completed));
  };

  return {
    tasks,
    setTasks, // probably used by your TimerManager
    addTask,
    updateDuration,
    startTask,
    cancelTask,
    completeTask,
    deleteTask,
    clearCompleted,
  };
}
