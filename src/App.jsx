import { useState, useEffect, useRef } from 'react';
import {
  ArrowRight, BarChart3, BookOpen, CheckCircle2,
  ChevronDown, ChevronRight, Cpu, FileText,
  GraduationCap, Landmark, Menu,
  Scale, Shield, Users, Wrench, X, Zap, Eye,
  GitBranch, School, Factory, UserCheck,
  CircleAlert, Network, Home, FlaskConical,
  TrendingUp, ExternalLink, MessageSquare, Lock
} from 'lucide-react';

// ============================================================
// DATA — source document Section 3B (Documented Fact)
// ============================================================

const SAMPLE_WARDS = [
  { ward: 'Ward 4 — Old Town', domain: 'Water & Sanitation', reports: 34, severity: 82, lat: 12.9716, lng: 77.5946 },
  { ward: 'Ward 11 — Riverside', domain: 'Drainage', reports: 27, severity: 74, lat: 12.98, lng: 77.6 },
  { ward: 'Ward 7 — Market Rd', domain: 'Infrastructure', reports: 21, severity: 71, lat: 12.965, lng: 77.59 },
  { ward: 'Ward 2 — Station Area', domain: 'Sanitation', reports: 18, severity: 58, lat: 12.975, lng: 77.585 },
  { ward: 'Ward 9 — Hillside', domain: 'Water Supply', reports: 12, severity: 45, lat: 12.96, lng: 77.605 },
];

// ============================================================
// SHARED UI
// ============================================================

