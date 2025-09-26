import { useEffect } from "react";
import type { Task } from "../hooks/useTasks";  

type Props = {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

function TimerManager({ setTasks }: Props) {
  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((tasks) => 
        tasks.map((t) =>
          t.running && t.remaining > 0
            ? { ...t, remaining: t.remaining - 1 }
            : t
        )
      );
    }, 1000); //works every 1000ms (1 sec)

    return () => clearInterval(interval);
  }, [setTasks]);

  return null; // this component doesn’t render UI
}

export default TimerManager;
