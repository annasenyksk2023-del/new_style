import { useEffect, useRef, useState } from 'react';
import { Instagram, Twitter, Youtube, Send, ArrowRight, ArrowLeft, FileText, Headphones, Video, Menu, X } from 'lucide-react';

/* ── Color tokens ──
   ЗМІНЕНО для Лр4 (Крок 2 — Зміна стилів через «Вайб-кодинг»):
   Нова палітра:   #7c3aed (фіолетовий) + #fbbf24 (золотий)
   Нові шрифти:    Playfair Display (заголовки) + DM Sans (текст)
*/
const C = {
  primary:  '#7c3aed',
  accent:   '#fbbf24',
  primaryR: '124,58,237',
  accentR:  '251,191,36',
  soft:     '#c084fc',
  softR:    '192,132,252',
};

function useIntersectionObserver(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function AnimatedSection({ children, className = '', delay = 0 }) {
  const { ref, visible } = useIntersectionObserver();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const formats = [
  {
    icon: FileText,
    title: 'Статті',
    desc: 'Глибокі лонгріди та короткі нотатки про тренди, субкультури та технології, що змінюють покоління.',
    tag: '#текст',
    accent: false,
  },
  {
    icon: Headphones,
    title: 'Подкасти',
    desc: 'Розмови з людьми, які формують нову культуру. Без скрипту, без фільтрів — чесно і по суті.',
    tag: '#аудіо',
    accent: true,
  },
  {
    icon: Video,
    title: 'Відео',
    desc: 'Документальні серії, інтервʼю та відеоесе про те, як виглядає майбутнє прямо зараз.',
    tag: '#відео',
    accent: false,
  },
];

const socials = [
  { icon: Instagram, label: 'Instagram', handle: '@spektr.media', href: '#' },
  { icon: Twitter, label: 'Twitter / X', handle: '@spektr_ua', href: '#' },
  { icon: Youtube, label: 'YouTube', handle: 'Spektr Media', href: '#' },
];

// Зображення для нової галереї
const galleryImages = [
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200", // gaming
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200", // retro tech
  "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1200"  // neon abstract
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Стейт для галереї
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  return (
    <div className="bg-[#0d0318] text-white min-h-screen font-sans overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ─── NAV (Оновлено: Покращений Glassmorphism) ─── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(13, 3, 24, 0.45)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
          borderBottom: scrolled ? `1px solid rgba(255, 255, 255, 0.08)` : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="text-xl font-black tracking-widest uppercase" style={{ color: C.accent }}>
            СПЕКТР
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-gray-400">
            <a href="#formats" className="hover:text-white transition-colors duration-200">Формати</a>
            <a href="#gallery" className="hover:text-white transition-colors duration-200">Галерея</a>
            <a href="#socials" className="hover:text-white transition-colors duration-200">Соцмережі</a>
            <a
              href="#subscribe"
              className="px-4 py-2 rounded-full text-[#0d0318] font-bold text-xs tracking-widest uppercase transition-all duration-200 hover:scale-105 hover:brightness-110"
              style={{ background: C.accent }}
            >
              Підписатись
            </a>
          </div>
          <button className="md:hidden text-gray-400 hover:text-white transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#120228] border-t border-purple-900/30 px-6 py-6 flex flex-col gap-5 text-sm font-medium">
            {(['#formats', '#gallery', '#socials', '#subscribe']).map((href, i) => (
              <a
                key={href}
                href={href}
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {['Формати', 'Галерея', 'Соцмережі', 'Розсилка'][i]}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col justify-center items-start overflow-hidden px-6 md:px-16 lg:px-24">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(${C.accentR},0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(${C.accentR},0.035) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div
          className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, rgba(${C.primaryR},0.2) 0%, transparent 70%)`,
            filter: 'blur(60px)',
            transform: 'translate(20%, 0)',
          }}
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-[350px] h-[350px] rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, rgba(${C.accentR},0.12) 0%, transparent 70%)`,
            filter: 'blur(60px)',
          }}
        />

        <div className="relative max-w-5xl pt-24">
          <div
            className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.3em] uppercase mb-8 px-4 py-2 rounded-full border"
            style={{ color: C.accent, borderColor: `rgba(${C.accentR},0.3)`, background: `rgba(${C.accentR},0.06)` }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background: C.accent }} />
            Незалежне медіа
          </div>
          <h1
            className="font-black leading-none tracking-tighter uppercase mb-8"
            style={{
              fontSize: 'clamp(3rem, 10vw, 8rem)',
              background: `linear-gradient(135deg, #ffffff 20%, ${C.soft} 55%, ${C.accent} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Культура<br />тут і зараз
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed mb-10">
            <span className="text-white font-semibold">Спектр</span> — незалежне медіа про молодіжну культуру, технології та людей, які створюють майбутнє. Чесно, сміливо, без цензури.
          </p>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsWJLpwg7R5xZcJaL1SlwiRnD00U5SP277iw&s" alt="Логотип медіа-проєкту Cyberion з жовтим перемикачем" className="w-64 mx-auto my-6" />
          <a href="https://github.com/annasenyksk2023-del/my-vibe-project" className="block mb-6 text-purple-400 hover:text-purple-300 underline">Посилання на гітхаб</a>
          <div className="flex flex-wrap gap-4">
            <a
              href="#formats"
              className="flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm tracking-wide uppercase text-[#0d0318] transition-all duration-200 hover:scale-105 hover:brightness-110"
              style={{ background: C.accent }}
            >
              Наші формати <ArrowRight size={16} />
            </a>
            <a
              href="#subscribe"
              className="flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm tracking-wide uppercase border transition-all duration-200 hover:scale-105"
              style={{ borderColor: `rgba(${C.primaryR},0.5)`, color: C.primary, background: 'transparent' }}
              onMouseEnter={e => (e.currentTarget.style.background = `rgba(${C.primaryR},0.1)`)}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              Підписатись на розсилку
            </a>
          </div>
        </div>
      </section>

      {/* ─── TICKER ─── */}
      <section className="border-y border-purple-900/30 py-5 overflow-hidden bg-[#110228]">
        <div className="flex gap-0 whitespace-nowrap" style={{ animation: 'marquee 22s linear infinite' }}>
          {Array(6).fill(null).map((_, i) => (
            <span key={i} className="inline-flex items-center gap-10 px-5 text-xs font-bold tracking-[0.25em] uppercase">
              <span style={{ color: `rgba(${C.accentR},0.55)` }}>Молодіжна Культура</span>
              <span style={{ color: `rgba(${C.primaryR},0.55)` }}>✦</span>
              <span style={{ color: `rgba(${C.accentR},0.55)` }}>Технології</span>
              <span style={{ color: `rgba(${C.primaryR},0.55)` }}>✦</span>
              <span style={{ color: `rgba(${C.accentR},0.55)` }}>Незалежне Медіа</span>
              <span style={{ color: `rgba(${C.primaryR},0.55)` }}>✦</span>
              <span style={{ color: `rgba(${C.accentR},0.55)` }}>Без Цензури</span>
              <span style={{ color: `rgba(${C.primaryR},0.55)` }}>✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* ─── FORMATS ─── */}
      <section id="formats" className="max-w-6xl mx-auto px-6 md:px-16 py-32 md:py-44">
        <AnimatedSection>
          <div className="mb-3 text-xs font-bold tracking-[0.3em] uppercase" style={{ color: C.primary }}>
            Що ми робимо
          </div>
          <h2 className="font-black tracking-tighter uppercase mb-20" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontFamily: "'Playfair Display', serif" }}>
            Наші <span style={{ color: C.accent }}>формати</span>
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {formats.map((f, i) => {
            const color = f.accent ? C.primary : C.accent;
            const colorR = f.accent ? C.primaryR : C.accentR;
            return (
              <AnimatedSection key={f.title} delay={i * 0.15}>
                <div
                  className="group relative rounded-2xl p-8 border h-full transition-all duration-500 ease-out cursor-pointer overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.07)' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `rgba(${colorR},0.5)`;
                    e.currentTarget.style.background = `rgba(${colorR},0.08)`;
                    e.currentTarget.style.transform = 'scale(1.03) translateY(-5px)';
                    e.currentTarget.style.boxShadow = `0 20px 60px -15px rgba(${colorR},0.25)`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                    e.currentTarget.style.transform = 'scale(1) translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div
                    className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, rgba(${colorR},0.12) 0%, transparent 70%)`,
                      filter: 'blur(20px)',
                      transform: 'translate(40%, -40%)',
                    }}
                  />
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                    style={{ background: `rgba(${colorR},0.12)` }}
                  >
                    <f.icon size={22} style={{ color }} />
                  </div>
                  <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color }}>
                    {f.tag}
                  </div>
                  <h3 className="text-2xl font-black tracking-tight uppercase mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      {/* ─── GALLERY (Нова секція з оновленими кнопками) ─── */}
      <section id="gallery" className="max-w-6xl mx-auto px-6 md:px-16 py-20">
        <AnimatedSection>
          <div className="mb-3 text-xs font-bold tracking-[0.3em] uppercase" style={{ color: C.accent }}>
            Атмосфера
          </div>
          <h2 className="font-black tracking-tighter uppercase mb-12" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontFamily: "'Playfair Display', serif" }}>
            Наш <span style={{ color: C.primary }}>простір</span>
          </h2>

          <div className="relative rounded-2xl overflow-hidden border border-purple-900/30 group">
            {/* Сама картинка */}
            <div className="aspect-video w-full relative">
              <img 
                src={galleryImages[currentSlide]} 
                alt={`Слайд ${currentSlide + 1}`} 
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0318] to-transparent opacity-60"></div>
            </div>

            {/* Контроли (великі золоті кнопки) */}
            <div className="absolute inset-0 flex items-center justify-between px-4 md:px-8 pointer-events-none">
              
              {/* Кнопка ВЛІВО */}
              <button 
                onClick={prevSlide}
                className="pointer-events-auto flex items-center justify-center rounded-full transition-all duration-300 group/btn"
                style={{
                  width: '64px',
                  height: '64px',
                  background: `rgba(${C.accentR}, 0.1)`,
                  border: `2px solid ${C.accent}`,
                  color: C.accent,
                  backdropFilter: 'blur(8px)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = C.accent;
                  e.currentTarget.style.color = '#0d0318';
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.boxShadow = `0 0 20px rgba(${C.accentR}, 0.4)`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = `rgba(${C.accentR}, 0.1)`;
                  e.currentTarget.style.color = C.accent;
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <ArrowLeft size={32} className="transition-transform group-hover/btn:-translate-x-1" />
              </button>

              {/* Кнопка ВПРАВО */}
              <button 
                onClick={nextSlide}
                className="pointer-events-auto flex items-center justify-center rounded-full transition-all duration-300 group/btn"
                style={{
                  width: '64px',
                  height: '64px',
                  background: `rgba(${C.accentR}, 0.1)`,
                  border: `2px solid ${C.accent}`,
                  color: C.accent,
                  backdropFilter: 'blur(8px)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = C.accent;
                  e.currentTarget.style.color = '#0d0318';
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.boxShadow = `0 0 20px rgba(${C.accentR}, 0.4)`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = `rgba(${C.accentR}, 0.1)`;
                  e.currentTarget.style.color = C.accent;
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <ArrowRight size={32} className="transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
            
            {/* Індикатори */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {galleryImages.map((_, idx) => (
                <div 
                  key={idx} 
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: currentSlide === idx ? '24px' : '8px',
                    background: currentSlide === idx ? C.accent : 'rgba(255,255,255,0.3)' 
                  }}
                />
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ─── MANIFESTO ─── */}
      <section className="px-6 md:px-16 py-28 md:py-36 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, rgba(${C.primaryR},0.07) 0%, transparent 50%, rgba(${C.accentR},0.05) 100%)`,
          }}
        />
        <AnimatedSection className="max-w-4xl mx-auto text-center relative">
          <p
            className="font-black tracking-tight leading-tight"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.8rem)', fontFamily: "'Playfair Display', serif" }}
          >
            Ми — незалежне студентське медіа, що досліджує перетин{' '}
            <span style={{ color: C.primary }}>технологій</span> та{' '}
            <span style={{ color: C.accent }}>сучасної культури</span>.{' '}
            Від безсонних ночей за дебагінгом складних структур даних до{' '}
            <span
              className="relative inline-block"
              style={{ borderBottom: `3px solid ${C.accent}`, paddingBottom: '2px' }}
            >
              кіберспортивних турнірів
            </span>{' '}
            та цифрового мистецтва
          </p>
        </AnimatedSection>
      </section>

      {/* ─── CYBERION BENEFITS (Із Лабораторної) ─── */}
      <section className="py-20 bg-[#0a0120] border-y border-purple-900/30">
        <AnimatedSection className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-12 tracking-tight border-l-4 pl-6 uppercase" style={{ borderColor: C.accent, fontFamily: "'Playfair Display', serif" }}>
            Переваги клубу Cyberion
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <li className="flex items-center p-5 bg-[#120228] rounded-xl border border-purple-900/40 hover:border-[#fbbf24] transition-colors shadow-sm group">
              <span className="text-[#fbbf24] mr-4 text-2xl group-hover:scale-110 transition-transform">⌨️</span>
              <span className="font-medium text-gray-200 tracking-wide">ТОПОВІ ДЕВАЙСИ</span>
            </li>
            <li className="flex items-center p-5 bg-[#120228] rounded-xl border border-purple-900/40 hover:border-[#fbbf24] transition-colors shadow-sm group">
              <span className="text-[#fbbf24] mr-4 text-2xl group-hover:scale-110 transition-transform">🎧</span>
              <span className="font-medium text-gray-200 tracking-wide">КОМФОРТНА АТМОСФЕРА</span>
            </li>
            <li className="flex items-center p-5 bg-[#120228] rounded-xl border border-purple-900/40 hover:border-[#fbbf24] transition-colors shadow-sm group">
              <span className="text-[#fbbf24] mr-4 text-2xl group-hover:scale-110 transition-transform">🥤</span>
              <span className="font-medium text-gray-200 tracking-wide">ДОСТУПНІ НАПОЇ ТА СНЕКИ</span>
            </li>
            <li className="flex items-center p-5 bg-[#120228] rounded-xl border border-purple-900/40 hover:border-[#fbbf24] transition-colors shadow-sm group">
              <span className="text-[#fbbf24] mr-4 text-2xl group-hover:scale-110 transition-transform">🤝</span>
              <span className="font-medium text-gray-200 tracking-wide">ВВІЧЛИВІ ПРАЦІВНИКИ</span>
            </li>
            {/* ВЛАСНОРУЧ ДОДАНІ ПУНКТИ ДЛЯ ЛАБОРАТОРНОЇ №3 */}
            <li className="flex items-center p-5 bg-[#120228] rounded-xl border-dashed border-2 border-purple-700/50 hover:border-[#fbbf24] transition-colors shadow-sm group">
              <span className="text-[#fbbf24] mr-4 text-2xl group-hover:scale-110 transition-transform">⚡</span>
              <span className="font-medium text-[#fbbf24] italic tracking-wide">ШВИДКІСНИЙ ІНТЕРНЕТ 1 ГБІТ/С</span>
            </li>
            <li className="flex items-center p-5 bg-[#120228] rounded-xl border-dashed border-2 border-purple-700/50 hover:border-[#fbbf24] transition-colors shadow-sm group">
              <span className="text-[#fbbf24] mr-4 text-2xl group-hover:scale-110 transition-transform">🏆</span>
              <span className="font-medium text-[#fbbf24] italic tracking-wide">РЕГУЛЯРНІ ТУРНІРИ З ПРИЗАМИ</span>
            </li>
          </ul>
        </AnimatedSection>
      </section>

      {/* ─── SOCIALS ─── */}
      <section id="socials" className="max-w-6xl mx-auto px-6 md:px-16 py-32 md:py-44">
        <AnimatedSection>
          <div className="mb-3 text-xs font-bold tracking-[0.3em] uppercase" style={{ color: C.primary }}>
            Слідкуй за нами
          </div>
          <h2 className="font-black tracking-tighter uppercase mb-16" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontFamily: "'Playfair Display', serif" }}>
            Ми в <span style={{ color: C.accent }}>мережі</span>
          </h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {socials.map((s, i) => (
            <AnimatedSection key={s.label} delay={i * 0.1}>
              <a
                href={s.href}
                className="group flex items-center justify-between rounded-2xl px-6 py-5 border transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.07)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `rgba(${C.primaryR},0.4)`;
                  e.currentTarget.style.background = `rgba(${C.primaryR},0.06)`;
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `rgba(${C.primaryR},0.15)` }}
                  >
                    <s.icon size={18} style={{ color: C.primary }} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{s.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{s.handle}</div>
                  </div>
                </div>
                <ArrowRight size={15} className="text-gray-600 flex-shrink-0 group-hover:text-white transition-colors" />
              </a>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ─── SUBSCRIBE ─── */}
      <section id="subscribe" className="px-6 md:px-16 py-32 md:py-44 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 60%, rgba(${C.accentR},0.06) 0%, transparent 65%)` }}
        />
        <AnimatedSection className="max-w-xl mx-auto text-center relative">
          <div
            className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.3em] uppercase mb-6 px-4 py-2 rounded-full border"
            style={{ color: C.accent, borderColor: `rgba(${C.accentR},0.3)`, background: `rgba(${C.accentR},0.06)` }}
          >
            Розсилка
          </div>
          <h2
            className="font-black tracking-tighter uppercase mb-5"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)', fontFamily: "'Playfair Display', serif" }}
          >
            Будь першим<br />у курсі
          </h2>
          <p className="text-gray-500 text-base leading-relaxed mb-10">
            Щотижнева добірка найважливішого: статті, подкасти, відео та ексклюзивні анонси — прямо на твою пошту.
          </p>

          {submitted ? (
            <div
              className="rounded-2xl px-8 py-7 border"
              style={{ borderColor: `rgba(${C.accentR},0.3)`, background: `rgba(${C.accentR},0.05)` }}
            >
              <div className="text-2xl font-black uppercase mb-2" style={{ color: C.accent }}>Готово!</div>
              <p className="text-gray-400 text-sm">Ти підписався. Перший лист прийде найближчим часом.</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="твоя@пошта.com"
                className="flex-1 rounded-full px-6 py-3.5 text-sm outline-none border text-white placeholder-gray-600 bg-transparent transition-all duration-200"
                style={{ borderColor: 'rgba(255,255,255,0.1)', caretColor: C.accent }}
                onFocus={e => (e.target.style.borderColor = `rgba(${C.accentR},0.5)`)}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm tracking-wide uppercase text-[#0d0318] transition-all duration-200 hover:scale-105 hover:brightness-110 whitespace-nowrap"
                style={{ background: C.accent }}
              >
                <Send size={14} />
                Підписатись
              </button>
            </form>
          )}
          <p className="text-gray-700 text-xs mt-5">Без спаму. Відписатись можна будь-коли.</p>
        </AnimatedSection>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-purple-900/30 px-6 md:px-16 py-10 bg-[#0a0120]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <span className="text-xl font-black tracking-widest uppercase" style={{ color: C.accent }}>СПЕКТР</span>
          <p className="text-gray-700 text-xs text-center">© 2026 Спектр. Незалежне медіа. Всі права захищені.</p>
          <div className="flex items-center gap-6 text-xs text-gray-600">
            <a href="#" className="hover:text-gray-400 transition-colors">Конфіденційність</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Редполітика</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Контакти</a>
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        h1, h2, h3 { font-family: 'Playfair Display', serif; }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}