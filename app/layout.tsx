import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body style={{ margin: 0 }}>
        <div style={{ display: "flex", height: "100vh" }}>

          {/* 좌측 네비게이션 */}
          <nav
            style={{
              width: "200px",
              padding: "20px",
              backgroundColor: "#f4f4f4",
            }}
          >
            <h3>Menu</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link href="/">🏠 Home</Link>
              </li>
              <li style={{ marginTop: "10px" }}>
                <Link href="/mini-game">🧪 Mini Game</Link>
              </li>
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

