import type { Task } from "../hooks/useTasks";

type Props = {
  task: Task;
  onStart: (id: string) => void;
  onCancel: (id: string) => void;
  onComplete: (id: string) => void;
  onUpdateDuration: (id: string, minutes: number) => void;
  onDelete: (id: string) => void;
};

function TaskItem({ task, onStart, onCancel, onComplete, onUpdateDuration, onDelete }: Props) {
  const minutes = Math.floor(task.remaining / 60);
  const seconds = task.remaining % 60;

  return (
    <div className="flex items-center justify-between p-4 rounded-lg shadow-md bg-gradient-to-r from-pink-200 to-blue-200">
      <div>
        <h3 className="font-semibold text-gray-800">{task.text}</h3>

        {!task.running && !task.completed && (
          <input
            type="number"
            min={1}
            value={task.duration}
            onChange={(e) => onUpdateDuration(task._id, Number(e.target.value))}
            className="w-16 border rounded px-1 text-sm text-gray-700"
          />
        )}

        <p className="text-sm text-gray-600">
          {minutes}:{seconds.toString().padStart(2, "0")}
        </p>
      </div>

      <div className="flex gap-2">
        {!task.completed && !task.running && (
          <button
            onClick={() => onStart(task._id)}
            className="px-3 py-1 rounded bg-blue-600 text-white"
          >
            Start
          </button>
        )}
        {task.running && (
          <button
            onClick={() => onCancel(task._id)}
            className="px-3 py-1 rounded bg-red-500 text-white"
          >
            Cancel
          </button>
        )}
        {!task.completed && (
          <button
            onClick={() => onComplete(task._id)}
            className="px-3 py-1 rounded bg-green-500 text-white"
          >
            Complete
          </button>
        )}
        {task.completed && (
          <>
            <span className="px-3 py-1 rounded bg-gray-300 text-gray-600">Done</span>
            <button
              onClick={() => onDelete(task._id)}
              className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskItem;
