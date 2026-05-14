import Image from "next/image";
import Script from "next/script";
import ScrollAnimations from "./ScrollAnimations";

const navItems = [
  ["Harvest", "#method"],
  ["About", "#about"],
  ["Crops", "#crops"],
  ["Quality", "#science"],
  ["Contact", "#contact"],
] as const;

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <div className="intro" data-intro aria-hidden="true">
        <div className="intro__panel intro__panel--top">
          <div className="intro__inner">
            <div className="intro__grid" />
            <div className="intro__brand-block">
              <span className="intro__mark" aria-hidden="true">
                <span className="intro__mark-ring" />
                <span className="intro__mark-leaf" />
                <span className="intro__mark-cut" />
              </span>
              <span className="intro__name" aria-label="The Living Vault">
                {"The Living Vault".split("").map((letter, index) => (
                  <span className="intro__letter" data-intro-letter={index} key={`${letter}-${index}`}>
                    {letter === " " ? "\u00a0" : letter}
                  </span>
                ))}
              </span>
              <span className="intro__tagline">Protected harvests, opened with care</span>
            </div>
          </div>
        </div>
        <div className="intro__panel intro__panel--bottom">
          <div className="intro__inner">
            <div className="intro__grid" />
            <div className="intro__brand-block">
              <span className="intro__mark" aria-hidden="true">
                <span className="intro__mark-ring" />
                <span className="intro__mark-leaf" />
                <span className="intro__mark-cut" />
              </span>
              <span className="intro__name" aria-label="The Living Vault">
                {"The Living Vault".split("").map((letter, index) => (
                  <span className="intro__letter" data-intro-letter={index} key={`${letter}-${index}`}>
                    {letter === " " ? "\u00a0" : letter}
                  </span>
                ))}
              </span>
              <span className="intro__tagline">Protected harvests, opened with care</span>
            </div>
          </div>
        </div>
        <div className="intro__aperture" aria-hidden="true">
          <canvas className="intro__canvas" data-intro-canvas />
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
      <div className="nav-menu" id="nav-menu" data-nav-menu aria-label="Primary navigation">
        {navItems.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </div>

      <main id="main">
        <div className="hero-scroll" id="top" data-video-section>
        <section className="hero section-shell" aria-labelledby="hero-title" data-flow-hero>
          <div className="hero__scene" aria-hidden="true">
            <canvas className="hero__canvas" data-hero-canvas />
            <div className="hero__mist" />
            <div className="hero__light" />
            <div className="hero__veil" />
            <div className="hero-captions" aria-hidden="true">
              <p className="hero-caption hero-caption--1">Protected polyhouses. One standard of care.</p>
              <p className="hero-caption hero-caption--2">Controlled from inside. Built around the crop.</p>
              <p className="hero-caption hero-caption--3">Lettuce and spinach. Clean crunch, harvested at their best.</p>
              <p className="hero-caption hero-caption--4">Kale. Curly, structured, cut at colour peak.</p>
              <p className="hero-caption hero-caption--5">Cilantro. Bright, aromatic bunches cut for clean finish.</p>
              <p className="hero-caption hero-caption--6">Tomatoes. Vine-ripened and heavy with colour.</p>
              <p className="hero-caption hero-caption--7">Bell peppers — red and yellow. Glossy fruit buyers notice first.</p>
              <p className="hero-caption hero-caption--8">Turmeric. Ginger. Black pepper. Roots and vines grown for aroma.</p>
              <p className="hero-caption hero-caption--9">Vanilla. Hand-pollinated. Slow-cured.</p>
            </div>
          </div>
          <div className="hero__content reveal">
            <p className="eyebrow">Fresh produce grown with care</p>
            <h1 id="hero-title">Fresh crops with the color, aroma, and crunch buyers notice first.</h1>
            <p className="hero__lede">
              The Living Vault grows vanilla, ginger, turmeric, black pepper, bell pepper,
              lettuce, kale, spinach, cilantro, and other useful crops inside a protected
              polyhouse built around freshness, crop finish, and dependable harvest handling.
            </p>
            <div className="hero__actions" aria-label="Hero actions">
              <a className="button button--primary" href="#crops">
                Explore Our Crops
              </a>
              <a className="button button--ghost" href="#science">
                Quality Standards
              </a>
            </div>
          </div>
        </section>
        </div>

        <section className="method section-pad" id="method" aria-labelledby="method-title" data-flow-section>
          <div className="section-heading reveal">
            <p className="eyebrow">Harvest quality</p>
            <h2 id="method-title">Cleaner, fresher crops selected for everyday use.</h2>
            <p>
              Every crop is grown, picked, sorted, and packed around the qualities people notice
              first: freshness, color, aroma, texture, uniformity, and shelf appeal.
            </p>
          </div>
          <div className="control-comparison reveal">
            <div className="control-comparison__side control-comparison__side--wild">
              <p>Inconsistent harvests</p>
              <h3>Quality can vary</h3>
              <ul>
                <li>Mixed size, color, and texture</li>
                <li>Shorter freshness window after harvest</li>
                <li>Uneven flavor and appearance by batch</li>
              </ul>
            </div>
            <div className="control-comparison__dial" aria-hidden="true">
              <span />
              <strong>Quality</strong>
            </div>
            <div className="control-comparison__side control-comparison__side--vault">
              <p>Our crop standard</p>
              <h3>Better market-ready produce</h3>
              <ul>
                <li>Selected for color, aroma, and texture</li>
                <li>Harvested with crop-specific timing</li>
                <li>Sorted for cleaner, more consistent supply</li>
              </ul>
            </div>
          </div>
          <div className="method__journey" data-flow-journey>
            <div className="section-heading section-heading--wide reveal">
              <p className="eyebrow">Growing journey</p>
              <h2 id="journey-title">Every crop is handled for freshness before it leaves us.</h2>
              <p>
                From planting to delivery, each step is focused on the crop itself: clean starts,
                steady growth, careful harvest, sorting, and freshness.
              </p>
            </div>
            <div className="journey-track" data-journey-track />
          </div>
        </section>

        <section className="about section-pad" id="about" aria-labelledby="about-title">
          <div className="about__grid">
            <div className="section-heading reveal">
              <p className="eyebrow">About us</p>
              <h2 id="about-title">Built to supply fresh crops with dependable quality.</h2>
            </div>
            <div className="about__content reveal">
              <p>
                The Living Vault grows spices, herbs, leafy greens, and vegetables for people and
                businesses who care about freshness, consistency, and careful handling.
              </p>
              <p>
                Our approach is practical: protect the crop, monitor it closely, harvest at the
                right time, and handle it with discipline so the produce arrives with better flavor,
                color, texture, and shelf appeal.
              </p>
              <div className="about__principles" aria-label="Cultivation principles">
                <article>
                  <span>01</span>
                  <h3>Produce first</h3>
                  <p>Every decision is judged by the crop people receive: cleaner leaves, stronger color, better aroma, and more consistent harvests.</p>
                </article>
                <article>
                  <span>02</span>
                  <h3>Care before claims</h3>
                  <p>Quality comes from daily crop observation, harvest timing, careful sorting, and honest agronomy.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="crop-worlds section-pad" id="crops" aria-labelledby="crops-title" data-flow-crops>
          <div className="section-heading section-heading--wide reveal">
            <p className="eyebrow">Our crop range</p>
            <h2 id="crops-title">Spices, herbs, greens, and vegetables for everyday fresh supply.</h2>
            <p>
              Select a crop to see its quality signals, harvest value, and crop-specific care notes.
            </p>
          </div>
          <div className="crop-stage reveal" data-crop-stage>
            <div className="crop-stage__visual" aria-hidden="true">
              <div className="crop-stage__orb">
                <Image
                  className="crop-stage__art"
                  data-crop-image
                  src="/images/crops/cartoon/vanilla.svg"
                  alt=""
                  width="720"
                  height="720"
                  unoptimized
                  decoding="async"
                />
              </div>
              <div className="crop-stage__rings" />
            </div>
            <div className="crop-stage__content">
              <p className="eyebrow" data-crop-kicker>
                Vanilla
              </p>
              <h3 data-crop-title>Aromatic vanilla for cooking and flavor.</h3>
              <p data-crop-copy>
                Slow-grown vanilla is selected for pod quality, fragrance depth, and careful curing
                so the finished crop carries stronger aroma.
              </p>
              <dl className="crop-stage__facts">
                <div>
                  <dt>Crop Character</dt>
                  <dd data-crop-climate>Fragrant pods</dd>
                </div>
                <div>
                  <dt>Signal</dt>
                  <dd data-crop-signal>Fragrance depth</dd>
                </div>
                <div>
                  <dt>Buyer Value</dt>
                  <dd data-crop-advantage>Deep aroma for cooking</dd>
                </div>
                <div>
                  <dt>Harvest</dt>
                  <dd data-crop-harvest>Slow-cured pods</dd>
                </div>
                <div>
                  <dt>Finish</dt>
                  <dd data-crop-grade>Clean aroma</dd>
                </div>
                <div>
                  <dt>Care Notes</dt>
                  <dd data-crop-technique>
                    Trellis vines, hand-pollinate flowers, and cure pods slowly for deeper aroma.
                  </dd>
                </div>
              </dl>
            </div>
            <div className="crop-tabs" role="tablist" aria-label="Crop selection" data-crop-tabs />
          </div>
        </section>

        <section className="science section-pad" id="science" aria-labelledby="science-title" data-flow-section>
          <div className="science__grid">
            <div className="section-heading reveal">
              <p className="eyebrow">Quality standards</p>
              <h2 id="science-title">Produce selected for freshness, finish, and consistency.</h2>
              <p>
                Our value is in the crop: how it looks, smells, tastes, stores, and performs for
                kitchens, retailers, local shops, and households.
              </p>
            </div>
            <div className="system-panel reveal" aria-label="Crop quality standards">
              <div className="system-panel__scan" />
              {[
                ["01", "Freshness", "Leaves, roots, pods, and fruits are harvested with timing that supports better condition and shelf appeal."],
                ["02", "Flavor and color", "Crop lots are selected for stronger aroma, color, texture, and finish."],
                ["03", "Clean handling", "Harvests are handled carefully from picking through sorting to preserve appearance and usability."],
                ["04", "Market-ready sorting", "Harvests are inspected and sorted with a focus on consistency, appearance, and usability."],
              ].map(([number, title, copy]) => (
                <article key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact section-pad" id="contact" aria-labelledby="contact-title">
          <div className="contact__grid">
            <div className="section-heading reveal">
              <p className="eyebrow">Contact us</p>
              <h2 id="contact-title">Let&rsquo;s talk about fresh crops.</h2>
              <p>
                Whether you&rsquo;re sourcing for a restaurant, retail shop, or household — reach
                out and we&rsquo;ll get back to you within one working day.
              </p>
              <div className="contact__details reveal">
                <div className="contact__detail">
                  <span className="eyebrow">Email</span>
                  <a href="mailto:hello@thelivingvault.in">hello@thelivingvault.in</a>
                </div>
                <div className="contact__detail">
                  <span className="eyebrow">Based in</span>
                  <span>Andhra Pradesh, India</span>
                </div>
              </div>
            </div>
            <form className="contact__form reveal" aria-label="Contact form">
              <div className="contact__row">
                <label htmlFor="contact-name">Your name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Priya Sharma"
                  autoComplete="name"
                  required
                />
              </div>
              <div className="contact__row">
                <label htmlFor="contact-email">Email address</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="contact__row">
                <label htmlFor="contact-interest">What are you looking for?</label>
                <input
                  id="contact-interest"
                  type="text"
                  name="interest"
                  placeholder="e.g. weekly lettuce supply, vanilla pods…"
                />
              </div>
              <div className="contact__row">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="Tell us about your volumes, frequency, or anything else that helps us prepare."
                />
              </div>
              <button className="button button--primary" type="submit">
                Send Message
              </button>
            </form>
          </div>
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
          <a href="#method">Harvest</a>
          <a href="#crops">Crops</a>
          <a href="#science">Quality</a>
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
