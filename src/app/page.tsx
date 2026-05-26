"use client";

import React, { useState, useEffect, useRef } from "react";

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

const forWhomData = [
  {
    num: "01",
    title: "Тревога за семью",
    desc: "Вы хотите финансовую опору для семьи, а не жизнь от зарплаты до зарплаты.",
    after: "У вас будет система, которая превращает часть дохода в растущий капитал. Не «когда-нибудь потом», а по конкретному плану.",
    img: "images/target_1.jpeg",
  },
  {
    num: "02",
    title: "Тревога о будущем",
    desc: "Вы понимаете, что на одну пенсию жить не получится — и хотите успеть создать капитал.",
    after: "Вы будете знать, сколько нужно откладывать, куда направлять и как защитить то, что уже есть.",
    img: "images/target_2.jpeg",
  },
  {
    num: "03",
    title: "Финансовый хаос",
    desc: "Деньги приходят, но системы нет — и вы чувствуете, что теряете контроль.",
    after: "Вместо хаоса — система. Вместо тревоги — план. Вместо «что делать с деньгами» — работающий портфель.",
    img: "images/target_3.jpeg",
  },
  {
    num: "04",
    title: "Есть опыт, нет системы",
    desc: "Вы уже инвестируете, но без стратегии — покупаете по интуиции, реагируете на новости.",
    after: "Вы пересоберёте портфель по системе — с обоснованием каждой позиции и протоколами на случай паники.",
    img: "images/target_4.jpeg",
  },
];

const toolsData = [
  { num: "01", title: "Инвестиционный дневник", desc: "Фиксируйте решения, эмоции, инсайты. Снижает риск импульсивных покупок." },
  { num: "02", title: "Инвестиционный план на 1 страницу", desc: "Цель, горизонт, риск-профиль, правила пополнения. Заменит 100 часов поиска." },
  { num: "03", title: "Библиотека калькуляторов", desc: "5 связанных таблиц в Google Sheets с инструкциями и примерами." },
  { num: "04", title: "3 скринера инструментов", desc: "Облигации, акции, фонды — фильтруйте тысячи бумаг за 15 минут." },
  { num: "05", title: "Карточки анализа", desc: "Структурированная оценка каждого инструмента перед покупкой." },
  { num: "06", title: "Матрица личных рисков", desc: "4 оси оценки: финансовые, поведенческие, внешние, технические." },
  { num: "07", title: "8 чек-листов и протоколов", desc: "«Анти-паника», «Анти-FOMO», «Ребалансировка» — правила на случай эмоций." },
  { num: "08", title: "Готовый инвестиционный портфель", desc: "Структура под вашу цель: инструменты, пропорции, правила пересмотра." },
  { num: "09", title: "Налоговая схема", desc: "Какой вычет положен, когда подавать декларацию, как законно сохранить максимум." },
  { num: "10", title: "Дорожная карта развития", desc: "Ваш план на 6–12 месяцев после программы." },
];

