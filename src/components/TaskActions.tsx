type Props = {
  onClearCompleted: () => void;
};

//button to clear all completed tasks
function TaskActions({ onClearCompleted }: Props) {
  return (
    <div className="mt-6 flex justify-end">
      <button
        onClick={onClearCompleted}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Clear All Completed
      </button>
    </div>
  );
}

export default TaskActions;
