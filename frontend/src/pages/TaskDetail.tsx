import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTask } from "src/api/tasks";
import { Button, Page, TaskForm, UserTag } from "src/components";
import styles from "src/pages/TaskDetail.module.css";

import type { Task } from "src/api/tasks";

export function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [errorModalMessage, setErrorModalMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;
    getTask(id)
      .then((result) => {
        if (result.success) {
          setTask(result.data);
        } else {
          setErrorModalMessage(result.error);
        }
      })
      .catch(setErrorModalMessage);
  }, [id]);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // sets document title when task is loaded
  useEffect(() => {
    if (task) {
      document.title = `${task.title} | TSE Todos`;
    }
  }, [task]);

  if (!task) {
    return (
      <Page>
        <title>Error</title>
        <p>This task doesn't exist!</p>
      </Page>
    );
  }
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date(task.dateCreated));

  if (!isEditing) {
    return (
      <Page>
        <title>{task.title} | TSE Todos</title>
        <div className={styles.pageContent}>
          <Link to="/">Back to home</Link>
          <span className={styles.headerBar}>
            <h2 className={styles.title}>{task.title}</h2>
            <Button label="Edit Task" onClick={toggleEdit} />
          </span>
          <span>
            <p className={styles.description}>{task.description}</p>
          </span>
          <span>
            <p className={styles.barHead}>Assignee</p>
            <UserTag user={task.assignee} />
          </span>
          <span>
            <p className={styles.barHead}>Status</p>
            <p className={styles.barContent}>{task.isChecked ? "Done" : "Not done"}</p>
          </span>
          <span>
            <p className={styles.barHead}>Date created</p>
            <p className={styles.barContent}>{formattedDate}</p>
          </span>
        </div>
      </Page>
    );
  } else {
    return (
      <Page>
        <title>Edit {task.title} | TSE Todos</title>
        <div className={styles.pageContent}>
          <Link to="/">Back to home</Link>
          <TaskForm task={task} onSubmit={toggleEdit} mode="edit" />
        </div>
      </Page>
    );
  }
}
