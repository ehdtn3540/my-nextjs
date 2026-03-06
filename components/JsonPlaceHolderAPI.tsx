"use client";
import { useState } from "react";
import JsonCard from "./JsonCard";
import styles from "@/styles/jsonplaceholder.module.css";

export default function JsonPlaceHolderAPI({ title, endpoint }: { title: string; endpoint: string }) {
  const [data, setData] = useState<any[] | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch(endpoint);
      const result = await res.json();
      setData(Array.isArray(result) ? result : [result]);
    } catch (e) {
      setData(null);
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 style={{ fontSize: "24px", margin: 0 }}>{title}</h2>
        <button onClick={fetchData} className={styles.fetchButton}>{title} 불러오기</button>
      </div>
      {data ? (
        <div className={styles.grid}>
          {data.map((item) => <JsonCard key={item.id} item={item} title={title} />)}
        </div>
      ) : (
        <div className={styles.emptyState}>데이터가 없습니다. 버튼을 눌러주세요.</div>
      )}
    </div>
  );
}

