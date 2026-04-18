'use client';

import { useState, useEffect } from "react";

const PRODUCTS_INIT = [
  { id: 1, name: "프리미엄 멀티탭 6구", price: 18900, category: "전자", desc: "과부하 차단 기능 내장, USB-C 2포트 포함", stock: true, img: "⚡" },
  { id: 2, name: "스테인리스 보온병 500ml", price: 12500, category: "생활", desc: "24시간 보온·보냉, 원터치 오픈", stock: true, img: "🫗" },
  { id: 3, name: "접이식 장바구니 대형", price: 8900, category: "생활", desc: "30L 대용량, 방수 코팅 원단", stock: true, img: "🛍️" },
  { id: 4, name: "LED 데스크 램프", price: 29800, category: "전자", desc: "밝기 5단계 조절, 색온도 변환", stock: false, img: "💡" },
  { id: 5, name: "다용도 공구 세트 45pcs", price: 34500, category: "공구", desc: "드라이버·렌치·펜치 등 45종 구성", stock: true, img: "🔧" },
  { id: 6, name: "미니 선풍기 충전식", price: 15900, category: "전자", desc: "4000mAh 배터리, 풍속 3단계", stock: true, img: "🌀" },
  { id: 7, name: "천연 대나무 도마", price: 11200, category: "주방", desc: "항균 대나무 소재, 양면 사용", stock: true, img: "🪵" },
  { id: 8, name: "실리콘 주방장갑 세트", price: 9800, category: "주방", desc: "내열 230°C, 미끄럼 방지", stock: true, img: "🧤" },
];

const NEWS_DATA = [
  { id: 1, date: "2026.04.18", title: "디디만물상사, 여름맞이 생활용품 할인전 개최", summary: "오는 5월부터 한 달간 생활용품 전 품목 최대 30% 할인 행사를 진행합니다.", tag: "이벤트" },
  { id: 2, date: "2026.04.15", title: "신규 공구 라인업 대거 입고 안내", summary: "DIY 애호가를 위한 프리미엄 공구 시리즈 45종이 새롭게 입고되었습니다.", tag: "입고" },
  { id: 3, date: "2026.04.12", title: "배송비 무료 기준 변경 안내", summary: "고객 편의를 위해 무료배송 기준 금액이 5만원에서 3만원으로 하향 조정됩니다.", tag: "공지" },
  { id: 4, date: "2026.04.08", title: "디디만물상사 공식 인스타그램 오픈", summary: "새 상품 소식과 특가 정보를 인스타그램에서 가장 빠르게 만나보세요.", tag: "소식" },
  { id: 5, date: "2026.04.03", title: "4월 베스트 상품 TOP 5 발표", summary: "고객 여러분이 가장 많이 찾은 4월의 인기 상품을 소개합니다.", tag: "소식" },
  { id: 6, date: "2026.03.28", title: "봄맞이 주방용품 기획전 안내", summary: "새 계절을 맞아 주방을 새롭게 꾸밀 수 있는 기획전을 준비했습니다.", tag: "이벤트" },
];

const CATEGORIES = ["전체", "전자", "생활", "공구", "주방"];
const TAG_COLORS = { "이벤트": "#e74c3c", "입고": "#2ecc71", "공지": "#3498db", "소식": "#f39c12" };

function AddProductModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ name: "", price: "", category: "생활", desc: "", img: "📦" });
  const emojis = ["📦", "⚡", "🔧", "🪵", "🧤", "💡", "🌀", "🫗", "🛍️", "🧹", "🪣", "🔌"];

  const handleSubmit = () => {
    if (!form.name || !form.price) return;
    onAdd({ ...form, price: parseInt(form.price) });
  };

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>상품 등록</h2>
          <button style={styles.modalClose} onClick={onClose}>✕</button>
        </div>
        <div style={styles.modalBody}>
          <label style={styles.label}>아이콘</label>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
            {emojis.map(e => (
              <button key={e} onClick={() => setForm(f => ({ ...f, img: e }))}
                style={{ ...styles.emojiBtn, ...(form.img === e ? { border: "2px solid #d4380d", transform: "scale(1.15)" } : {}) }}>
                {e}
              </button>
            ))}
          </div>
          <label style={styles.label}>상품명 *</label>
          <input style={styles.input} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="상품명을 입력하세요" />
          <label style={styles.label}>가격 (원) *</label>
          <input style={styles.input} type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="가격을 입력하세요" />
          <label style={styles.label}>카테고리</label>
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            {CATEGORIES.filter(c => c !== "전체").map(c => (
              <button key={c} onClick={() => setForm(f => ({ ...f, category: c }))}
                style={{ ...styles.catBtn, ...(form.category === c ? styles.catBtnActive : {}), fontSize: 13, padding: "6px 14px" }}>
                {c}
              </button>
            ))}
          </div>
          <label style={styles.label}>상품 설명</label>
          <textarea style={{ ...styles.input, height: 72, resize: "vertical" }} value={form.desc}
            onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} placeholder="상품 설명을 입력하세요" />
          <button style={styles.submitBtn} onClick={handleSubmit}>등록하기</button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [tab, setTab] = useState("home");
  const [products, setProducts] = useState(PRODUCTS_INIT);
  const [selectedCat, setSelectedCat] = useState("전체");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const filteredProducts = selectedCat === "전체" ? products : products.filter(p => p.category === selectedCat);

  const handleAddProduct = (newProduct) => {
    setProducts(prev => [...prev, { ...newProduct, id: Date.now(), stock: true }]);
    setShowAddModal(false);
  };

  return (
    <div style={styles.root}>
      <style>{globalCSS}</style>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.logoArea} onClick={() => { setTab("home"); setSelectedNews(null); setSelectedProduct(null); }}>
            <div style={styles.logoIcon}>만</div>
            <div>
              <div style={styles.logoText}>디디만물상사</div>
              <div style={styles.logoSub}>없는 건 없다, 디디에 다 있다</div>
            </div>
          </div>
          <nav style={styles.nav}>
            {[["home", "홈"], ["news", "최근뉴스"], ["products", "인기뉴스"]].map(([key, label]) => (
              <button key={key}
                onClick={() => { setTab(key); setSelectedNews(null); setSelectedProduct(null); setMenuOpen(false); }}
                style={{ ...styles.navBtn, ...(tab === key ? styles.navBtnActive : {}) }}>
                {label}
                {tab === key && <span style={styles.navUnderline} />}
              </button>
            ))}
          </nav>
          <button style={styles.mobileMenu} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
        {menuOpen && (
          <div style={styles.mobileNav}>
            {[["home", "홈"], ["news", "최근뉴스"], ["products", "인기뉴스"]].map(([key, label]) => (
              <button key={key} onClick={() => { setTab(key); setSelectedNews(null); setSelectedProduct(null); setMenuOpen(false); }}
                style={{ ...styles.mobileNavBtn, ...(tab === key ? { color: "#d4380d", fontWeight: 700 } : {}) }}>
                {label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main style={styles.main}>
        {tab === "home" && (
          <div style={{ ...styles.fadeIn, animationDelay: mounted ? "0s" : "0.2s" }}>
            <section style={styles.hero}>
              <div style={styles.heroBgPattern}>
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{position:"absolute",inset:0}}>
                  <defs>
                    <pattern id="newsprint" x="0" y="0" width="300" height="200" patternUnits="userSpaceOnUse">
                      <line x1="100" y1="0" x2="100" y2="200" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5"/>
                      <line x1="200" y1="0" x2="200" y2="200" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5"/>
                      {[...Array(12)].map((_,i) => (
                        <rect key={i} x={10 + (i % 3) * 100} y={10 + Math.floor(i / 3) * 16}
                          width={60 + (i * 7) % 30} height="3" rx="1" fill="rgba(255,255,255,0.04)"/>
                      ))}
                      <rect x="10" y="80" width="80" height="5" rx="1" fill="rgba(255,255,255,0.06)"/>
                      <rect x="10" y="90" width="70" height="3" rx="1" fill="rgba(255,255,255,0.03)"/>
                      <rect x="110" y="75" width="75" height="5" rx="1" fill="rgba(255,255,255,0.06)"/>
                      <rect x="110" y="85" width="65" height="3" rx="1" fill="rgba(255,255,255,0.03)"/>
                      <rect x="210" y="70" width="70" height="5" rx="1" fill="rgba(255,255,255,0.06)"/>
                      <rect x="15" y="120" width="70" height="50" rx="3" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
                      <rect x="215" y="115" width="65" height="55" rx="3" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#newsprint)"/>
                </svg>
                <div style={styles.heroBgText}>NEWS</div>
                <div style={{...styles.heroBgText, top: "20%", left: "70%", fontSize: 90, opacity: 0.03}}>PRESS</div>
                <div style={{...styles.heroBgText, top: "60%", left: "10%", fontSize: 70, opacity: 0.025}}>DAILY</div>
                <div style={{...styles.heroBgText, top: "45%", left: "55%", fontSize: 60, opacity: 0.02}}>EDITION</div>
              </div>
              <div style={styles.heroOverlay} />
              <div style={styles.heroContent}>
                <div style={styles.heroDateline}>{new Date().toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric", weekday: "long" })}</div>
                <div style={styles.heroDividerTop} />
                <h1 style={styles.heroTitle}>디디만물상사</h1>
                <div style={styles.heroDividerBottom} />
                <p style={styles.heroDesc}>정치, 경제, 사회 모든 분야에 필요한 모든 뉴스를 제공합니다</p>
                <div style={styles.heroEdition}>DAILY NEWS · SINCE 2026</div>
              </div>
            </section>

            <section style={styles.section}>
              <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>📰 최근 소식</h2>
                <button style={styles.moreBtn} onClick={() => setTab("news")}>더보기 →</button>
              </div>
              <div style={styles.newsPreviewGrid}>
                {NEWS_DATA.slice(0, 3).map((n, i) => (
                  <div key={n.id} style={{ ...styles.newsPreviewCard, animationDelay: `${0.2 + i * 0.1}s` }}
                    onClick={() => { setTab("news"); setSelectedNews(n); }}>
                    <span style={{ ...styles.newsTag, backgroundColor: TAG_COLORS[n.tag] }}>{n.tag}</span>
                    <h3 style={styles.newsPreviewTitle}>{n.title}</h3>
                    <p style={styles.newsPreviewDate}>{n.date}</p>
                  </div>
                ))}
              </div>
            </section>

            <section style={styles.section}>
              <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>🔥 인기 뉴스</h2>
                <button style={styles.moreBtn} onClick={() => setTab("news")}>전체보기 →</button>
              </div>
              <div style={styles.newsPreviewGrid}>
                {NEWS_DATA.slice(3, 6).map((n, i) => (
                  <div key={n.id} style={{ ...styles.newsPreviewCard, animationDelay: `${0.2 + i * 0.1}s` }}
                    onClick={() => { setTab("news"); setSelectedNews(n); }}>
                    <span style={{ ...styles.newsTag, backgroundColor: TAG_COLORS[n.tag] }}>{n.tag}</span>
                    <h3 style={styles.newsPreviewTitle}>{n.title}</h3>
                    <p style={styles.newsPreviewDate}>{n.date}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {tab === "news" && !selectedNews && (
          <div style={styles.fadeIn}>
            <div style={styles.pageHeader}>
              <h1 style={styles.pageTitle}>최근 뉴스</h1>
              <p style={styles.pageDesc}>디디만물상사의 새로운 소식을 확인하세요</p>
            </div>
            <div style={styles.newsList}>
              {NEWS_DATA.map((n, i) => (
                <article key={n.id} style={{ ...styles.newsCard, animationDelay: `${i * 0.06}s` }}
                  onClick={() => setSelectedNews(n)}>
                  <div style={styles.newsDateBadge}>
                    <span style={styles.newsDateDay}>{n.date.split(".")[2]}</span>
                    <span style={styles.newsDateMonth}>{n.date.split(".")[1]}월</span>
                  </div>
                  <div style={styles.newsBody}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <span style={{ ...styles.newsTag, backgroundColor: TAG_COLORS[n.tag] }}>{n.tag}</span>
                    </div>
                    <h3 style={styles.newsTitle}>{n.title}</h3>
                    <p style={styles.newsSummary}>{n.summary}</p>
                  </div>
                  <span style={styles.newsArrow}>→</span>
                </article>
              ))}
            </div>
          </div>
        )}

        {tab === "news" && selectedNews && (
          <div style={styles.fadeIn}>
            <button style={styles.backBtn} onClick={() => setSelectedNews(null)}>← 목록으로</button>
            <article style={styles.newsDetail}>
              <span style={{ ...styles.newsTag, backgroundColor: TAG_COLORS[selectedNews.tag], marginBottom: 12 }}>{selectedNews.tag}</span>
              <h1 style={styles.newsDetailTitle}>{selectedNews.title}</h1>
              <time style={styles.newsDetailDate}>{selectedNews.date}</time>
              <div style={styles.newsDetailDivider} />
              <p style={styles.newsDetailBody}>{selectedNews.summary}</p>
              <p style={styles.newsDetailBody}>
                자세한 내용은 매장 방문 또는 이메일(munatique@naver.com)로 문의해 주세요.
                디디만물상사는 항상 고객 여러분의 편의를 위해 최선을 다하겠습니다.
              </p>
            </article>
          </div>
        )}

        {tab === "products" && !selectedProduct && (
          <div style={styles.fadeIn}>
            <div style={styles.pageHeader}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <h1 style={styles.pageTitle}>인기 뉴스</h1>
                  <p style={styles.pageDesc}>디디만물상사의 엄선된 상품을 만나보세요</p>
                </div>
                <button style={styles.addBtn} onClick={() => setShowAddModal(true)}>+ 상품 등록</button>
              </div>
            </div>
            <div style={styles.catRow}>
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setSelectedCat(c)}
                  style={{ ...styles.catBtn, ...(selectedCat === c ? styles.catBtnActive : {}) }}>
                  {c}
                </button>
              ))}
            </div>
            <div style={styles.productGrid}>
              {filteredProducts.map((p, i) => (
                <div key={p.id} style={{ ...styles.productCard, animationDelay: `${i * 0.05}s`, opacity: p.stock ? 1 : 0.55 }}
                  onClick={() => setSelectedProduct(p)}>
                  {!p.stock && <div style={styles.soldOut}>품절</div>}
                  <div style={styles.productEmoji}>{p.img}</div>
                  <div style={styles.productInfo}>
                    <span style={styles.productCat}>{p.category}</span>
                    <h3 style={styles.productName}>{p.name}</h3>
                    <p style={styles.productDesc}>{p.desc}</p>
                    <p style={styles.productPrice}>{p.price.toLocaleString()}원</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "products" && selectedProduct && (
          <div style={styles.fadeIn}>
            <button style={styles.backBtn} onClick={() => setSelectedProduct(null)}>← 목록으로</button>
            <div style={styles.productDetail}>
              <div style={styles.productDetailEmoji}>{selectedProduct.img}</div>
              <div style={styles.productDetailInfo}>
                <span style={styles.productCat}>{selectedProduct.category}</span>
                <h1 style={styles.productDetailName}>{selectedProduct.name}</h1>
                <p style={styles.productDetailDesc}>{selectedProduct.desc}</p>
                <div style={styles.productDetailPrice}>{selectedProduct.price.toLocaleString()}원</div>
                <div style={{ ...styles.stockBadge, backgroundColor: selectedProduct.stock ? "#e8f5e9" : "#fbe9e7", color: selectedProduct.stock ? "#2e7d32" : "#c62828" }}>
                  {selectedProduct.stock ? "✓ 재고 있음" : "✕ 품절"}
                </div>
                <div style={styles.productDetailMeta}>
                  <p>📧 문의: munatique@naver.com</p>
                  <p>🚚 수도권 당일배송 / 지방 익일배송</p>
                  <p>💳 카드·계좌이체·현금 결제 가능</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {showAddModal && <AddProductModal onClose={() => setShowAddModal(false)} onAdd={handleAddProduct} />}
      </main>

      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerLogo}>
            <div style={{ ...styles.logoIcon, width: 36, height: 36, fontSize: 16 }}>만</div>
            <span style={{ fontWeight: 700, fontSize: 15, color: "#fff" }}>디디만물상사</span>
          </div>
          <div style={styles.footerInfo}>
            <p>대표: 문홍주 | 사업자등록번호: 551-16-02303</p>
            <p>주소: 경기도 성남시 분당구 미금로 215 청솔대원 808동</p>
            <p>이메일: munatique@naver.com</p>
          </div>
          <p style={styles.footerCopy}>© 2026 디디만물상사. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&family=Nanum+Myeongjo:wght@400;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-12px); }
    to { opacity: 1; transform: translateX(0); }
  }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-thumb { background: #ccc; border-radius: 3px; }
`;

const styles = {
  root: { fontFamily: "'Noto Sans KR', sans-serif", background: "#f7f5f2", minHeight: "100vh", color: "#2c2c2c", display: "flex", flexDirection: "column" },
  fadeIn: { animation: "fadeUp 0.5s ease both" },
  header: { background: "#fff", borderBottom: "1px solid #e8e4df", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 8px rgba(0,0,0,0.04)" },
  headerInner: { maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" },
  logoArea: { display: "flex", alignItems: "center", gap: 10, cursor: "pointer" },
  logoIcon: { width: 42, height: 42, borderRadius: 10, background: "linear-gradient(135deg, #d4380d 0%, #e8590c 100%)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Nanum Myeongjo', serif", fontWeight: 700, fontSize: 20, flexShrink: 0 },
  logoText: { fontFamily: "'Nanum Myeongjo', serif", fontWeight: 700, fontSize: 20, color: "#1a1a1a", letterSpacing: "-0.5px" },
  logoSub: { fontSize: 11, color: "#999", letterSpacing: "0.3px" },
  nav: { display: "flex", gap: 4 },
  navBtn: { background: "none", border: "none", padding: "8px 18px", fontSize: 15, color: "#666", cursor: "pointer", borderRadius: 8, fontWeight: 500, position: "relative", transition: "all 0.2s", fontFamily: "'Noto Sans KR', sans-serif" },
  navBtnActive: { color: "#d4380d", fontWeight: 700 },
  navUnderline: { position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)", width: "60%", height: 2.5, background: "#d4380d", borderRadius: 2 },
  mobileMenu: { display: "none", background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "#333" },
  mobileNav: { display: "flex", flexDirection: "column", padding: "8px 24px 16px", borderTop: "1px solid #eee", gap: 4 },
  mobileNavBtn: { background: "none", border: "none", padding: "10px 0", fontSize: 16, color: "#555", textAlign: "left", cursor: "pointer", fontFamily: "'Noto Sans KR', sans-serif" },
  main: { flex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 24px 60px", width: "100%" },
  hero: { position: "relative", overflow: "hidden", marginTop: 28, minHeight: 340, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 16, background: "linear-gradient(145deg, #1a1a1a 0%, #2a2420 30%, #1e1e1e 60%, #252018 100%)" },
  heroBgPattern: { position: "absolute", inset: 0, overflow: "hidden" },
  heroBgText: { position: "absolute", top: "15%", left: "25%", fontSize: 120, fontFamily: "'Nanum Myeongjo', serif", fontWeight: 900, color: "rgba(255,255,255,0.035)", letterSpacing: "20px", pointerEvents: "none", userSelect: "none", whiteSpace: "nowrap" },
  heroOverlay: { position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(30,25,20,0.3) 0%, rgba(20,18,15,0.6) 100%)" },
  heroContent: { position: "relative", textAlign: "center", padding: "48px 32px", zIndex: 1 },
  heroDateline: { fontSize: 13, color: "rgba(255,255,255,0.65)", letterSpacing: "1px", marginBottom: 16, fontFamily: "'Noto Sans KR', sans-serif" },
  heroDividerTop: { width: 480, maxWidth: "100%", height: 1, background: "rgba(255,255,255,0.35)", margin: "0 auto 20px" },
  heroTitle: { fontFamily: "'Nanum Myeongjo', serif", fontSize: 52, fontWeight: 700, color: "#fff", letterSpacing: "6px", marginBottom: 16, lineHeight: 1.2, textShadow: "0 2px 20px rgba(0,0,0,0.4)" },
  heroDividerBottom: { width: 480, maxWidth: "100%", height: 1, background: "rgba(255,255,255,0.35)", margin: "0 auto 18px" },
  heroDesc: { fontSize: 16, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, marginBottom: 14, fontFamily: "'Nanum Myeongjo', serif", letterSpacing: "0.5px", textShadow: "0 1px 8px rgba(0,0,0,0.3)" },
  heroEdition: { fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: "3px", fontWeight: 500, marginTop: 4 },
  section: { marginTop: 40 },
  sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  sectionTitle: { fontFamily: "'Nanum Myeongjo', serif", fontSize: 22, fontWeight: 700, color: "#1a1a1a" },
  moreBtn: { background: "none", border: "none", color: "#d4380d", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Noto Sans KR', sans-serif" },
  newsPreviewGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 },
  newsPreviewCard: { background: "#fff", borderRadius: 14, padding: "22px 20px", border: "1px solid #ece8e3", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s", animation: "fadeUp 0.5s ease both" },
  newsPreviewTitle: { fontSize: 15, fontWeight: 600, color: "#1a1a1a", lineHeight: 1.5, marginTop: 10 },
  newsPreviewDate: { fontSize: 12, color: "#aaa", marginTop: 8 },
  newsTag: { display: "inline-block", padding: "3px 10px", borderRadius: 20, color: "#fff", fontSize: 11, fontWeight: 600, letterSpacing: "0.3px" },
  pageHeader: { marginTop: 32, marginBottom: 28 },
  pageTitle: { fontFamily: "'Nanum Myeongjo', serif", fontSize: 30, fontWeight: 700, color: "#1a1a1a" },
  pageDesc: { fontSize: 15, color: "#888", marginTop: 6 },
  newsList: { display: "flex", flexDirection: "column", gap: 12 },
  newsCard: { background: "#fff", borderRadius: 14, padding: "20px 24px", border: "1px solid #ece8e3", display: "flex", alignItems: "center", gap: 20, cursor: "pointer", transition: "transform 0.15s, box-shadow 0.2s", animation: "slideIn 0.4s ease both" },
  newsDateBadge: { background: "linear-gradient(135deg, #d4380d, #e8590c)", borderRadius: 12, width: 56, height: 56, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  newsDateDay: { fontSize: 20, fontWeight: 900, color: "#fff", lineHeight: 1 },
  newsDateMonth: { fontSize: 11, color: "rgba(255,255,255,0.8)", marginTop: 2 },
  newsBody: { flex: 1, minWidth: 0 },
  newsTitle: { fontSize: 16, fontWeight: 600, color: "#1a1a1a", lineHeight: 1.4 },
  newsSummary: { fontSize: 13, color: "#888", marginTop: 4, lineHeight: 1.5 },
  newsArrow: { fontSize: 18, color: "#ccc", flexShrink: 0 },
  newsDetail: { background: "#fff", borderRadius: 16, padding: "40px 36px", border: "1px solid #ece8e3", maxWidth: 720 },
  newsDetailTitle: { fontFamily: "'Nanum Myeongjo', serif", fontSize: 26, fontWeight: 700, color: "#1a1a1a", lineHeight: 1.4, marginTop: 8 },
  newsDetailDate: { fontSize: 14, color: "#aaa", display: "block", marginTop: 12 },
  newsDetailDivider: { height: 1, background: "#ece8e3", margin: "24px 0" },
  newsDetailBody: { fontSize: 15, color: "#444", lineHeight: 1.85, marginBottom: 16 },
  backBtn: { background: "none", border: "none", color: "#d4380d", fontSize: 14, fontWeight: 600, cursor: "pointer", padding: "24px 0 16px", fontFamily: "'Noto Sans KR', sans-serif" },
  addBtn: { background: "linear-gradient(135deg, #d4380d, #e8590c)", color: "#fff", border: "none", padding: "10px 22px", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Noto Sans KR', sans-serif", boxShadow: "0 2px 10px rgba(212,56,13,0.2)" },
  catRow: { display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" },
  catBtn: { background: "#fff", border: "1px solid #ddd", borderRadius: 20, padding: "8px 18px", fontSize: 14, color: "#666", cursor: "pointer", fontWeight: 500, transition: "all 0.2s", fontFamily: "'Noto Sans KR', sans-serif" },
  catBtnActive: { background: "#1a1a1a", color: "#fff", border: "1px solid #1a1a1a" },
  productGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 16 },
  productCard: { background: "#fff", borderRadius: 14, overflow: "hidden", border: "1px solid #ece8e3", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s", animation: "fadeUp 0.4s ease both", position: "relative" },
  soldOut: { position: "absolute", top: 12, right: 12, background: "#e74c3c", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6, zIndex: 2 },
  productEmoji: { height: 120, background: "linear-gradient(135deg, #faf8f5 0%, #f0ebe4 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 },
  productInfo: { padding: "16px 18px 18px" },
  productCat: { fontSize: 11, color: "#d4380d", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" },
  productName: { fontSize: 15, fontWeight: 600, color: "#1a1a1a", marginTop: 4, lineHeight: 1.4 },
  productDesc: { fontSize: 12, color: "#999", marginTop: 4, lineHeight: 1.5 },
  productPrice: { fontSize: 18, fontWeight: 900, color: "#1a1a1a", marginTop: 8 },
  productDetail: { background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #ece8e3", display: "flex", flexWrap: "wrap", maxWidth: 800 },
  productDetailEmoji: { flex: "1 1 280px", minHeight: 240, background: "linear-gradient(135deg, #faf8f5, #f0ebe4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80 },
  productDetailInfo: { flex: "1 1 320px", padding: "36px 32px" },
  productDetailName: { fontFamily: "'Nanum Myeongjo', serif", fontSize: 26, fontWeight: 700, color: "#1a1a1a", marginTop: 6, lineHeight: 1.3 },
  productDetailDesc: { fontSize: 15, color: "#666", marginTop: 12, lineHeight: 1.7 },
  productDetailPrice: { fontSize: 28, fontWeight: 900, color: "#d4380d", marginTop: 20 },
  stockBadge: { display: "inline-block", padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600, marginTop: 12 },
  productDetailMeta: { marginTop: 24, fontSize: 14, color: "#777", lineHeight: 2 },
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 20 },
  modal: { background: "#fff", borderRadius: 18, width: "100%", maxWidth: 480, maxHeight: "90vh", overflow: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid #eee" },
  modalTitle: { fontFamily: "'Nanum Myeongjo', serif", fontSize: 20, fontWeight: 700 },
  modalClose: { background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#999" },
  modalBody: { padding: "20px 24px 28px" },
  label: { display: "block", fontSize: 13, fontWeight: 600, color: "#555", marginBottom: 6 },
  input: { width: "100%", padding: "11px 14px", border: "1px solid #ddd", borderRadius: 10, fontSize: 14, marginBottom: 16, outline: "none", fontFamily: "'Noto Sans KR', sans-serif", transition: "border 0.2s" },
  emojiBtn: { width: 40, height: 40, borderRadius: 10, border: "1px solid #eee", background: "#faf8f5", fontSize: 20, cursor: "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", justifyContent: "center" },
  submitBtn: { width: "100%", background: "linear-gradient(135deg, #d4380d, #e8590c)", color: "#fff", border: "none", padding: "13px", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 8, fontFamily: "'Noto Sans KR', sans-serif" },
  footer: { background: "#1a1a1a", marginTop: "auto", padding: "36px 24px 28px" },
  footerInner: { maxWidth: 1100, margin: "0 auto" },
  footerLogo: { display: "flex", alignItems: "center", gap: 10, marginBottom: 16 },
  footerInfo: { fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.9 },
  footerCopy: { fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 20, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16 },
};
