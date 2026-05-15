import Image from "next/image";
import Script from "next/script";
import ScrollAnimations from "./ScrollAnimations";

const navItems = [
  ["Crops", "#crops"],
  ["Inside the vault", "#vault"],
  ["Contact", "#contact"],
] as const;

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header" data-header>
        <nav className="nav" aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="The Living Vault home">
            <span className="brand__mark" aria-hidden="true" />
            <span>
              <strong>The Living Vault</strong>
              <small>Fresh crops grown with care</small>
            </span>
          </a>
          <div className="nav-menu" id="nav-menu" data-nav-menu aria-label="Primary navigation">
            {navItems.map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </div>
          <button
            className="nav-toggle"
            type="button"
            data-nav-toggle
            aria-expanded="false"
            aria-controls="nav-menu"
          >
            <span className="nav-toggle__line" />
            <span className="sr-only">Open navigation</span>
          </button>
        </nav>
      </header>

      <main id="main">
        <div className="hero-scroll" id="top" data-video-section>
        <section className="hero section-shell" aria-labelledby="hero-title" data-flow-hero>
          <div className="hero__scene" aria-hidden="true">
            <canvas className="hero__canvas" data-hero-canvas />
            <div className="hero__veil" />
            <div className="hero-captions" aria-hidden="true">
              <p className="hero-caption hero-caption--tagline" id="hero-title">A vault for living crops.</p>
              <p className="hero-caption hero-caption--endline">Climate-controlled. Hand-tended. Year-round.</p>
            </div>
          </div>
        </section>
        </div>

        <section className="promise section-pad reveal" aria-labelledby="promise-title">
          <h2 id="promise-title" className="promise__line">
            Outside, weather decides.
            <br />
            Inside, we do.
          </h2>
        </section>

        <section className="crops section-pad reveal" id="crops" aria-labelledby="crops-title">
          <div className="section-heading">
            <p className="eyebrow">What we grow</p>
            <h2 id="crops-title">Rare crops, grown slowly. Everyday essentials, grown well.</h2>
          </div>

          <p className="crops__group-label">Rare &amp; slow</p>
          <div className="crops__rare">
            <article className="crop-card crop-card--rare">
              <Image className="crop-card__art" src="/images/crops/cartoon/vanilla.svg" alt="" width={240} height={240} unoptimized />
              <h3>Vanilla</h3>
              <p>Hand-pollinated. Slow-cured. Built for fragrance depth.</p>
            </article>
            <article className="crop-card crop-card--rare">
              <Image className="crop-card__art" src="/images/crops/cartoon/black-pepper.svg" alt="" width={240} height={240} unoptimized />
              <h3>Black pepper</h3>
              <p>Vine-grown, sun-finished, sorted for aroma.</p>
            </article>
            <article className="crop-card crop-card--rare">
              <Image className="crop-card__art" src="/images/crops/cartoon/turmeric.svg" alt="" width={240} height={240} unoptimized />
              <h3>Turmeric</h3>
              <p>Cured roots with deep color and clean finish.</p>
            </article>
          </div>

          <p className="crops__group-label">Everyday essentials</p>
          <div className="crops__everyday">
            {[
              ["Lettuce", "lettuce.svg"],
              ["Spinach", "spinach.svg"],
              ["Kale", "kale.svg"],
              ["Cilantro", "cilantro.svg"],
              ["Bell peppers", "bell-pepper.svg"],
              ["Ginger", "ginger.svg"],
            ].map(([name, img]) => (
              <article key={name} className="crop-card crop-card--everyday">
                <Image className="crop-card__art" src={`/images/crops/cartoon/${img}`} alt="" width={160} height={160} unoptimized />
                <h4>{name}</h4>
              </article>
            ))}
          </div>
        </section>

        <section className="pillars section-pad reveal" id="vault" aria-labelledby="pillars-title">
          <div className="section-heading">
            <p className="eyebrow">Inside the vault</p>
            <h2 id="pillars-title">What the polyhouse actually does.</h2>
          </div>
          <div className="pillars__grid">
            <article className="pillar">
              <p className="pillar__name">Climate</p>
              <p className="pillar__line">22&ndash;26&deg;C, dialed by hour.</p>
            </article>
            <article className="pillar">
              <p className="pillar__name">Hygiene</p>
              <p className="pillar__line">Sealed envelope. No pesticides.</p>
            </article>
            <article className="pillar">
              <p className="pillar__name">Hand-care</p>
              <p className="pillar__line">Vanilla hand-pollinated daily.</p>
            </article>
            <article className="pillar">
              <p className="pillar__name">Year-round</p>
              <p className="pillar__line">12 harvests where outdoor farms get one.</p>
            </article>
          </div>
        </section>

        <section className="contact section-pad reveal" id="contact" aria-labelledby="contact-title">
          <div className="contact__intro">
            <p className="eyebrow">Get in touch</p>
            <h2 id="contact-title">Tell us what you&rsquo;re looking for.</h2>
            <p className="contact__lede">Buyers, distributors, press &mdash; one form, one inbox. We reply within a working day.</p>
          </div>
          <form className="contact__form" aria-label="Contact form">
            <div className="contact__row">
              <label htmlFor="contact-name">Name</label>
              <input id="contact-name" type="text" name="name" autoComplete="name" required />
            </div>
            <div className="contact__row">
              <label htmlFor="contact-email">Email</label>
              <input id="contact-email" type="email" name="email" autoComplete="email" required />
            </div>
            <div className="contact__row">
              <label htmlFor="contact-company">Company <span className="contact__optional">(optional)</span></label>
              <input id="contact-company" type="text" name="company" autoComplete="organization" />
            </div>
            <div className="contact__row">
              <label htmlFor="contact-role">You are</label>
              <select id="contact-role" name="role" required defaultValue="">
                <option value="" disabled>Choose one&hellip;</option>
                <option value="distributor">Distributor</option>
                <option value="buyer">Buyer</option>
                <option value="press">Press</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="contact__row">
              <label htmlFor="contact-message">Message</label>
              <textarea id="contact-message" name="message" rows={5} required />
            </div>
            <button className="button button--primary" type="submit">Send enquiry</button>
          </form>
        </section>


      </main>

      <footer className="footer">
        <div>
          <a className="brand" href="#top" aria-label="The Living Vault home">
            <span className="brand__mark" aria-hidden="true" />
            <span>
              <strong>The Living Vault</strong>
              <small>Fresh crops grown with care.</small>
            </span>
          </a>
          <p>Spices, greens, herbs, and vegetables grown with disciplined care.</p>
        </div>
        <div className="footer__links" aria-label="Footer navigation">
          <a href="#crops">Crops</a>
          <a href="#vault">Inside the vault</a>
          <a href="#contact">Contact</a>
        </div>
        <form className="footer__form" aria-label="Follow the harvest signup">
          <label htmlFor="email">Follow the harvest</label>
          <div>
            <input id="email" type="email" placeholder="you@example.com" autoComplete="email" />
            <button className="button button--small" type="submit">
              Join
            </button>
          </div>
        </form>
      </footer>

      <Script src="/living-vault.js" strategy="afterInteractive" />
      <ScrollAnimations />
    </>
  );
}
