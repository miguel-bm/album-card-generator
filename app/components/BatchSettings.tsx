import { useAlbum } from "../context/AlbumContext";
import type { ProviderMode } from "../lib/types";

// ---------------------------------------------------------------------------
// Provider options
// ---------------------------------------------------------------------------

const PROVIDER_OPTIONS: { value: ProviderMode; label: string }[] = [
  { value: "auto", label: "Auto" },
  { value: "itunes", label: "iTunes" },
  { value: "musicbrainz", label: "MusicBrainz" },
];

// ---------------------------------------------------------------------------
// BatchSettings — controls for batch PDF generation
// ---------------------------------------------------------------------------

interface BatchSettingsProps {
  enrichTracks: boolean;
  setEnrichTracks: (value: boolean) => void;
  mirrorBack: boolean;
  setMirrorBack: (value: boolean) => void;
}

export default function BatchSettings({
  enrichTracks,
  setEnrichTracks,
  mirrorBack,
  setMirrorBack,
}: BatchSettingsProps) {
  const { provider, setProvider } = useAlbum();

  return (
    <div className="bg-surface border border-border rounded-xl p-5 space-y-4">
      {/* Provider select */}
      <div className="flex items-center justify-between">
        <label
          htmlFor="batch-provider"
          className="text-sm font-medium text-text"
        >
          Provider
        </label>
        <select
          id="batch-provider"
          value={provider}
          onChange={(e) => setProvider(e.target.value as ProviderMode)}
          className={[
            "bg-surface-alt border border-border rounded-lg px-3 py-1.5",
            "text-sm text-text cursor-pointer",
            "focus:outline-none focus:border-border-focus focus:ring-1 focus:ring-border-focus",
          ].join(" ")}
        >
          {PROVIDER_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Fetch track list toggle */}
      <div className="flex items-center justify-between">
        <div>
          <label
            htmlFor="batch-enrich"
            className="text-sm font-medium text-text"
          >
            Fetch track list
          </label>
          <p className="text-xs text-text-muted mt-0.5">
            Look up tracks, artist, and cover art via API
          </p>
        </div>
        <button
          id="batch-enrich"
          type="button"
          role="switch"
          aria-checked={enrichTracks}
          onClick={() => setEnrichTracks(!enrichTracks)}
          className={[
            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
            enrichTracks ? "bg-accent" : "bg-surface-alt border border-border",
          ].join(" ")}
        >
          <span
            className={[
              "inline-block h-4 w-4 rounded-full bg-white transition-transform shadow-sm",
              enrichTracks ? "translate-x-6" : "translate-x-1",
            ].join(" ")}
          />
        </button>
      </div>

      {/* Mirror back toggle */}
      <div className="flex items-center justify-between">
        <div>
          <label
            htmlFor="batch-mirror"
            className="text-sm font-medium text-text"
          >
            Mirror back for duplex
          </label>
          <p className="text-xs text-text-muted mt-0.5">
            Flip column order on back pages for double-sided printing
          </p>
        </div>
        <button
          id="batch-mirror"
          type="button"
          role="switch"
          aria-checked={mirrorBack}
          onClick={() => setMirrorBack(!mirrorBack)}
          className={[
            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
            mirrorBack ? "bg-accent" : "bg-surface-alt border border-border",
          ].join(" ")}
        >
          <span
            className={[
              "inline-block h-4 w-4 rounded-full bg-white transition-transform shadow-sm",
              mirrorBack ? "translate-x-6" : "translate-x-1",
            ].join(" ")}
          />
        </button>
      </div>

      {/* Note */}
      <p className="text-xs text-text-faint pt-1">
        Current Style Studio settings are applied to every card.
      </p>
    </div>
  );
}
