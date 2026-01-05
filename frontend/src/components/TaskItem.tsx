import { Dialog } from "@tritonse/tse-constellation";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { updateTask } from "src/api/tasks";
import { CheckButton, UserTag } from "src/components";
import styles from "src/components/TaskItem.module.css";

import type { Task } from "src/api/tasks";

export type TaskItemProps = {
  task: Task;
};

export function TaskItem({ task: initialTask }: TaskItemProps) {
  const [task, setTask] = useState<Task>(initialTask);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errorModalMessage, setErrorModalMessage] = useState<string | null>(null);

  const handleToggleCheck = () => {
    setLoading(true);
    updateTask({
      ...task,
      isChecked: !task.isChecked,
      assignee: task.assignee ? task.assignee._id : undefined,
    })
      .then((result) => {
        if (result.success) {
          setTask(result.data);
        } else {
          setErrorModalMessage("An error occurred");
        }
        setLoading(false);
      })
      .catch(setErrorModalMessage);
  };
  const link = `/task/${task._id}`;

  let wrapperClass = styles.item;
  if (task.isChecked) {
    wrapperClass += ` ${styles.checked}`;
  }
  return (
    <div className={wrapperClass}>
      {<CheckButton checked={task.isChecked} onPress={handleToggleCheck} disabled={isLoading} />}
      <div className={styles.textContainer}>
        <Link to={link}>
          <span className={styles.title}>{task.title}</span>
        </Link>
        {task.description && <span className={styles.description}>{task.description}</span>}
      </div>
      <UserTag user={task.assignee} />
      <Dialog
        styleVersion="styled"
        variant="error"
        title="An error occurred"
        content={<p>{errorModalMessage}</p>}
        isOpen={errorModalMessage !== null}
        onClose={() => setErrorModalMessage(null)}
      />
    </div>
  );
}