function Label({ children, kind = 'fact' }) {
  const styles = {
    fact: 'bg-teal-bg text-teal border border-teal/25',
    sample: 'bg-amber-50 text-amber-800 border border-amber-200',
    illustrative: 'bg-violet-50 text-violet-800 border border-violet-200',
    target: 'bg-blue-50 text-blue-800 border border-blue-200',
    mvp: 'bg-teal-bg text-teal border border-teal/25',
    roadmap: 'bg-amber-100 text-amber-900 border border-amber-300',
    secondary: 'bg-gray-100 text-gray-700 border border-gray-300',
    implemented: 'bg-green-100 text-green-800 border border-green-300',
  };
  const titles = {
    fact: 'Documented Fact — sourced, see Research & Sources',
    sample: 'Sample data — for illustration only, not real figures',
    illustrative: 'Illustrative — placeholder, real data not yet available',
    target: 'Target — goal, not measured result',
    mvp: 'HACKATHON MVP — build now, demoable',
    roadmap: 'ROADMAP — scoped, not built yet',
    secondary: 'SECONDARY — build only if core done',
    implemented: 'Implemented — built and verified',
  };
  const texts = {
    fact: 'Documented Fact', sample: 'Sample', illustrative: 'Illustrative',
    target: 'Target', mvp: 'HACKATHON MVP', roadmap: 'ROADMAP',
    secondary: 'SECONDARY', implemented: 'Implemented',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide ${styles[kind]}`} title={titles[kind]}>
      {texts[kind]}
    </span>
  );
}

function SectionHeading({ id, kicker, title, subtitle }) {
  return (
    <div className="section-header animate-slide-up">
      <p className="text-teal text-sm font-semibold uppercase tracking-widest mb-3">{kicker}</p>
      <h2 className="section-title" id={id}>{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}

function SourceNote({ children }) {
  return <p className="source-citation mt-2">Source: {children}</p>;
}

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={visible ? 'animate-slide-up' : 'opacity-0'} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// ============================================================
// NAVIGATION — ~12 items
// ============================================================

const NAV = [
  { id: 'top', label: 'The Scene' },
  { id: 'about', label: 'What Is CiviConnect' },
  { id: 'pipe-today', label: "The Pipe, Today" },
  { id: 'data', label: 'Does Reporting Work?' },
  { id: 'stakes', label: 'What It Costs' },
  { id: 'sorting', label: 'The Key Idea' },
  { id: 'journey', label: 'Two Trips' },
  { id: 'connection', label: 'How the Link Works' },
  { id: 'lane2', label: 'Lane 2 In Detail' },
  { id: 'walkthrough', label: 'Watch It Again' },
  { id: 'prototype', label: 'Prototype' },
  { id: 'education', label: 'Smart Education' },
  { id: 'sources', label: 'Sources & Build' },
];

function Navbar({ active, onNav }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const go = (id) => { setOpen(false); onNav(id); };
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b transition-shadow ${scrolled ? 'shadow-md border-border' : 'border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => go('top')} className="flex items-center gap-3 text-left">
            <img src="/logo.png" alt="CiviConnect logo" className="w-12 h-12 rounded-lg object-contain bg-white border border-border" />
            <span className="leading-tight">
              <span className="block font-serif font-semibold text-charcoal text-base">CiviConnect</span>
              <span className="hidden min-[400px]:block text-xs text-charcoal-light">SIH 2026 · Problem Statement 26043</span>
            </span>
          </button>
          <nav className="hidden lg:flex items-center gap-1 text-sm overflow-x-auto" aria-label="Sections">
            {NAV.slice(0, 6).map(n => (
              <button key={n.id} onClick={() => go(n.id)}
                className={`px-2.5 py-1.5 rounded-md whitespace-nowrap transition ${active === n.id ? 'bg-teal-bg text-teal font-medium' : 'text-charcoal-light hover:bg-off-white hover:text-charcoal'}`}>
                {n.label}
              </button>
            ))}
            <button onClick={() => go('journey')} className="ml-1 btn-primary !px-4 !py-2 !text-sm">
              See the Difference <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </nav>
          <button className="lg:hidden p-2 text-charcoal" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="lg:hidden border-t border-border bg-white max-h-[60vh] overflow-y-auto" aria-label="Mobile sections">
          {NAV.map(n => (
            <button key={n.id} onClick={() => go(n.id)}
              className={`block w-full text-left px-5 py-3 text-sm border-b border-border/50 ${active === n.id ? 'bg-teal-bg text-teal font-medium' : 'text-charcoal-light'}`}>
              {n.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

// ============================================================
// BEAT 1 — THE SCENE (Sec 3.1) + mental model + implication stats
// ============================================================

function Hero({ onNav }) {
  return (
    <section id="top" className="pt-28 md:pt-36 pb-16 md:pb-24 bg-white">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-teal text-sm font-semibold uppercase tracking-widest mb-4">Smart India Hackathon 2026 · Smart Education · Team Aether Core</p>
          <h1 className="text-balance mb-4 text-center">
            Problem Statement <span className="text-teal">26043</span>
          </h1>
          <p className="text-center text-lg md:text-xl text-charcoal-light max-w-3xl mx-auto mb-5">
            Every year, people report thousands of local problems that need new ideas to fix —
            yet most stay unsolved, because there is no one central place to collect reports,
            sort them, get experts to check them, hand them to the right college or office,
            and work with companies to solve them.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-2">
            <Label kind="fact" />
            <span className="badge bg-off-white text-charcoal border border-border">Govt of Jharkhand · Higher & Technical Education</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-5 my-8 text-left max-w-6xl mx-auto">
            <div className="card !border-t-4 !border-t-red-400">
              <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-1">The Problem</p>
              <h2 className="!text-2xl mb-3">Reporting problems is easy. Turning reports into real solutions is what matters.</h2>
              <p className="text-[15px] text-charcoal-light mb-4">
                Anyone can report in a minute — a photo of a broken road, a water issue, waste, a choked drain, a damaged
                public building. Reporting is the easy part. The hard part starts right after, because a report answers
                none of the questions that actually fix things:
              </p>
              <ul className="text-sm text-charcoal-light space-y-1.5 mb-4 list-disc pl-5">
                <li>Is this a normal fix or a hard one?</li>
                <li>Did someone else already report the same thing?</li>
                <li>Which office should take it — or does it need research?</li>
                <li>Could a college or a company crack it?</li>
                <li>Does it mainly need money?</li>
                <li>And when work is done — did it truly work?</li>
              </ul>
              <p className="text-[15px] text-charcoal-light mb-4">
                Today the road from report to solution is unclear or built by hand. Government offices are good at taking
                complaints in, but a hard or repeat problem needs more than intake. Colleges hold students, teachers,
                researchers, and labs. Companies hold tech, engineers, know-how, and rollout support. Yet the report, the
                right college, and the right company may never meet — so easy reports die waiting for hard solutions.
              </p>
              <div className="rounded-lg bg-red-50 border border-red-200 p-4 mb-4">
                <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-2">The real gap</p>
                <p className="text-sm text-charcoal-light mb-1">The small question is: <em>“Where do we report?”</em></p>
                <p className="text-sm text-near-black font-medium mb-3">The big question is: <em>“After it is reported, who is best placed to solve it?”</em></p>
                <p className="font-serif font-semibold text-charcoal text-center">Problem → ??? → Solution</p>
                <p className="text-sm text-charcoal-light text-center mt-2">CiviConnect fills this missing link.</p>
              </div>
            </div>
            <div className="card !border-t-4 !border-t-teal">
              <p className="text-xs font-bold uppercase tracking-widest text-teal mb-1">The Solution</p>
              <h2 className="!text-2xl mb-3">CiviConnect makes reporting only the first step</h2>
              <p className="text-[15px] text-charcoal-light mb-4">
                When a problem is reported, CiviConnect first helps understand it — then sends it down the right path.
                Not every problem needs the same fix. There are <strong className="text-charcoal">three lanes:</strong>
              </p>
              <div className="rounded-lg border border-blue-300 p-4 mb-3">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1">Lane 1 — Government</p>
                <p className="text-sm text-charcoal-light mb-2">For normal problems a government office can already fix. Example: a broken streetlight or blocked drain goes straight to the office in charge of it.</p>
                <div className="flex flex-wrap items-center gap-1 text-xs">
                  {['Report', 'Check', 'Government', 'Fix', 'Community check'].map((s, i, a) => (
                    <span key={s} className="flex items-center gap-1">
                      <span className="bg-blue-50 border border-blue-200 text-blue-800 rounded px-2 py-0.5 font-medium">{s}</span>
                      {i < a.length - 1 && <span className="text-blue-500 font-bold">→</span>}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-amber-300 p-4 mb-3">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-1">Lane 2 — University + Industry</p>
                <p className="text-sm text-charcoal-light mb-2">For hard, repeat, or study-level problems. The problem becomes a team challenge: colleges bring students, teachers, researchers, labs, and study know-how; companies bring tech, engineers, guides, money, and rollout support. Startups join too, when they fit.</p>
                <div className="flex flex-wrap items-center gap-1 text-xs">
                  {['Repeat flooding', 'Challenge made', 'Skills found', 'College + company matched', 'Sample', 'Trial', 'Rollout', 'Results counted'].map((s, i, a) => (
                    <span key={s} className="flex items-center gap-1">
                      <span className="bg-amber-50 border border-amber-200 text-amber-800 rounded px-2 py-0.5 font-medium">{s}</span>
                      {i < a.length - 1 && <span className="text-amber-500 font-bold">→</span>}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-purple-300 p-4 mb-4">
                <p className="text-xs font-bold uppercase tracking-widest text-purple-600 mb-1">Lane 3 — Crowd Funding / NGOs</p>
                <p className="text-sm text-charcoal-light mb-2">For severe problems no one is ready to take — when offices, colleges, and companies all pass, the community and NGOs step in with money and help. People chip in openly and can see exactly how it is spent.</p>
                <div className="flex flex-wrap items-center gap-1 text-xs">
                  {['Problem', 'Money goal', 'People chip in', 'Work', 'Proof', 'Locals confirm'].map((s, i, a) => (
                    <span key={s} className="flex items-center gap-1">
                      <span className="bg-purple-50 border border-purple-200 text-purple-800 rounded px-2 py-0.5 font-medium">{s}</span>
                      {i < a.length - 1 && <span className="text-purple-500 font-bold">→</span>}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-lg bg-teal-bg border border-teal/25 p-4 mb-4">
                <p className="text-xs font-bold uppercase tracking-widest text-teal mb-2">The big idea</p>
                <p className="text-sm text-near-black font-medium mb-2">“What is this problem — and what is the right way to fix it?”</p>
                <ul className="text-sm text-charcoal-light space-y-1 mb-3 list-disc pl-5">
                  <li>Government — for everyday problems</li>
                  <li>College + company — for hard, new-idea problems</li>
                  <li>Crowd funding / NGOs — for severe problems no one takes up</li>
                </ul>
                <p className="font-serif font-semibold text-charcoal text-center">Problem → Right path → Right people → Fix → Real change</p>
              </div>
              <button onClick={() => onNav('connection')} className="btn-primary !py-2.5 text-sm w-full">
                See how the link works <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <button onClick={() => onNav('pipe-today')} className="btn-primary">
              Follow this pipe <ArrowRight className="w-4 h-4 ml-2" />
            </button>
            <button onClick={() => onNav('journey')} className="btn-secondary">
              Skip to the difference
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// BEAT 2 — FOLLOW THE PIPE: TODAY (value lost at each step)
// ============================================================

const PIPE_TODAY = [
  ['Reported twice, joined never', 'Person A files “Water” on the website. Person B calls the helpline about “Health.” Different places, different words, different tags — the system writes down two strangers.', 'Lost: the link. Two halves of one broken pipe go in as unrelated complaints.'],
  ['Both get a receipt', 'Each person is told their report is “in line.” Neither is told the other one exists.', 'Lost: the repeat clue. The biggest hint — this keeps happening — stays hidden in a plain line.'],
  ['Lined up flat', 'First come, first served. Last year\u2019s same report sits buried somewhere, impossible to find.', 'Lost: memory. Nothing shows that this pipe bursts every season.'],
  ['The normal desk', 'Area decides: the local repair team gets all three. They can do quick fixes, not find dirty-water causes.', 'Lost: the right skill. A “needs a water expert” job is treated as a “needs a plumber” job.'],
  ['Patched. “Closed.”', 'The team patches the spot. An officer marks it closed. No photo proof needed; the reporters are never asked.', 'Lost: proof. “Marked closed” is not “truly fixed.”'],
  ['Next season: it bursts again', 'Same road, same brown water, same two channels. No pattern was saved, no lab was ever told, nothing learned.', 'Lost: learning. The same story repeats — third year in a row.'],
];

function PipeToday() {
  return (
    <section id="pipe-today" className="py-16 md:py-24 bg-off-white scroll-mt-16">
      <div className="section-container">
        <SectionHeading
          kicker="Follow the Pipe — Today"
          title="Six steps. Something is lost at each one."
          subtitle="This is what happens to Market Road's pipe right now. Watch what goes missing at each step — that missing thing IS the problem."
        />
        <div className="max-w-3xl mx-auto">
          {PIPE_TODAY.map(([t, b, lost], i, arr) => (
            <Reveal key={t} delay={i * 50}>
              <div className={`step-card ${i === arr.length - 1 ? 'step-last' : ''}`}>
                <span className="step-number !bg-gray-500">{i + 1}</span>
                {i < arr.length - 1 && <span className="step-line" />}
                <div className="card !py-5">
                  <h3 className="!text-lg mb-1">{t}</h3>
                  <p className="text-charcoal-light text-[15px] mb-2">{b}</p>
                  <p className="text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{lost}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="text-center text-sm text-charcoal-lighter mt-6 max-w-2xl mx-auto">
            The eight known failure points (finding → checking → ranking → sending → right skill → teamwork → doing → measuring) all show up above — as losses on one pipe, not as fancy labels.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================================
// BEAT 3 — DATA AS THREE QUESTIONS
// ============================================================

function Bar({ label, value, max, display, color = 'bg-teal' }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-charcoal">{label}</span>
        <span className="font-serif font-semibold text-charcoal">{display}</span>
      </div>
      <div className="h-3 bg-off-white rounded-full overflow-hidden border border-border/60">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.min(100, (value / max) * 100)}%` }} />
      </div>
    </div>
  );
}

