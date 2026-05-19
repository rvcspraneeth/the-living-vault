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

      <div className="intro" data-intro aria-hidden="true">
        <div className="intro__panel intro__panel--top" />
        <div className="intro__panel intro__panel--bottom" />
        <div className="intro__title" data-intro-title>
          <span className="intro__mark" aria-hidden="true" />
          <span className="intro__name">The Living Vault</span>
        </div>
      </div>

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

        <section className="promise" id="vault" aria-labelledby="promise-title">
          <div className="promise__progress" aria-hidden="true">
            <div className="promise__progress-fill" data-promise-progress />
          </div>
          <div className="promise__inner">
            <h2 id="promise-title" className="promise__headline">
              <span className="promise__headline-line">Outside, weather decides.</span>
              <span className="promise__headline-line">Inside, we do.</span>
            </h2>
            <div className="promise__scroll">
              <div className="promise__bullets">
                {[
                  { i: "01", title: "Monsoon doesn’t decide.", body: "Outside, six months of rain. Inside, the humidity stays where it should.", video: "/videos/promise-monsoon.mp4" },
                  { i: "02", title: "Heat doesn’t decide.", body: "Outside, forty-two degrees. Inside, twenty-four — dialed by the hour.", video: "/videos/promise-heat.mp4" },
                  { i: "03", title: "Seasons don’t decide.", body: "Outside, one harvest a year. Inside, twelve.", video: "/videos/promise-seasons.mp4" },
                ].map((b, idx) => (
                  <div className="promise__bullet" key={b.i} data-promise-bullet={idx}>
                    <p className="promise__index" aria-label={b.i}>
                      <span className="promise__index-digit" aria-hidden="true">0</span>
                      <span className="promise__index-digit promise__index-digit--accent" aria-hidden="true">{b.i.slice(1)}</span>
                    </p>
                    <p className="promise__title">{b.title}</p>
                    <p className="promise__body">{b.body}</p>
                  </div>
                ))}
              </div>
              <div className="promise__media-col" aria-hidden="true">
                <div className="promise__media">
                  <div
                    className="promise__media-frame is-active"
                    data-promise-frame={0}
                    style={{ background: "linear-gradient(160deg, #3f4a55 0%, #5f6c78 50%, #8b939c 100%)" }}
                  >
                    <video
                      data-promise-video={0}
                      src="/videos/promise-monsoon.mp4"
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  </div>
                  <div
                    className="promise__media-frame"
                    data-promise-frame={1}
                    style={{ background: "linear-gradient(160deg, #f5c875 0%, #d99540 50%, #7a4b1c 100%)" }}
                  >
                    <video
                      data-promise-video={1}
                      src="/videos/promise-heat.mp4"
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  </div>
                  <div
                    className="promise__media-frame"
                    data-promise-frame={2}
                    style={{ background: "linear-gradient(95deg, #cde0e8 0%, #b8d4a0 33%, #d8a06b 66%, #b89570 100%)" }}
                  >
                    <video
                      data-promise-video={2}
                      src="/videos/promise-seasons.mp4"
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="stat-band" aria-label="Harvest cadence">
          <div className="stat-band__inner">
            <p className="stat-band__number" data-stat-number>12</p>
            <p className="stat-band__divider" aria-hidden="true">&mdash;</p>
            <p className="stat-band__label">harvests per year</p>
            <p className="stat-band__sub">where outdoor farms get one.</p>
          </div>
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

        <section className="marquee" aria-label="What we grow">
          <div className="marquee__track" aria-hidden="true">
            {Array.from({ length: 3 }).map((_, i) => (
              <span className="marquee__group" key={i}>
                Vanilla &middot; Black pepper &middot; Turmeric &middot; Ginger &middot; Bell peppers &middot; Lettuce &middot; Spinach &middot; Kale &middot; Cilantro &middot;{" "}
              </span>
            ))}
          </div>
        </section>


        <section className="quote-band" aria-label="Brand promise">
          <blockquote className="quote-band__inner">
            <p className="quote-band__mark" aria-hidden="true">&ldquo;</p>
            <p className="quote-band__line">We grow what no farm can.</p>
            <footer className="quote-band__attr">&mdash; The Living Vault</footer>
          </blockquote>
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
