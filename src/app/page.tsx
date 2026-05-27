"use client";

import React, { useState, useEffect } from "react";

// --- DATA ARRAYS ---

const timelineData = [
  {
    week: "01–02",
    title: "Фундамент",
    text: "Сформулируете финансовую цель, определите свой риск-профиль и составите инвестиционный план на одной странице.",
    img: "images/week_foundation.jpeg",
    scaleSm: false,
  },
  {
    week: "02–03",
    title: "Инфраструктура",
    text: "Разберётесь, как устроен рынок, выберете брокера и совершите первые учебные сделки без риска.",
    img: "images/tools_visual.jpeg",
    scaleSm: false,
  },
  {
    week: "03–04",
    title: "Облигации",
    text: "Научитесь отбирать облигации, считать реальную доходность и формировать консервативную часть портфеля.",
    img: "images/bonds_section.jpeg",
    scaleSm: true,
  },
  {
    week: "04–06",
    title: "Акции, фонды и альтернативы",
    text: "Освоите фундаментальный анализ компаний, научитесь сравнивать акции и выбирать фонды.",
    img: "images/stocks_analysis.jpeg",
    scaleSm: false,
  },
  {
    week: "06–07",
    title: "Управление портфелем",
    text: "Соберёте все активы в единую структуру, настроите правила ребалансировки и разберётесь с налогами.",
    img: "images/portfolio_protection.jpeg",
    scaleSm: true,
  },
  {
    week: "08",
    title: "Защита стратегии",
    text: "Оформите итоговый портфель, защитите его перед экспертом. Уйдёте с готовым планом и дорожной картой развития.",
    img: "images/certificate_mockup.jpeg",
    scaleSm: true,
  },
];


interface GetCourseWidgetProps {
  scriptId: string;
  widgetId: string;
}

