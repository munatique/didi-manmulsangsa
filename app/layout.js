export const metadata = {
  title: '디디만물상사',
  description: '정치, 경제, 사회 모든 분야에 필요한 모든 뉴스를 제공합니다',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
