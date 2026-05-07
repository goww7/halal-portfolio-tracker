import { PortfolioForm } from '@/components/PortfolioForm';
import { StarMark } from '@/components/StarMark';

const VOLUME = 'Vol. I';
const ISSUE = 'No. 01';

export default function HomePage() {
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <main className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-16 py-10 md:py-14">
      {/* === MASTHEAD === */}
      <header className="masthead py-5 mb-12 md:mb-16">
        <div className="flex items-end justify-between gap-6">
          <div className="flex items-end gap-4">
            <StarMark size={36} className="text-ink mb-1" />
            <div>
              <div className="kicker mb-1">{VOLUME} · {ISSUE}</div>
              <h1 className="display text-4xl md:text-5xl leading-none">
                Halal Portfolio
              </h1>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-end text-right">
            <div className="kicker mb-1">Issued</div>
            <div
              className="text-sm italic text-ink-soft"
              style={{ fontFamily: 'var(--font-fraunces)' }}
            >
              {today}
            </div>
          </div>
        </div>

        <div
          className="mt-3 italic text-ink-mute text-sm md:text-base max-w-[60ch]"
          style={{ fontFamily: 'var(--font-fraunces)' }}
        >
          A quiet reading of your stock holdings under the Shariah methodologies of
          AAOIFI, DJIM, FTSE, MSCI, and S&amp;P. Free, open, self-hosted.
        </div>
      </header>

      {/* === BYLINE / RUNNING HEAD === */}
      <div className="flex items-center justify-between text-ink-mute mb-10 md:mb-14">
        <div className="kicker">A compliance journal</div>
        <div className="hidden md:flex items-center gap-3 kicker">
          <span>By the reader</span>
          <span aria-hidden>·</span>
          <span>Powered by Halal Terminal</span>
        </div>
      </div>

      {/* === BODY === */}
      <PortfolioForm />

      {/* === COLOPHON === */}
      <footer className="mt-24 md:mt-32 pt-10 border-t border-ink">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="kicker mb-3">Colophon</div>
            <p
              className="italic text-ink-soft text-sm leading-relaxed"
              style={{ fontFamily: 'var(--font-fraunces)' }}
            >
              Set in <span className="not-italic" style={{ fontFamily: 'var(--font-fraunces)' }}>Fraunces</span>,{' '}
              IBM Plex Sans, and Plex Mono. Compliance verdicts powered by{' '}
              <a
                href="https://halalterminal.com"
                target="_blank"
                rel="noreferrer"
                className="border-b border-ink hover:border-clay hover:text-clay transition-colors"
              >
                Halal Terminal
              </a>{' '}
              — free tier, two hundred screenings the month, no card.
            </p>
          </div>

          <div>
            <div className="kicker mb-3">Notice</div>
            <p
              className="italic text-ink-soft text-sm leading-relaxed"
              style={{ fontFamily: 'var(--font-fraunces)' }}
            >
              The reading produced by this page is automated. It is{' '}
              <span className="text-clay">not a fatwa</span> and not investment advice.
              Consult a qualified scholar for personal rulings on your holdings.
            </p>
          </div>

          <div>
            <div className="kicker mb-3">Source</div>
            <p
              className="italic text-ink-soft text-sm leading-relaxed"
              style={{ fontFamily: 'var(--font-fraunces)' }}
            >
              MIT-licensed, self-hostable.{' '}
              <a
                href="https://github.com/goww7/halal-portfolio-tracker"
                target="_blank"
                rel="noreferrer"
                className="border-b border-ink hover:border-clay hover:text-clay transition-colors"
              >
                Read the source
              </a>{' '}
              · fork it · file an issue · ship your own.
            </p>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between text-ink-mute">
          <StarMark size={16} />
          <div className="kicker">— End —</div>
          <StarMark size={16} />
        </div>
      </footer>
    </main>
  );
}
