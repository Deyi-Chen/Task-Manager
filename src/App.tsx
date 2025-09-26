import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import TaskActions from "./components/TaskActions";
import TimerManager from "./components/TimerManager";
import { useTasks } from "./hooks/useTasks";

//Custom hook-where the logic present
function App() {
  const {
    tasks,
    setTasks,
    addTask,
    updateDuration,
    startTask,
    cancelTask,
    completeTask,
    deleteTask,
    clearCompleted,
  } = useTasks();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Task Manager</h1>

        <TaskInput onAdd={addTask} />

        <TaskList
          title="To-Do"
          tasks={tasks.filter(t => !t.completed)}
          onStart={startTask}
          onCancel={cancelTask}
          onComplete={completeTask}
          onUpdateDuration={updateDuration}
          onDelete={deleteTask}
        />

        <TaskList
          title="Completed"
          tasks={tasks.filter(t => t.completed)}
          onStart={startTask}
          onCancel={cancelTask}
          onComplete={completeTask}
          onUpdateDuration={updateDuration}
          onDelete={deleteTask}
        />

        <TaskActions onClearCompleted={clearCompleted} />

        {/*timer*/}
        <TimerManager setTasks={setTasks} />
      </div>
    </div>
  );
}

export default App;
