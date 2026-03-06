"use client";

import { useState } from "react";

// 1. 공통 컴포넌트 정의
function JsonPlaceHolderAPI({ title, endpoint }: { title: string; endpoint: string }) {
  const [data, setData] = useState<any[] | null>(null);

  const checkConnection = async () => {
    try {
      const response = await fetch(endpoint);
      const result = await response.json();
      // 데이터가 배열인지 확인 후 저장 (에러 대응)
      setData(Array.isArray(result) ? result : [result]);
    } catch (error) {
      console.error(`${title} 연결 실패:`, error);
      setData(null);
    }
  };

  // 데이터 타입에 따른 렌더링 로직
  const renderContent = () => {
    if (!data) return null;

    return (
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
        gap: "20px", 
        marginTop: "20px" 
      }}>
        {data.map((item: any) => (
          <div key={item.id} style={{
            padding: "20px",
            borderRadius: "12px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
            border: "1px solid #f0f0f0",
            display: "flex",
            flexDirection: "column"
          }}>
            {/* 상단 라벨 */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ fontSize: "12px", fontWeight: "bold", color: "#3b82f6", backgroundColor: "#eff6ff", padding: "2px 8px", borderRadius: "10px" }}>
                {title === "Users" ? "User" : `ID: ${item.id}`}
              </span>
            </div>

            {/* 본문 내용 (데이터 종류에 따라 다르게 출력) */}
            <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px", color: "#1f2937", textTransform: "capitalize" }}>
              {item.title || item.name || "No Title"}
            </h3>
            
            <p style={{ fontSize: "14px", color: "#4b5563", lineHeight: "1.5", flexGrow: 1 }}>
              {item.body || item.email || (item.address && `${item.address.city}, ${item.company.name}`) || "No Content"}
            </p>

            {/* 하단 추가 정보 (댓글인 경우 이메일 표시 등) */}
            {item.email && title === "Comments" && (
              <div style={{ marginTop: "15px", fontSize: "12px", color: "#9ca3af", borderTop: "1px solid #eee", pt: "10px" }}>
                From: {item.email}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ marginBottom: "60px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "800", margin: 0 }}>{title}</h2>
        <button 
          onClick={checkConnection}
          style={{
            padding: "8px 16px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
            transition: "background 0.2s"
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1d4ed8")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
        >
          {title} 데이터 불러오기
        </button>
      </div>
      
      {data ? renderContent() : (
        <div style={{ padding: "40px", textAlign: "center", border: "2px dashed #e5e7eb", borderRadius: "12px", color: "#9ca3af" }}>
          버튼을 눌러 데이터를 확인하세요.
        </div>
      )}
    </div>
  );
}

// 2. 메인 페이지
export default function TestPage() {
  return (
    <div style={{ 
      maxWidth: "1200px", 
      margin: "0 auto", 
      padding: "40px 20px",
      backgroundColor: "#f9fafb",
      minHeight: "100vh"
    }}>
      <header style={{ marginBottom: "40px", borderBottom: "2px solid #1f2937", paddingBottom: "20px" }}>
        <h1 style={{ fontSize: "36px", fontWeight: "900", color: "#111827" }}>JsonPlaceHolder Dashboard</h1>
        <p style={{ color: "#6b7280" }}>FastAPI 백엔드에서 가져온 실시간 데이터 확인</p>
      </header>

      <JsonPlaceHolderAPI title="Posts" endpoint="http://localhost:8000/jsonplaceholder/posts" />
      <JsonPlaceHolderAPI title="Comments" endpoint="http://localhost:8000/jsonplaceholder/comments" />
      <JsonPlaceHolderAPI title="Users" endpoint="http://localhost:8000/jsonplaceholder/users" />
    </div>
  );
}
