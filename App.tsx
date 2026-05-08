import React, { useState, useEffect } from 'react';
import { User, Language, FormLevel, Subject, Experiment, Translation } from './types';
import { EXPERIMENTS, LABELS } from './constants';
import { Layout } from './components/Layout';
import { SimulationCanvas } from './components/SimulationCanvas';
import { Beaker, BookOpen, Trophy, Settings as SettingsIcon, GraduationCap, PlayCircle, Star, Info } from 'lucide-react';

// --- SUB-COMPONENTS ---

const Login: React.FC<{ onLogin: (name: string, lang: Language) => void }> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [lang, setLang] = useState<Language>('en');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-emerald-400 p-4">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
        <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 mb-4">
                <Beaker size={32} />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">SmartLab Simulator</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Interactive Science for Form 1-5</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name / Nama</label>
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Enter your name..."
            />
          </div>

          <div>
             <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Language / Bahasa</label>
             <div className="grid grid-cols-3 gap-2">
                {(['en', 'ms', 'bi'] as Language[]).map(l => (
                  <button 
                    key={l}
                    onClick={() => setLang(l)}
                    className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all ${lang === l ? 'bg-blue-600 text-white shadow-lg transform scale-105' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
                  >
                    {l === 'en' ? 'English' : l === 'ms' ? 'Melayu' : 'Bilingual'}
                  </button>
                ))}
             </div>
          </div>

          <button 
            onClick={() => name && onLogin(name, lang)}
            disabled={!name.trim()}
            className="w-full mt-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-lg font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100"
          >
            Start / Mula
          </button>
        </div>
      </div>
    </div>
  );
};

const QuizView: React.FC<{ user: User; onComplete: (score: number) => void }> = ({ user, onComplete }) => {
    const [qIndex, setQIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    // Mock Questions
    const questions = [
        { q: "What is the pH of a neutral solution?", a: ["5", "7", "9", "1"], correct: 1 },
        { q: "Photosynthesis requires...", a: ["Oxygen", "Light", "Rocks", "Sand"], correct: 1 },
        { q: "To separate sand and salt, we use...", a: ["Filtration", "Magnetism", "Distillation", "Evaporation"], correct: 0 },
    ];

    const handleAnswer = (idx: number) => {
        if (idx === questions[qIndex].correct) setScore(s => s + 1);
        
        if (qIndex < questions.length - 1) {
            setQIndex(qIndex + 1);
        } else {
            setFinished(true);
        }
    };

    if (finished) {
        return (
            <div className="text-center py-12">
                <Trophy size={64} className="mx-auto text-yellow-500 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
                <p className="text-xl mb-6">You scored {score} / {questions.length}</p>
                <button onClick={() => onComplete(score)} className="bg-blue-600 text-white px-6 py-2 rounded-lg">Return Home</button>
            </div>
        );
    }

    const q = questions[qIndex];

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
            <div className="flex justify-between mb-4 text-sm text-slate-500">
                <span>Question {qIndex + 1}/{questions.length}</span>
                <span>Score: {score}</span>
            </div>
            <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-slate-100">{q.q}</h3>
            <div className="space-y-3">
                {q.a.map((ans, i) => (
                    <button 
                        key={i} 
                        onClick={() => handleAnswer(i)}
                        className="w-full text-left p-4 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                    >
                        {ans}
                    </button>
                ))}
            </div>
        </div>
    );
};

// --- MAIN APP ---

type ViewState = 'login' | 'home' | 'subjects' | 'experiments' | 'simulation' | 'quiz' | 'achievements' | 'library' | 'profile' | 'settings';

