"use client";

export default function Home() {
  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>안녕하세요 👋</h1>

      <h2>저는 DS입니다</h2>

      <p>
	  	Next.js 배우는 중입니다.
		FastAPI도 배우는 중입니다.
        웹 개발을 공부하고 있으며,<br />
        React와 Next.js를 사용해 서비스를 만드는 것을 목표로 하고 있습니다.
      </p>

      <ul>
        <li>💻 관심 분야: 웹 개발, 백엔드, SaaS</li>
        <li>🛠 사용 기술: JavaScript, React, Next.js</li>
        <li>📍 목표: 실제로 사용하는 서비스 만들기</li>
      </ul>

      <button
        onClick={() => alert("방문해주셔서 감사합니다!")}
        style={{
          marginTop: "20px",
          padding: "10px 16px",
          cursor: "pointer",
        }}
      >
        인사하기
      </button>
    </main>
  );
}
