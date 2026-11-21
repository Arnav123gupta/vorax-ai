'use client'

import { useState, type FormEvent } from 'react'
import { Activity, AudioLines, Battery, Command, Cpu, Fingerprint, Gauge, Headphones, Menu, Mic, Moon, Radio, Send, Settings2, Shield, Smartphone, Terminal } from 'lucide-react'

type ThemeName = 'Dark Shadow' | 'Cyber Overdrive' | 'Supreme Elite'

type VoiceProfile = { name: string; pitch: number; rate: number; description: string }
const voiceProfilePreset: VoiceProfile = {
  name: 'VØRAX — DARK PHANTOM',
  pitch: 0.62,
  rate: 1.08,
  description: 'Energetic • deep robotic • shadow-horror presence',
}

const themes: { name: ThemeName; color: string }[] = [
  { name: 'Dark Shadow', color: '#e11d48' },
  { name: 'Cyber Overdrive', color: '#8b5cf6' },
  { name: 'Supreme Elite', color: '#d6b46a' },
]

const initialLogs = [
  { time: '14:32:08', message: 'Core systems initialized', tone: 'good' },
  { time: '14:32:08', message: 'Neural network standing by', tone: 'good' },
  { time: '14:32:09', message: 'Awaiting secure connection', tone: 'muted' },
]

function SectionHeading({ icon: Icon, title, trailing }: { icon: typeof Activity; title: string; trailing?: React.ReactNode }) {
  return <div className="section-heading"><span className="section-icon"><Icon size={14} /></span><span>{title}</span>{trailing && <span className="section-trailing">{trailing}</span>}</div>
}

function SignalBars() {
  return <div className="signal-bars" aria-hidden="true">{Array.from({ length: 34 }, (_, i) => <span key={i} style={{ height: `${7 + ((i * 13 + 9) % 24)}px` }} />)}</div>
}

function AICore() {
  return <div className="core-stage" aria-label="VORAX AI core, standing by">
    <div className="core-orbit orbit-one" /><div className="core-orbit orbit-two" /><div className="core-orbit orbit-three" />
    <div className="core-sphere"><div className="core-inner"><img className="core-logo-image" src="/vorax-core-mark.svg" alt="VØRAX phantom emblem" /></div><div className="core-glint" /></div>
    <div className="core-tick tick-a" /><div className="core-tick tick-b" /><div className="core-tick tick-c" /><div className="core-tick tick-d" />
    <span className="core-label label-top">NEXUS / 01</span><span className="core-label label-bottom">NEURAL CORE</span>
  </div>
}

function ShadowPortal({ expanding, onEnter }: { expanding: boolean; onEnter: () => void }) {
  return <main className={`portal-page ${expanding ? 'portal-expanding' : ''}`}>
    <div className="portal-nebula" aria-hidden="true" />
    <div className="portal-grain" aria-hidden="true" />
    <div className="portal-topline"><a className="portal-brand" href="#portal"><span className="portal-brand-mark vortex-logo-mark" aria-hidden="true"><i /></span> VØRAX</a><span className="portal-top-status"><i /> SYSTEM DORMANT</span></div>
    <div className="portal-copy"><span className="portal-eyebrow"><i /> THE DARK VOID INTELLIGENCE <i /></span><h1>Enter the <span>void.</span></h1><p>Awaken the intelligence beyond.</p></div>
    <button className="shadow-gate" onClick={onEnter} aria-label="Enter the VORAX command center" aria-busy={expanding}>
      <span className="portal-haze haze-one" /><span className="portal-haze haze-two" />
      <span className="portal-ring ring-outer" /><span className="portal-ring ring-middle" /><span className="portal-ring ring-inner" />
      <span className="portal-rift"><span className="portal-eye"><i /></span><span className="portal-depth" /></span>
      <span className="portal-orbit orbit-a" /><span className="portal-orbit orbit-b" />
      <span className="portal-particle particle-a" /><span className="portal-particle particle-b" /><span className="portal-particle particle-c" /><span className="portal-particle particle-d" /><span className="portal-particle particle-e" />
      <span className="portal-enter"><span>{expanding ? 'CROSSING THE VEIL' : 'ENTER THE PORTAL'}</span><span aria-hidden="true">↗</span></span>
    </button>
    <div className="portal-bottom"><span>VØRAX <i> / </i> THE DARK VOID INTELLIGENCE</span><span>ENTER THE VOID. AWAKEN VØRAX.</span></div>
  </main>
}