const modulesData = [
  {
    title: "Фундамент",
    topics: [
      { num: "1.1", text: "Введение в инвестиционную деятельность: ключевые понятия и механизмы" },
      { num: "1.2", text: "Инвестиции в экономической системе: механизмы и взаимосвязи" },
      { num: "1.3", text: "Математика инвестирования: сложный процент и временная стоимость денег" },
      { num: "1.4", text: "Риск-профиль и инвестиционный горизонт: методы оценки и классификации" },
      { num: "1.5", text: "Психология инвестора: когнитивные искажения и методы осознания" },
      { num: "1.6", text: "Поведенческие паттерны рынка: эмоциональные циклы и влияние медиа" },
      { num: "1.7", text: "Инвестиционная дисциплина: стратегии формирования привычек" },
      { num: "1.8", text: "Управление инвестиционными рисками: матрица рисков и методы защиты" },
      { num: "1.9", text: "Инвестиционный план: интеграция целей в персональную стратегию" },
    ],
    results: [
      "Определите свой риск-профиль и перестанете принимать решения на эмоциях",
      "Рассчитаете, сколько нужно откладывать ежемесячно для достижения финансовой цели",
      "Составите инвестиционный план на одной странице — вашу личную дорожную карту",
    ],
  },
  {
    title: "Инфраструктура",
    topics: [
      { num: "2.1", text: "Введение в инфраструктуру рынка: ключевые понятия и механизмы" },
      { num: "2.2", text: "Механизмы сделок: этапы исполнения и расчётные процедуры" },
      { num: "2.3", text: "Активы российского рынка: типы, категории, сегментация" },
      { num: "2.4", text: "Диверсификация: методология распределения рисков" },
      { num: "2.5", text: "Типы счетов: брокерский счет и ИИС" },
      { num: "2.6", text: "Выбор брокера: критерии оценки и алгоритмы отбора" },
      { num: "2.7", text: "Практикум: работа с демо-счётом и первичные операции" },
    ],
    results: [
      "Разберётесь, как устроен рынок — биржа, брокер, депозитарий",
      "Выберете брокера по объективным критериям, а не по рекламе",
      "Совершите первые сделки на демо-счёте — без риска и страха",
    ],
  },
  {
    title: "Облигации",
    topics: [
      { num: "3.1", text: "Введение в долговые инструменты: ключевые понятия и механизмы" },
      { num: "3.2", text: "Классификация типов облигаций" },
      { num: "3.3", text: "Параметры облигаций: купоны, НКД, дюрация, оферта" },
      { num: "3.4", text: "Доходность облигаций: виды и сравнительный анализ" },
      { num: "3.5", text: "Эмитенты облигаций: методология отбора и анализа" },
      { num: "3.6", text: "Алгоритмы скрининга и сравнения облигаций" },
      { num: "3.7", text: "Матрица рисков и методы защиты" },
      { num: "3.8", text: "Интеграция в портфель и стратегии применения" },
    ],
    results: [
      "Научитесь считать реальную доходность облигаций, а не ту, что пишут в заголовках",
      "Оцените кредитный риск эмитента до покупки, а не после потери денег",
      "Соберёте подборку облигаций через скринер — за 15 минут вместо часов",
    ],
  },
  {
    title: "Акции",
    topics: [
      { num: "4.1", text: "Введение в долевые инструменты: ключевые понятия" },
      { num: "4.2", text: "Классификация акций: инвестиционные стили, циклическая динамика" },
      { num: "4.3", text: "Дивидендная политика эмитента и оценка доходности" },
      { num: "4.4", text: "Отраслевая структура фондового рынка" },
      { num: "4.5", text: "Финансовая отчетность эмитента: стандарты учета, диагностика устойчивости" },
      { num: "4.6", text: "Мультипликаторы как инструмент оценки" },
      { num: "4.7–4.10", text: "Скрининг, анализ, матрица рисков, интеграция в портфель" },
    ],
    results: [
      "Освоите мультипликаторы и перестанете покупать «по совету»",
      "Научитесь оценивать бизнес за акцией, а не просто график цены",
      "Сформируете акционную часть портфеля с обоснованием каждой позиции",
    ],
  },
  {
    title: "Фонды",
    topics: [
      { num: "5.1", text: "Введение в коллективные инвестиции: ключевые понятия и механизмы" },
      { num: "5.2", text: "Типология инвестиционных инструментов: организационно-правовые формы" },
      { num: "5.3", text: "Параметры фондов: комиссии, TER, трекинг-эррор" },
      { num: "5.4–5.6", text: "Скрининг, матрица рисков, интеграция в портфель" },
    ],
    results: [
      "Поймёте, когда фонд выгоднее отдельных бумаг",
      "Научитесь сравнивать фонды по TER, трекинг-эррору и ликвидности",
      "Встроите фонды в портфель как ядро пассивной стратегии",
    ],
  },
  {
    title: "Альтернативные инвестиции",
    topics: [
      { num: "6.2", text: "Золото: монетарная функция, ценообразование, инвестиционные формы" },
      { num: "6.3", text: "Бриллианты как объект инвестирования" },
      { num: "6.4", text: "Недвижимость: прямые вложения, фондовые аналоги, метрики доходности" },
      { num: "6.5", text: "Цифровые активы в портфеле: блокчейн, оценка, регуляторные риски" },
      { num: "6.6–6.7", text: "Матрица рисков и интеграция в портфель" },
    ],
    results: [
      "Разберётесь, когда золото или недвижимость уместны, а когда это маркетинговая ловушка",
      "Оцените реальные риски альтернативных активов до вложения денег",
      "Получите чек-лист «Когда альтернатива уместна»",
    ],
  },
  {
    title: "Управление портфелем",
    topics: [
      { num: "7.1", text: "Введение в управление портфелем" },
      { num: "7.2", text: "Целеполагание и риск-профилирование" },
      { num: "7.3", text: "Аллокация активов: методологии распределения и модели портфелей" },
      { num: "7.4", text: "Ребалансировка портфеля: алгоритмы и правила принятия решений" },
      { num: "7.5", text: "Налоговая оптимизация: методы, вычеты, отчётность" },
    ],
    results: [
      "Соберёте все активы в единую структуру с правилами корректировки",
      "Разберётесь с налогами и вычетами, чтобы не переплачивать",
      "Настроите систему ребалансировки, которая работает без эмоций",
    ],
  },
  {
    title: "Итоговый проект — Защита портфеля",
    topics: [
      { num: "8.1", text: "Формирование инвестиционного портфеля: методология и структура" },
      { num: "8.2", text: "Обоснование стратегии: расчёт доходности и оценка рисков" },
      { num: "8.3", text: "Защита проекта: презентация и экспертная оценка" },
      { num: "8.4", text: "Дальнейшее развитие: дорожная карта и ресурсы для роста" },
    ],
    results: [
      "Защитите свой портфель перед экспертом и получите персональную обратную связь",
      "Уйдёте с готовым планом на 6–12 месяцев",
      "Получите сертификат и портфолио, подтверждающие ваши компетенции",
    ],
  },
];

