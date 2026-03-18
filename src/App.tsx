import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PenTool, MessageSquare, Brain, ArrowRight, ArrowLeft, Sparkles, Globe, LogIn, LogOut, LayoutDashboard, User, Clock, CheckCircle2, Edit3, Eye, ChevronDown, ChevronRight, BookOpen, Settings, Library, Activity, FileText, Menu, X, Plus } from 'lucide-react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const VERSION = "v2026-03-18 Wednesday 11:50:00";

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
    login: { title: 'Login to Workspace', user: 'Account', userPlaceholder: 'Please enter account', pass: 'Password', passPlaceholder: 'Please enter password', btn: 'Login', err: 'Invalid credentials.' },
    sidebar: { dashboard: 'Dashboard', practice: 'Practice', lang: 'Language', ink: 'Ink', mind: 'Mind', library: 'Library', settings: 'Settings' },
    presets: {
      lang: [
        { id: 'journal', name: 'Daily Journal', desc: 'Write about your day in English.' },
        { id: 'vocab', name: 'Vocab Builder', desc: 'Practice new words in sentences.' },
        { id: 'scenario', name: 'Scenario', desc: 'Roleplay a specific situation.' },
        { id: 'shadowing', name: 'Shadowing', desc: 'Listen to an audio and repeat it in your own words.' },
        { id: 'debate', name: 'Debate', desc: 'Write arguments for and against a topic.' }
      ],
      ink: [
        { id: 'copybook', name: 'Copybook', desc: 'Trace and practice character structures.' },
        { id: 'freewrite', name: 'Free Writing', desc: 'Write freely, focus on rhythm.' },
        { id: 'poetry', name: 'Poetry Copying', desc: 'Experience the beauty of rhythm by copying classic poetry.' },
        { id: 'typography', name: 'Typography Design', desc: 'Try different font combinations and layouts.' }
      ],
      mind: [
        { id: 'model', name: 'Mental Model', desc: 'Apply a mental model to a problem.' },
        { id: 'reflection', name: 'Reflection', desc: 'Deep reflection on a recent event.' },
        { id: '5whys', name: '5 Whys', desc: 'Root cause analysis technique.' },
        { id: 'first_principles', name: 'First Principles', desc: 'Strip away the surface and think from the essence.' },
        { id: 'decision_matrix', name: 'Decision Matrix', desc: 'List options and criteria for rational decision analysis.' }
      ]
    },
    dashboard: { title: 'Workspace', welcome: 'Welcome back', card1: 'Language Practice', card2: 'Ink Practice', card3: 'Mind Records', start: 'Start Session', totalTime: 'Total Learning Time', session: 'Current Session', recent: 'Recent Activity', quickStart: 'Quick Start' },
    practice: {
      end: 'End Session & Save Time',
      write: 'Write',
      preview: 'Preview',
      emptyPreview: '*Nothing to preview yet...*',
      lang: { title: 'Language Practice', placeholder: 'Write your thoughts in English here. Markdown is supported...\n\nExample:\n# My Thoughts Today\n- Learned a new word: **Serendipity**\n- [x] Read an English article\n- [ ] Write a sentence using the new word\n\n*I feel great about my progress.*' },
      ink: { title: 'Ink Practice', placeholder: 'Focus on your keystrokes, rhythm, and the structure of your words. Markdown is supported...' },
      mind: { title: 'Mind Records', placeholder: 'Record your deep thoughts, mental models, and reflections here. Markdown is supported...\n\n## Mental Model: Inversion\nInstead of thinking about how to succeed, think about how to fail and avoid it.\n\n| Perspective | Example |\n| --- | --- |\n| Forward | How to make more money? |\n| Inversion | How to avoid going bankrupt? |' }
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
    login: { title: '登录工作台', user: '账号', userPlaceholder: '请输入账号', pass: '密码', passPlaceholder: '请输入密码', btn: '登录', err: '账号或密码错误。' },
    sidebar: { dashboard: '概览', practice: '练习', lang: '语言 (Language)', ink: '书写 (Ink)', mind: '思维 (Mind)', library: '知识库', settings: '设置' },
    presets: {
      lang: [
        { id: 'journal', name: '每日英文日记', desc: '用英语记录今天的生活与感悟。' },
        { id: 'vocab', name: '词汇造句构建', desc: '将新学的单词放入具体语境中练习。' },
        { id: 'scenario', name: '真实场景模拟', desc: '模拟特定场景（如面试、点餐）进行表达。' },
        { id: 'shadowing', name: '跟读复述训练', desc: '听一段英文音频，然后用自己的语言复述出来。' },
        { id: 'debate', name: '观点辩论', desc: '针对一个话题，写下正反两方的观点与论据。' }
      ],
      ink: [
        { id: 'copybook', name: '字帖临摹', desc: '专注于汉字结构与笔画的练习。' },
        { id: 'freewrite', name: '自由书写', desc: '不拘泥于形式，感受书写的节奏与心流。' },
        { id: 'poetry', name: '古诗词抄写', desc: '在抄写经典诗词中体会文字的韵律美。' },
        { id: 'typography', name: '字体排版设计', desc: '尝试不同的字体组合与排版方式。' }
      ],
      mind: [
        { id: 'model', name: '心智模型画布', desc: '套用经典心智模型分析当前面临的问题。' },
        { id: 'reflection', name: '深度复盘', desc: '对近期发生的重要事件进行深度反思。' },
        { id: '5whys', name: '5 Whys 分析法', desc: '连续追问五个为什么，找到问题的根本原因。' },
        { id: 'first_principles', name: '第一性原理', desc: '剥离表象，回到事物的本质进行思考。' },
        { id: 'decision_matrix', name: '决策矩阵', desc: '列出选项与评估标准，进行理性的决策分析。' }
      ]
    },
    dashboard: { title: '工作台', welcome: '欢迎回来', card1: '语言练习', card2: '书写练习', card3: '思维记录', start: '开始练习', totalTime: '累计学习时长', session: '本次练习', recent: '最近活动', quickStart: '快速开始' },
    practice: {
      end: '结束练习并保存时长',
      write: '编写',
      preview: '预览',
      emptyPreview: '*暂无预览内容...*',
      lang: { title: '语言练习', placeholder: '在这里用英语写下你的想法。支持 Markdown 格式...\n\n例如：\n# 今天的想法\n- 学了一个新词：**Serendipity**\n- [x] 完成了每日英语阅读\n- [ ] 尝试用新词造句\n\n*我对自己的进步感到高兴。*' },
      ink: { title: '书写练习', placeholder: '专注于你的每一次敲击、节奏以及文字的结构。支持 Markdown 格式...' },
      mind: { title: '思维记录', placeholder: '在这里记录你的深度思考、心智模型与反思。支持 Markdown 格式...\n\n## 心智模型：逆向思考\n与其思考如何成功，不如思考如何失败并避免它。\n\n| 思考角度 | 例子 |\n| --- | --- |\n| 正向 | 如何赚更多钱？ |\n| 逆向 | 如何避免破产？ |' }
    }
  }
};

