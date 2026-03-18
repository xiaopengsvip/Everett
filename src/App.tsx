import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PenTool, MessageSquare, Brain, ArrowRight, Sparkles, Globe, LogIn, LogOut, LayoutDashboard, User, Clock, CheckCircle2 } from 'lucide-react';

const VERSION = "v2026-03-18 Wednesday 11:16:35";

const translations = {
  en: {
    nav: { about: 'About', practice: 'Practice', philosophy: 'Philosophy', login: 'Login', logout: 'Logout', workspace: 'Workspace' },
    hero: { tag: 'Write · Think · Grow', title: 'Everett Minds', sub1: 'Language, Ink, Mind', sub2: 'Express with language, settle with writing, grow with thinking', btn1: 'Start Learning', btn2: 'Explore Practice' },
    statement: { main: 'This is not an ordinary learning website', sub: 'This is a place to train expression and thinking' },
    features: { title: 'At Everett Minds, learning is not just memorizing.', sub: 'We focus on three things: from input, to expression, to inner growth.',
      lang: { title: 'Language', desc: 'Express your thoughts in English', items: ['English sentence training', 'Expression correction', 'Real scenario practice'], tip: '👉 Not just learning words, but learning to express' },
      ink: { title: 'Ink', desc: 'Shape your focus and aesthetics through writing', items: ['Brush / Font practice', 'Font structure training', 'Artistic expression'], tip: '👉 Writing is a practice of focus' },
      mind: { title: 'Mind', desc: 'Build your cognitive system through thinking', items: ['Thinking records', 'Expression structure training', 'Cognitive enhancement'], tip: '👉 What you write is how you think' }
    },
    philosophy: { title: 'Philosophy', sub: 'Train your language. Refine your writing. Shape your mind.',
      items: [
        { title: 'Write Your Mind', desc: 'Write down your thoughts, instead of copying others\' answers' },
        { title: 'Think Clearly', desc: 'Make your thinking clear and structured' },
        { title: 'Grow Slowly', desc: 'Growth is not an explosion, but an accumulation' }
      ]
    },
    about: { title: 'Built by Everett', p1: 'This is a small website starting from "practicing expression".', p2: 'No complex systems, only continuous refinement.', p3: 'I believe:', p4: 'Human growth is essentially the improvement of expression ability.', p5: 'And expression comes from language, writing, and thinking.' },
    cta: { line1: 'Start writing.', line2: 'Start thinking.', line3: 'Start growing.', btn1: 'Begin Now', btn2: 'Join the Practice' },
    footer: { rights: 'Everett Minds. All rights reserved.', version: 'Version' },
    login: { title: 'Login to Workspace', user: 'Username', pass: 'Password', btn: 'Login', err: 'Invalid credentials.' },
    dashboard: { title: 'Workspace', welcome: 'Welcome back, Admin', card1: 'Language Practice', card2: 'Ink Practice', card3: 'Mind Records', start: 'Start Session', totalTime: 'Total Learning Time', session: 'Current Session' },
    practice: {
      end: 'End Session & Save Time',
      lang: { title: 'Language Practice', placeholder: 'Write your thoughts in English here. Focus on expression and grammar...' },
      ink: { title: 'Ink Practice', placeholder: 'Focus on your keystrokes, rhythm, and the structure of your words...' },
      mind: { title: 'Mind Records', placeholder: 'Record your deep thoughts, mental models, and reflections here...' }
    }
  },
  zh: {
    nav: { about: '关于', practice: '练习', philosophy: '理念', login: '登录', logout: '退出', workspace: '工作台' },
    hero: { tag: 'Write · Think · Grow', title: 'Everett Minds', sub1: 'Language, Ink, Mind', sub2: '用语言表达，用书写沉淀，用思考成长', btn1: '开始学习', btn2: '探索练习' },
    statement: { main: '这不是一个普通的学习网站', sub: '这是一个训练表达与思维的地方' },
    features: { title: '在 Everett Minds，学习不只是记忆知识。', sub: '我们关注三件事：从输入，到表达，再到内在成长。',
      lang: { title: 'Language · 语言表达', desc: '用英语表达你的想法', items: ['英语句子训练', '表达纠正', '真实场景练习'], tip: '👉 不只是学单词，而是学会表达' },
      ink: { title: 'Ink · 书写与艺术', desc: '用书写塑造你的专注与审美', items: ['毛笔 / 字体练习', '字体结构训练', '艺术化表达'], tip: '👉 写字，是一种专注的修行' },
      mind: { title: 'Mind · 思维训练', desc: '用思考构建你的认知体系', items: ['思考记录', '表达结构训练', '认知提升'], tip: '👉 你写下的，就是你思考的样子' }
    },
    philosophy: { title: '理念 Philosophy', sub: 'Train your language. Refine your writing. Shape your mind.',
      items: [
        { title: 'Write Your Mind', desc: '写下你的想法，而不是复制别人的答案' },
        { title: 'Think Clearly', desc: '让思维变得清晰、有结构' },
        { title: 'Grow Slowly', desc: '成长不是爆发，而是积累' }
      ]
    },
    about: { title: 'Built by Everett', p1: '这是一个从“练习表达”开始的小网站。', p2: '没有复杂的系统，只有持续的打磨。', p3: '我相信：', p4: '人的成长，本质是表达能力的提升。', p5: '而表达，来自语言、书写和思考。' },
    cta: { line1: 'Start writing.', line2: 'Start thinking.', line3: 'Start growing.', btn1: '立即开始', btn2: '加入练习' },
    footer: { rights: 'Everett Minds. 保留所有权利。', version: '版本' },
    login: { title: '登录工作台', user: '用户名', pass: '密码', btn: '登录', err: '账号或密码错误。' },
    dashboard: { title: '工作台', welcome: '欢迎回来，Admin', card1: '语言练习', card2: '书写练习', card3: '思维记录', start: '开始练习', totalTime: '累计学习时长', session: '本次练习' },
    practice: {
      end: '结束练习并保存时长',
      lang: { title: '语言练习', placeholder: '在这里用英语写下你的想法。专注于表达与语法...' },
      ink: { title: '书写练习', placeholder: '专注于你的每一次敲击、节奏以及文字的结构...' },
      mind: { title: '思维记录', placeholder: '在这里记录你的深度思考、心智模型与反思...' }
    }
  }
};