export default function VoraxDashboard() {
  const [theme, setTheme] = useState<ThemeName>('Dark Shadow')
  const [commandCenterOpen, setCommandCenterOpen] = useState(false)
  const [portalExpanding, setPortalExpanding] = useState(false)
  const [demoPanel, setDemoPanel] = useState('')
  const [demoStep, setDemoStep] = useState(0)
  const [demoResult, setDemoResult] = useState('')

  function enterCommandCenter() {
    if (portalExpanding) return
    setPortalExpanding(true)
    window.setTimeout(() => setCommandCenterOpen(true), 1150)
  }

  const [command, setCommand] = useState('')
  const [logs, setLogs] = useState(initialLogs)
  const [notice, setNotice] = useState('')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [voiceProfile] = useState('VØRAX — DARK PHANTOM')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const demoFlows: Record<string, { title: string; intro: string; steps: string[] }> = {
    diagnostics: { title: 'System diagnostics', intro: 'Local-only walkthrough of checks a connected backend would perform.', steps: ['Inspecting interface state and controls…', 'Checking AI service configuration…', 'Checking Android and Kali bridge configuration…', 'Complete: UI is responsive; external services remain disconnected.'] },
    connections: { title: 'Connection setup', intro: 'Learn the setup stages. No device is connected and no commands are run.', steps: ['Choose Android bridge or Kali API integration.', 'Configure a companion service and secure endpoint.', 'Review requested permissions and approve them yourself.', 'Complete: no device was contacted.'] },
    core: { title: 'VØRAX core visual demo', intro: 'Preview the idle-to-active core workflow. Visual simulation only.', steps: ['Core standby: portal energy is calm.', 'Neural activity visualisation enabled.', 'Complete: no AI inference is running.'] },
    quick: { title: 'Quick actions', intro: 'Explore future actions without executing system operations.', steps: ['Diagnostics inspect configured services.', 'Connection status checks approved integrations.', 'Automations show user-approved routines.', 'Complete: no automation or external command ran.'] },
    conversation: { title: 'Conversation workflow', intro: 'See how a command would travel through VØRAX after backend setup.', steps: ['You enter a text or voice request.', 'A configured AI backend interprets it.', 'The assistant returns a response for review.', 'Complete: this demo sends nothing to a server.'] },
    permissions: { title: 'Permissions', intro: 'Review permission gates before enabling integrations.', steps: ['Microphone is requested only after you tap the mic.', 'Device access needs a separately installed companion app.', 'Network access needs a configured endpoint and your approval.', 'Complete: no permission was requested.'] },
    privacy: { title: 'Privacy', intro: 'What this frontend demo does and does not store.', steps: ['Theme and panel changes exist in this browser session.', 'Typed commands appear locally as demo activity.', 'No cloud sync or connected-device operation is active.', 'Complete: privacy walkthrough finished.'] },
    activity: { title: 'Activity log', intro: 'See how demo events appear in the activity timeline.', steps: ['A user opens a preview module.', 'The interface records a local event and timestamp.', 'The event appears in the activity list and can be cleared.', 'Complete: log workflow preview finished.'] },
  }
  function openDemo(key: string) { setDemoPanel(key); setDemoStep(0); setDemoResult('') }
  function advanceDemo() {
    const flow = demoFlows[demoPanel]
    if (!flow) return
    const next = Math.min(demoStep + 1, flow.steps.length)
    setDemoStep(next)
    if (next === flow.steps.length) {
      const now = new Date().toLocaleTimeString('en-GB', { hour12: false })
      setLogs((current) => [{ time: now, message: 'Preview completed: ' + flow.title, tone: 'good' }, ...current].slice(0, 5))
      setDemoResult('Completed locally. No external service or device was contacted.')
    }
  }

  function speak(text: string, profileName = voiceProfile) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setNotice('Speech synthesis is not supported by this browser.')
      return
    }
    window.speechSynthesis.cancel()
    const profile = voiceProfilePreset
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-IN'
    utterance.pitch = profile.pitch
    utterance.rate = profile.rate

    // Prefer an installed masculine English voice on phones and desktops.
    // Voice availability is controlled by the device/browser speech engine.
    const voices = window.speechSynthesis.getVoices()
    const masculineName = /\b(male|david|daniel|george|james|mark|guy|ryan|alex|aaron|fred|tom|ravi|rishi|andrew|arthur|oliver|thomas)\b/i
    const feminineName = /\b(female|zira|samantha|victoria|karen|susan|hazel|siri female|google uk english female)\b/i
    const englishVoices = voices.filter((voice) => /^en(-|$)/i.test(voice.lang))
    const maleVoice = englishVoices.find((voice) => masculineName.test(voice.name) && !feminineName.test(voice.name))
      ?? voices.find((voice) => masculineName.test(voice.name) && !feminineName.test(voice.name))
    if (maleVoice) utterance.voice = maleVoice
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)
    window.speechSynthesis.speak(utterance)
  }

  function startVoiceInput() {
    if (typeof window === 'undefined') return
    const speechWindow = window as Window & { SpeechRecognition?: new () => any; webkitSpeechRecognition?: new () => any }
    const SpeechRecognitionCtor = speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition
    if (!SpeechRecognitionCtor) {
      setNotice('Voice recognition is not supported here. Try a supported browser or use text input.')
      return
    }
    const recognition = new SpeechRecognitionCtor()
    recognition.lang = 'en-IN'
    recognition.interimResults = false
    recognition.onstart = () => setIsListening(true)
    recognition.onend = () => setIsListening(false)
    recognition.onerror = () => { setIsListening(false); setNotice('Microphone recognition stopped. Check browser microphone permission.') }
    recognition.onresult = (event: any) => {
      const transcript = event.results?.[0]?.[0]?.transcript?.trim()
      if (!transcript) return
      setCommand(transcript)
      setNotice('Voice captured. VØRAX AI backend is not connected yet, so this command has not been executed.')
      speak('I heard your command. The VORAX AI backend is not connected yet.', voiceProfile)
    }
    try { recognition.start() } catch { setIsListening(false); setNotice('Voice recognition is already active or unavailable.') }
  }

  if (!commandCenterOpen) return <ShadowPortal expanding={portalExpanding} onEnter={enterCommandCenter} />

  function submitCommand(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = command.trim()
    if (!value) return
    const now = new Date().toLocaleTimeString('en-GB', { hour12: false })
    setLogs((current) => [{ time: now, message: `Command queued: “${value.slice(0, 32)}${value.length > 32 ? '…' : ''}”`, tone: 'warn' }, ...current].slice(0, 5))
    setNotice('Command not sent — AI backend is not connected.')
    setCommand('')
  }

  return <main className={`dashboard theme-${theme.toLowerCase().replaceAll(' ', '-')}`}>
    <header className="topbar">
      <button className="mobile-menu icon-button" aria-label="Toggle navigation" onClick={() => setMobileOpen(!mobileOpen)}><Menu size={18} /></button>
      <a className="brand" href="#portal" aria-label="Return to VORAX portal" onClick={(event) => { event.preventDefault(); setPortalExpanding(false); setCommandCenterOpen(false) }}><span className="brand-mark vortex-logo-mark" aria-hidden="true"><i /></span><span className="brand-word">VØRAX<span className="brand-dot">.</span></span><span className="brand-divider" /><span className="brand-caption">SUPREME INTELLIGENCE</span></a>
      <nav className={`top-nav ${mobileOpen ? 'nav-open' : ''}`} aria-label="Main navigation"><a className="nav-active" href="#command-center">Command center</a><a href="#activity">Activity</a><a href="#connections">Connections</a></nav>
      <div className="top-actions"><div className="clock-pill"><span className="live-dot" /> FRONTEND DEMO</div></div>
    </header>

    <div className="page-shell" id="command-center">
      <div className="page-intro"><div><div className="eyebrow"><span className="eyebrow-line" /> PERSONAL INTELLIGENCE SYSTEM <span className="eyebrow-line" /></div><h1>Command <span>center</span></h1><p className="tagline">BEYOND COMMAND. BEYOND LIMITS.</p></div><button className="settings-trigger" onClick={() => setSettingsOpen(!settingsOpen)}><Settings2 size={15} /> Settings <span className="settings-key">⌘ ,</span></button></div>

      <div className="dashboard-grid">
        <aside className="left-column">
          <section className="panel system-panel"><SectionHeading icon={Cpu} title="SYSTEM STATUS" trailing={<><button className="demo-open-button" onClick={() => openDemo("diagnostics")}>TRY IT</button></>} /><div className="status-hero"><div className="status-icon"><Fingerprint size={20} /></div><div><span className="status-title">Interface loaded</span><span className="status-subtitle">AI backend not connected</span></div><span className="status-pulse" /></div><div className="metric-list"><div className="metric-row"><span><Gauge size={14} /> AI backend</span><b>OFFLINE</b></div><div className="metric-row"><span><Battery size={14} /> Android bridge</span><b>NOT LINKED</b></div></div><div className="system-footer"><span><span className="live-dot" /> LOCAL UI READY</span><span>v. 2.4.0</span></div></section>

          <section className="panel connections-panel" id="connections"><SectionHeading icon={Radio} title="CONNECTIONS" trailing={<><button className="demo-open-button" onClick={() => openDemo("connections")}>PREVIEW</button><span className="connection-count">0 / 2</span></>} /><div className="connection-item"><div className="connection-icon android-icon"><Smartphone size={16} /></div><div className="connection-copy"><b>Android device</b><span>Native bridge required</span></div></div><div className="connection-item"><div className="connection-icon kali-icon"><Terminal size={16} /></div><div className="connection-copy"><b>Kali Linux</b><span>API endpoint required</span></div></div><div className="connection-note"><Shield size={13} /> No devices are connected. Integrations require explicit setup.</div></section>

          <section className="panel theme-panel"><SectionHeading icon={Moon} title="INTERFACE THEME" /><div className="theme-options" role="group" aria-label="Interface theme">{themes.map((option) => <button key={option.name} className={`theme-option ${theme === option.name ? 'selected' : ''}`} onClick={() => setTheme(option.name)} aria-pressed={theme === option.name}><i style={{ '--swatch': option.color } as React.CSSProperties} />{option.name}{theme === option.name && <span className="theme-check">✓</span>}</button>)}</div></section>
        </aside>

        <section className="center-column"><div className={`core-card panel ${isSpeaking ? 'core-speaking' : ''}`}><div className="core-card-top"><span><span className="live-dot" /> VØRAX CORE</span><span className="core-mode"><button className="demo-open-button" onClick={() => openDemo("core")}>PLAY PREVIEW</button><span className="mini-square" /> STANDBY</span></div><AICore /><div className="core-greeting"><span className="greeting-overline">YOUR INTELLIGENCE, AMPLIFIED</span><h2>At your command<span>.</span></h2><p>Systems are standing by. What would you like to explore?</p></div><div className="voice-module"><button className={`mic-button ${isListening ? 'is-listening' : ''}`} onClick={startVoiceInput} aria-label="Start voice input" title="Start foreground voice input"><Mic size={20} /></button><div className="voice-info"><b>Voice interface</b><span>{isListening ? 'Listening…' : isSpeaking ? `Speaking · ${voiceProfile}` : 'Tap microphone to speak'}</span></div><SignalBars /><span className="voice-demo">VOICE DEMO</span></div></div>
          <section className="panel logs-panel" id="activity"><SectionHeading icon={Activity} title="ACTIVITY LOG" trailing={<><button className="demo-open-button" onClick={() => openDemo("activity")}>PREVIEW</button><button className="text-button" onClick={() => setLogs([])}>CLEAR</button></>} /><div className="logs-list">{logs.length === 0 ? <p className="empty-log">No recent activity.</p> : logs.map((log, i) => <div className="log-entry" key={`${log.time}-${log.message}-${i}`}><span className="log-dot" data-tone={log.tone} /><time>{log.time}</time><span>{log.message}</span></div>)}</div><div className="logs-bottom"><span>LOCAL SYSTEM LOG</span><span><span className="live-dot" /> LIVE</span></div></section>
        </section>

        <aside className="right-column"><section className="panel conversation-panel"><SectionHeading icon={AudioLines} title="CONVERSATION" trailing={<><button className="demo-open-button" onClick={() => openDemo("conversation")}>HOW IT WORKS</button></>} /><div className="conversation-empty"><div className="conversation-glyph"><Command size={19} /></div><b>Your session starts here</b><p>Send a command to begin a conversation with VØRAX.</p><span>AI BACKEND NOT CONNECTED</span></div><form className="command-form" onSubmit={submitCommand}><label className="sr-only" htmlFor="command-input">Enter a command</label><input id="command-input" value={command} onChange={(event) => setCommand(event.target.value)} placeholder="Type a command..." /><button type="submit" aria-label="Send command" disabled={!command.trim()}><Send size={15} /></button></form>{notice && <div className="notice-message" role="status">{notice}<button onClick={() => setNotice('')} aria-label="Dismiss notice">×</button></div>}<div className="conversation-foot"><span><Headphones size={13} /> SECURE CHANNEL</span><span>BACKEND OFFLINE</span></div></section>
          
          
        </aside>
      </div>
      <footer className="page-footer"><span>VØRAX <span className="footer-sep">/</span> PERSONAL INTELLIGENCE SYSTEM</span><span>BUILT FOR THE NEXT ERA <span className="footer-sep">·</span> <span className="footer-version">V.2.4.0</span></span></footer>
    </div>


    {demoPanel && demoFlows[demoPanel] && <div className="modal-backdrop demo-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setDemoPanel('') }}><section className="settings-modal demo-modal" role="dialog" aria-modal="true" aria-labelledby="demo-title"><div className="modal-heading"><div><span className="eyebrow-small">INTERACTIVE WALKTHROUGH / LOCAL ONLY</span><h2 id="demo-title">{demoFlows[demoPanel].title}</h2></div><button className="icon-button" aria-label="Close preview" onClick={() => setDemoPanel('')}>×</button></div><p className="demo-intro">{demoFlows[demoPanel].intro}</p><div className="demo-progress"><span style={{ width: ((demoStep / demoFlows[demoPanel].steps.length) * 100) + '%' }} /></div><div className="demo-steps">{demoFlows[demoPanel].steps.map((step, index) => <div className={'demo-step ' + (index < demoStep ? 'done' : index === demoStep ? 'current' : '')} key={step}><i>{index < demoStep ? '✓' : String(index + 1).padStart(2, '0')}</i><span>{step}</span></div>)}</div>{demoResult && <div className="demo-result" role="status">{demoResult}</div>}<div className="demo-actions"><button className="text-button" onClick={() => { setDemoStep(0); setDemoResult('') }}>RESET</button><button className="demo-next-button" onClick={advanceDemo} disabled={demoStep >= demoFlows[demoPanel].steps.length}>{demoStep >= demoFlows[demoPanel].steps.length ? 'PREVIEW COMPLETE' : demoStep === 0 ? 'START WALKTHROUGH' : 'NEXT STEP'} <span>→</span></button></div><p className="demo-disclaimer"><Shield size={13} /> Simulation only. No backend, device, Kali command, or automation is being run.</p></section></div>}

    {settingsOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSettingsOpen(false) }}><section className="settings-modal" role="dialog" aria-modal="true" aria-labelledby="settings-title"><div className="modal-heading"><div><span className="eyebrow-small">PREFERENCES / 01</span><h2 id="settings-title">System settings</h2></div><button className="icon-button" aria-label="Close settings" onClick={() => setSettingsOpen(false)}>×</button></div><div className="setting-group"><b>Interface theme</b><p>Choose the visual profile for your command center.</p>{themes.map((option) => <button key={option.name} className={`modal-theme ${theme === option.name ? 'selected' : ''}`} onClick={() => setTheme(option.name)}><i style={{ '--swatch': option.color } as React.CSSProperties} />{option.name}{theme === option.name && <span>ACTIVE</span>}</button>)}</div><div className="setting-group notification-setting"><div><b>System notifications</b><p>Show local interface status messages.</p></div><button className={`toggle ${notifications ? 'on' : ''}`} role="switch" aria-checked={notifications} aria-label="System notifications" onClick={() => setNotifications(!notifications)}><i /></button></div><div className="setting-group"><b>VØRAX signature voice</b><p>One unified voice identity: energetic delivery, deep robotic tone and a dark phantom atmosphere. Actual voice texture depends on the browser's installed speech engine.</p><div className="voice-profile-row signature-voice"><div><b>DARK PHANTOM</b><span>Energetic · Horror · Shadow · Robotic</span></div><button className="voice-selected" onClick={() => speak('I am VORAX. The dark phantom intelligence. Enter the void. Your command awaits.', voiceProfile)}>PREVIEW</button></div><button className="text-button" onClick={() => { window.speechSynthesis?.cancel(); setIsSpeaking(false) }}>STOP VOICE</button></div><div className="modal-note"><Shield size={14} /> Voice recognition runs only after you tap the microphone while this page is open. Background “Hey VØRAX” wake-word support requires a native Android app.</div></section></div>}
  </main>
}
