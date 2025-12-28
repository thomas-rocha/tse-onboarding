import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTask } from "src/api/tasks";
import { Button, Page } from "src/components";
import styles from "src/pages/TaskDetail.module.css";

import type { Task } from "src/api/tasks";

export function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [errorModalMessage, setErrorModalMessage] = useState<string | null>(null);

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

  return (
    <Page>
      <title>{task.title} | TSE Todos</title>
      <div className={styles.pageContent}>
        <Link to="/">Back to home</Link>
        <span className={styles.headerBar}>
          <h2 className={styles.title}>{task.title}</h2>
          <Button label="Edit Task" />
        </span>
        <span>
          <p className={styles.description}>{task.description}</p>
        </span>
        <span>
          <p className={styles.barHead}>Assignee</p>
          <img src={task.assignee?.profilePictureURL}></img>
          <p className={styles.barContent}>{task.assignee?.name}</p>
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
}