export default function App() {
  const [lang, setLang] = useState<'zh' | 'en'>('zh');
  const [view, setView] = useState<'home' | 'login' | 'dashboard' | 'practice'>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Login State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Practice & Timer State
  const [totalLearningTime, setTotalLearningTime] = useState(0); // in seconds
  const [sessionStart, setSessionStart] = useState<number | null>(null);
  const [sessionTime, setSessionTime] = useState(0);
  const [activeModule, setActiveModule] = useState<'lang' | 'ink' | 'mind' | null>(null);
  const [practiceText, setPracticeText] = useState('');

  const t = translations[lang];

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (view === 'practice' && sessionStart) {
      interval = setInterval(() => {
        setSessionTime(Math.floor((Date.now() - sessionStart) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [view, sessionStart]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}h ${m}m ${s}s`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin@123') {
      setIsLoggedIn(true);
      setView('dashboard');
      setLoginError('');
    } else {
      setLoginError(t.login.err);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setView('home');
    setUsername('');
    setPassword('');
  };

  const toggleLang = () => {
    setLang(lang === 'zh' ? 'en' : 'zh');
  };

  const startPractice = (module: 'lang' | 'ink' | 'mind') => {
    setActiveModule(module);
    setPracticeText('');
    setSessionStart(Date.now());
    setSessionTime(0);
    setView('practice');
  };

  const endPractice = () => {
    if (sessionStart) {
      const duration = Math.floor((Date.now() - sessionStart) / 1000);
      setTotalLearningTime(prev => prev + duration);
    }
    setSessionStart(null);
    setActiveModule(null);
    setView('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] selection:bg-[#1A1A1A] selection:text-white font-sans flex flex-col">
      {/* Shared Navigation */}
      <nav className="flex items-center justify-between px-6 py-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('home')}>
          <img src="https://allapple.top/resource/logo.png" alt="Everett Minds Logo" className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />
          <span className="font-serif font-semibold text-lg tracking-wide">Everett Minds</span>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
          {view === 'home' && (
            <div className="hidden md:flex items-center gap-8 mr-4">
              <a href="#about" className="hover:text-black transition-colors">{t.nav.about}</a>
              <a href="#features" className="hover:text-black transition-colors">{t.nav.practice}</a>
              <a href="#philosophy" className="hover:text-black transition-colors">{t.nav.philosophy}</a>
            </div>
          )}
          
          <button onClick={toggleLang} className="flex items-center gap-1 hover:text-black transition-colors">
            <Globe className="w-4 h-4" />
            {lang === 'zh' ? 'EN' : '中文'}
          </button>

          {isLoggedIn ? (
            <>
              <button onClick={() => setView('dashboard')} className="flex items-center gap-1 hover:text-black transition-colors">
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">{t.nav.workspace}</span>
              </button>
              <button onClick={handleLogout} className="flex items-center gap-1 hover:text-black transition-colors">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">{t.nav.logout}</span>
              </button>
            </>
          ) : (
            <button onClick={() => setView('login')} className="flex items-center gap-1 hover:text-black transition-colors">
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">{t.nav.login}</span>
            </button>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {view === 'home' && (
          <>
            {/* Hero Section */}
            <section className="pt-12 pb-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 text-xs font-medium tracking-widest uppercase text-gray-500 mb-8"
              >
                <Sparkles className="w-3 h-3" />
                <span>{t.hero.tag}</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-6"
              >
                {t.hero.title}
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-4 mb-12"
              >
                <p className="text-xl md:text-2xl text-gray-600 font-serif">
                  {t.hero.sub1}
                </p>
                <p className="text-lg md:text-xl text-gray-500 font-serif">
                  {t.hero.sub2}
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-4"
              >
                <button 
                  onClick={() => setView('login')}
                  className="px-8 py-4 bg-[#1A1A1A] text-white rounded-full font-medium hover:bg-black transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  {t.hero.btn1} <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-white border border-gray-200 text-[#1A1A1A] rounded-full font-medium hover:bg-gray-50 transition-colors w-full sm:w-auto justify-center"
                >
                  {t.hero.btn2}
                </button>
              </motion.div>
            </section>

            {/* Statement Section */}
            <section className="py-24 bg-white w-full">
              <div className="max-w-4xl mx-auto px-6 text-center">
                <motion.h2 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="font-serif text-3xl md:text-4xl lg:text-5xl leading-relaxed text-gray-900"
                >
                  {t.statement.main}<br/>
                  <span className="text-gray-400 italic">{t.statement.sub}</span>
                </motion.h2>
              </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
              <div className="mb-20 md:w-2/3">
                <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">{t.features.title}</h2>
                <p className="text-xl text-gray-500 font-serif">{t.features.sub}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {/* Feature 1 */}
                <div className="group">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-8 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-serif font-medium mb-2">{t.features.lang.title}</h3>
                  <p className="text-gray-500 mb-8 font-serif">{t.features.lang.desc}</p>
                  
                  <ul className="space-y-3 mb-8 text-gray-700">
                    {t.features.lang.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300" /> {item}</li>
                    ))}
                  </ul>
                  
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-600 font-serif">
                    {t.features.lang.tip}
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="group">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-8 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                    <PenTool className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-serif font-medium mb-2">{t.features.ink.title}</h3>
                  <p className="text-gray-500 mb-8 font-serif">{t.features.ink.desc}</p>
                  
                  <ul className="space-y-3 mb-8 text-gray-700">
                    {t.features.ink.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300" /> {item}</li>
                    ))}
                  </ul>
                  
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-600 font-serif">
                    {t.features.ink.tip}
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="group">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-8 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                    <Brain className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-serif font-medium mb-2">{t.features.mind.title}</h3>
                  <p className="text-gray-500 mb-8 font-serif">{t.features.mind.desc}</p>
                  
                  <ul className="space-y-3 mb-8 text-gray-700">
                    {t.features.mind.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300" /> {item}</li>
                    ))}
                  </ul>
                  
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-600 font-serif">
                    {t.features.mind.tip}
                  </div>
                </div>
              </div>
            </section>

            {/* Philosophy Section */}
            <section id="philosophy" className="py-32 bg-[#111] text-white w-full">
              <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
                  <h2 className="font-serif text-4xl md:text-5xl mb-6">{t.philosophy.title}</h2>
                  <p className="text-gray-400 text-lg">{t.philosophy.sub}</p>
                </div>
                
                <div className="space-y-12">
                  {t.philosophy.items.map((item, i) => (
                    <div key={i} className="border-t border-white/10 pt-8">
                      <h3 className="text-2xl font-serif mb-3">{item.title}</h3>
                      <p className="text-gray-400 font-serif text-lg">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Personal Section */}
            <section id="about" className="py-32 px-6 md:px-12 max-w-4xl mx-auto text-center w-full">
              <div className="inline-block mb-8">
                <img src="https://allapple.top/resource/logo.png" alt="Everett Minds" className="w-16 h-16 object-contain opacity-80" referrerPolicy="no-referrer" />
              </div>
              <h2 className="font-serif text-3xl mb-8">{t.about.title}</h2>
              <div className="space-y-6 text-lg md:text-xl text-gray-600 font-serif leading-relaxed">
                <p>{t.about.p1}<br/>{t.about.p2}</p>
                <p className="text-black font-medium">{t.about.p3}<br/>{t.about.p4}<br/>{t.about.p5}</p>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 bg-white border-t border-gray-100 w-full">
              <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="font-serif text-4xl md:text-6xl font-medium mb-12 leading-tight">
                  {t.cta.line1}<br/>
                  <span className="text-gray-400">{t.cta.line2}</span><br/>
                  {t.cta.line3}
                </h2>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button 
                    onClick={() => setView('login')}
                    className="px-10 py-5 bg-[#1A1A1A] text-white rounded-full font-medium hover:bg-black transition-colors text-lg w-full sm:w-auto"
                  >
                    {t.cta.btn1}
                  </button>
                  <button 
                    onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-10 py-5 bg-white border border-gray-200 text-[#1A1A1A] rounded-full font-medium hover:bg-gray-50 transition-colors text-lg w-full sm:w-auto"
                  >
                    {t.cta.btn2}
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {view === 'login' && (
          <div className="flex-1 flex items-center justify-center px-6 py-12 w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 w-full max-w-md"
            >
              <div className="flex justify-center mb-8">
                <img src="https://allapple.top/resource/logo.png" alt="Logo" className="w-12 h-12 object-contain" referrerPolicy="no-referrer" />
              </div>
              <h2 className="text-2xl font-serif font-medium text-center mb-8">{t.login.title}</h2>
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.login.user}</label>
                  <input 
                    type="text" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.login.pass}</label>
                  <input 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5" 
                  />
                </div>
                {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
                <button type="submit" className="w-full py-4 bg-[#1A1A1A] text-white rounded-xl font-medium hover:bg-black transition-colors mt-4">
                  {t.login.btn}
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {view === 'dashboard' && (
          <div className="flex-1 px-6 py-12 md:px-12 max-w-7xl mx-auto w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-500" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-serif font-medium">{t.dashboard.welcome}</h1>
                    <p className="text-gray-500 mt-1">{t.dashboard.title}</p>
                  </div>
                </div>
                
                {/* Total Time Tracker */}
                <div className="bg-white border border-gray-200 px-6 py-4 rounded-2xl flex items-center gap-4 shadow-sm">
                  <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">{t.dashboard.totalTime}</p>
                    <p className="text-2xl font-serif font-medium">{formatTime(totalLearningTime)}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1 */}
                <div onClick={() => startPractice('lang')} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-serif font-medium mb-2">{t.dashboard.card1}</h3>
                  <p className="text-gray-500 text-sm mb-6">{t.features.lang.desc}</p>
                  <button className="text-sm font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    {t.dashboard.start} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                {/* Card 2 */}
                <div onClick={() => startPractice('ink')} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                    <PenTool className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-serif font-medium mb-2">{t.dashboard.card2}</h3>
                  <p className="text-gray-500 text-sm mb-6">{t.features.ink.desc}</p>
                  <button className="text-sm font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    {t.dashboard.start} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                {/* Card 3 */}
                <div onClick={() => startPractice('mind')} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                    <Brain className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-serif font-medium mb-2">{t.dashboard.card3}</h3>
                  <p className="text-gray-500 text-sm mb-6">{t.features.mind.desc}</p>
                  <button className="text-sm font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    {t.dashboard.start} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {view === 'practice' && activeModule && (
          <div className="flex-1 flex flex-col px-6 py-8 md:px-12 max-w-5xl mx-auto w-full h-full">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col h-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                    {activeModule === 'lang' && <MessageSquare className="w-5 h-5" />}
                    {activeModule === 'ink' && <PenTool className="w-5 h-5" />}
                    {activeModule === 'mind' && <Brain className="w-5 h-5" />}
                  </div>
                  <h2 className="text-2xl font-serif font-medium">{t.practice[activeModule].title}</h2>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-500 bg-white px-4 py-2 rounded-full border border-gray-200">
                    <Clock className="w-4 h-4" />
                    <span className="font-mono text-sm">{formatTime(sessionTime)}</span>
                  </div>
                  <button 
                    onClick={endPractice}
                    className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {t.practice.end}
                  </button>
                </div>
              </div>

              <div className="flex-1 bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-10 flex flex-col">
                <textarea
                  className="flex-1 w-full resize-none outline-none font-serif text-lg md:text-xl leading-relaxed text-gray-800 placeholder:text-gray-300 bg-transparent"
                  placeholder={t.practice[activeModule].placeholder}
                  value={practiceText}
                  onChange={e => setPracticeText(e.target.value)}
                  autoFocus
                />
              </div>
            </motion.div>
          </div>
        )}
      </main>

      {/* Shared Footer */}
      {view !== 'login' && view !== 'practice' && (
        <footer className="py-12 px-6 border-t border-gray-200 text-center text-gray-400 text-sm w-full">
          <p>© {new Date().getFullYear()} {t.footer.rights}</p>
          <p className="mt-2 text-xs font-mono">{t.footer.version}: {VERSION}</p>
        </footer>
      )}
    </div>
  );
}
