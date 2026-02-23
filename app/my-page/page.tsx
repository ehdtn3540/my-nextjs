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
          <textarea
            readOnly // 사용자가 직접 수정하지 못하게 읽기 전용으로 설정
            value={JSON.stringify(data, null, 2)}
            style={{
              marginTop: "20px",
              width: "100%",      // 가로 너비를 꽉 채움
              height: "200px",     // 기본 높이 설정
              background: "#f4f4f4",
              padding: "10px",
              border: "1px solid #ccc",
              fontFamily: "monospace", // JSON 데이터를 보기 좋게 고정폭 글꼴 사용
              resize: "vertical"   // 사용자가 세로로 크기를 조절할 수 있게 허용
            }}
          />
      )}
    </div>
  );
}

// 2. 메인 페이지에서 사용
export default function TestPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>FastAPI 연결 테스트</h1>
      <ApiTester title="Test" endpoint="http://localhost:8000/api/test" />
      
      <h1>JsonPlaceHolder API</h1>
      {/* 전체 게시글 */}
      <ApiTester title="Posts" endpoint="http://localhost:8000/api/posts" />
      {/* 전체 댓글 */}
      <ApiTester title="Comments" endpoint="http://localhost:8000/api/comments" />
    </div>
  );
}