const GetCourseWidget: React.FC<GetCourseWidgetProps> = ({ scriptId, widgetId }) => {
  const [src, setSrc] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [iframeHeight, setIframeHeight] = useState(620); // Increased robust default height

  useEffect(() => {
    const search = window.location.search ? window.location.search.substring(1) + "&" : "";
    const ref = encodeURIComponent(document.referrer || "");
    const loc = encodeURIComponent(window.location.href);
    setSrc(`https://monterium.ru/pl/lite/widget/widget?${search}id=${widgetId}&ref=${ref}&loc=${loc}`);
  }, [widgetId]);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data && typeof e.data === "object" && e.data.height) {
        if (!e.data.uniqName || e.data.uniqName === scriptId) {
          setIframeHeight(Number(e.data.height));
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [scriptId]);

  if (!src) return null;

  // We hide the empty GetCourse top margin by offsetting with marginTop: -45px.
  const containerHeight = Math.max(380, iframeHeight - 40);

  return (
    <div
      className={`gc-widget-container ${loaded ? "loaded" : "loading"}`}
      style={{
        height: loaded ? `${containerHeight}px` : "380px",
        minHeight: loaded ? `${containerHeight}px` : "380px",
      }}
    >
      <iframe
        src={src}
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%",
          height: `${iframeHeight}px`,
          marginTop: "-45px",
          border: "none",
          overflow: "hidden",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.3s ease", // Instant height resizing (no delay!)
        }}
        allowFullScreen
      />
    </div>
  );
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [countdownText, setCountdownText] = useState("Старт потока — 8 июня");
  const [activeTariffPopup, setActiveTariffPopup] = useState<{
    id: string;
    widgetId: string;
    scriptId: string;
    title: string;
    price: string;
  } | null>(null);

  const openTariffPopup = (tariffName: string) => {
    const tariffs: { [key: string]: any } = {
      start: {
        id: "start",
        widgetId: "1609026",
        scriptId: "4a23c25c88911c4011ff1ea03b9d807045faf436",
        title: "Тариф «Старт»",
        price: "59 990 ₽",
      },
      practice: {
        id: "practice",
        widgetId: "1609027",
        scriptId: "60cc6ad32208dedb2c6ae368ac14956c4da2f648",
        title: "Тариф «Практика»",
        price: "89 990 ₽",
      },
      portfolio: {
        id: "portfolio",
        widgetId: "1609028",
        scriptId: "1df9737ee68214aec42e5ce52631bc3d37b6c62d",
        title: "Тариф «Портфель»",
        price: "119 990 ₽",
      },
      capital: {
        id: "capital",
        widgetId: "1609031",
        scriptId: "fe4c481df796c329c9d190e90ec408b78e779cfe",
        title: "Тариф «Капитал»",
        price: "149 990 ₽",
      },
    };

    const t = tariffs[tariffName];
    if (t) {
      setActiveTariffPopup(t);
    }
  };

  // Scroll handler for header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Timer countdown hook
  useEffect(() => {
    const targetDate = new Date("2026-06-08T09:00:00+03:00").getTime();

    const updateCountdown = () => {
      const now = Date.now();
      const diff = targetDate - now;
      if (diff <= 0) {
        setCountdownText("Старт потока — 8 июня");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      let text = "Старт потока — 8 июня";
      if (days > 0) {
        text += ` · через ${days} дн. ${hours} ч. ${minutes} мин.`;
      }
      setCountdownText(text);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  // Scroll reveal setup using standard React Ref and IntersectionObserver
  useEffect(() => {
    const revealItems = document.querySelectorAll(".reveal-item");
    if (!revealItems.length) return;

    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
      );

      revealItems.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    } else {
      revealItems.forEach((el) => el.classList.add("is-visible"));
    }
  }, []);

  // Custom function for anchor link smooth scroll offsetting header height
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.getElementById(targetId);
    if (target) {
      const headerEl = document.getElementById("site-header");
      const headerH = headerEl ? headerEl.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="landing">
      {/* ===== STICKY HEADER ===== */}
      <header className={`site-header ${scrolled ? "scrolled" : ""}`} id="site-header">
        <div className="container header-inner">
          <div className="header-logo">
            <span className="logo-name">Монтериум</span>
          </div>
          <nav className="header-nav" aria-label="Навигация">
            <a href="#about" onClick={(e) => handleAnchorClick(e, "about")}>Программа</a>
            <a href="#pricing" onClick={(e) => handleAnchorClick(e, "pricing")}>Тарифы</a>
          </nav>
          <a href="#pricing" onClick={(e) => handleAnchorClick(e, "pricing")} className="cta cta-primary header-cta">Выбрать тариф →</a>
          <button
            className={`burger ${menuOpen ? "open" : ""}`}
            id="burger-btn"
            aria-label="Меню"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      {/* Mobile nav */}
      <div className={`mobile-nav ${menuOpen ? "open" : ""}`} id="mobile-nav" aria-hidden={!menuOpen}>
        <a href="#about" onClick={(e) => handleAnchorClick(e, "about")} className="mobile-link">Программа</a>
        <a href="#pricing" onClick={(e) => handleAnchorClick(e, "pricing")} className="mobile-link">Тарифы</a>
        <a href="#pricing" onClick={(e) => handleAnchorClick(e, "pricing")} className="cta cta-primary mobile-cta">Выбрать тариф →</a>
      </div>

      <main className="landing">
        {/* ===== HERO ===== */}
        <section className="hero-section" id="home">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="hero-eyebrow">Старт обучения <strong>8 июня</strong> · Количество мест ограничено</p>
              <div className="hero-badges">
                <span className="hero-format">Образовательная программа</span>
                <span>8 недель</span>
                <span>Онлайн</span>
              </div>
              <h1>«Портфель на&nbsp;фондовом рынке»</h1>
              <p className="hero-subtitle">
                Соберите свой первый инвестиционный портфель за 8 недель — с системой, инструментами и поддержкой экспертов
              </p>

              <div className="hero-actions">
                <a href="#pricing" onClick={(e) => handleAnchorClick(e, "pricing")} className="cta cta-primary hero-cta" id="hero-cta-btn">Выбрать тариф →</a>
                <p className="hero-note">Рассрочка — от 5&nbsp;999&nbsp;₽/мес.</p>
              </div>

              <ul className="hero-stats">
                <li>
                  <span className="stat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="stat-svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7" />
                    </svg>
                  </span>
                  <div><strong>8 модулей, 46 уроков</strong><span>+ 3 бонусных модуля</span></div>
                </li>
                <li>
                  <span className="stat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="stat-svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  <div><strong>10 рабочих инструментов</strong><span>которые останутся с вами навсегда</span></div>
                </li>
                <li>
                  <span className="stat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="stat-svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </span>
                  <div><strong>Свидетельство</strong><span>об обучении по прохождению программы</span></div>
                </li>
              </ul>
            </div>

            <div className="hero-visual">
              <div className="hero-chart-wrap">
                <img
                  src="images/tatyana_hero.png"
                  alt="Татьяна Волкова — эксперт по формированию личного капитала"
                  className="hero-chart-img"
                  width="580"
                  height="400"
                />
                <div className="hero-float-card">
                  <span className="float-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="float-svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <div>
                    <strong>Татьяна Волкова</strong>
                    <p>эксперт по формированию личного капитала</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== TICKER ===== */}
        <div className="ticker-wrap" aria-hidden="true">
          <div className="ticker-track">
            <div className="ticker-content">
              <span>Первый поток</span>
              <span className="sep">·</span>
              <span>8 модулей</span>
              <span className="sep">·</span>
              <span>46 уроков</span>
              <span className="sep">·</span>
              <span>10 инструментов</span>
              <span className="sep">·</span>
              <span>Старт 8 июня</span>
              <span className="sep">·</span>
              <span>Рассрочка 0%</span>
              <span className="sep">·</span>
              <span>Свидетельство</span>
              <span className="sep">·</span>
            </div>
            <div className="ticker-content">
              <span>Первый поток</span>
              <span className="sep">·</span>
              <span>8 модулей</span>
              <span className="sep">·</span>
              <span>46 уроков</span>
              <span className="sep">·</span>
              <span>10 инструментов</span>
              <span className="sep">·</span>
              <span>Старт 8 июня</span>
              <span className="sep">·</span>
              <span>Рассрочка 0%</span>
              <span className="sep">·</span>
              <span>Свидетельство</span>
              <span className="sep">·</span>
            </div>
            <div className="ticker-content">
              <span>Первый поток</span>
              <span className="sep">·</span>
              <span>8 модулей</span>
              <span className="sep">·</span>
              <span>46 уроков</span>
              <span className="sep">·</span>
              <span>10 инструментов</span>
              <span className="sep">·</span>
              <span>Старт 8 июня</span>
              <span className="sep">·</span>
              <span>Рассрочка 0%</span>
              <span className="sep">·</span>
              <span>Свидетельство</span>
              <span className="sep">·</span>
            </div>
            <div className="ticker-content">
              <span>Первый поток</span>
              <span className="sep">·</span>
              <span>8 модулей</span>
              <span className="sep">·</span>
              <span>46 уроков</span>
              <span className="sep">·</span>
              <span>10 инструментов</span>
              <span className="sep">·</span>
              <span>Старт 8 июня</span>
              <span className="sep">·</span>
              <span>Рассрочка 0%</span>
              <span className="sep">·</span>
              <span>Свидетельство</span>
              <span className="sep">·</span>
            </div>
          </div>
        </div>

        {/* ===== TIMELINE / 8 НЕДЕЛЬ ===== */}
        <section className="section timeline-section reveal-section" id="about">
          <div className="container">
            <div className="section-head">
              <h2>За 8 недель вы пройдёте путь<br />от «не знаю, с чего начать»<br />до <span className="heading-accent">собственного портфеля</span></h2>
              <p>Это не набор лекций. Каждый модуль заканчивается конкретным результатом — документом, инструментом, решением.</p>
            </div>

            <div className="timeline">
              {timelineData.map((item, idx) => (
                <article key={idx} className="timeline-item reveal-item">
                  <div className="timeline-week">
                    <span className="week-num">{item.week}</span>
                    <span className="week-label">Неделя</span>
                  </div>
                  <div className="timeline-img-wrap">
                    <img
                      src={item.img}
                      alt={item.title}
                      className={`timeline-img ${item.scaleSm ? "scale-sm" : ""}`}
                      width="380"
                      height="240"
                      loading="lazy"
                    />
                  </div>
                  <div className="timeline-body">
                    <h3 className="timeline-title">{item.title}</h3>
                    <p className="timeline-text">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="timeline-cta-wrap reveal-item">
              <a href="#pricing" onClick={(e) => handleAnchorClick(e, "pricing")} className="cta cta-primary" id="timeline-cta-btn">Хочу собрать свой портфель →</a>
            </div>
          </div>
        </section>


        {/* ===== PRICING ===== */}
        <section className="section pricing-section reveal-section" id="pricing">
          <div className="container">
            <div className="section-head">
              <h2>Выберите свой формат участия</h2>
            </div>

            <div className="urgency-banner reveal-item">
              <span className="urgency-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="urgency-svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <div>
                <strong>{countdownText}</strong>
                <p>Количество мест ограничено. После заполнения потока регистрация закрывается до следующего набора.</p>
              </div>
            </div>

            <div className="pricing-grid">
              <article className="pricing-card reveal-item" id="tarif-start">
                <div className="pricing-card-head">
                  <h3>Старт</h3>
                  <p className="pricing-card-desc">Для тех, кто хочет разобраться сам</p>
                  <div className="pricing-price-wrap">
                    <span className="price-old">176 000 ₽</span>
                    <strong className="price-new">59 990 ₽</strong>
                  </div>
                </div>
                <div className="pricing-duration">
                  <div className="pricing-duration-item">
                    <strong>8 недель</strong><span>продолжительность</span>
                  </div>
                  <div className="pricing-duration-item">
                    <strong>3 месяца</strong><span>доступ к материалам</span>
                  </div>
                </div>
                <ul className="pricing-features">
                  <li>8 Модулей</li>
                  <li>Тестирования по модулю</li>
                </ul>
                <div className="pricing-installment">
                  <a href="#" className="cta cta-primary pricing-cta" id="tarif-start-btn" onClick={(e) => { e.preventDefault(); openTariffPopup("start"); }}>Начать обучение →</a>
                  <p className="installment-note">Рассрочка 0% — от <strong>5&nbsp;999 ₽</strong>/мес · от 200 ₽ в день</p>
                  <a href="#" className="cta-installment-link" id="tarif-start-inst-btn" onClick={(e) => { e.preventDefault(); openTariffPopup("start"); }}>Выбрать рассрочку →</a>
                </div>
              </article>

              <article className="pricing-card reveal-item" id="tarif-practice">
                <div className="pricing-card-head">
                  <h3>Практика</h3>
                  <p className="pricing-card-desc">Для тех, кто хочет не только понять, но и сделать</p>
                  <div className="pricing-price-wrap">
                    <span className="price-old">336 000 ₽</span>
                    <strong className="price-new">89 990 ₽</strong>
                  </div>
                </div>
                <div className="pricing-duration">
                  <div className="pricing-duration-item">
                    <strong>8 недель</strong><span>продолжительность</span>
                  </div>
                  <div className="pricing-duration-item">
                    <strong>6 месяцев</strong><span>доступ к материалам</span>
                  </div>
                </div>
                <ul className="pricing-features">
                  <li>8 Модулей</li>
                  <li>1 Бонусный модуль (на выбор)</li>
                  <li>Сквозные артефакты</li>
                  <li>Доп. материалы для скачивания</li>
                  <li>Чат с ИИ куратором</li>
                  <li>Чат участников</li>
                  <li>Поддержка кураторов</li>
                  <li>Тестирования по модулю</li>
                  <li>Домашние задания с проверкой</li>
                </ul>
                <div className="pricing-installment">
                  <a href="#" className="cta cta-primary pricing-cta" id="tarif-practice-btn" onClick={(e) => { e.preventDefault(); openTariffPopup("practice"); }}>Начать обучение →</a>
                  <p className="installment-note">Рассрочка 0% — от <strong>8&nbsp;999 ₽</strong>/мес · от 300 ₽ в день</p>
                  <a href="#" className="cta-installment-link" id="tarif-practice-inst-btn" onClick={(e) => { e.preventDefault(); openTariffPopup("practice"); }}>Выбрать рассрочку →</a>
                </div>
              </article>

              <article className="pricing-card pricing-card-featured reveal-item" id="tarif-portfolio">
                <div className="pricing-featured-badge">Хит продаж</div>
                <div className="pricing-card-head">
                  <h3>Портфель</h3>
                  <p className="pricing-card-desc">Для тех, кто хочет собрать и проверить свою стратегию</p>
                  <div className="pricing-price-wrap">
                    <span className="price-old">481 000 ₽</span>
                    <strong className="price-new">119 990 ₽</strong>
                  </div>
                </div>
                <div className="pricing-duration">
                  <div className="pricing-duration-item">
                    <strong>8 недель</strong><span>продолжительность</span>
                  </div>
                  <div className="pricing-duration-item">
                    <strong>9 месяцев</strong><span>доступ к материалам</span>
                  </div>
                </div>
                <ul className="pricing-features">
                  <li>8 Модулей</li>
                  <li>2 Бонусных модуля (на выбор)</li>
                  <li>Сквозные артефакты</li>
                  <li>Доп. материалы для скачивания</li>
                  <li>Чат с ИИ куратором</li>
                  <li>Чат участников</li>
                  <li>Поддержка кураторов</li>
                  <li>Тестирования по модулю</li>
                  <li>1 zoom-встреча с Татьяной Волковой</li>
                  <li>2 zoom-встречи с финансовым консультантом</li>
                  <li>5 zoom-встреч с преподавателями</li>
                  <li>Мастер-класс «Разбор портфеля»</li>
                  <li>Домашние задания с проверкой</li>
                </ul>
                <div className="pricing-installment">
                  <a href="#" className="cta cta-light pricing-cta" id="tarif-portfolio-btn" onClick={(e) => { e.preventDefault(); openTariffPopup("portfolio"); }}>Начать обучение →</a>
                  <p className="installment-note">Рассрочка 0% — от <strong>11&nbsp;999 ₽</strong>/мес · от 400 ₽ в день</p>
                  <a href="#" className="cta-installment-link cta-installment-link-light" id="tarif-portfolio-inst-btn" onClick={(e) => { e.preventDefault(); openTariffPopup("portfolio"); }}>Выбрать рассрочку →</a>
                </div>
              </article>

              <article className="pricing-card reveal-item" id="tarif-capital">
                <div className="pricing-featured-badge">Рекомендуемый</div>
                <div className="pricing-card-head">
                  <h3>Капитал</h3>
                  <p className="pricing-card-desc">Для тех, кто строит финансовую систему на годы</p>
                  <div className="pricing-price-wrap">
                    <span className="price-old">501 000 ₽</span>
                    <strong className="price-new">149 990 ₽</strong>
                  </div>
                </div>
                <div className="pricing-duration">
                  <div className="pricing-duration-item">
                    <strong>8 недель</strong><span>продолжительность</span>
                  </div>
                  <div className="pricing-duration-item">
                    <strong>12 месяцев</strong><span>доступ к материалам</span>
                  </div>
                </div>
                <ul className="pricing-features">
                  <li>8 Модулей</li>
                  <li>Все 3 бонусных модуля</li>
                  <li>Сквозные артефакты</li>
                  <li>Доп. материалы для скачивания</li>
                  <li>Чат с ИИ куратором</li>
                  <li>Чат участников</li>
                  <li>Поддержка кураторов</li>
                  <li>Тестирования по модулю</li>
                  <li>1 zoom-встреча с Татьяной Волковой</li>
                  <li>2 zoom-встречи с финансовым консультантом</li>
                  <li>5 zoom-встреч с преподавателями</li>
                  <li>Мастер-класс «Разбор портфеля»</li>
                  <li>Домашние задания с проверкой</li>
                </ul>
                <div className="pricing-installment">
                  <a href="#" className="cta cta-primary pricing-cta" id="tarif-capital-btn" onClick={(e) => { e.preventDefault(); openTariffPopup("capital"); }}>Начать обучение →</a>
                  <p className="installment-note">Рассрочка 0% — от <strong>14&nbsp;999 ₽</strong>/мес · от 500 ₽ в день</p>
                  <a href="#" className="cta-installment-link" id="tarif-capital-inst-btn" onClick={(e) => { e.preventDefault(); openTariffPopup("capital"); }}>Выбрать рассрочку →</a>
                </div>
              </article>
            </div>

            <div className="tax-deduction reveal-item">
              <span className="tax-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="tax-svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </span>
              <div>
                <strong>Вы можете вернуть часть денег за обучение!</strong>
                <p>За обучение вы можете оформить налоговый вычет и вернуть до 13% от стоимости. По факту обучение обходится вам дешевле.</p>
              </div>
            </div>

            <p className="payment-methods reveal-item">
              Рассрочка от банка · Внутренняя рассрочка от компании · Оплата в 2 клика
            </p>
          </div>
        </section>

      </main>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-col">
            <p className="footer-title">Мы в соцсетях</p>
            <div className="footer-socials">
              <a href="https://vk.com/volkovacapital" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24">
                  <path d="M13.2 17.5c-5.1 0-8-3.5-8.1-9.3h2.6c.1 4.2 1.9 6 3.4 6.4V8.2h2.5v3.7c1.5-.2 3-1.8 3.5-3.7h2.5a7 7 0 0 1-3.2 4.6 7.2 7.2 0 0 1 3.8 4.7h-2.8c-.5-1.8-1.9-3.2-3.8-3.4v3.4h-.4Z" />
                </svg>
                <span>VK</span>
              </a>
              <a href="https://youtube.com/@capitalvolkova" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.2 31.2 0 0 0 0 12c0 2 .2 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.3-1.9.5-3.8.5-5.8s-.2-3.9-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z" />
                </svg>
                <span>YouTube</span>
              </a>
              <a href="https://t.me/+nfQKi7Kjr4MwYTVi" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24">
                  <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm5.6 7.9-1.8 8.5c-.1.6-.5.8-1 .5l-2.8-2.1-1.4 1.3c-.1.2-.3.3-.6.3l.2-2.9 5.2-4.7c.2-.2-.1-.3-.4-.1l-6.4 4-2.8-.9c-.6-.2-.6-.6.1-.8l10.9-4.2c.5-.2 1 .1.8 1.1Z" />
                </svg>
                <span>Telegram</span>
              </a>
              <a href="https://dzen.ru/volkovacapital" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 129 129">
                  <path d="M128.389 62.7804C128.389 62.1406 127.869 61.6108 127.229 61.5808C104.266 60.7111 90.2906 57.782 80.5136 48.0051C70.7167 38.2081 67.7976 24.2225 66.9279 1.20969C66.9079 0.569886 66.3781 0.0500488 65.7283 0.0500488H63.0491C62.4093 0.0500488 61.8795 0.569886 61.8495 1.20969C60.9797 24.2125 58.0607 38.2081 48.2637 48.0051C38.4768 57.792 24.5111 60.7111 1.54831 61.5808C0.908509 61.6008 0.388672 62.1306 0.388672 62.7804V65.4596C0.388672 66.0994 0.908509 66.6292 1.54831 66.6592C24.5111 67.529 38.4868 70.458 48.2637 80.235C58.0407 90.0119 60.9597 103.958 61.8395 126.88C61.8595 127.52 62.3893 128.04 63.0391 128.04H65.7283C66.3681 128.04 66.8979 127.52 66.9279 126.88C67.8076 103.958 70.7267 90.0119 80.5036 80.235C90.2906 70.448 104.256 67.529 127.219 66.6592C127.859 66.6392 128.379 66.1094 128.379 65.4596V62.7804H128.389Z" />
                </svg>
                <span>Дзен</span>
              </a>
              <a href="https://max.ru/volkovacapital" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 46 42">
                  <path fillRule="evenodd" clipRule="evenodd" d="M21.4701 41.58C17.3601 41.58 15.4501 40.98 12.1301 38.58C10.0301 41.28 3.38008 43.39 3.09008 39.78C3.09008 37.07 2.49008 34.78 1.81008 32.28C1.00008 29.2 0.0800781 25.77 0.0800781 20.8C0.0800781 8.93 9.82008 0 21.3601 0C32.9101 0 41.9601 9.37 41.9601 20.91C41.9787 26.3666 39.8316 31.6076 35.9902 35.4829C32.1487 39.3581 26.9266 41.5509 21.4701 41.58ZM21.6401 10.26C16.0201 9.97 11.6401 13.86 10.6701 19.96C9.87008 25.01 11.2901 31.16 12.5001 31.48C13.0801 31.62 14.5401 30.44 15.4501 29.53C16.9548 30.5695 18.7071 31.1938 20.5301 31.34C23.3293 31.4746 26.0697 30.5057 28.1622 28.6414C30.2546 26.777 31.5321 24.1662 31.7201 21.37C31.8295 18.568 30.8346 15.8351 28.9495 13.7592C27.0643 11.6833 24.4396 10.4303 21.6401 10.27V10.26Z" />
                </svg>
                <span>Макс</span>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <p className="footer-title">Документы</p>
            <nav className="footer-documents">
              <a href="https://monterium.ru/pl/fileservice/user/file/download/h/b69030d4c94baeb8f2dd2fd7775df5ed.pdf" target="_blank" rel="noopener">Политика обработки персональных данных</a>
              <a href="https://monterium.ru/pl/fileservice/user/file/download/h/5bdab7bbf2de4293f7fa895ef1dfdca3.pdf" target="_blank" rel="noopener">Согласие на обработку персональных данных</a>
              <a href="https://monterium.ru/pl/fileservice/user/file/download/h/0299becb7a7fe4a85eea80dbcff2f411.pdf" target="_blank" rel="noopener">Согласие на получение рекламы</a>
              <a href="https://monterium.site/doc" target="_blank" rel="noopener">Сведения об образовательной организации</a>
              <a href="https://monterium.ru/pl/fileservice/user/file/download/h/4aeaf22ebca129e110ba8f0426a97143.pdf" target="_blank" rel="noopener">Оферта</a>
              <a href="https://monterium.ru/pl/fileservice/user/file/download/h/a69c03368bbda7b408c2adfbce471c6c.pdf" target="_blank" rel="noopener">Правила акции</a>
            </nav>
            <div className="footer-company">
              <p>АНО ДПО «ИНСТИТУТ СОВРЕМЕННЫХ ТЕХНОЛОГИЙ И ФИНАНСОВ "МОНТЕРИУМ"»</p>
              <p>ИНН: 9722112084</p>
              <p>ОГРН: 1267700011094</p>
            </div>
          </div>

          <div className="footer-col">
            <p className="footer-title">Контакты</p>
            <div className="footer-contacts">
              <a href="tel:+79651366352">+7 965 136 63 52</a>
              <a href="mailto:sluzhba_zaboty@plus-fin.ru">sluzhba_zaboty@plus-fin.ru</a>
              <a href="https://t.me/+79651366352" target="_blank" rel="noopener">Telegram</a>
              <a href="https://wa.me/79651366352" target="_blank" rel="noopener">WhatsApp</a>
            </div>
          </div>
        </div>
      </footer>

      {activeTariffPopup && (
        <div className="modal-overlay" onClick={() => setActiveTariffPopup(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-title-wrap">
                <h3>Регистрация на курс</h3>
                <span className="modal-subtitle">{activeTariffPopup.title} · {activeTariffPopup.price}</span>
              </div>
              <button className="modal-close-btn" onClick={() => setActiveTariffPopup(null)} aria-label="Закрыть">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="modal-close-svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <GetCourseWidget scriptId={activeTariffPopup.scriptId} widgetId={activeTariffPopup.widgetId} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
