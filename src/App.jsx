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

function OptionalLink({ href, children }) {
  return href ? <a href={href} target="_blank" rel="noreferrer">{children}</a> : <span className="unavailable" title="Link coming soon">{children}</span>
}

function App() {
  const [selected, setSelected] = useState(null)
  return (
    <main className="page">
      <header>
        <h1>{portfolio.name}</h1>
        <p className="title">{portfolio.title}</p>
      </header>
      <section className="intro" aria-label="Introduction">
        <p>I'm based in the Netherlands, currently working on building <CompanyLink company={portfolio.companies.juice} />, designing and building hardware interfaces that get used by thousands of people daily.</p>
        <p>Previously, I interned at <CompanyLink company={portfolio.companies.google} /> in Dublin and completed a research project for the AdMob team.</p>
        <div className="socials"><OptionalLink href={portfolio.linkedin}>LinkedIn <span aria-hidden="true">↗</span></OptionalLink><OptionalLink href={portfolio.cv}>CV <span aria-hidden="true">↓</span></OptionalLink></div>
      </section>
      <section className="landscapes" aria-label="Places I've lived">
        {portfolio.countries.map((country, index) => (
          <button key={country.name} className={`country ${selected === index ? 'selected' : ''}`} onClick={() => setSelected(selected === index ? null : index)} aria-pressed={selected === index}>
            <span className="scene"><img className={country.position} src={portfolio.landscapes} alt="" /></span>
            <span className="country-name">{country.name}</span>
            <span className="years">{country.years}</span>
          </button>
        ))}
      </section>
    </main>
  )
}
export default App
