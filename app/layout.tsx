import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <style>{`
          /* 기본 네비게이션 스타일 */
          .side-nav {
            width: 200px;
            padding: 20px;
            background-color: #f4f4f4;
            display: block; /* 기본적으로 보임 */
          }

          /* 768px 이하일 때 숨김 처리 */
          @media (max-width: 768px) {
            .side-nav {
              display: none;
            }
          }
        `}</style>
      </head>
      <body style={{ margin: 0 }}>
        <div style={{ display: "flex", height: "100vh" }}>
          <nav className="side-nav"> {/* 인라인 스타일을 제거하고 클래스만 남김 */}
            <h3>Menu</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li><Link href="/">🏠 Home</Link></li>
              <li style={{ marginTop: "10px" }}><Link href="/mini-game">🧪 Mini Game</Link></li>
              <li style={{ marginTop: "10px" }}><Link href="/my-page">🧪 My Page</Link></li>
            </ul>
          </nav>

          {/* 메인 콘텐츠 */}
          <main style={{ padding: "40px", flex: 1 }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
