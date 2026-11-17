import { useRef, useState } from 'react'
import { portfolio } from './config'

function CompanyLink({ company }) {
  const wrapper = useRef(null)
  const [offset, setOffset] = useState(0)
  const positionPreview = () => {
    const rect = wrapper.current?.getBoundingClientRect()
    if (!rect) return
    const desiredLeft = rect.left + rect.width / 2 - 130
    setOffset(Math.max(12 - desiredLeft, Math.min(0, window.innerWidth - 12 - (desiredLeft + 260))))
  }
  return (
    <span className="company" ref={wrapper} onMouseEnter={positionPreview} onFocus={positionPreview} style={{ '--preview-offset': `${offset}px` }}>
      <a className="company-link" href={company.url} target="_blank" rel="noreferrer">
        <img className="company-logo" src={company.logo} alt="" />{company.name}
      </a>
      <a className="preview" href={company.url} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden="true">
        <span className="preview-toolbar"><i /><i /><i /><span /></span>
        <img src={company.preview} alt="" />
      </a>
    </span>
  )
}

function SocialLink({ href, label, type }) {
  return (
    <a className="social-link" href={href} target="_blank" rel="noreferrer" aria-label={label}>
      <span className="social-tooltip" aria-hidden="true">{label}</span>
      {type === 'linkedin' ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M7.5 10v7M7.5 7h.01M11 17v-7m0 3a3 3 0 0 1 6 0v4" /></svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v5h4M12 11v6m-2.5-2.5L12 17l2.5-2.5" /></svg>
      )}
    </a>
  )
}

function BabyIcon() {
  return <svg className="baby-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="13" r="7.5" /><path d="M12 5.5c-1-2 1-3.5 2.5-2M9 12h.01M15 12h.01M9.5 15.5c1.4 1.3 3.6 1.3 5 0" /></svg>
}

function App() {
  const [selected, setSelected] = useState(null)
  return (
    <>
    <div className="page-shell">
    <main className="page">
      <header>
        <h1>{portfolio.name}</h1>
        <p className="title">{portfolio.title}</p>
      </header>
      <section className="intro" aria-label="Introduction">
        <p>I'm based in the Netherlands, currently working on building <CompanyLink company={portfolio.companies.juice} />, designing and building hardware interfaces that get used by thousands of people daily.</p>
        <p>Previously, I interned at <CompanyLink company={portfolio.companies.google} /> in Dublin and completed a research project for the AdMob team.</p>
        <section className="stack" aria-label="My Stack">
          <h2>My Stack</h2>
          <div className="stack-items">
            {portfolio.stack.map((item) => <span key={item.name} className="stack-item" tabIndex="0" aria-label={item.name} style={{ color: item.color }}><span className="stack-tooltip" aria-hidden="true">{item.name}</span><img src={item.icon} alt="" /></span>)}
          </div>
        </section>
        <div className="socials"><SocialLink href={portfolio.linkedin} label="LinkedIn" type="linkedin" /><SocialLink href={portfolio.cv} label="Download CV" type="cv" /></div>
      </section>
      <section className="landscapes" aria-label="Places I've lived">
        {portfolio.countries.map((country, index) => (
          <button key={country.name} className={`country ${selected === index ? 'selected' : ''}`} onClick={() => setSelected(selected === index ? null : index)} aria-pressed={selected === index} aria-label={`${country.name}, ${country.years}`}>
            <span className="scene"><img className={country.position} src={portfolio.landscapes} alt="" /></span>
            <span className="country-label" aria-hidden="true"><span className="country-name">{country.name}</span><span className="years">{index === 0 && <BabyIcon />}{country.years}</span></span>
          </button>
        ))}
      </section>
    </main>
    </div>
    <footer className="desert-footer" aria-label="A miniature desert landscape with a green Defender driving along a road">
      <div className="desert-stage" aria-hidden="true">
        <img className="desert-background" src="/assets/desert-landscape.png" alt="" />
        <div className="driving-car">
          <span className="exhaust" ><i /><i /><i /></span>
          <span className="dust"><i /><i /><i /></span>
          <img className="defender" src="/assets/defender.png" alt="" />
        </div>
        <svg className="foreground-dune" viewBox="0 0 1000 333" preserveAspectRatio="none" aria-hidden="true">
          <defs><linearGradient id="sand-blend" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox"><stop offset="0" stopColor="#f4bd80" /><stop offset=".45" stopColor="#f7bc80" /><stop offset="1" stopColor="#f7b97d" stopOpacity="0" /></linearGradient></defs>
          <path fill="url(#sand-blend)" d="M 220 333 C 275 328, 320 303, 365 291 C 406 280, 430 269, 470 260 C 505 250, 529 254, 560 265 C 605 281, 632 303, 686 314 C 722 321, 760 328, 800 333 Z" />
        </svg>
      </div>
    </footer>
    </>
  )
}
export default App
