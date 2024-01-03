import React, { useState } from "react";
import { Task, updateTask } from "src/api/tasks";
import { CheckButton } from "src/components";
import styles from "src/components/TaskItem.module.css";

export interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task: initialTask }: TaskItemProps) {
  const [task, setTask] = useState<Task>(initialTask);
  const [isLoading, setLoading] = useState<boolean>(false);

  // handleToggleCheck: set isLoading to true by calling setLoading, then call the updateTask function
  // Pass in the task state variable, with the value of isChecked flipped.
  const handleToggleCheck = () => {
    // your code here
    console.log("handleToggleCheck");
    setLoading(true);
    updateTask({ ...task, isChecked: !task.isChecked }).then((result) => {
      if (result.success) {
        console.log("result.data:");
        console.log(result.data);
        setTask(result.data);
      } else {
        alert(result.error);
      }
      setLoading(false);
    });
  };

  let style = styles.textContainer;
  if (task.isChecked) {
    style = styles.textContainer + " " + styles.checked;
  }

  return (
    <div className={styles.item}>
      {<CheckButton checked={task.isChecked} disabled={isLoading} onPress={handleToggleCheck} />}
      <div className={style}>
        <span className={styles.title}>{task.title}</span>
        {task.description && <span className={styles.description}>{task.description}</span>}
      </div>
    </div>
  );
}