function Data() {
  return (
    <section id="data" className="py-16 md:py-24 bg-white scroll-mt-16">
      <div className="section-container">
        <SectionHeading
          kicker="Does Reporting Work?"
          title="Yes. And that is exactly the point."
          subtitle="Three simple questions, answered with real on-record numbers."
        />
        <Reveal>
          <div className="card mb-5">
            <p className="text-teal text-sm font-semibold uppercase tracking-widest mb-2">Question 1 — Do lots of people report problems to the government?</p>
            <h3 className="!text-2xl mb-4">Yes — and it keeps getting better. <Label kind="fact" /></h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Bar label="2014 complaints / year" value={301000} max={2700000} display="~3.01 lakh" />
                <Bar label="2024 complaints / year" value={2700000} max={2700000} display="~27 lakh (~9×)" />
                <Bar label="May 2026 got" value={176719} max={2700000} display="1,76,719" color="bg-charcoal" />
                <Bar label="June 2026 closed" value={199968} max={2700000} display="1,99,968" color="bg-charcoal" />
                <Bar label="Time to close: 2014 → 2026" value={14} max={160} display="157 days → 14 days" />
              </div>
              <div className="text-[15px] text-charcoal-light space-y-3">
                <p>76% happy with results (Jan–Jun 2026) · 83,544 new users (June 2026) · 1,09,125 complaint officers listed (vs 10,232 in 2014) · voice chatbot for those who can't type (30 May 2026) · can re-open a case within 30 days.</p>
                <p className="text-near-black font-medium border-l-2 border-teal pl-3">So the inbox is fine. What is broken happens <em>after</em> a report is written down — which is why this plan does not fight CPGRAMS, it picks up where CPGRAMS stops.</p>
                <SourceNote>DARPG Report 49 (May 2026); PIB CPGRAMS briefs 08/09/21 Aug 2026; CPGRAMS G2G study (Apr 2026).</SourceNote>
              </div>
            </div>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-5">
          <Reveal>
            <div className="card">
              <p className="text-teal text-sm font-semibold uppercase tracking-widest mb-2">Question 2 — Then what is breaking?</p>
              <h3 className="!text-xl mb-3">Same problems, written down in new words, with nowhere else to go.</h3>
              <div className="table-container mb-3">
                <table className="data-table">
                  <tbody>
                    <tr><td>Complaint tags</td><td className="font-semibold">20 big ones → 1,239 + 18,762 small ones</td></tr>
                    <tr><td>Still open (May 2026)</td><td className="font-semibold">81,075</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-charcoal-light">The tag list blew up because the same failures come back in new words — like our two residents — and plain waiting lines can't join them together. <Label kind="fact" /></p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="card">
              <p className="text-teal text-sm font-semibold uppercase tracking-widest mb-2">Question 3 — Is anyone able to help?</p>
              <h3 className="!text-xl mb-3">Yes — the rules built the teams. Nothing links them.</h3>
              <div className="grid grid-cols-2 gap-3 mb-3">
                {[['~423', 'Student idea labs'], ['~2,871', 'Colleges with research cells'], ['Rs 50,000 cr', 'National research fund'], ['~2.34 lakh', 'PhD students']].map(([v, l]) => (
                  <div key={l} className="bg-off-white rounded-lg border border-border p-3 text-center">
                    <p className="font-serif text-xl text-charcoal">{v}</p>
                    <p className="text-[11px] text-charcoal-light mt-0.5">{l}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-charcoal-light">Education rules ask colleges for real-world projects — but give them no steady supply of checked, real problems. <Label kind="fact" /></p>
              <SourceNote>UGC linkage guidelines; PIB Higher-Ed under NEP 2020 (July 2025).</SourceNote>
            </div>
          </Reveal>
        </div>
        <Reveal>
          <div className="card mt-5 border-amber-300">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h3 className="!text-lg">Where the pipe lives: concentration by ward</h3>
              <Label kind="sample" />
            </div>
            <div className="table-container">
              <table className="data-table">
                <thead><tr><th>Area</th><th>How many reports</th><th>How bad</th></tr></thead>
                <tbody>
                  <tr><td>Ward 4 — Old Town (Water & Sanitation)</td><td>34 reports</td><td>82</td></tr>
                  <tr><td>Ward 11 — Riverside (Drainage)</td><td>27 reports</td><td>74</td></tr>
                  <tr><td>Ward 7 — Market Rd (Infrastructure)</td><td>21 reports</td><td>71</td></tr>
                  <tr><td>Ward 2 — Station Area (Sanitation)</td><td>18 reports</td><td>58</td></tr>
                  <tr><td>Ward 9 — Hillside (Water Supply)</td><td>12 reports</td><td>45</td></tr>
                </tbody>
              </table>
            </div>
            <p className="source-citation mt-2">Figure 0 — SAMPLE DATA for pitch/demo only, not real deployment figures.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================================
// BEAT 4 — STAKES (five people, what the pipe costs them)
// ============================================================

const STAKES = [
  { icon: Home, name: 'The residents', stake: 'Report twice, wait months, watch the patch fail — then stop trusting reports at all.', need: 'A road to a real fix, not just a receipt.' },
  { icon: Landmark, name: 'The officer', stake: 'Owns a line they cannot sort: 81,075 still open, every ticket looks the same, no sign saying “push this one up.”', need: 'Small jobs split from big jobs at the start — not by guessing.' },
  { icon: School, name: 'The teacher', stake: 'Wants live student projects; hears about the pipe — if ever — as hallway talk, months late, too vague to use.', need: 'A checked, clearly-written challenge paper, ready on day one.' },
  { icon: GraduationCap, name: 'The students', stake: 'Do made-up classwork while a real dirty-water case 2 km away goes unstudied.', need: 'Real problems, real guides, real field trials — plus proof for their CV.' },
  { icon: Factory, name: 'The company mentor', stake: 'Has charity budget and engineers, but no checked, followable way into local problems.', need: 'An easy, clear door in — with visible progress, not cold calls.' },
];

function Stakes() {
  return (
    <section id="stakes" className="py-16 md:py-24 bg-off-white scroll-mt-16">
      <div className="section-container">
        <SectionHeading
          kicker="What It Costs"
          title="One pipe, five people, five losses"
          subtitle="Each group works fine alone. The cost: none of them meet the others."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {STAKES.map((s, i) => (
            <Reveal key={s.name} delay={(i % 3) * 80}>
              <div className="card-hover h-full">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-11 h-11 rounded-lg bg-teal-bg text-teal flex items-center justify-center"><s.icon className="w-5 h-5" /></span>
                  <h3 className="!text-lg">{s.name}</h3>
                </div>
                <p className="text-sm text-charcoal-light mb-3">{s.stake}</p>
                <div className="border-t border-border pt-3"><p className="data-label !text-teal">What they need</p><p className="text-near-black font-medium text-sm">{s.need}</p></div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={160}>
            <div className="card h-full bg-charcoal text-white !border-charcoal flex flex-col justify-center">
              <Network className="w-8 h-8 text-teal-lighter mb-3" />
              <h3 className="!text-lg !text-white mb-2">The missing piece</h3>
              <p className="text-gray-300 text-sm">Not another inbox — a middle layer that cleans up reports, sends each down its right path, pairs hard ones with the right team, and checks the fix worked.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// BEAT 5 — THE SORTING INSIGHT (thin: 3 cards)
// ============================================================

function Sorting() {
  return (
    <section id="sorting" className="py-16 md:py-20 bg-white scroll-mt-16">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <p className="text-teal text-sm font-semibold uppercase tracking-widest mb-3">The key idea</p>
          <h2 className="section-title">Every local problem is one of three kinds.<br />Today all three land on the same desk.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {[
            ['Normal', 'Needs an office.', 'One pothole. One broken light. One team, one visit.', 'border-blue-500', 'text-blue-600'],
            ['Small but costly', 'Needs money, not research.', 'A drain cover. Park swings. Too pricey for normal budgets, too small for a lab.', 'border-amber-500', 'text-amber-600'],
            ['Keeps coming back', 'Needs a lab.', 'Our pipe. Dirty-water source. Breaks every season — a study-level job.', 'border-purple-500', 'text-purple-600'],
          ].map(([t, s, b, bc, tc], i) => (
            <Reveal key={t} delay={i * 80}>
              <div className={`card text-center h-full border-t-4 ${bc}`}>
                <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${tc}`}>{t}</p>
                <p className="font-serif font-semibold text-charcoal mb-2">{s}</p>
                <p className="text-sm text-charcoal-light">{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// BEAT 6 — THE TOGGLE (centerpiece)
// ============================================================

function Journey() {
  const [view, setView] = useState('civiconnect');
  return (
    <section id="journey" className="py-16 md:py-24 bg-charcoal text-white scroll-mt-16">
      <div className="section-container">
        <div className="section-header">
          <p className="text-teal-lighter text-sm font-semibold uppercase tracking-widest mb-3">The Main Show — Same Pipe, Two Trips</p>
          <h2 className="text-white mb-4">Flip the switch. This is the whole idea.</h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">
            The money-pool lane is not small print — it is a key difference.
            Any chart showing two lanes instead of three is simply wrong.
          </p>
          <div className="inline-flex flex-wrap justify-center max-w-full rounded-lg border border-white/20 overflow-hidden" role="tablist">
            <button role="tab" aria-selected={view === 'current'} onClick={() => setView('current')}
              className={`px-6 py-3 text-sm font-medium transition ${view === 'current' ? 'bg-white text-charcoal' : 'text-gray-300 hover:text-white'}`}>
              The Pipe, Today
            </button>
            <button role="tab" aria-selected={view === 'civiconnect'} onClick={() => setView('civiconnect')}
              className={`px-6 py-3 text-sm font-medium transition ${view === 'civiconnect' ? 'bg-teal text-white' : 'text-gray-300 hover:text-white'}`}>
              The Pipe, Connected
            </button>
          </div>
        </div>

        {view === 'current' ? (
          <div className="max-w-3xl mx-auto" key="current">
            <ol className="space-y-0">
              {[
                ['Filed twice, joined never', 'Website + helpline. Two wordings, two tags, zero link.'],
                ['Lined up flat', 'First come, first served. Repeat history invisible. Last year\u2019s same report buried.'],
                ['The normal desk', 'Local repair team — good at patches, not at finding causes.'],
                ['Patched. “Closed.”', 'Officer signs off. No photo proof. Reporters never asked.'],
                ['Next season: bursts again', 'No pattern saved. No lab told. Nothing learned.'],
              ].map(([t, b], i, arr) => (
                <li key={t} className={`step-card !pl-12 pb-8 ${i === arr.length - 1 ? 'step-last' : ''}`}>
                  <span className="step-number !bg-gray-500">{i + 1}</span>
                  {i < arr.length - 1 && <span className="step-line !bg-white/20" />}
                  <h3 className="!text-lg text-white">{t}</h3>
                  <p className="text-gray-300 text-[15px]">{b}</p>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto" key="civiconnect">
            <ol className="space-y-0 mb-10 max-w-3xl mx-auto">
              {[
                ['Reported with proof', 'Photo + location + words. Works offline; can speak instead of type; one photo per report.'],
                ['Cleaned up by one AI call', 'Checks if it looks real, picks a tag, writes a short summary, gives a score. Repeat-check (150m + same tag) and a fixed-rule danger score run too — then a person checks it all.'],
                ['Sorted, not lined up', 'Keeps-coming-back + hard → Lane 2. The pipe finally goes somewhere made for pipes-that-keep-bursting.'],
              ].map(([t, b], i) => (
                <li key={t} className="step-card !pl-12 pb-8">
                  <span className="step-number">{i + 1}</span>
                  <span className="step-line !bg-white/20" />
                  <h3 className="!text-lg text-white">{t}</h3>
                  <p className="text-gray-300 text-[15px]">{b}</p>
                </li>
              ))}
            </ol>
            <div className="grid md:grid-cols-3 gap-5 mb-10">
              <div className="rounded-xl bg-white text-charcoal p-6 border-t-4 border-blue-500">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">Lane 1 — Government</p>
                <h3 className="!text-xl mb-2">Government Office</h3>
                <p className="text-sm text-charcoal-light">Everyday one-offs, sent by a tag→office list that officials can edit. No coding needed to re-send.</p>
              </div>
              <div className="rounded-xl bg-white text-charcoal p-6 border-t-4 border-amber-500 ring-2 ring-amber-300">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2">Lane 2 — University + Industry ★</p>
                <h3 className="!text-xl mb-2">Challenge for a Team</h3>
                <p className="text-sm text-charcoal-light">Hard, repeat, study-level problems — like our pipe. Fact-sheet made → best college + company picked with reasons → shared room → sample → small trial → full rollout.</p>
                <p className="text-xs text-amber-700 font-medium mt-2">★ Main focus of this site — explained in full below.</p>
              </div>
              <div className="rounded-xl bg-white text-charcoal p-6 border-t-4 border-purple-500">
                <p className="text-xs font-bold uppercase tracking-widest text-purple-600 mb-2">Lane 3 — Crowd Funding / NGOs</p>
                <h3 className="!text-xl mb-2">Money + Help When No One Takes It</h3>
                <p className="text-sm text-charcoal-light">Severe problems no one is ready to take — offices, colleges, companies all pass. The community and NGOs step in with money and help. Open goal, open records, same proof rule.</p>
              </div>
            </div>
            <ol className="space-y-0 max-w-3xl mx-auto">
              {[
                ['Proved, not just said', 'After-photo plus a photo-change check, then the first reporter confirms the pipe held.'],
                ['Counted honestly', 'Fewer repeat reports feed the scoreboard — a goal until launch, never a made-up number.'],
              ].map(([t, b], i) => (
                <li key={t} className={`step-card !pl-12 pb-8 ${i === 1 ? 'step-last' : ''}`}>
                  <span className="step-number">{4 + i}</span>
                  {i < 1 && <span className="step-line !bg-white/20" />}
                  <h3 className="!text-lg text-white">{t}</h3>
                  <p className="text-gray-300 text-[15px]">{b}</p>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================================
// BEAT 7 — FUSED CONNECTION STRIP (per-step tags locked)
// ============================================================

function Connection() {
  const [declined, setDeclined] = useState(false);
  const [dnaOpen, setDnaOpen] = useState(false);
  const steps = [
    { tag: 'mvp', title: 'Step 1 — Read by one AI call', body: 'Runs on the server, never in your browser. Reads the photo + words and gives back: tag, one-line summary, score, and a yes/no — “is this a real public issue?” Photo only; no videos.' },
    { tag: 'mvp', title: 'Step 2 — Checked by a person', body: 'A reviewer says yes, fixes, says no, or joins it with a twin report. If the AI fails, a plain message says a person will tag it instead — never a made-up tag.' },
    { tag: 'mvp', title: 'Step 3 — Fact-sheet made', body: 'Topic, place, danger score, repeat count, skills needed, teamwork type, hoped result — the paper a college teacher would otherwise take weeks to write.' },
    { tag: 'mvp', title: 'Step 4 — Team picked, reasons shown', body: 'Teams ranked by matching tags — shown openly, never just a number. Every pick lists its reasons; if one says no, the next one pops up by itself. Try it below.' },
    { tag: 'mvp', title: 'Step 5 — Work followed', body: 'Shared room with team, dated goals, files, and step-by-step moves: sample → small trial → full rollout. A one-look health score is planned later.' },
    { tag: 'mvp', title: 'Step 6 — Proved with photo + people', body: 'Before/after photo-change check locked into screen + code + database, then the reporter confirms. A 15-day quality rating (catches sand-filled potholes) is planned later.' },
  ];
  return (
    <section id="connection" className="py-16 md:py-24 bg-white scroll-mt-16">
      <div className="section-container">
        <SectionHeading
          kicker="How the Link Works"
          title="The pipe, linked up — six plain steps"
          subtitle="AI, fact-sheet, and team-picking joined into one strip. Each step wears its build tag, so done is never mixed with planned."
        />
        <div className="max-w-3xl mx-auto space-y-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 40}>
              <div className="card !py-5">
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-teal text-white flex items-center justify-center font-serif font-bold shrink-0">{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="!text-lg">{s.title}</h3>
                    </div>
                    <p className="text-[15px] text-charcoal-light">{s.body}</p>
                    {i === 2 && (
                      <button onClick={() => setDnaOpen(!dnaOpen)} className="mt-2 text-sm text-teal font-medium inline-flex items-center gap-1">
                        {dnaOpen ? 'Hide' : 'Show'} the pipe's fact-sheet <ChevronDown className={`w-4 h-4 transition ${dnaOpen ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                    {i === 2 && dnaOpen && (
                      <dl className="mt-3 space-y-1.5 text-sm bg-off-white rounded-lg p-4 border border-border">
                        {[
                          ['Topic', 'Water & Sanitation → pipe bursts again and again'],
                          ['Place', 'GPS + Market Road area'],
                          ['How bad', '4 of 5 (fixed rules)'],
                          ['Repeat count', '12 linked reports in 90 days'],
                          ['People hit', '~600 homes — guessed from report spread, never exact'],
                          ['Skills needed', 'Civil / water-building, maps (GIS)'],
                          ['Teamwork', 'Build a sample + small field trial'],
                          ['Hoped result', 'Fewer repeats, checked by fewer new reports'],
                        ].map(([k, v]) => (
                          <div key={k} className="flex gap-3"><dt className="w-28 shrink-0 font-medium text-charcoal">{k}</dt><dd className="text-charcoal-light">{v}</dd></div>
                        ))}
                      </dl>
                    )}
                    {i === 3 && (
                      <div className="mt-3 space-y-2">
                        <div className={`rounded-lg border p-3 text-sm transition ${declined ? 'border-border bg-off-white opacity-70' : 'border-teal/40 bg-teal-bg/40'}`}>
                          <p className="font-medium text-charcoal">#1 — Civil Team, Nearby College <span className="tag bg-teal text-white ml-1">87</span></p>
                          <p className="text-charcoal-light text-[13px]">Why: civil team · 2 teachers marked ‘city water systems’ · 1 past job in this area.</p>
                        </div>
                        <div className={`rounded-lg border p-3 text-sm transition ${declined ? 'border-teal/40 bg-teal-bg/40' : 'border-border'}`}>
                          <p className="font-medium text-charcoal">#2 — Water-Environment Team <span className="tag bg-charcoal text-white ml-1">74</span></p>
                          <p className="text-charcoal-light text-[13px]">Why: 1 teacher marked ‘water quality’ · free for new work.</p>
                          {declined && <p className="text-teal font-medium mt-1">→ Pops up by itself. A person is told only if the list runs out.</p>}
                        </div>
                        <button onClick={() => setDeclined(!declined)} className="text-sm px-4 py-2 rounded-lg font-medium border border-border text-charcoal-light hover:bg-off-white transition">
                          {declined ? '↩ Undo the no' : 'Try it: #1 says no'}
                        </button>
                        <p className="text-xs text-charcoal-lighter">Fancy word-meaning search is <Label kind="roadmap" /> — the working version matches simple tags, said openly.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="card bg-off-white mt-6 max-w-3xl mx-auto">
            <h3 className="!text-lg mb-2">What the AI never does</h3>
            <p className="text-[15px] text-charcoal-light">Twin-finding is fixed rules (150m + same tag). Danger score is an open 1–5 rule sum. Cause-guesses are advice only, always marked “not sure.” No AI picks lanes or order — AI suggests, a person decides.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================================
// BEAT 8 — REPLAY THE PIPE (walkthrough stepper, retitled)
// ============================================================

const WALKTHROUGH = [
  ['Person reports', 'The pipe report comes in with photo + location. Photo saved, report row saved.'],
  ['One AI read', 'Tag (Water & Sanitation), short summary, and score written back to the same row.'],
  ['Twin check', 'Open reports within 150m, same tag. Person A and B finally meet — as one group.'],
  ['Danger 4/5', 'Fixed rule sum: linked count + red-flag words. Open for all to see; a person can overrule.'],
  ['Person checks', 'Reviewer looks, says OK, and sends it onward.'],
  ['Lane 2: repeats + hard', 'Keeps coming back plus needs study → college + company challenge.'],
  ['Fact-sheet made', 'Topic, danger, repeats, skills needed, hoped result.'],
  ['Tag matching', 'Civil team ranks first — 2 teachers tagged ‘city water systems’.'],
  ['Team says yes', '“Why this team” shown. Shared work room opens.'],
  ['Sample → small trial', 'Team builds, tries it at the spot, ticks off each move.'],
  ['After-photo uploaded', 'Compared with the before-photo; real change flagged.'],
  ['Reporter confirms', 'Person A confirms the pipe held.'],
  ['Closed + counted', 'Fewer new reports feed the scoreboard.'],
];

function Walkthrough() {
  const [step, setStep] = useState(0);
  return (
    <section id="walkthrough" className="py-16 md:py-24 bg-white scroll-mt-16">
      <div className="section-container">
        <SectionHeading
          kicker="Watch It Again"
          title="Play the pipe story step by step"
          subtitle="The full Lane-2 trip — what you see and what happens behind it, at each step."
        />
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="btn-secondary !px-4 !py-2 text-sm disabled:opacity-40">← Prev</button>
            <p className="text-sm text-charcoal-light font-medium">Step {step + 1} of {WALKTHROUGH.length}</p>
            <button onClick={() => setStep(Math.min(WALKTHROUGH.length - 1, step + 1))} disabled={step === WALKTHROUGH.length - 1} className="btn-secondary !px-4 !py-2 text-sm disabled:opacity-40">Next →</button>
          </div>
          <div className="h-2 bg-white rounded-full overflow-hidden border border-border/60 mb-6">
            <div className="h-full bg-teal rounded-full transition-all duration-300" style={{ width: `${((step + 1) / WALKTHROUGH.length) * 100}%` }} />
          </div>
          <div className="card !p-8 min-h-[180px]" key={step}>
            <p className="text-teal text-sm font-semibold uppercase tracking-widest mb-2">Step {step + 1}</p>
            <h3 className="!text-2xl mb-2">{WALKTHROUGH[step][0]}</h3>
            <p className="text-charcoal-light">{WALKTHROUGH[step][1]}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-1.5 mt-5">
            {WALKTHROUGH.map((_, i) => (
              <button key={i} onClick={() => setStep(i)} aria-label={`Go to step ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition ${i === step ? 'bg-teal scale-125' : i < step ? 'bg-teal/40' : 'bg-border'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// BEAT 10a — SMART EDUCATION
// ============================================================

function Education() {
  return (
    <section id="education" className="py-16 md:py-24 bg-white scroll-mt-16">
      <div className="section-container">
        <SectionHeading
          kicker="Smart Education Link"
          title="Learning is what Lane 2 makes by design"
          subtitle="A checked challenge turning into a guided student project with a teacher and a mentor — not a side gift."
        />
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-stretch gap-0">
            {[
              ['Real problem', 'Checked, from the board — topic + where it will roll out'],
              ['Student team', 'Picked by needed-skill tags'],
              ['Teacher + mentor', 'Study discipline + company guidance'],
              ['Sample → small trial', 'Demo checked, then real field test'],
              ['Learning + proof', 'Skills + a record for their CV'],
            ].map(([t, b], i, arr) => (
              <div key={t} className="flex-1 relative">
                <div className="card h-full text-center !p-5">
                  <p className="font-serif text-teal text-xl mb-1">{i + 1}</p>
                  <p className="font-medium text-charcoal text-sm mb-1">{t}</p>
                  <p className="text-xs text-charcoal-light">{b}</p>
                </div>
                {i < arr.length - 1 && <ChevronRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-teal bg-white rounded-full border border-border z-10" />}
              </div>
            ))}
          </div>
          <Reveal>
            <p className="text-center text-charcoal-light text-[15px] mt-6 max-w-2xl mx-auto">
              The same fact-sheet that powers team-picking is what a teacher would otherwise
              spend weeks writing by hand. Speak-to-report, offline drafts, and planned local-language
              voice support open the door wider for villages.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// BEAT 10b — MAP (MapLibre + OpenFreeMap only)
// ============================================================

// ============================================================
// BEAT 10c — SOURCES
// ============================================================

const SOURCES = [
  ['SIH 2026 PS 26043', 'sih.gov.in mirrors (Aug 2026)', 'Govt of Jharkhand · Software · Deadline 20 Sept 2026', 'https://sih.gov.in'],
  ['DARPG Report 49', 'Complaint dept report (May 2026)', '1,76,719 got · 1,78,423 closed · 81,075 still open', 'https://pgportal.gov.in'],
  ['PIB briefs', 'Press Information Bureau (Aug 2026)', 'Closing time 14 days · 76% happy · 83,544 new users', 'https://pib.gov.in'],
  ['CPGRAMS office study', 'DARPG (Apr 2026)', '1,09,125 complaint officers · 20 → 1,239 + 18,762 tags', 'https://pgportal.gov.in'],
  ['NEP 2020', 'Education Ministry', 'College-company links, internships, mixed-subject work', 'https://www.education.gov.in'],
  ['UGC link rules', 'University Grants Commission', '~423 idea labs · ~2,871 research cells · teacher-from-industry rule', 'https://www.ugc.gov.in'],
  ['Offline-first guide', 'Android Developers', 'Phone saves first, sends later, retries, fixes clashes', 'https://developer.android.com/topic/architecture/data-layer/offline-first'],
  ['Phone safety / TEE', 'Android Open Source Project', 'Extra-safe phone key boxes (TEE, StrongBox)', 'https://source.android.com/docs/security/features'],
  ['Gemini 2.5 Flash', 'Google AI for Developers', 'Steady model; reads photos + words', 'https://ai.google.dev/gemini-api/docs/models/gemini-2.5-flash'],
];

function Sources() {
  return (
    <section id="sources" className="py-16 md:py-24 bg-white scroll-mt-16">
      <div className="section-container">
        <SectionHeading
          kicker="Proof & Sources"
          title="Every outside claim, with its source"
          subtitle="Who said it + when + link, for each. Nothing made up."
        />
        <Reveal>
          <div className="table-container bg-white">
            <table className="data-table">
              <thead><tr><th>Source</th><th>Paper</th><th>What it proves</th><th>Link</th></tr></thead>
              <tbody>
                {SOURCES.map(([s, r, w, l]) => (
                  <tr key={s}>
                    <td className="font-medium text-charcoal whitespace-nowrap">{s}</td>
                    <td className="text-charcoal-lighter text-[13px]">{r}</td>
                    <td className="text-[13px]">{w}</td>
                    <td><a href={l} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs">Open <ExternalLink className="w-3 h-3" /></a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================================
// BEAT 10d — TECHNICAL (stack + verbatim Appendix excerpts)
// ============================================================

function Stack() {
  const [tab, setTab] = useState('stack');
  return (
    <section id="stack" className="py-16 md:py-24 bg-off-white scroll-mt-16">
      <div className="section-container">
        <SectionHeading
          kicker="How It Is Built"
          title="Exactly what is used — nothing else"
          subtitle="Plain JavaScript all through. MapLibre + OpenFreeMap only. Expert papers quoted word-for-word, not reworded."
        />
        <Reveal>
          <div className="table-container bg-white mb-6">
            <table className="data-table">
              <thead><tr><th>Part</th><th>Tool used</th><th>Why this one</th></tr></thead>
              <tbody>
                <tr><td className="font-medium">Screen (what you see)</td><td>React + JavaScript + Vite + Tailwind CSS</td><td>Fast to build; the team knows it well</td></tr>
                <tr><td className="font-medium">Server (behind the scenes)</td><td>Hono</td><td>Small and light; little extra code needed</td></tr>
                <tr><td className="font-medium">Data store</td><td>PostgreSQL via Supabase</td><td>Ready-made database; no servers to run</td></tr>
                <tr><td className="font-medium">Login + locks</td><td>Supabase Auth + row locks</td><td>Login and who-sees-what built in</td></tr>
                <tr><td className="font-medium">Photo store</td><td>Supabase Storage (secret links)</td><td>Proof photos; never open folders</td></tr>
                <tr><td className="font-medium">Maps</td><td>MapLibre GL JS + OpenFreeMap</td><td>Free map tiles, no key needed; can swap later</td></tr>
                <tr><td className="font-medium">AI</td><td>Single Gemini photo-reading call, on the server</td><td>One link-up — secret key never reaches your browser</td></tr>
              </tbody>
            </table>
          </div>
        </Reveal>
        <Reveal>
          <p className="text-sm text-charcoal-light mb-6 text-center max-w-2xl mx-auto">
            <strong className="text-near-black">On purpose NOT used:</strong> Next.js, NestJS, Redis/BullMQ, microservices,
            container orchestration, Leaflet, Google Maps, Mapbox, TypeScript. None of these is in the stack or code.
          </p>
        </Reveal>
        <div className="flex justify-center mb-6">
          <div className="inline-flex flex-wrap justify-center max-w-full rounded-lg border border-border overflow-hidden bg-white" role="tablist">
            {[['stack', 'Architecture'], ['api', 'Appendix A — OpenAPI'], ['schema', 'Appendix B — Schema'], ['rls', 'Appendix C — RLS']].map(([k, l]) => (
              <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}
                className={`px-4 py-2.5 text-xs md:text-sm font-medium transition ${tab === k ? 'bg-teal text-white' : 'text-charcoal-light hover:bg-off-white'}`}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <Reveal>
          <div className="card !p-0 overflow-hidden">
            {tab === 'stack' && (
              <div className="p-6 md:p-8">
                <p className="font-mono text-sm text-center leading-loose text-charcoal">
                  React/Vite frontend → Hono API → Supabase (Postgres + Auth + Storage) → Gemini Vision<br />
                  <span className="text-charcoal-lighter">MapLibre GL + OpenFreeMap is frontend-only; no separate map backend.</span><br />
                  Modular monolith — intake / validation / routing / matching / workspace modules.
                </p>
              </div>
            )}
            {tab === 'api' && (
              <div className="bg-charcoal text-gray-100 p-6 font-mono text-xs overflow-x-auto">
                <pre>{`POST /api/issues (multipart: photo + fields)   citizen   Create issue; upload Storage; enqueue AI
GET  /api/issues?status&category&bbox          all (RLS)   Feed / map / cluster reads
GET  /api/validation/queue                    government  Approve / edit / reject / merge queue
POST /api/validation/:id/decision              government  { action, reason?, edits?, duplicateOf? }
POST /api/routing/decide                       system      Dept map (exact→catch-all→default) or Challenge DNA
GET  /api/challenges                           partner     Board list; DNA schema Sec 14
POST /api/challenges/:id/interest              partner     Accept / decline; fallback re-rank on decline
POST /api/issues/:id/proof                     resolver    After-photo; image-diff; require reporter confirm
POST /api/issues/:id/validate                  citizen     Confirm / dispute (+ quality 1–5, ROADMAP)

Error 422 (AI down): { "code": "AI_UNAVAILABLE",
  "message": "Evidence analysis unavailable; human reviewer will categorise instead." }`}</pre>
              </div>
            )}
            {tab === 'schema' && (
              <div className="bg-charcoal text-gray-100 p-6 font-mono text-xs overflow-x-auto">
                <pre>{`create table profiles (
  id uuid primary key references auth.users(id),
  role text check (role in ('citizen','government','partner')) not null,
  full_name text not null, organization text );
create table issues (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid references profiles(id) not null,
  title text not null, description text not null,
  category text check (category in
    ('water','sanitation','infrastructure','education','healthcare','other')),
  photo_url text,                       -- exactly one; video deferred
  latitude double precision not null, longitude double precision not null,
  status text check (status in
    ('draft','submitted','verified','routed_routine','routed_complex',
     'in_progress','resolved','disputed')) default 'submitted',
  ai_result jsonb, severity smallint check (severity between 1 and 5),
  constraint one_media check (photo_url is not null) );
create table challenges (
  id uuid primary key default gen_random_uuid(),
  issue_id uuid references issues(id) on delete cascade not null,
  domain text not null, required_disciplines text[] default '{}',
  expected_outcome text, status text default 'open' );`}</pre>
              </div>
            )}
            {tab === 'rls' && (
              <div className="bg-charcoal text-gray-100 p-6 font-mono text-xs overflow-x-auto">
                <pre>{`-- citizens: own rows only
create policy citizen_own_issues on issues
  for all using (auth.uid() = reporter_id);
-- government: read all (triage); update status/assignment
create policy gov_read_issues on issues
  for select using ((select private.is_government()));
-- partners: only challenges matched to them
create policy partner_read_challenges on challenges
  for select using (exists (
    select 1 from challenge_matches m
    join partner_profiles p on p.id = m.partner_id
    where m.challenge_id = challenges.id
      and p.profile_id = auth.uid() ));
-- role checks use SECURITY DEFINER helpers to avoid
-- recursive RLS evaluation on profiles (Supabase pattern).`}</pre>
              </div>
            )}
            <p className="source-citation px-6 pb-5">Short exact cuts from expert papers A–C. Full papers live in the document pack.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================================
// BEAT 10e — READINESS
// ============================================================

const WORKING_NOW = [
  'Report form — photo, location, words, works offline',
  'Save draft and come back later',
  'Speak instead of typing, into the same box',
  'Single AI photo-reading call, on the server',
  'Fixed-rule danger score + fixed-rule twin check',
  'Human check line — yes, fix, no, or join',
  'Three-lane sending + office list officials can edit',
  'Fact-sheet + tag team-pick + backup pick',
  'Reasons shown for each pick',
  'Shared room + sample → trial → rollout tracker',
  'Before/after proof — screen, code, and database',
];

const COMING_NEXT = [
  'AI idea paths on the fact-sheet',
  '15-day quality rating window',
  'Link map, health score, old-fix library, share shelf',
  'Smart word-meaning search',
  'Good-work coins + cheat-stoppers',
  'Record book and CV download',
  'Short video feed (extra — only if the core is done)',
];

function Readiness() {
  return (
    <section id="readiness" className="py-16 md:py-24 bg-white scroll-mt-16">
      <div className="section-container">
        <SectionHeading
          kicker="The Road Ahead"
          title="What we plan to do"
          subtitle="A plain to-do list in two halves: what already works, and what comes next."
        />
        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          <Reveal>
            <div className="card h-full !border-t-4 !border-t-teal">
              <h3 className="!text-xl mb-4">Already working</h3>
              <ul className="space-y-2.5">
                {WORKING_NOW.map(t => (
                  <li key={t} className="flex items-start gap-2 text-sm text-charcoal-light">
                    <span className="w-5 h-5 rounded-full bg-teal text-white flex items-center justify-center text-xs shrink-0 mt-0.5">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="card h-full !border-t-4 !border-t-amber-500">
              <h3 className="!text-xl mb-4">Coming next</h3>
              <ul className="space-y-2.5">
                {COMING_NEXT.map(t => (
                  <li key={t} className="flex items-start gap-2 text-sm text-charcoal-light">
                    <span className="w-5 h-5 rounded-full bg-off-white border border-border text-charcoal-light flex items-center justify-center text-xs shrink-0 mt-0.5">→</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// BEAT 11 — CLOSING (pipe returns + verbatim USP)
// ============================================================

function Closing({ onNav }) {
  return (
    <section id="closing" className="py-16 md:py-24 bg-charcoal text-white scroll-mt-16">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-teal-lighter text-sm font-semibold uppercase tracking-widest mb-4">Next March</p>
          <h2 className="text-white mb-6">The pipe holds —<br />or the reporter says so, with a photo.</h2>
          <div className="rounded-xl border border-white/15 bg-white/5 p-6 md:p-8 mb-8">
            <p className="font-serif text-lg md:text-xl leading-relaxed">
              “CiviConnect converts verified societal problems into structured challenges, identifies the
              capabilities required to solve them, connects the right government, funding, or university
              and industry partners, and tracks solutions to community-confirmed impact.”
            </p>
          </div>
          <p className="text-gray-300 mb-8">Problem → Capability → Collaboration → Impact.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => onNav('journey')} className="btn-primary">Revisit the difference</button>
            <button onClick={() => onNav('sources')} className="px-6 py-3 rounded-lg font-medium border border-white/25 text-white hover:bg-white/10 transition">Check the sources</button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================

function Footer({ onNav }) {
  return (
    <footer className="bg-near-black text-gray-400 py-12">
      <div className="section-container">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src="/logo.png" alt="CiviConnect logo" className="w-10 h-10 rounded-lg object-contain bg-white" />
              <span className="font-serif font-semibold text-white">CiviConnect</span>
            </div>
            <p className="text-sm">One pipe, followed end to end. Every fact points back to the source papers.</p>
          </div>
          <div>
            <p className="font-medium text-white mb-3 text-sm uppercase tracking-wider">Follow the story</p>
            <div className="grid grid-cols-2 gap-1 text-sm">
              {NAV.slice(0, 10).map(n => (
                <button key={n.id} onClick={() => onNav(n.id)} className="text-left py-1 hover:text-white transition">{n.label}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="font-medium text-white mb-3 text-sm uppercase tracking-wider">Key sources</p>
            <ul className="text-sm space-y-1">
              <li>DARPG Report 49 (May 2026)</li>
              <li>PIB CPGRAMS briefs (Aug 2026)</li>
              <li>NEP 2020 · UGC linkage guidelines</li>
              <li>SIH 2026 PS mirrors (Aug 2026)</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-xs flex flex-wrap justify-between gap-2">
          <span>SIH 2026 · Smart Education · Team Aether Core</span>
          <span>React + JS + Vite + Tailwind · Hono · Supabase · MapLibre + OpenFreeMap · Gemini Vision (server-side)</span>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// NEW SLIDE — WHAT IS CIVICONNECT + HOW IT WORKS (easy + simple)
// ============================================================

function AboutCivi({ onNav }) {
  return (
    <section id="about" className="py-16 md:py-24 bg-white scroll-mt-16">
      <div className="section-container">
        <SectionHeading
          kicker="Meet CiviConnect"
          title="What is it? How does it work?"
          subtitle="One idea, four moves. No big words."
        />
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="card mb-5">
              <h3 className="!text-xl mb-2">What is it?</h3>
              <p className="text-[15px] text-charcoal-light">
                CiviConnect is a link between people with problems and people who can fix them.
                It takes a checked report, finds what kind of fix it needs, hands it to the right
                team — office, college + company, or money pool — and stays until local people say it worked.
              </p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {[
              ['1 · You report', 'Photo + place + a few words. Works offline; speak instead of type.'],
              ['2 · It checks + sorts', 'AI reads it, a person checks it, and it goes down 1 of 3 lanes.'],
              ['3 · The right team fixes', 'Office crew, college + company team, or pooled money — tracked step by step.'],
              ['4 · You confirm', 'Before/after photos, then your yes closes the case. No yes, no close.'],
            ].map(([t, b], i) => (
              <Reveal key={t} delay={i * 70}>
                <div className="card h-full !p-5">
                  <h3 className="!text-lg mb-1">{t}</h3>
                  <p className="text-sm text-charcoal-light">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={() => onNav('lane2')} className="btn-primary">
                Lane 2 — the main story <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <button onClick={() => onNav('pipe-today')} className="btn-secondary">
                First, see the problem
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// LANE 2 IN DETAIL — the main focus
// ============================================================

function Lane2Detail({ onNav }) {
  return (
    <section id="lane2" className="py-16 md:py-24 bg-off-white scroll-mt-16">
      <div className="section-container">
        <SectionHeading
          kicker="Lane 2 In Detail"
          title="Lane 2 — University + Industry, in full"
          subtitle="Hard, repeat, study-level problems, solved by colleges and companies together."
        />
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="card mb-5">
              <h3 className="!text-xl mb-2">Which problems come here?</h3>
              <p className="text-[15px] text-charcoal-light">
                Problems an office crew <em>can't</em> fix and money alone <em>can't</em> fix: things that keep coming back,
                need study, need new tech, or need deep know-how. Our Market Road pipe is the textbook case — patched three
                times, bursting a fourth. That is not a repair job. That is a research job.
              </p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <Reveal>
              <div className="card h-full !border-t-4 !border-t-purple-500">
                <p className="text-xs font-bold uppercase tracking-widest text-purple-600 mb-2">The college side</p>
                <ul className="text-sm text-charcoal-light space-y-1.5 list-disc pl-5">
                  <li><strong className="text-charcoal">Students</strong> — build and test, for real, not for marks alone</li>
                  <li><strong className="text-charcoal">Teachers</strong> — guide the work with study discipline</li>
                  <li><strong className="text-charcoal">Researchers</strong> — dig into causes, not just signs</li>
                  <li><strong className="text-charcoal">Labs</strong> — test water, soil, materials on real samples</li>
                  <li><strong className="text-charcoal">Study know-how</strong> — papers, methods, past trials</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="card h-full !border-t-4 !border-t-teal">
                <p className="text-xs font-bold uppercase tracking-widest text-teal mb-2">The company side</p>
                <ul className="text-sm text-charcoal-light space-y-1.5 list-disc pl-5">
                  <li><strong className="text-charcoal">Technology</strong> — sensors, tools, and systems colleges lack</li>
                  <li><strong className="text-charcoal">Engineers</strong> — people who ship things that last</li>
                  <li><strong className="text-charcoal">Guides</strong> — mentors who have fixed this before</li>
                  <li><strong className="text-charcoal">Money</strong> — CSR funds tied to visible results</li>
                  <li><strong className="text-charcoal">Rollout help</strong> — taking a trial to full streets</li>
                </ul>
                <p className="text-xs text-charcoal-lighter mt-3">Startups join too, whenever they are the right fit.</p>
              </div>
            </Reveal>
          </div>
          <Reveal>
            <div className="card mb-5">
              <h3 className="!text-xl mb-3">How a Lane 2 case runs — the flooding example</h3>
              <div className="flex flex-wrap items-center gap-1.5 text-xs mb-3">
                {['Repeat flooding reported', 'Challenge made', 'Skills listed', 'College + company matched (reasons shown)', 'Sample built', 'Small trial', 'Full rollout', 'Results counted', 'Locals confirm'].map((s, i, a) => (
                  <span key={s} className="flex items-center gap-1.5">
                    <span className="bg-purple-50 border border-purple-200 text-purple-800 rounded-lg px-2.5 py-1 font-medium">{s}</span>
                    {i < a.length - 1 && <span className="text-purple-500 font-bold">→</span>}
                  </span>
                ))}
              </div>
              <p className="text-sm text-charcoal-light">
                A low area floods every monsoon. Reports pile up across three wards. Instead of three more patches, the
                cases join into one challenge: civil + water teachers, two final-year teams, one company's drainage
                engineers and sensors. Sample drain design → one-lane trial through one monsoon → measured dry →
                rollout to all three wards. Residents confirm street by street.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="card mb-5">
              <h3 className="!text-xl mb-2">Which problems count as severe?</h3>
              <p className="text-[15px] text-charcoal-light">
                A problem earns Lane 2 when an office crew <em>can't</em> end it and money alone <em>can't</em> fix it:
                it keeps coming back, needs study or new tech, or needs deep know-how. Three examples:
              </p>
            </div>
          </Reveal>
          <div className="grid lg:grid-cols-3 gap-5 mb-5">
            {[
              ['Burst pipe + brown water',
               'Severe because: third burst this year + kids falling sick. A patch treats the sign; only a lab can find the cause.',
               ['Reports joined', 'Water lab matched', 'Source tested', 'New pipe trial', 'Residents confirm']],
              ['Ward floods every monsoon',
               'Severe because: whole lanes go under water yearly, drains overflow, normal cleaning changes nothing.',
               ['3 wards, 1 challenge', 'Civil team + sensors firm', 'One-lane trial', 'Measured dry', 'Rollout + confirm']],
              ['Streetlights die every month',
               'Severe because: same poles fail again and again — a voltage fault, not fused bulbs. Crews just swap bulbs.',
               ['Failure pattern mapped', 'Electrical team matched', 'Meters fitted', 'Fault fixed + watched', 'Lights stay on']],
            ].map(([t, why, chain], i) => (
              <Reveal key={t} delay={i * 80}>
                <div className="card h-full !p-5">
                  <h3 className="!text-lg mb-1">{t}</h3>
                  <p className="text-[13px] text-charcoal-light mb-3">{why}</p>
                  <div className="flex flex-wrap items-center gap-1 text-[11px]">
                    {chain.map((s, j) => (
                      <span key={s} className="flex items-center gap-1">
                        <span className="bg-amber-50 border border-amber-200 text-amber-800 rounded px-2 py-0.5 font-medium">{s}</span>
                        {j < chain.length - 1 && <span className="text-amber-500 font-bold">→</span>}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="card bg-charcoal text-white !border-charcoal">
              <h3 className="!text-xl !text-white mb-2">Why Lane 2 is the heart of it</h3>
              <p className="text-gray-300 text-[15px] mb-4">
                Lane 1 keeps streets running. Lane 3 funds what money can fix. But only Lane 2 <em>learns</em> — it turns a
                repeat failure into studied knowledge, student skills, and a fix that holds. That is also why it carries the
                Smart Education story: every Lane 2 case is a real syllabus written by a real street.
              </p>
              <button onClick={() => onNav('education')} className="btn-primary !py-2.5 text-sm">
                How this teaches <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PROTOTYPE SPOTLIGHT — real photos
// ============================================================

function PrototypeSpotlight() {
  return (
    <section id="prototype" className="py-16 md:py-24 bg-off-white scroll-mt-16">
      <div className="section-container">
        <SectionHeading
          kicker="Real Photos"
          title="The problem is real. So is the work."
          subtitle="Actual photos — the streets we talk about, and the prototype being built."
        />
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="card !p-4 md:!p-6 mb-5">
              <img src="/prototype.jpg" alt="The CiviConnect working prototype" loading="lazy"
                className="w-full max-h-[480px] object-contain rounded-lg bg-off-white" />
              <p className="text-sm text-charcoal-light mt-3 text-center">Our working prototype — the app taking shape.</p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-5 mb-8">
            <Reveal>
              <div className="card !p-4">
                <img src="/pothole.jpg" alt="Real pothole on an Indian street" loading="lazy"
                  className="w-full h-64 object-cover rounded-lg" />
                <p className="text-xs text-charcoal-light mt-2 text-center">Real street photo — the kind of report Lane 1 picks up daily.</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="card !p-4">
                <img src="/pothole-street.webp" alt="Damaged road surface" loading="lazy"
                  className="w-full h-64 object-cover rounded-lg" />
                <p className="text-xs text-charcoal-light mt-2 text-center">Real street photo — when damage like this repeats, it becomes a Lane 2 case.</p>
              </div>
            </Reveal>
          </div>
          <Reveal>
            <h3 className="!text-xl text-center mb-1">Seen on real streets</h3>
            <p className="text-sm text-charcoal-light text-center mb-5 max-w-2xl mx-auto">Openly licensed photos from Wikimedia Commons — the exact kinds of failures this site is about. Click any photo for its source page.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              ['https://commons.wikimedia.org/wiki/Special:FilePath/2020%20Hyderabad%20floods.jpg?width=800',
               'Flooded street, Hyderabad, India (Oct 2020)', 'Repeat urban flooding — a textbook Lane 2 case.',
               'https://commons.wikimedia.org/wiki/File:2020_Hyderabad_floods.jpg', 'Strike Eagle · CC BY-SA'],
              ['https://commons.wikimedia.org/wiki/Special:FilePath/Watery%20Road%20of%20Karachi.jpg?width=800',
               'Rain-flooded road from choked drains (Aug 2022)', 'Drainage failure behind waterlogging — Lane 2 material.',
               'https://commons.wikimedia.org/wiki/File:Watery_Road_of_Karachi.jpg', 'Kskhh · CC BY-SA'],
              ['https://commons.wikimedia.org/wiki/Special:FilePath/Pothole%20Big.jpg?width=800',
               'A large pothole on a country road', 'One-off fix today — a repeat pattern tomorrow.',
               'https://commons.wikimedia.org/wiki/File:Pothole_Big.jpg', 'Uncl3dad · CC BY-SA'],
              ['https://commons.wikimedia.org/wiki/Special:FilePath/Potholes%20on%20asphalt%20road%2020171023.jpg?width=800',
               'Potholes across asphalt', 'Patched alone it returns; studied together it gets solved.',
               'https://commons.wikimedia.org/wiki/File:Potholes_on_asphalt_road_20171023.jpg', 'Santeri Viinamäki · CC BY-SA'],
            ].map(([src, alt, cap, link, credit], i) => (
              <Reveal key={src} delay={(i % 2) * 100}>
                <div className="card !p-4 h-full">
                  <a href={link} target="_blank" rel="noreferrer" title="Open source page">
                    <img src={src} alt={alt} loading="lazy" referrerPolicy="no-referrer"
                      className="w-full h-64 object-cover rounded-lg hover:opacity-95 transition" />
                  </a>
                  <p className="text-xs text-charcoal mt-2 text-center font-medium">{alt}</p>
                  <p className="text-xs text-charcoal-light text-center">{cap}</p>
                  <p className="source-citation text-center">Photo: {credit}, via Wikimedia Commons</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// APP
// ============================================================

export default function App() {
  const [active, setActive] = useState('top');
  useEffect(() => {
    const ids = ['top', ...NAV.map(n => n.id), 'closing'];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-30% 0px -60% 0px' });
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <div className="min-h-screen bg-white">
      <Navbar active={active} onNav={go} />
      <main>
        <Hero onNav={go} />
        <AboutCivi onNav={go} />
        <PipeToday />
        <Data />
        <Stakes />
        <Sorting />
        <Journey />
        <Connection />
        <Lane2Detail onNav={go} />
        <Walkthrough />
        <PrototypeSpotlight />
        <Education />
        <Sources />
        <Stack />
        <Readiness />
        <Closing onNav={go} />
      </main>
      <Footer onNav={go} />
    </div>
  );
}
