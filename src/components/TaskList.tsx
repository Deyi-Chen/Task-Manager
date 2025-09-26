import type { Task } from "../hooks/useTasks"; 
import TaskItem from "./TaskItem";

type Props = {
  title: string;
  tasks: Task[];
  onStart: (id: number) => void;
  onCancel: (id: number) => void;
  onComplete: (id: number) => void;
  onUpdateDuration: (id: number, minutes: number) => void;
  onDelete: (id: number) => void;   
};

//Title and list of TaskItem is shown here
function TaskList({ title, tasks, onStart, onCancel, onComplete, onUpdateDuration, onDelete }: Props) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold mb-3">{title}</h2>
      <div className="space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onStart={onStart}
              onCancel={onCancel}
              onComplete={onComplete}
              onUpdateDuration={onUpdateDuration}
              onDelete={onDelete}   
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm">Nothing here yet</p>
        )}
      </div>
    </div>
  );
}


export default TaskList;
