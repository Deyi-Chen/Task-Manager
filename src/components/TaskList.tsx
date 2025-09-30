import type { Task } from "../hooks/useTasks";
import TaskItem from "./TaskItem";

type Props = {
  title: string;
  tasks: Task[];
  onStart: (id: string) => void;
  onCancel: (id: string) => void;
  onComplete: (id: string) => void;
  onUpdateDuration: (id: string, minutes: number) => void;
  onDelete: (id: string) => void;
};

function TaskList({ title, tasks, onStart, onCancel, onComplete, onUpdateDuration, onDelete }: Props) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold mb-3">{title}</h2>
      <div className="space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem
              key={task._id}
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
