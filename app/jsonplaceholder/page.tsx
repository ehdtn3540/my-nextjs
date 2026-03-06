import JsonPlaceHolderAPI from "@/components/JsonPlaceHolderAPI";
import styles from "@/styles/jsonplaceholder.module.css";

export default function TestPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>API Dashboard</h1>
        <p className={styles.subtitle}>FastAPI 연결 테스트 페이지</p>
      </header>

      <JsonPlaceHolderAPI title="Posts" endpoint="http://localhost:8000/jsonplaceholder/posts" />
      <JsonPlaceHolderAPI title="Comments" endpoint="http://localhost:8000/jsonplaceholder/comments" />
      <JsonPlaceHolderAPI title="Users" endpoint="http://localhost:8000/jsonplaceholder/users" />
    </div>
  );
}

