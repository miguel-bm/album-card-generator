import type { AlbumDetail, CardSettings } from "./types";

/**
 * Resolve the text to encode in the QR code based on settings and album data.
 * Per-album overrides (qrContentOverride, qrCustomTextOverride) take precedence.
 */
export function resolveQrText(settings: CardSettings, album: AlbumDetail): string {
  const mode = (album as AlbumWithQrOverrides).qrContentOverride || settings.qrContentMode;
  const customText = (album as AlbumWithQrOverrides).qrCustomTextOverride ?? settings.qrCustomText;

  switch (mode) {
    case "album-id":
      return album.id;
    case "title":
      return `${album.title} - ${album.artist}`;
    case "spotify-link":
      if (album.spotifyId) {
        return `https://open.spotify.com/album/${album.spotifyId}`;
      }
      return `https://open.spotify.com/search/${encodeURIComponent(`${album.title} ${album.artist}`)}`;
    case "ha-tag":
      if (album.spotifyId) {
        return `https://www.home-assistant.io/tag/album-spotify-${album.spotifyId}`;
      }
      return `${album.title} - ${album.artist}`;
    case "discogs":
      return album.discogsUrl || `${album.title} - ${album.artist}`;
    case "spotify": {
      const q = encodeURIComponent(`${album.title} ${album.artist}`);
      return `https://open.spotify.com/search/${q}`;
    }
    case "apple-music": {
      const q = encodeURIComponent(`${album.title} ${album.artist}`);
      return `https://music.apple.com/search?term=${q}`;
    }
    case "custom":
      return customText || album.title;
    default:
      return `${album.title} - ${album.artist}`;
  }
}

/** Extended album with per-album QR overrides (used in print queue). */
interface AlbumWithQrOverrides extends AlbumDetail {
  qrContentOverride?: string;
  qrCustomTextOverride?: string;
}
