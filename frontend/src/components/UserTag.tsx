import styles from "src/components/UserTag.module.css";

import type { User } from "src/api/users";

export function UserTag(user: User | undefined) {
  if (!user) {
    return <></>;
  }
  if (user.name) {
    const picture = user.profilePictureURL ? user.profilePictureURL : "/userDefault.svg";
    return (
      <div className={styles.userTag}>
        <img src={picture} className={styles.userTagImage}></img>
        <p className={styles.userTagName}>{user.name}</p>
      </div>
    );
  } else {
    return (
      <div className={styles.userTag}>
        <p className={styles.userTagName}>Not assigned</p>
      </div>
    );
  }
}
