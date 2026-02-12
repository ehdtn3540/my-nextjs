"use client";

import { useState } from "react";

export default function MiniGamePage() {
  const [input, setInput] = useState("");
  // const [result, setResult] = useState<"UP" | "DOWN" | "CORRECT" | "">("");
  type GameResult = "UP" | "DOWN" | "CORRECT"|""; // 타입의 재사용성 증가
  const [result, setResult] = useState<GameResult>("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 이후 여기서 FastAPI 연동
    // 임시 테스트용 로직
    const fakeAnswer = 42;
    const guess = Number(input);

    if (!guess) return;

    if (guess < fakeAnswer) {
      setResult("UP");
      setMessage("더 큰 숫자입니다 ⬆️");
    } else if (guess > fakeAnswer) {
      setResult("DOWN");
      setMessage("더 작은 숫자입니다 ⬇️");
    } else {
      setResult("CORRECT");
      setMessage("정답입니다 🎉");
    }

    setInput("");
  };

  return (
    <div style={{ maxWidth: "400px" }}>
      <h1>🔢 Up & Down Game</h1>

      <p>1 ~ 100 사이의 숫자를 맞춰보세요</p>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="숫자 입력"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
          }}
        />

        <button
          type="submit"
          style={{
            marginTop: "10px",
            width: "100%",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          제출
        </button>
      </form>

      {result && (
        <div
          style={{
            marginTop: "20px",
            padding: "12px",
            backgroundColor: "#f4f4f4",
          }}
        >
          <strong>{result}</strong>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

