"use client";

import { useState } from "react";

export default function WeatherPage() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      // 예시: 입력한 ID번 글을 가져오는 가상 API 호출
      const response = await fetch(`http://localhost:8000/weather/test?appid=${query}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생:", error);
      setData({ error: "데이터를 불러오지 못했습니다." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>간단한 날씨 API 검색기</h1>
      
      {/* 검색 입력창 및 버튼 */}
      <form onSubmit={handleSearch} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="숫자 ID를 입력하세요 (예: 1)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ flex: 1, padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
        <button 
          type="submit" 
          disabled={isLoading}
          style={{ padding: "8px 16px", cursor: "pointer", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: "4px" }}
        >
          {isLoading ? "검색 중..." : "검색"}
        </button>
      </form>

      {/* JSON 결과 출력창 */}
      <div style={{ marginTop: "20px" }}>
        <h3>API 결과값 (JSON)</h3>
        <pre style={{ 
          backgroundColor: "#f4f4f4", 
          padding: "15px", 
          borderRadius: "5px", 
          overflowX: "auto",
          border: "1px solid #ddd"
        }}>
          {data ? JSON.stringify(data, null, 2) : "검색 결과가 여기에 표시됩니다."}
        </pre>
      </div>
    </div>
  );
}
