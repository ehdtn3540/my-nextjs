"use client";

import { useState } from "react";

// 1. 공통 컴포넌트 정의
function ApiTester({ title, endpoint }: { title: string; endpoint: string }) {
  const [data, setData] = useState<any>(null);

  const checkConnection = async () => {
    try {
      const response = await fetch(endpoint);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('${title} 연결 실패:', error);
      setData({ status: "error", message: "백엔드 서버를 확인하세요." });
    }
  };

  return (
    <div style={{ marginBottom: "40px", borderBottom: "1px solid #ddd", pb: "20px" }}>
      <h2>{title}</h2>
      <button onClick={checkConnection}>{title} 응답 받기</button>
      {data && (
        <pre style={{ marginTop: "20px", background: "#f4f4f4", padding: "10px" }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}

// 2. 메인 페이지에서 사용
export default function TestPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>연결 테스트 페이지</h1>
      
      {/* 기존 API */}
      <ApiTester title="테스트 API" endpoint="http://localhost:8000/api/test" />
      
      {/* 새로운 API (여기에 추가) */}
      <ApiTester title="jsonplaceholder API" endpoint="http://localhost:8000/api/jsonplaceholder" />
    </div>
  );
}
