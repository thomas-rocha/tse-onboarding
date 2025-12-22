import React from "react";
import { CheckButton } from "src/components";
import styles from "src/components/TaskItem.module.css";

import type { Task } from "src/api/tasks";

export type TaskItemProps = {
  task: Task;
};

export function TaskItem({ task }: TaskItemProps) {
  let wrapperClass = styles.item;
  if (task.isChecked) {
    wrapperClass += ` ${styles.checked}`;
  }
  return (
    <div className={wrapperClass}>
      {<CheckButton checked={task.isChecked} />}
      <div className={styles.textContainer}>
        <span className={styles.title}>{task.title}</span>
        {task.description && <span className={styles.description}>{task.description}</span>}
      </div>
    </div>
  );
}
