import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';

// ─── Design System ───────────────────────────────────────────────
const C = {
  navy:     "#1B2A4A",
  gold:     "#B8922A",
  cream:    "#F7F5F0",
  white:    "#ffffff",
  softBg:   "#FAFAF8",
  border:   "#E8E4DC",
  muted:    "#5C6070",
  light:    "#9A9488",
  error:    "#C0392B",
  inactive: "#D9D5CC",
  success:  "#EDF2EC",
};
const serif = "Georgia, 'Times New Roman', serif";
const sans  = "'Helvetica Neue', Arial, sans-serif";

const StoryBuilder = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [inReview, setInReview] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  const [answers, setAnswers] = useState({
    companyName: '',
    role: '',
    websiteUrl: '',
    industry: '',
    who: '',
    what: '',
    how: '',
    why: '',
    culture: '',
    primaryArchetype: '',
    secondaryArchetype: '',
    axis1: 3, axis2: 3, axis3: 3, axis4: 3, axis5: 3,
    ownedLanguageOpen: '',
    ownedLanguageChecks: [],
    prohibitedLanguageOpen: '',
    prohibitedLanguageClichés: [],
    prohibitedLanguageAdditional: '',
  });

  const archetypes = [
    { name: 'The Hero',           desc: 'Courageous, bold, inspiring action' },
    { name: 'The Innocent',       desc: 'Optimistic, safe, simple, nostalgic' },
    { name: 'The Explorer',       desc: 'Adventurous, independent, boundary-pushing' },
    { name: 'The Sage',           desc: 'Analytical, truthful, wisdom-seeking' },
    { name: 'The Lover',          desc: 'Passionate, intimate, connecting' },
    { name: 'The Creator',        desc: 'Innovative, expressive, boundary-breaking' },
    { name: 'The Caregiver',      desc: 'Helpful, nurturing, selfless' },
    { name: 'The Mentor',         desc: 'Guiding, teaching, wise authority' },
    { name: 'The Magician',       desc: 'Transformative, mysterious, enchanting' },
    { name: 'The Regular Guy/Girl', desc: 'Down-to-earth, relatable, authentic' },
    { name: 'The Jester',         desc: 'Playful, humorous, irreverent' },
    { name: 'The Ruler',          desc: 'Commanding, structured, controlling' },
  ];

  const clichés = [
    "It's not X, but Y", "In today's fast-paced world", "Dive deep into",
    "Game-changer / paradigm shift", "Leverage", "Empower", "Seamless",
    "Cutting-edge", "Unlock potential", "Synergy", "Circle back", "Em dashes",
  ];

  const screens = [
    { type: 'welcome' },
    { type: 'text',     key: 'companyName', title: "What's your company name?", placeholder: 'e.g., Acme Consulting' },
    { type: 'text',     key: 'role',        title: "What's your role?",          placeholder: 'e.g., Founder, CEO' },
    { type: 'text',     key: 'websiteUrl',  title: "What's your website URL? (Optional)", placeholder: 'https://example.com', optional: true },
    { type: 'text',     key: 'industry',    title: 'What industry or category are you in?', placeholder: 'e.g., B2B Software, Legal Services' },
    { type: 'textarea', key: 'who',     title: 'WHO do you truly serve?',         subtext: 'Not everyone. Think about size, stage, mindset, title.', minWords: 25 },
    { type: 'textarea', key: 'what',    title: 'WHAT do you actually deliver?',   subtext: 'The outcomes, problems solved, decisions supported.',   minWords: 25 },
    { type: 'textarea', key: 'how',     title: 'HOW are you different?',          subtext: "Your process, approach, standards. What's specific and provable?", minWords: 25 },
    { type: 'textarea', key: 'why',     title: 'WHY does this matter right now?', subtext: 'Why should someone choose you at this moment?', minWords: 25 },
    { type: 'textarea', key: 'culture', title: 'Describe your company culture and vision', subtext: 'Share the bigger picture. What drives you?', minWords: 0 },
    { type: 'archetype', key: 'primaryArchetype',   title: 'Which brand archetype best describes your brand?' },
    { type: 'archetype', key: 'secondaryArchetype', title: 'Do you identify with a secondary archetype? (Optional)', optional: true },
    { type: 'slider', key: 'axis1', title: 'Conversational vs. Corporate',  left: 'Conversational & Casual',   right: 'Corporate & Formal' },
    { type: 'slider', key: 'axis2', title: 'Contemporary vs. Traditional',  left: 'Contemporary & Modern',     right: 'Traditional & Timeless' },
    { type: 'slider', key: 'axis3', title: 'Fun vs. Serious',               left: 'Fun & Friendly',            right: 'Serious & Professional' },
    { type: 'slider', key: 'axis4', title: 'Simple vs. Complex',            left: 'Simple & Jargon-Free',      right: 'Complex & Jargon-Heavy' },
    { type: 'slider', key: 'axis5', title: 'Aspirational vs. Practical',    left: 'Aspirational & Idealistic', right: 'Realistic & Practical' },
    { type: 'textarea', key: 'ownedLanguageOpen',         title: 'What words or phrases do you use that are distinctly yours?', subtext: 'Industry terms, client phrases, metaphors you own.', optional: true, minWords: 0 },
    { type: 'checkbox', key: 'ownedLanguageChecks',       title: "Let's dig deeper. Do any of these resonate?", options: [
        'Industry-specific terms or jargon you own',
        "Phrases your clients use about you that you've claimed",
        "Technical or process language that's unique to how you work",
        'Metaphors or analogies you use repeatedly',
        'Specific phrases from your team culture or values',
        "Words you've deliberately chosen as part of your positioning",
    ]},
    { type: 'textarea', key: 'prohibitedLanguageOpen',    title: 'What words or phrases do you never want to use?', subtext: 'Be specific. Examples: avoiding jargon, AI clichés, etc.', optional: true, minWords: 0 },
    { type: 'checkbox', key: 'prohibitedLanguageClichés', title: 'Which of these AI clichés should you avoid?', options: clichés },
    { type: 'textarea', key: 'prohibitedLanguageAdditional', title: 'Any other phrases or patterns you want to avoid?', subtext: 'E.g., no exclamation marks, no passive voice, etc.', optional: true, minWords: 0 },
  ];

  const totalQuestions = screens.length - 1;
  const currentQuestionNumber = Math.max(0, currentScreen - 1);
  const progressPct = currentScreen === 0 ? 0 : Math.round((currentQuestionNumber / totalQuestions) * 100);

  const updateAnswer   = (key, val) => setAnswers(p => ({ ...p, [key]: val }));
  const updateCheckbox = (key, val) => setAnswers(p => ({
    ...p, [key]: p[key].includes(val) ? p[key].filter(v => v !== val) : [...p[key], val],
  }));

  const validateCurrent = () => {
    const s = screens[currentScreen];
    if (!s || s.optional || s.type === 'welcome' || s.type === 'slider' || s.type === 'checkbox') return true;
    if (s.type === 'text') return answers[s.key]?.trim().length > 0;
    if (s.type === 'textarea') return (answers[s.key]?.trim().split(/\s+/).filter(Boolean).length || 0) >= (s.minWords || 0);
    if (s.type === 'archetype') return answers[s.key]?.length > 0;
    return true;
  };
  const canContinue = validateCurrent();

  const handleNext = () => {
    if (currentScreen < screens.length - 1) { setCurrentScreen(n => n + 1); setEditingQuestion(null); }
    else setInReview(true);
  };
  const handleBack = () => {
    if (editingQuestion !== null) { setEditingQuestion(null); setInReview(true); }
    else if (inReview) setInReview(false);
    else if (currentScreen > 0) setCurrentScreen(n => n - 1);
  };
  const handleEditQuestion = idx => { setCurrentScreen(idx); setEditingQuestion(idx); setInReview(false); };

  const handleDownload = async () => {
    setIsCompiling(true);
    await new Promise(r => setTimeout(r, 1500));
    const archName      = archetypes.find(a => a.name === answers.primaryArchetype)?.name || '';
    const secondaryName = answers.secondaryArchetype || '';
    const md = `# ${answers.companyName} Brandtelling® Story Builder
*Your Brand Guardrails & Voice Profile*

---

## Brand Story: WHO / WHAT / HOW / WHY

**WHO do you serve?**
${answers.who}

**WHAT do you deliver?**
${answers.what}

**HOW are you different?**
${answers.how}

**WHY does this matter?**
${answers.why}

---

## Culture & Vision
${answers.culture}

---

## Brand Archetype

**Primary:** ${archName}
${secondaryName ? `**Secondary:** ${secondaryName}` : ''}

---

## Brand Voice Profile

**Conversational ← ${answers.axis1} → Corporate**
**Contemporary ← ${answers.axis2} → Traditional**
**Fun ← ${answers.axis3} → Serious**
**Simple ← ${answers.axis4} → Complex**
**Aspirational ← ${answers.axis5} → Practical**

---

## Owned Language

${answers.ownedLanguageOpen || 'Add your owned language here'}

${answers.ownedLanguageChecks.length > 0 ? '**Categories:**\n' + answers.ownedLanguageChecks.map(c => `- ${c}`).join('\n') : ''}

---

## Prohibited Language

${answers.prohibitedLanguageOpen || 'Add phrases to avoid here'}

${answers.prohibitedLanguageClichés.length > 0 ? '**AI Clichés to Avoid:**\n' + answers.prohibitedLanguageClichés.map(c => `- "${c}"`).join('\n') : ''}

${answers.prohibitedLanguageAdditional ? '**Additional:**\n' + answers.prohibitedLanguageAdditional : ''}

---

## Content Guardrails

Before you draft, answer:
1. What are we building?
2. Who is it for?
3. What's the CTA?

Check your draft:
- Does it use our owned language?
- Does it avoid prohibited language?
- Does the voice match our profile?
- Does it support the CTA?

---

## Using This File in Claude

Claude will reference your brand story and voice, use your owned language, avoid your prohibited language, and keep you on-brand.
`;
    const el = document.createElement('a');
    el.href = URL.createObjectURL(new Blob([md], { type: 'text/plain' }));
    el.download = `${answers.companyName.replace(/\s+/g, '-').toLowerCase()}-brandtelling-story-builder.md`;
    document.body.appendChild(el); el.click(); document.body.removeChild(el);
    setIsCompiling(false);
  };

  // ─── Input styles ─────────────────────────────────────────────
  const inputStyle = {
    width: '100%', padding: '12px 14px', fontFamily: serif, fontSize: 15,
    color: C.navy, background: C.softBg, border: `1px solid ${C.border}`,
    borderRadius: 4, outline: 'none', boxSizing: 'border-box', lineHeight: 1.6,
  };
  const labelStyle = {
    display: 'block', fontFamily: serif, fontSize: 20, fontWeight: 600,
    color: C.navy, marginBottom: 8, lineHeight: 1.3,
  };
  const subtextStyle = { fontFamily: sans, fontSize: 13, color: C.muted, marginBottom: 16, lineHeight: 1.65 };

  // ─── Screen renderer ──────────────────────────────────────────
  const renderScreen = () => {
    const s = screens[currentScreen];

    if (currentScreen === 0) return (
      <div style={{ textAlign: 'center', padding: '24px 0 8px' }}>
        <p style={{ fontFamily: sans, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.gold, marginBottom: 14 }}>
          Brand Guardrails
        </p>
        <h1 style={{ fontFamily: serif, fontSize: 'clamp(26px,5vw,40px)', fontWeight: 700, color: C.navy, marginBottom: 10, lineHeight: 1.2 }}>
          Brandtelling® Story Builder
        </h1>
        <p style={{ fontFamily: sans, fontSize: 14, color: C.muted, marginBottom: 28 }}>
          Create your brand guardrails file in 20 minutes
        </p>
        <div style={{ background: C.softBg, border: `1px solid ${C.border}`, borderRadius: 6, padding: '24px 28px', textAlign: 'left' }}>
          <p style={{ fontFamily: sans, fontWeight: 400, fontSize: 14, color: C.muted, lineHeight: 1.75, marginBottom: 18 }}>
            This tool will help you articulate your brand story, voice, and guardrails. You'll download a personalized file to use in Claude, ChatGPT, or Gemini to keep your marketing copy on-brand.
          </p>
          <p style={{ fontFamily: sans, fontSize: 12, color: C.light, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>You'll answer questions about:</p>
          {['Your brand story (WHO, WHAT, HOW, WHY)', 'Your brand voice and personality', 'Language you use and language to avoid', 'Content guidelines'].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, fontFamily: sans, fontWeight: 300, fontSize: 14, color: C.muted, marginBottom: 8, lineHeight: 1.55 }}>
              <span style={{ color: C.gold, flexShrink: 0 }}>—</span>{item}
            </div>
          ))}
          <p style={{ fontFamily: sans, fontSize: 12, color: C.light, marginTop: 18 }}>Takes about 20–30 minutes.</p>
        </div>
      </div>
    );

    if (s.type === 'text') return (
      <div>
        <label style={labelStyle}>{s.title}</label>
        <input type="text" value={answers[s.key]} placeholder={s.placeholder}
          onChange={e => updateAnswer(s.key, e.target.value)} style={inputStyle} />
      </div>
    );

    if (s.type === 'textarea') {
      const wc = answers[s.key]?.trim().split(/\s+/).filter(Boolean).length || 0;
      return (
        <div>
          <label style={labelStyle}>{s.title}</label>
          {s.subtext && <p style={subtextStyle}>{s.subtext}</p>}
          <textarea value={answers[s.key]} placeholder="Start typing…"
            onChange={e => updateAnswer(s.key, e.target.value)}
            style={{ ...inputStyle, height: 160, resize: 'none' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontFamily: sans, fontSize: 12, color: C.light }}>
            <span>{wc} words</span>
            {s.minWords > 0 && <span>Minimum: {s.minWords} words</span>}
          </div>
        </div>
      );
    }

    if (s.type === 'archetype') return (
      <div>
        <label style={labelStyle}>{s.title}</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
          {archetypes.map(arch => {
            const sel = answers[s.key] === arch.name;
            return (
              <label key={arch.name} style={{
                display: 'flex', alignItems: 'flex-start', gap: 14, padding: '12px 16px',
                border: `1px solid ${sel ? C.gold : C.border}`,
                background: sel ? '#FBF7EE' : C.softBg,
                borderRadius: 4, cursor: 'pointer', transition: 'all 0.15s',
              }}>
                <input type="radio" name={s.key} value={arch.name} checked={sel}
                  onChange={e => updateAnswer(s.key, e.target.value)}
                  style={{ marginTop: 3, accentColor: C.gold }} />
                <div>
                  <div style={{ fontFamily: serif, fontWeight: 600, fontSize: 15, color: C.navy }}>{arch.name}</div>
                  <div style={{ fontFamily: sans, fontSize: 13, color: C.muted, marginTop: 2 }}>{arch.desc}</div>
                </div>
              </label>
            );
          })}
        </div>
      </div>
    );

    if (s.type === 'slider') return (
      <div>
        <label style={labelStyle}>{s.title}</label>
        <div style={{ marginTop: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14, fontFamily: sans, fontSize: 12, color: C.muted }}>
            <span style={{ maxWidth: '38%' }}>{s.left}</span>
            <span style={{ fontFamily: serif, fontWeight: 700, fontSize: 18, color: C.navy }}>{answers[s.key]}/5</span>
            <span style={{ maxWidth: '38%', textAlign: 'right' }}>{s.right}</span>
          </div>
          <input type="range" min="1" max="5" value={answers[s.key]}
            onChange={e => updateAnswer(s.key, parseInt(e.target.value))}
            style={{ width: '100%', accentColor: C.gold, cursor: 'pointer' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontFamily: sans, fontSize: 11, color: C.inactive }}>
            {[1,2,3,4,5].map(n => <span key={n}>{n}</span>)}
          </div>
        </div>
      </div>
    );

    if (s.type === 'checkbox') return (
      <div>
        <label style={labelStyle}>{s.title}</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
          {s.options.map(opt => {
            const checked = answers[s.key].includes(opt);
            return (
              <label key={opt} style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px',
                border: `1px solid ${checked ? C.gold : C.border}`,
                background: checked ? '#FBF7EE' : C.softBg,
                borderRadius: 4, cursor: 'pointer', transition: 'all 0.15s',
              }}>
                <input type="checkbox" checked={checked}
                  onChange={() => updateCheckbox(s.key, opt)}
                  style={{ width: 16, height: 16, accentColor: C.gold, flexShrink: 0 }} />
                <span style={{ fontFamily: sans, fontSize: 14, color: C.navy, lineHeight: 1.5 }}>{opt}</span>
              </label>
            );
          })}
        </div>
      </div>
    );

    return null;
  };

  // ─── Review ───────────────────────────────────────────────────
  const renderReview = () => {
    const sections = [
      { title: 'Basic Info', fields: [
        { label: 'Company Name', key: 'companyName' }, { label: 'Role', key: 'role' },
        { label: 'Website', key: 'websiteUrl' }, { label: 'Industry', key: 'industry' },
      ]},
      { title: 'Category of One', fields: [
        { label: 'WHO', key: 'who' }, { label: 'WHAT', key: 'what' },
        { label: 'HOW', key: 'how' }, { label: 'WHY', key: 'why' },
        { label: 'Culture & Vision', key: 'culture' },
      ]},
      { title: 'Brand Archetype', fields: [
        { label: 'Primary', key: 'primaryArchetype' }, { label: 'Secondary', key: 'secondaryArchetype' },
      ]},
      { title: 'Voice Profile', fields: [
        { label: 'Conversational vs. Corporate', key: 'axis1' },
        { label: 'Contemporary vs. Traditional', key: 'axis2' },
        { label: 'Fun vs. Serious', key: 'axis3' },
        { label: 'Simple vs. Complex', key: 'axis4' },
        { label: 'Aspirational vs. Practical', key: 'axis5' },
      ]},
      { title: 'Owned Language', fields: [
        { label: 'Your Phrases', key: 'ownedLanguageOpen' },
        { label: 'Selected Categories', key: 'ownedLanguageChecks' },
      ]},
      { title: 'Prohibited Language', fields: [
        { label: 'Phrases to Avoid', key: 'prohibitedLanguageOpen' },
        { label: 'AI Clichés', key: 'prohibitedLanguageClichés' },
        { label: 'Additional', key: 'prohibitedLanguageAdditional' },
      ]},
    ];

    return (
      <div>
        <p style={{ fontFamily: sans, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.gold, marginBottom: 10 }}>
          Almost there
        </p>
        <h2 style={{ fontFamily: serif, fontSize: 28, fontWeight: 700, color: C.navy, marginBottom: 28 }}>
          Review Your Answers
        </h2>
        {sections.map((section, idx) => (
          <div key={idx} style={{ border: `1px solid ${C.border}`, borderRadius: 6, padding: '20px 24px', marginBottom: 14 }}>
            <h3 style={{ fontFamily: sans, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.gold, marginBottom: 14 }}>
              {section.title}
            </h3>
            {section.fields.map(field => {
              const value = answers[field.key];
              if (!value || (Array.isArray(value) && value.length === 0)) return null;
              return (
                <div key={field.key} style={{ paddingBottom: 14, marginBottom: 14, borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: sans, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.light, marginBottom: 4 }}>{field.label}</p>
                      <p style={{ fontFamily: serif, fontSize: 14, color: C.navy, lineHeight: 1.65 }}>
                        {Array.isArray(value) ? value.join(', ') : value}
                      </p>
                    </div>
                    <button
                      onClick={() => handleEditQuestion(screens.findIndex(s => s.key === field.key))}
                      style={{ fontFamily: sans, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.gold, background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0, padding: '2px 0' }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  // ─── Shell ────────────────────────────────────────────────────
  const backDisabled = currentScreen === 0 && !inReview && editingQuestion === null;

  return (
    <div style={{ minHeight: '100vh', background: C.cream, padding: '40px 16px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>

        {/* Progress bar */}
        {!inReview && currentScreen > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontFamily: sans, fontSize: 12, color: C.muted }}>
              <span>Question {currentQuestionNumber} of {totalQuestions}</span>
              <span>{progressPct}%</span>
            </div>
            <div style={{ width: '100%', height: 3, background: C.inactive, borderRadius: 99 }}>
              <div style={{ width: `${progressPct}%`, height: 3, background: C.navy, borderRadius: 99, transition: 'width 0.3s ease' }} />
            </div>
          </div>
        )}

        {/* Card */}
        <div style={{
          background: C.white, borderRadius: 8, border: `1px solid ${C.border}`,
          padding: '36px 40px', marginBottom: 18, minHeight: 360,
          boxShadow: '0 1px 6px rgba(27,42,74,0.07)',
        }}>
          {inReview ? renderReview() : renderScreen()}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={handleBack} disabled={backDisabled} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '11px 20px', fontFamily: sans, fontSize: 11,
            letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500,
            color: C.navy, background: C.white, border: `1px solid ${C.border}`,
            borderRadius: 4, cursor: backDisabled ? 'not-allowed' : 'pointer',
            opacity: backDisabled ? 0.4 : 1,
          }}>
            <ChevronLeft size={15} /> Back
          </button>

          {inReview ? (
            <button onClick={handleDownload} disabled={isCompiling} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '11px 24px', fontFamily: sans, fontSize: 11,
              letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500,
              color: '#0d1117', background: C.gold, border: 'none',
              borderRadius: 4, cursor: isCompiling ? 'wait' : 'pointer', opacity: isCompiling ? 0.6 : 1,
            }}>
              <Download size={15} />
              {isCompiling ? 'Compiling…' : 'Download File'}
            </button>
          ) : (
            <button onClick={handleNext} disabled={!canContinue} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '11px 24px', fontFamily: sans, fontSize: 11,
              letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500,
              color: canContinue ? C.cream : C.light,
              background: canContinue ? C.navy : C.inactive,
              border: 'none', borderRadius: 4,
              cursor: canContinue ? 'pointer' : 'not-allowed', transition: 'background 0.2s',
            }}>
              {currentScreen === screens.length - 1 ? 'Review' : 'Next'}
              <ChevronRight size={15} />
            </button>
          )}
        </div>

        {/* Validation hint */}
        {!canContinue && currentScreen > 0 && !inReview && (
          <p style={{ fontFamily: sans, fontSize: 12, color: C.error, textAlign: 'center', marginTop: 10 }}>
            Please complete this field before continuing
          </p>
        )}

        {/* Footer */}
        <p style={{ textAlign: 'center', fontFamily: sans, fontSize: 11, color: C.inactive, marginTop: 28, letterSpacing: '0.06em' }}>
          Brandtelling® Story Builder · AHG3, Inc.
        </p>
      </div>
    </div>
  );
};

export default StoryBuilder;
