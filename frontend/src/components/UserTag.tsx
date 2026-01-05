import styles from "src/components/UserTag.module.css";

import type { User } from "src/api/users";

export function UserTag({ user }: { user: User | undefined }) {
  if (!user || !user.name) {
    return (
      <div className={styles.userTag}>
        <p className={styles.userTagName}>Not assigned</p>
      </div>
    );
  } else {
    const picture = user.profilePictureURL ? user.profilePictureURL : "/userDefault.svg";
    return (
      <div className={styles.userTag}>
        <img src={picture} className={styles.userTagImage}></img>
        <p className={styles.userTagName}>{user.name}</p>
      </div>
    );
  }
}
