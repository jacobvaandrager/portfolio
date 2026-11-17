import { useEffect, useRef, useState } from 'react'
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
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [dateCount, setDateCount] = useState(0)
  const dropDate = () => setDateCount((count) => Math.min(count + 1, 6))
  const [footerVisible, setFooterVisible] = useState(false)
  const revealRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setFooterVisible(true)
    }, { threshold: 0.05 })
    if (revealRef.current) observer.observe(revealRef.current)
    return () => observer.disconnect()
  }, [])

  const toggleCountry = (index) => setSelectedCountry((current) => current === index ? null : index)
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
      </section>
      <section className="landscapes" aria-label="Places I've lived">
        {portfolio.countries.map((country, index) => (
          <div key={country.name} className={`country ${selectedCountry === index ? 'selected' : ''}`} tabIndex="0" role="button" aria-pressed={selectedCountry === index} aria-label={`${country.name}, ${country.years}`} onMouseEnter={() => { if (index === 0 && window.matchMedia('(hover: hover)').matches) dropDate() }} onFocus={(event) => { if (index === 0 && event.currentTarget.matches(':focus-visible')) dropDate() }} onPointerUp={(event) => { if (event.pointerType !== 'mouse') { if (index === 0 && selectedCountry !== index) dropDate(); toggleCountry(index) } }} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleCountry(index) } }}>
            <span className="scene">
              <img className={country.position} src={index === 1 ? '/assets/country-dioramas-no-blades.png' : '/assets/country-dioramas-no-palm.png'} alt="" />
              {index === 0 ? <>
                <img className="palm-layer" src={portfolio.landscapes} alt="" />
                <span className="date-cluster" aria-hidden="true"><i /><i /><i /><i /></span>
                {Array.from({ length: dateCount }, (_, dateIndex) => <span key={dateIndex} className="fallen-date" aria-hidden="true" style={{ '--date-offset': `${dateIndex * 1.6 - 3}cqw`, '--date-depth': `${(dateIndex % 2) * 1.1}cqw` }} />)}
              </> : <span className="windmill-rotor" aria-hidden="true"><img src="/assets/windmill-blades.png" alt="" /></span>}
            </span>
            <span className="country-label" aria-hidden="true"><span className="country-name">{country.name}</span><span className="years">{index === 0 && <BabyIcon />}{country.years}</span></span>
          </div>
        ))}
      </section>
        <div className="socials"><SocialLink href={portfolio.linkedin} label="LinkedIn" type="linkedin" /><SocialLink href={portfolio.cv} label="Download CV" type="cv" /></div>
    </main>
    <span className="footer-reveal-marker" ref={revealRef} aria-hidden="true" />
    </div>
    <footer className={`desert-footer ${footerVisible ? 'is-visible' : ''}`} aria-label="A miniature desert landscape with a green Defender driving along a road">
      <div className="desert-stage" aria-hidden="true">
        <img className="desert-background" src="/assets/desert-landscape.png" alt="" />
        <svg className="road-sand" viewBox="0 0 1000 333" preserveAspectRatio="none" aria-hidden="true">
          <defs><linearGradient id="road-sand-shade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#eac08e" stopOpacity=".8" /><stop offset="1" stopColor="#ad835f" stopOpacity=".5" /></linearGradient></defs>
          <path fill="url(#road-sand-shade)" d="M 115 279 C 121 277, 132 278, 138 280 C 143 281, 149 280, 153 282 C 147 284, 139 283, 132 284 C 125 284, 117 283, 112 282 Z" />
        </svg>
        <div className="driving-car">
          <span className="exhaust" ><i /><i /><i /></span>
          <span className="dust"><i /><i /><i /></span>
          <img className="defender" src="/assets/defender.webp" alt="" />
        </div>
        <svg className="foreground-dune" viewBox="0 0 1000 333" preserveAspectRatio="none" aria-hidden="true">
          <defs><linearGradient id="sand-blend" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox"><stop offset="0" stopColor="#f5c38c" /><stop offset=".3" stopColor="#efb879" /><stop offset=".68" stopColor="#f7bd82" /><stop offset="1" stopColor="#f7b97d" stopOpacity="0" /></linearGradient></defs>
          <path fill="url(#sand-blend)" d="M 220 333 C 275 328, 320 303, 365 291 C 406 280, 430 269, 470 260 C 505 250, 529 254, 560 265 C 605 281, 632 303, 686 314 C 722 321, 760 328, 800 333 Z" />
        </svg>
      </div>
    </footer>
    </>
  )
}
export default App
