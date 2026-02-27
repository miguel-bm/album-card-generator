import logoSvg from "../assets/logo.svg";

export default function AboutPage() {
  return (
    <div className="max-w-[640px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="flex flex-col items-center text-center mb-10">
        <img src={logoSvg} alt="Cardpress logo" width={64} height={64} />
        <h1 className="mt-4 text-2xl font-bold text-text tracking-tight">
          Cardpress
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          Design and print beautiful album cards from your music collection.
        </p>
      </div>

      <div className="space-y-8 text-sm text-text leading-relaxed">
        <section>
          <h2 className="text-base font-semibold text-text mb-2">
            What is this?
          </h2>
          <p>
            Cardpress turns your digital music collection into a deck of
            physical album cards. Each 63&times;88&nbsp;mm card features the
            cover art and track listing, with an optional QR code that links
            to the album on Spotify or your preferred service.
          </p>
          <p className="mt-2">
            Stick an NFC tag behind each card and pair it with a Home Assistant
            automation — tap the card on your phone to play the album on your
            home speaker. The result is a tangible, scannable music collection
            you can browse, gift, and display.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text mb-2">
            How it works
          </h2>
          <ol className="list-decimal list-inside space-y-1.5 text-sm text-text">
            <li><strong>Design</strong> — Search for an album, customize the card style.</li>
            <li><strong>Print</strong> — Import your collection via CSV, generate duplex-ready PDF sheets.</li>
            <li><strong>Write NFC</strong> — Use the Write Tags page to program NFC stickers with album tag IDs.</li>
            <li><strong>Play</strong> — Tap a card on your phone to play the album on your home speaker.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text mb-2">
            Who made this?
          </h2>
          <p>
            Built by{" "}
            <a
              href="https://github.com/miguel-bm"
              className="text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Miguel Blanco
            </a>{" "}
            as a personal project. I wanted a simple way to create nice-looking
            cards for my album collection — so I made one.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text mb-2">
            Open source
          </h2>
          <p>
            Cardpress is open source under the MIT license. The code is on{" "}
            <a
              href="https://github.com/miguel-bm/cardpress"
              className="text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            . Contributions, issues, and forks are welcome.
          </p>
        </section>
      </div>
    </div>
  );
}