export default function App() {
  const [lang, setLang] = useState<'zh' | 'en'>('zh');
  const [view, setView] = useState<'home' | 'login' | 'workspace'>('home');
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
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Sidebar State
  const [activeSidebarItem, setActiveSidebarItem] = useState('dashboard');
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['practice']);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const t = translations[lang];

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (view === 'workspace' && activeModule && sessionStart) {
      interval = setInterval(() => {
        setSessionTime(Math.floor((Date.now() - sessionStart) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [view, activeModule, sessionStart]);

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
    if ((username === 'admin' && password === 'admin@123') || (username === 'tiyan' && password === 'tiyan@123ty')) {
      setIsLoggedIn(true);
      setView('workspace');
      setActiveSidebarItem('dashboard');
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

  const startPractice = (module: 'lang' | 'ink' | 'mind', presetText?: string) => {
    setActiveModule(module);
    setPracticeText(presetText || '');
    setIsPreviewMode(false);
    setSessionStart(Date.now());
    setSessionTime(0);
    setActiveSidebarItem(module);
  };

  const endPractice = () => {
    if (sessionStart) {
      const duration = Math.floor((Date.now() - sessionStart) / 1000);
      setTotalLearningTime(prev => prev + duration);
    }
    setSessionStart(null);
    setActiveModule(null);
    setActiveSidebarItem('dashboard');
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
              <button onClick={() => setView('workspace')} className="flex items-center gap-1 hover:text-black transition-colors">
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
          <div className="flex-1 flex flex-col w-full">
            {/* Artistic Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden w-full">
              {/* Abstract Background Elements */}
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#e8e4dc] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
              <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#f0ebe1] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-[#e3dfd5] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

              <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="mb-8"
                >
                  <div className="w-24 h-32 mx-auto border border-[#1a1a1a]/20 rounded-t-full flex items-center justify-center p-4 mb-8">
                    <img src="https://allapple.top/resource/logo.png" alt="Logo" className="w-12 h-12 object-contain opacity-80" referrerPolicy="no-referrer" />
                  </div>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="font-serif text-6xl md:text-8xl lg:text-9xl font-light tracking-tight mb-8 text-[#1a1a1a]"
                >
                  {t.hero.title}
                </motion.h1>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="flex flex-col items-center gap-6"
                >
                  <p className="text-xl md:text-2xl text-gray-600 font-serif italic tracking-wide">
                    {t.hero.sub1}
                  </p>
                  <div className="w-12 h-[1px] bg-gray-300"></div>
                  <p className="text-lg md:text-xl text-gray-500 font-serif max-w-2xl">
                    {t.hero.sub2}
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="mt-16 flex flex-col sm:flex-row items-center gap-6"
                >
                  <button 
                    onClick={() => setView('login')}
                    className="px-10 py-4 bg-transparent border border-[#1a1a1a] text-[#1a1a1a] rounded-full font-serif text-lg hover:bg-[#1a1a1a] hover:text-[#f5f2ed] transition-all duration-500 flex items-center gap-3 w-full sm:w-auto justify-center group"
                  >
                    {t.hero.btn1} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              </div>

              {/* Decorative Vertical Text */}
              <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block">
                <span className="vertical-text text-xs text-gray-400 font-mono tracking-[0.2em]">
                  {t.hero.tag}
                </span>
              </div>
            </section>

            {/* Statement Section */}
            <section className="py-32 bg-[#1a1a1a] text-[#f5f2ed] w-full">
              <div className="max-w-4xl mx-auto px-6 text-center">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1 }}
                  className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight font-light"
                >
                  {t.statement.main}<br/>
                  <span className="text-gray-400 italic text-3xl md:text-4xl mt-6 block">{t.statement.sub}</span>
                </motion.h2>
              </div>
            </section>

            {/* Features Section - Artistic Grid */}
            <section id="features" className="py-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
              <div className="mb-24 text-center">
                <h2 className="font-serif text-4xl md:text-5xl mb-6 font-light">{t.features.title}</h2>
                <p className="text-xl text-gray-500 font-serif italic">{t.features.sub}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                {/* Feature 1 */}
                <div className="group relative">
                  <div className="aspect-[3/4] bg-[#e8e4dc] rounded-t-full overflow-hidden mb-8 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <MessageSquare className="w-12 h-12 text-[#1a1a1a]/20 group-hover:scale-110 transition-transform duration-700" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-serif font-light mb-4 text-center">{t.features.lang.title}</h3>
                  <p className="text-gray-500 mb-6 font-serif text-center">{t.features.lang.desc}</p>
                  <div className="w-8 h-[1px] bg-gray-300 mx-auto mb-6"></div>
                  <ul className="space-y-3 text-gray-600 text-center font-serif text-sm">
                    {t.features.lang.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Feature 2 */}
                <div className="group relative md:mt-16">
                  <div className="aspect-[3/4] bg-[#e3dfd5] rounded-t-full overflow-hidden mb-8 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PenTool className="w-12 h-12 text-[#1a1a1a]/20 group-hover:scale-110 transition-transform duration-700" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-serif font-light mb-4 text-center">{t.features.ink.title}</h3>
                  <p className="text-gray-500 mb-6 font-serif text-center">{t.features.ink.desc}</p>
                  <div className="w-8 h-[1px] bg-gray-300 mx-auto mb-6"></div>
                  <ul className="space-y-3 text-gray-600 text-center font-serif text-sm">
                    {t.features.ink.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Feature 3 */}
                <div className="group relative">
                  <div className="aspect-[3/4] bg-[#f0ebe1] rounded-t-full overflow-hidden mb-8 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Brain className="w-12 h-12 text-[#1a1a1a]/20 group-hover:scale-110 transition-transform duration-700" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-serif font-light mb-4 text-center">{t.features.mind.title}</h3>
                  <p className="text-gray-500 mb-6 font-serif text-center">{t.features.mind.desc}</p>
                  <div className="w-8 h-[1px] bg-gray-300 mx-auto mb-6"></div>
                  <ul className="space-y-3 text-gray-600 text-center font-serif text-sm">
                    {t.features.mind.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>
        )}

        {view === 'login' && (
          <div className="flex-1 flex items-center justify-center px-6 py-12 w-full relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 w-full max-w-md relative"
            >
              <button 
                onClick={() => setView('home')} 
                className="absolute top-6 left-6 text-gray-400 hover:text-black transition-colors flex items-center gap-1 text-sm font-medium"
                title={lang === 'en' ? 'Back to Home' : '返回首页'}
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">{lang === 'en' ? 'Back' : '返回'}</span>
              </button>
              
              <div className="flex justify-center mb-8">
                <img src="https://allapple.top/resource/logo.png" alt="Logo" className="w-12 h-12 object-contain" referrerPolicy="no-referrer" />
              </div>
              <h2 className="text-2xl font-serif font-medium text-center mb-8">{t.login.title}</h2>
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.login.user}</label>
                  <input 
                    type="text" 
                    placeholder={t.login.userPlaceholder}
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.login.pass}</label>
                  <input 
                    type="password" 
                    placeholder={t.login.passPlaceholder}
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

        {view === 'workspace' && (
          <div className="flex-1 flex w-full h-full overflow-hidden bg-[#f5f2ed] border-t border-gray-200">
            {/* Primary Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full shrink-0">
              {/* User profile */}
              <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-sm">{username || 'Admin'}</p>
                  <p className="text-xs text-gray-500">{t.nav.workspace}</p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                <button onClick={() => { setActiveSidebarItem('dashboard'); setActiveModule(null); }} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSidebarItem === 'dashboard' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                  <LayoutDashboard className="w-4 h-4" />
                  {t.sidebar.dashboard}
                </button>

                <div className="pt-4 pb-2 px-3">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{t.sidebar.practice}</p>
                </div>
                
                <button onClick={() => { setActiveSidebarItem('lang'); setActiveModule(null); }} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSidebarItem === 'lang' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                  <MessageSquare className="w-4 h-4" />
                  {t.sidebar.lang}
                </button>
                <button onClick={() => { setActiveSidebarItem('ink'); setActiveModule(null); }} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSidebarItem === 'ink' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                  <PenTool className="w-4 h-4" />
                  {t.sidebar.ink}
                </button>
                <button onClick={() => { setActiveSidebarItem('mind'); setActiveModule(null); }} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSidebarItem === 'mind' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                  <Brain className="w-4 h-4" />
                  {t.sidebar.mind}
                </button>

                <div className="pt-4 pb-2 px-3">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">More</p>
                </div>
                <button onClick={() => { setActiveSidebarItem('library'); setActiveModule(null); }} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSidebarItem === 'library' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                  <BookOpen className="w-4 h-4" />
                  {t.sidebar.library}
                </button>
                <button onClick={() => { setActiveSidebarItem('settings'); setActiveModule(null); }} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSidebarItem === 'settings' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                  <Settings className="w-4 h-4" />
                  {t.sidebar.settings}
                </button>
              </div>

              {/* Footer / Version */}
              <div className="p-4 border-t border-gray-100">
                <p className="text-xs text-gray-400 font-mono text-center">{t.footer.version}: {VERSION}</p>
              </div>
            </div>

            {/* Secondary Sidebar (Function Directory) */}
            {['lang', 'ink', 'mind'].includes(activeSidebarItem) && !activeModule && (
              <div className="w-72 bg-gray-50 border-r border-gray-200 flex flex-col h-full shrink-0">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="font-serif font-medium text-lg">{t.sidebar[activeSidebarItem as 'lang'|'ink'|'mind']}</h3>
                  <p className="text-xs text-gray-500 mt-1">Select a preset to start</p>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {t.presets[activeSidebarItem as 'lang'|'ink'|'mind'].map(preset => (
                    <div key={preset.id} onClick={() => startPractice(activeSidebarItem as 'lang'|'ink'|'mind', preset.desc)} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                      <h4 className="font-medium text-sm mb-1 group-hover:text-black">{preset.name}</h4>
                      <p className="text-xs text-gray-500 line-clamp-2">{preset.desc}</p>
                    </div>
                  ))}
                  {/* Free practice option */}
                  <div onClick={() => startPractice(activeSidebarItem as 'lang'|'ink'|'mind')} className="bg-transparent border border-dashed border-gray-300 p-4 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-center text-gray-500 hover:text-black mt-4">
                    <span className="text-sm font-medium flex items-center gap-2"><Plus className="w-4 h-4" /> Free Practice</span>
                  </div>
                </div>
              </div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto bg-[#FAFAFA]">
              {activeSidebarItem === 'dashboard' && !activeModule && (
                <div className="p-8 md:p-12 max-w-5xl mx-auto w-full">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-8 h-8 text-gray-500" />
                        </div>
                        <div>
                          <h1 className="text-3xl font-serif font-medium">{t.dashboard.welcome}, {username || 'Admin'}</h1>
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
                      <div onClick={() => { setActiveSidebarItem('lang'); setActiveModule(null); }} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
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
                      <div onClick={() => { setActiveSidebarItem('ink'); setActiveModule(null); }} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
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
                      <div onClick={() => { setActiveSidebarItem('mind'); setActiveModule(null); }} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
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

              {['lang', 'ink', 'mind'].includes(activeSidebarItem) && !activeModule && (
                <div className="p-8 md:p-12 flex items-center justify-center h-full text-gray-400 font-serif italic text-lg">
                  Select a preset from the directory to begin.
                </div>
              )}

              {activeModule && (
                <div className="flex flex-col px-6 py-8 md:px-12 max-w-5xl mx-auto w-full h-full">
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
                        {/* Markdown Toggle */}
                        <div className="flex bg-gray-100 p-1 rounded-lg">
                          <button 
                            onClick={() => setIsPreviewMode(false)} 
                            className={`px-3 py-1.5 text-sm font-medium rounded-md flex items-center gap-2 transition-colors ${!isPreviewMode ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-black'}`}
                          >
                            <Edit3 className="w-4 h-4" /> {t.practice.write}
                          </button>
                          <button 
                            onClick={() => setIsPreviewMode(true)} 
                            className={`px-3 py-1.5 text-sm font-medium rounded-md flex items-center gap-2 transition-colors ${isPreviewMode ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-black'}`}
                          >
                            <Eye className="w-4 h-4" /> {t.practice.preview}
                          </button>
                        </div>

                        <div className="hidden sm:flex items-center gap-2 text-gray-500 bg-white px-4 py-2 rounded-full border border-gray-200">
                          <Clock className="w-4 h-4" />
                          <span className="font-mono text-sm">{formatTime(sessionTime)}</span>
                        </div>
                        <button 
                          onClick={endPractice}
                          className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="hidden sm:inline">{t.practice.end}</span>
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-10 flex flex-col min-h-[400px]">
                      {isPreviewMode ? (
                        <div className="flex-1 w-full overflow-y-auto font-serif text-gray-800">
                          {practiceText ? (
                            <div className="markdown-body">
                              <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{practiceText}</Markdown>
                            </div>
                          ) : (
                            <p className="text-gray-400 italic">{t.practice.emptyPreview}</p>
                          )}
                        </div>
                      ) : (
                        <textarea
                          className="flex-1 w-full resize-none outline-none font-serif text-lg md:text-xl leading-relaxed text-gray-800 placeholder:text-gray-300 bg-transparent"
                          placeholder={t.practice[activeModule].placeholder}
                          value={practiceText}
                          onChange={e => setPracticeText(e.target.value)}
                          autoFocus
                        />
                      )}
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Shared Footer */}
      {view !== 'login' && view !== 'workspace' && (
        <footer className="py-12 px-6 border-t border-gray-200 text-center text-gray-400 text-sm w-full">
          <p>© {new Date().getFullYear()} {t.footer.rights}</p>
          <p className="mt-2 text-xs font-mono">{t.footer.version}: {VERSION}</p>
        </footer>
      )}
    </div>
  );
}