const App: React.FC = () => {
  // State
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<ViewState>('login');
  const [selectedForm, setSelectedForm] = useState<FormLevel | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [simValues, setSimValues] = useState<Record<string, number>>({});

  // Initialize Theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // --- ACTIONS ---

  const handleLogin = (name: string, language: Language) => {
    setUser({ name, language, xp: 0, level: 1, badges: [], completedExperiments: [] });
    setView('home');
  };

  const handleFormSelect = (form: FormLevel) => {
    setSelectedForm(form);
    if (form >= 4) {
      setView('subjects');
    } else {
      setSelectedSubject('General');
      setView('experiments');
    }
  };

  const handleSubjectSelect = (sub: Subject) => {
    setSelectedSubject(sub);
    setView('experiments');
  };

  const handleExperimentSelect = (exp: Experiment) => {
    setSelectedExperiment(exp);
    setSimValues(exp.simulation.defaultValues);
    setView('simulation');
  };

  const finishExperiment = () => {
      if (!user || !selectedExperiment) return;
      const isNew = !user.completedExperiments.includes(selectedExperiment.id);
      if (isNew) {
          setUser({
              ...user,
              xp: user.xp + 50,
              level: Math.floor((user.xp + 50) / 200) + 1,
              completedExperiments: [...user.completedExperiments, selectedExperiment.id]
          });
      }
      setView('experiments');
  };

  const handleQuizComplete = (score: number) => {
      if(user) {
          setUser({...user, xp: user.xp + (score * 10)});
      }
      setView('home');
  }

  // --- HELPERS ---
  const getLabel = (key: keyof typeof LABELS) => {
      if (!user) return LABELS[key].en;
      const l = user.language === 'bi' ? 'en' : user.language;
      return LABELS[key][l];
  };
  
  const getBilingual = (obj: {en: string, ms: string}) => {
      if (!user) return obj.en;
      if (user.language === 'en') return obj.en;
      if (user.language === 'ms') return obj.ms;
      return `${obj.en} / ${obj.ms}`;
  };

  // --- RENDERERS ---

  if (!user || view === 'login') {
    return (
      <div className={isDark ? 'dark' : ''}>
         <Login onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <Layout 
        user={user} 
        onLogout={() => setView('login')} 
        toggleTheme={toggleTheme} 
        isDark={isDark}
        onGoHome={() => setView('home')}
        showHomeBtn={view !== 'home'}
    >
      
      {/* HOME VIEW */}
      {view === 'home' && (
        <div className="space-y-8 animate-fade-in">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((f) => (
              <button
                key={f}
                onClick={() => handleFormSelect(f as FormLevel)}
                className="aspect-square rounded-2xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl hover:scale-105 transition-all flex flex-col items-center justify-center gap-2 border border-slate-100 dark:border-slate-700"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 font-bold text-xl">
                  {f}
                </div>
                <span className="font-semibold text-slate-700 dark:text-slate-300">{getLabel('form')} {f}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button onClick={() => setView('quiz')} className="p-6 rounded-xl bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 hover:bg-violet-200 dark:hover:bg-violet-900/50 transition-colors flex flex-col items-center gap-2">
                <BookOpen size={24} />
                <span className="font-medium">{getLabel('quiz')}</span>
            </button>
            <button onClick={() => setView('achievements')} className="p-6 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors flex flex-col items-center gap-2">
                <Trophy size={24} />
                <span className="font-medium">{getLabel('achievements')}</span>
            </button>
             <button onClick={() => setView('library')} className="p-6 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors flex flex-col items-center gap-2">
                <GraduationCap size={24} />
                <span className="font-medium">{getLabel('library')}</span>
            </button>
             <button onClick={() => setView('settings')} className="p-6 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors flex flex-col items-center gap-2">
                <SettingsIcon size={24} />
                <span className="font-medium">{getLabel('settings')}</span>
            </button>
          </div>
        </div>
      )}

      {/* SUBJECT SELECTION (Form 4/5) */}
      {view === 'subjects' && (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-100">{getLabel('selectSubject')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(['Biology', 'Physics', 'Chemistry'] as Subject[]).map(sub => (
                     <button
                        key={sub}
                        onClick={() => handleSubjectSelect(sub)}
                        className="p-8 rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 shadow-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:shadow-blue-500/20 transition-all group"
                     >
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-blue-600 transition-colors">
                            {getLabel(sub.toLowerCase() as any)}
                        </h3>
                     </button>
                ))}
            </div>
        </div>
      )}

      {/* EXPERIMENT LIST */}
      {view === 'experiments' && (
          <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                  {getLabel('form')} {selectedForm} {selectedSubject !== 'General' && ` - ${getLabel(selectedSubject?.toLowerCase() as any || 'biology')}`}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {EXPERIMENTS.filter(e => e.form === selectedForm && (e.subject === 'General' || e.subject === selectedSubject)).map(exp => (
                      <div key={exp.id} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                          <div>
                              <h3 className="font-bold text-lg mb-1 text-slate-800 dark:text-slate-100">{getBilingual(exp.title)}</h3>
                              <span className={`text-xs px-2 py-1 rounded-full ${user.completedExperiments.includes(exp.id) ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                                  {user.completedExperiments.includes(exp.id) ? 'Completed' : 'Not Started'}
                              </span>
                          </div>
                          <button 
                            onClick={() => handleExperimentSelect(exp)}
                            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors shadow-lg shadow-blue-600/30"
                          >
                              <PlayCircle size={24} />
                          </button>
                      </div>
                  ))}
                  {EXPERIMENTS.filter(e => e.form === selectedForm && (e.subject === 'General' || e.subject === selectedSubject)).length === 0 && (
                      <div className="col-span-2 text-center py-12 text-slate-500">
                          No experiments available for this category yet.
                      </div>
                  )}
              </div>
          </div>
      )}

      {/* SIMULATION VIEW */}
      {view === 'simulation' && selectedExperiment && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
              {/* Left: Controls & Sim */}
              <div className="lg:col-span-2 space-y-6">
                  {/* Visual Area */}
                  <div className="aspect-video bg-slate-900 rounded-2xl shadow-2xl overflow-hidden relative border border-slate-700">
                      <SimulationCanvas type={selectedExperiment.simulation.type} values={simValues} />
                  </div>

                  {/* Controls */}
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
                      <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-4 uppercase text-sm tracking-wider">{getLabel('manipulated')}</h3>
                      <div className="space-y-6">
                          {Object.keys(selectedExperiment.simulation.defaultValues).map(key => (
                              <div key={key}>
                                  <div className="flex justify-between mb-2">
                                      <label className="text-sm font-medium text-slate-600 dark:text-slate-400 capitalize">
                                          {selectedExperiment.simulation.labels[key] || key}
                                      </label>
                                      <span className="text-sm font-bold text-blue-600">{simValues[key]}</span>
                                  </div>
                                  <input 
                                    type="range"
                                    min={selectedExperiment.simulation.minMax[key][0]}
                                    max={selectedExperiment.simulation.minMax[key][1]}
                                    step="0.1"
                                    value={simValues[key]}
                                    onChange={(e) => setSimValues({...simValues, [key]: parseFloat(e.target.value)})}
                                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                  />
                              </div>
                          ))}
                      </div>
                      
                      <button 
                        onClick={() => setSimValues(selectedExperiment.simulation.defaultValues)}
                        className="mt-6 text-sm text-slate-500 hover:text-blue-500 underline"
                      >
                          {getLabel('tryAgain')}
                      </button>
                  </div>
              </div>

              {/* Right: Info & Steps */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md border border-slate-200 dark:border-slate-700 h-fit overflow-y-auto max-h-[80vh]">
                  <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-white border-b pb-2 dark:border-slate-700">
                      {getBilingual(selectedExperiment.title)}
                  </h2>
                  
                  <div className="space-y-6">
                      <div>
                          <h4 className="font-bold text-blue-600 text-sm uppercase mb-1">{getLabel('objective')}</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-300">{getBilingual(selectedExperiment.objective)}</p>
                      </div>

                      <div>
                          <h4 className="font-bold text-blue-600 text-sm uppercase mb-1">{getLabel('steps')}</h4>
                          <ul className="list-decimal list-inside text-sm text-slate-600 dark:text-slate-300 space-y-1">
                              {(user.language === 'en' || user.language === 'bi' ? selectedExperiment.steps.en : selectedExperiment.steps.ms).map((step, i) => (
                                  <li key={i}>{step}</li>
                              ))}
                          </ul>
                      </div>
                      
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                          <h4 className="font-bold text-blue-600 text-sm uppercase mb-1">{getLabel('conclusion')}</h4>
                          <p className="text-sm text-slate-700 dark:text-slate-200">{getBilingual(selectedExperiment.conclusion)}</p>
                      </div>

                      <button 
                        onClick={finishExperiment}
                        className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-500/30 transition-all transform hover:scale-[1.02]"
                      >
                          {getLabel('nextExp')}
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* OTHER VIEWS */}
      {view === 'quiz' && <QuizView user={user} onComplete={handleQuizComplete} />}
      
      {view === 'achievements' && (
          <div className="text-center py-12">
              <div className="w-24 h-24 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Trophy size={48} className="text-yellow-600 dark:text-yellow-400" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Level {user.level}</h2>
              <p className="text-slate-500 mb-8">{user.xp} XP Earned</p>
              
              <div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  <h3 className="font-bold mb-4 text-left">Completed Experiments</h3>
                  {user.completedExperiments.length === 0 ? (
                      <p className="text-slate-400 text-sm italic">No experiments completed yet.</p>
                  ) : (
                      <ul className="space-y-2">
                          {user.completedExperiments.map(id => (
                              <li key={id} className="flex items-center gap-2 text-green-600">
                                  <Star size={16} fill="currentColor" />
                                  <span>{EXPERIMENTS.find(e => e.id === id)?.title.en}</span>
                              </li>
                          ))}
                      </ul>
                  )}
              </div>
          </div>
      )}

      {view === 'library' && (
          <div className="prose dark:prose-invert max-w-none">
              <h2>Library</h2>
              <p>Reference materials and experiment summaries will be stored here.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose mt-6">
                  {EXPERIMENTS.map(exp => (
                      <div key={exp.id} className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                          <h4 className="font-bold text-sm mb-2">{getBilingual(exp.title)}</h4>
                          <p className="text-xs text-slate-500 line-clamp-3">{getBilingual(exp.objective)}</p>
                      </div>
                  ))}
              </div>
          </div>
      )}

      {view === 'profile' && (
          <div className="max-w-md mx-auto bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg text-center">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full mx-auto flex items-center justify-center text-blue-600 font-bold text-2xl mb-4">
                  {user.name.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
              <p className="text-slate-500 mb-6 capitalize">{user.language === 'bi' ? 'Bilingual' : user.language === 'en' ? 'English' : 'Bahasa Melayu'}</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                      <div className="text-2xl font-bold">{user.xp}</div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider">XP</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                      <div className="text-2xl font-bold">{user.level}</div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider">Level</div>
                  </div>
              </div>
          </div>
      )}

      {view === 'settings' && (
          <div className="max-w-md mx-auto space-y-4">
              <h2 className="text-2xl font-bold mb-6">Settings</h2>
              
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                  <h3 className="font-bold mb-4">Appearance</h3>
                  <button 
                    onClick={toggleTheme}
                    className="w-full flex justify-between items-center p-3 bg-slate-100 dark:bg-slate-700 rounded-lg"
                  >
                      <span>Dark Mode</span>
                      <div className={`w-12 h-6 rounded-full p-1 transition-colors ${isDark ? 'bg-blue-600' : 'bg-slate-400'}`}>
                          <div className={`w-4 h-4 bg-white rounded-full transition-transform ${isDark ? 'translate-x-6' : ''}`} />
                      </div>
                  </button>
              </div>

               <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                   <h3 className="font-bold mb-4">Language</h3>
                   <div className="space-y-2">
                       {['en', 'ms', 'bi'].map((l) => (
                           <button 
                            key={l}
                            onClick={() => setUser({...user, language: l as Language})}
                            className={`w-full text-left p-3 rounded-lg flex justify-between items-center ${user.language === l ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600' : 'hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                           >
                               <span className="capitalize">{l === 'bi' ? 'Bilingual' : l === 'en' ? 'English' : 'Bahasa Melayu'}</span>
                               {user.language === l && <Star size={16} fill="currentColor" />}
                           </button>
                       ))}
                   </div>
               </div>

               <div className="text-center text-slate-400 text-sm pt-8">
                   <Info size={16} className="inline mr-2" />
                   SmartLab Simulator v1.0
               </div>
          </div>
      )}

    </Layout>
  );
};

export default App;
