import styles from './SkeletonCard.module.css';

export default function SkeletonCard() {
  return (
    <div className={styles.card} aria-hidden="true">
      <div className={styles.badges}>
        <div className={`${styles.skel} ${styles.badge}`} />
      </div>
      <div className={styles.body}>
        <div className={`${styles.skel} ${styles.logo}`} />
        <div className={styles.info}>
          <div className={`${styles.skel} ${styles.title}`} />
          <div className={`${styles.skel} ${styles.company}`} />
        </div>
      </div>
      <div className={styles.meta}>
        <div className={`${styles.skel} ${styles.chip}`} />
        <div className={`${styles.skel} ${styles.chip}`} />
        <div className={`${styles.skel} ${styles.chipSm}`} />
      </div>
      <div className={styles.divider} />
      <div className={styles.footer}>
        <div className={styles.footerLeft}>
          <div className={`${styles.skel} ${styles.footerLine}`} />
          <div className={`${styles.skel} ${styles.footerLineSmall}`} />
        </div>
        <div className={`${styles.skel} ${styles.btn}`} />
      </div>
    </div>
  );
}
