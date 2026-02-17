"use client";

import { useState } from "react";


export default function TestPage() {
  const [data, setData] = useState<any>(null);

  const checkConnection = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/test");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("연결 실패:", error);
      setData({ status: "error", message: "백엔드 서버를 확인하세요." });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>연결 테스트</h1>
      <button onClick={checkConnection}>서버 응답 받기</button>
      {data && (
        <pre style={{ marginTop: "20px", background: "#f4f4f4", padding: "10px" }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