const faqsData = [
  {
    q: "У меня нет опыта в инвестициях. Я справлюсь?",
    a: "Да. Программа спроектирована для тех, кто начинает с нуля. Первые модули закладывают фундамент: что такое рынок, как он работает, как открыть счёт. Практика начинается на демо-счёте — без риска потерять реальные деньги. Среди наших учеников есть те, кто до программы не знал, что такое облигация, — и успешно защитили собственный портфель на итоговом проекте.",
  },
  {
    q: "Мне 50+ лет. Не поздно ли начинать?",
    a: "Нет. Среди наших учеников есть люди и в 60, и в 76 лет. Возраст влияет на стратегию — но не на возможность начать. В программе вы научитесь выстраивать портфель именно под ваш горизонт: более консервативный, с акцентом на стабильный доход и защиту капитала. Поздно — это не начать вовсе.",
  },
  {
    q: "Сколько денег нужно, чтобы начать инвестировать?",
    a: "На время обучения — нисколько. Вся практика проходит на демо-счёте. Для реальных инвестиций после программы достаточно суммы от 1 000–5 000 ₽. На российском рынке нет высокого порога входа. Программа учит работать с любым бюджетом и выстраивать систему регулярных пополнений.",
  },
  {
    q: "Какой формат обучения? Нужно ли быть онлайн в определённое время?",
    a: "Программа дистанционная с гибким графиком. Уроки — в записи, вы проходите их в удобном темпе. Синхронные элементы (офис-часы с кураторами, разборы) проводятся регулярно, но записи доступны. Рекомендуемый ритм — 8–12 недель, но вы адаптируете его под свой график.",
  },
  {
    q: "Вы гарантируете доходность?",
    a: "Нет. И это принципиальная позиция. Никто на рынке не может гарантировать доходность — это запрещено законодательством РФ и требованиями ЦБ. Мы гарантируем другое: вы получите систему, инструменты и навыки для принятия осознанных инвестиционных решений. Результат зависит от вашей дисциплины и качества вашего анализа.",
  },
  {
    q: "Чем эта программа отличается от бесплатных материалов в интернете?",
    a: "Тремя вещами. Система: это не разрозненные видео, а выстроенная программа из 46 уроков, где каждый шаг ведёт к следующему. Инструменты: вы уходите с 10 рабочими шаблонами — скринеры, калькуляторы, чек-листы, готовый портфель — которые работают годами. Ответственность: кураторы проверяют ваши практикумы, дают обратную связь, а итоговый проект вы защищаете перед экспертом.",
  },
  {
    q: "Можно ли оплатить в рассрочку?",
    a: "Да. Банковская рассрочка 0% — от 5 999 до 14 999 ₽/мес в зависимости от тарифа. Также есть внутренняя рассрочка от компании. Подробности — при выборе тарифа.",
  },
  {
    q: "Какой документ я получу после обучения?",
    a: "Сертификат установленного образца с указанием освоенных компетенций. Плюс — портфолио: ваш инвестиционный план, защищённый портфель и набор инструментов, которые вы создали в процессе обучения.",
  },
  {
    q: "Я боюсь потерять деньги. Это нормально?",
    a: "Абсолютно. Этот страх — признак здравого смысла, а не слабости. Именно поэтому первые модули программы посвящены психологии инвестора, определению вашего риск-профиля и инструментам защиты.",
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
  const [activeModule, setActiveModule] = useState<number | null>(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
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
            <a href="#about" onClick={(e) => handleAnchorClick(e, "about")}>О программе</a>
            <a href="#program" onClick={(e) => handleAnchorClick(e, "program")}>Программа</a>
            <a href="#experts" onClick={(e) => handleAnchorClick(e, "experts")}>Эксперты</a>
            <a href="#pricing" onClick={(e) => handleAnchorClick(e, "pricing")}>Тарифы</a>
            <a href="#faq" onClick={(e) => handleAnchorClick(e, "faq")}>Вопросы</a>
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
        <a href="#about" onClick={(e) => handleAnchorClick(e, "about")} className="mobile-link">О программе</a>
        <a href="#program" onClick={(e) => handleAnchorClick(e, "program")} className="mobile-link">Программа</a>
        <a href="#experts" onClick={(e) => handleAnchorClick(e, "experts")} className="mobile-link">Эксперты</a>
        <a href="#pricing" onClick={(e) => handleAnchorClick(e, "pricing")} className="mobile-link">Тарифы</a>
        <a href="#faq" onClick={(e) => handleAnchorClick(e, "faq")} className="mobile-link">Вопросы</a>
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
                  <div><strong>Сертификат</strong><span>установленного образца по прохождению программы</span></div>
                </li>
              </ul>

              <div className="hero-actions">
                <a href="#pricing" onClick={(e) => handleAnchorClick(e, "pricing")} className="cta cta-primary hero-cta" id="hero-cta-btn">Выбрать тариф →</a>
                <p className="hero-note">Рассрочка — от 5&nbsp;999&nbsp;₽/мес.</p>
              </div>
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
            <span>Сертификат</span>
            <span className="sep">·</span>
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
            <span>Сертификат</span>
            <span className="sep">·</span>
          </div>
        </div>

        {/* ===== TIMELINE / 8 НЕДЕЛЬ ===== */}
        <section className="section timeline-section reveal-section" id="about">
          <div className="container">
            <div className="section-head">
              <p className="section-kicker">Результат недели за неделей</p>
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

        {/* ===== FOR WHOM ===== */}
        <section className="section forwhom-section reveal-section">
          <div className="container">
            <div className="section-head section-head-light">
              <h2>Эта программа — для вас, если</h2>
              <p>Не важно, сколько вам лет, какой у вас доход и есть ли опыт. Важно — что вы чувствуете прямо сейчас.</p>
            </div>

            <div className="forwhom-grid">
              {forWhomData.map((item, idx) => (
                <article key={idx} className="forwhom-card reveal-item">
                  {idx % 2 === 0 ? (
                    <>
                      <div className="forwhom-img-wrap">
                        <img src={item.img} alt={item.title} className="forwhom-img" width="500" height="340" loading="lazy" />
                      </div>
                      <div className="forwhom-body">
                        <span className="forwhom-num">{item.num}</span>
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                        <div className="forwhom-after">
                          <span>После программы:</span>
                          {item.after}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="forwhom-body">
                        <span className="forwhom-num">{item.num}</span>
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                        <div className="forwhom-after">
                          <span>После программы:</span>
                          {item.after}
                        </div>
                      </div>
                      <div className="forwhom-img-wrap">
                        <img src={item.img} alt={item.title} className="forwhom-img" width="500" height="340" loading="lazy" />
                      </div>
                    </>
                  )}
                </article>
              ))}
            </div>

            <p className="forwhom-social-proof reveal-item">
              70&nbsp;000+ учеников уже прошли этот путь. Среди них — те, кто начинал точно с такими же сомнениями, как у вас.
            </p>
            <div className="forwhom-cta-wrap reveal-item">
              <a href="#pricing" onClick={(e) => handleAnchorClick(e, "pricing")} className="cta cta-primary" id="forwhom-cta-btn">Забронировать место в потоке →</a>
            </div>
          </div>
        </section>

        {/* ===== TOOLS ===== */}
        <section className="section tools-section reveal-section" id="tools">
          <div className="container">
            <div className="tools-layout">
              <div className="tools-copy">
                <h2>10 рабочих инструментов,<br />которые останутся<br />с вами <span className="heading-accent">навсегда*</span></h2>
                <p className="tools-lead">Знания устаревают. Инструменты — работают годами.</p>

                <div className="tools-grid">
                  {toolsData.map((tool, idx) => (
                    <div key={idx} className="tool-item reveal-item">
                      <span className="tool-icon">{tool.num}</span>
                      <div>
                        <strong>{tool.title}</strong>
                        <p>{tool.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="tools-footnote">* Полный набор — только для тарифов «Практика», «Портфель», «Капитал»</p>
                <a href="#pricing" onClick={(e) => handleAnchorClick(e, "pricing")} className="cta cta-primary tools-cta" id="tools-cta-btn">Получить все 10 инструментов →</a>
              </div>

              <div className="tools-visual reveal-item">
                <img src="images/tools_visual.jpeg" alt="10 инструментов инвестора" className="tools-img" width="540" height="480" loading="lazy" />
                <div className="tools-accent-card">
                  <strong>Программа заканчивается.<br />Инфраструктура — остаётся.</strong>
                  <p>Дорабатывайте, масштабируйте и используйте эти инструменты годами.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section className="section howitworks-section reveal-section">
          <div className="container">
            <div className="section-head">
              <h2>Как проходит обучение</h2>
            </div>
            <div className="hiw-grid">
              <div className="hiw-card reveal-item">
                <span className="hiw-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="hiw-svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <div className="hiw-content">
                  <h3>Личный кабинет</h3>
                  <p>Доступ к урокам в личном кабинете на GetCourse. Учитесь в удобном темпе.</p>
                </div>
              </div>
              <div className="hiw-card reveal-item">
                <span className="hiw-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="hiw-svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </span>
                <div className="hiw-content">
                  <h3>Видеоуроки</h3>
                  <p>15–20 минут каждый. Конспекты, презентации и практические задания в каждом модуле.</p>
                </div>
              </div>
              <div className="hiw-card reveal-item">
                <span className="hiw-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="hiw-svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </span>
                <div className="hiw-content">
                  <h3>Доп. материалы</h3>
                  <p>Шаблоны, чек-листы, калькуляторы (Excel), сравнительные таблицы в подарок.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== PROGRAM ===== */}
        <section className="section program-section reveal-section" id="program">
          <div className="container">
            <div className="section-head">
              <h2>Программа образовательного курса</h2>
              <p>8 модулей + 3 бонусных · 46 уроков · от основ до защиты портфеля перед экспертом</p>
            </div>

            <div className="modules-accordion" id="modules-accordion">
              {modulesData.map((item, idx) => {
                const isOpen = activeModule === idx;
                return (
                  <details
                    key={idx}
                    className="module-item reveal-item"
                    open={isOpen}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveModule(isOpen ? null : idx);
                    }}
                  >
                    <summary className="module-header">
                      <div className="module-header-inner">
                        <span className="module-num">{String(idx + 1).padStart(2, "0")}</span>
                        <span className="module-title">{item.title}</span>
                      </div>
                      <svg
                        className="module-arrow"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <div className="module-body">
                      <div className="module-topics">
                        {item.topics.map((topic, tIdx) => (
                          <div key={tIdx} className="topic-row">
                            <span>{topic.num}</span>
                            <p>{topic.text}</p>
                          </div>
                        ))}
                      </div>
                      <div className="module-result">
                        <span>Результат модуля:</span>
                        <ul className="result-list">
                          {item.results.map((res, rIdx) => (
                            <li key={rIdx} className="result-item">
                              <svg className="result-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                              <span>{res}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </details>
                );
              })}
            </div>

            {/* Бонусные модули */}
            <div className="bonus-modules reveal-item">
              <div className="bonus-modules-head">
                <p className="section-kicker" style={{ color: "#ffd7b5" }}>Бонусные модули</p>
                <h3>Доступны на тарифах: Практика / Портфель / Капитал</h3>
              </div>
              <div className="bonus-modules-grid">
                <article className="bonus-module-card">
                  <span className="bonus-module-num">Бонус 1</span>
                  <h4>«Финансовая независимость и FIRE-стратегии»</h4>
                  <p>5 уроков: расчёт «точки выхода», путь к FIRE, жизнь после FIRE в российских реалиях</p>
                  <ul className="bonus-outcomes-list">
                    <li className="bonus-outcome-item">
                      <svg className="bonus-outcome-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Рассчитаете свою «точку свободы»</span>
                    </li>
                    <li className="bonus-outcome-item">
                      <svg className="bonus-outcome-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Построите реалистичный маршрут к финансовой независимости</span>
                    </li>
                  </ul>
                </article>
                <article className="bonus-module-card">
                  <span className="bonus-module-num">Бонус 2</span>
                  <h4>«Психологическая устойчивость в кризисы»</h4>
                  <p>5 уроков: эмоциональный цикл кризиса, история кризисов, антихрупкость по Талебу</p>
                  <ul className="bonus-outcomes-list">
                    <li className="bonus-outcome-item">
                      <svg className="bonus-outcome-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Разработаете кризисный протокол</span>
                    </li>
                    <li className="bonus-outcome-item">
                      <svg className="bonus-outcome-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Научитесь читать фазу рынка</span>
                    </li>
                  </ul>
                </article>
                <article className="bonus-module-card">
                  <span className="bonus-module-num">Бонус 3</span>
                  <h4>«Планирование наследства и передача капитала»</h4>
                  <p>5 уроков: инструменты передачи капитала, наследование активов, налоги</p>
                  <ul className="bonus-outcomes-list">
                    <li className="bonus-outcome-item">
                      <svg className="bonus-outcome-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Оформите передачу активов без судов</span>
                    </li>
                    <li className="bonus-outcome-item">
                      <svg className="bonus-outcome-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Создадите «гид для наследника»</span>
                    </li>
                  </ul>
                </article>
              </div>
            </div>

            <div className="program-cta-wrap reveal-item">
              <a href="#pricing" onClick={(e) => handleAnchorClick(e, "pricing")} className="cta cta-primary" id="program-cta-btn">Хочу собрать свой портфель →</a>
            </div>
          </div>
        </section>

        {/* ===== EXPERTS ===== */}
        <section className="section experts-section reveal-section" id="experts">
          <div className="container">
            <div className="section-head">
              <h2>Эксперты образовательной программы</h2>
            </div>

            <div className="experts-grid">
              <article className="expert-card reveal-item">
                <div className="expert-photo-wrap">
                  <img src="images/speaker_tatyana.webp" alt="Татьяна Волкова" className="expert-photo" width="200" height="240" loading="lazy" />
                </div>
                <div className="expert-body">
                  <h3>Татьяна Волкова</h3>
                  <p className="expert-role">Эксперт по созданию личного капитала</p>
                  <ul className="expert-facts">
                    <li>Более 13 лет занимается финансовым образованием населения</li>
                    <li>Эксперт по созданию личного капитала, предприниматель и инвестор</li>
                    <li>Объясняет сложные финансовые инструменты простым языком</li>
                    <li>70 000+ учеников прошли обучение</li>
                  </ul>
                </div>
              </article>

              <article className="expert-card expert-card-alt reveal-item">
                <div className="expert-body">
                  <h3>Полина Брежестовская</h3>
                  <p className="expert-role">Финансовый консультант, преподаватель</p>
                  <ul className="expert-facts">
                    <li>Начала инвестировать с 50 000 ₽ в 2021 году, сейчас портфель — 1 100 000 ₽</li>
                    <li>Ежемесячно получает пассивный доход в облигациях, который формирует капитал на пенсию</li>
                    <li>Партнер страховой компании «ДЕЛО ЖИЗНИ»</li>
                  </ul>
                </div>
                <div className="expert-photo-wrap">
                  <img src="images/polina-speaker.png" alt="Полина Брежестовская" className="expert-photo" width="200" height="240" loading="lazy" />
                </div>
              </article>
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
                <div className="pricing-featured-badge">Популярный</div>
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

        {/* ===== REVIEWS ===== */}
        <section className="section reviews-section reveal-section" id="reviews">
          <div className="container">
            <div className="section-head">
              <p className="section-kicker">Отзывы</p>
              <h2>Что говорят наши ученики</h2>
            </div>
            <div className="reviews-grid">
              <article className="review-card reveal-item">
                <div className="review-stars">★★★★★</div>
                <p className="review-text">«Начинала с полного нуля. Теперь у меня есть портфель из облигаций и акций, который приносит стабильный доход. Татьяна объясняет так, что всё становится понятельным.»</p>
                <div className="review-author">
                  <span className="review-avatar">НК</span>
                  <div>
                    <strong>Наталья К.</strong>
                    <span>Домохозяйка, 45 лет</span>
                  </div>
                </div>
              </article>

              <article className="review-card reveal-item">
                <div className="review-stars">★★★★★</div>
                <p className="review-text">«Раньше покупал акции по советам в чатах. После курса пересобрал весь портфель по системе. Теперь каждое решение обосновано — и спать спокойнее.»</p>
                <div className="review-author">
                  <span className="review-avatar">АМ</span>
                  <div>
                    <strong>Андрей М.</strong>
                    <span>IT-специалист, 38 лет</span>
                  </div>
                </div>
              </article>

              <article className="review-card reveal-item">
                <div className="review-stars">★★★★★</div>
                <p className="review-text">«Мне 62 года, и я думала, что поздно начинать. Оказалось — нет. За 8 недель составила консервативный портфель с фокусом на облигации и дивиденды. Теперь у меня есть план на пенсию.»</p>
                <div className="review-author">
                  <span className="review-avatar">ЛС</span>
                  <div>
                    <strong>Людмила С.</strong>
                    <span>Педагог, 62 года</span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="section faq-section reveal-section" id="faq">
          <div className="container">
            <div className="section-head">
              <p className="section-kicker">Остались вопросы</p>
              <h2>Частые вопросы</h2>
            </div>

            <div className="faq-list">
              {faqsData.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <details
                    key={idx}
                    className="faq-item reveal-item"
                    open={isOpen}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveFaq(isOpen ? null : idx);
                    }}
                  >
                    <summary className="faq-q">{faq.q}</summary>
                    <div className="faq-a">
                      <p>{faq.a}</p>
                    </div>
                  </details>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== FINAL CTA ===== */}
        <section className="final-section reveal-section">
          <div className="container">
            <div className="final-panel reveal-item">
              <div className="final-visual">
                <img src="images/portfolio_growth.jpeg" alt="Финансовая свобода" className="final-img" width="500" height="340" loading="lazy" />
              </div>
              <div className="final-copy">
                <h2>Вы уже знаете, что хотите большего.<br />Осталось — начать.</h2>
                <p className="final-text">Вы можете продолжать откладывать. А можете через 8 недель защитить свой первый инвестиционный портфель, собранный по системе, с инструментами, которые останутся с вами на годы.</p>
                <a href="#pricing" onClick={(e) => handleAnchorClick(e, "pricing")} className="cta cta-primary final-cta" id="final-cta-btn">Выбрать тариф и начать обучение →</a>
                <p className="final-note">Рассрочка от банка · Внутренняя рассрочка · Оплата в 2 клика</p>
              </div>
            </div>
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
                <svg viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 11v5h-2v-5H6v-2h5V6h2v5h5v2h-5Z" />
                </svg>
                <span>Дзен</span>
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
              <a href="https://monterium.ru/oferta_fn" target="_blank" rel="noopener">Оферта</a>
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
