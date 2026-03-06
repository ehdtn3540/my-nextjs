import styles from "@/styles/jsonplaceholder.module.css";

export default function JsonCard({ item, title }: { item: any; title: string }) {
  return (
    <div className={styles.card}>
      <div style={{ marginBottom: "10px" }}>
        <span className={styles.badge}>{title === "Users" ? "User" : `ID: ${item.id}`}</span>
      </div>
      <h3 className={styles.cardTitle}>{item.title || item.name}</h3>
      <p className={styles.cardBody}>
        {item.body || item.email || (item.address && `${item.address.city}, ${item.company.name}`)}
      </p>
      {item.email && title === "Comments" && (
        <div className={styles.cardFooter}>From: {item.email}</div>
      )}
    </div>
  );
}
