import { PlayersProps } from "@/types";

export const SUBTITLE_OPTIONS = [
  { label: "Nonaktif", value: "off" },
  { label: "Indonesia", value: "id" },
  { label: "English", value: "en" },
  { label: "Malay", value: "ms" },
  { label: "Español", value: "es" },
  { label: "Français", value: "fr" },
] as const;

export type SubtitleLanguage = (typeof SUBTITLE_OPTIONS)[number]["value"];
export const DEFAULT_SUBTITLE_LANGUAGE: SubtitleLanguage = "id";

const addSubtitleLanguage = (source: string, subtitleLanguage: SubtitleLanguage): string => {
  if (subtitleLanguage === "off") return source;

  const separator = source.includes("?") ? "&" : "?";
  return `${source}${separator}ds_lang=${subtitleLanguage}`;
};

const addWyzieSubtitle = (
  source: string,
  tmdbId: string | number,
  subtitleLanguage: SubtitleLanguage,
  episode?: { season: number; episode: number },
) => {
  if (subtitleLanguage === "off") return source;
  // The player is hosted on a different origin. A relative subtitle URL is
  // therefore resolved against the provider (for example vidlink.pro), not
  // against Filmanesia, and the track silently fails to load.
  const baseUrl = (
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SITE_URL || "https://filmanesia.com"
  ).replace(/\/$/, "");
  const params = new URLSearchParams({ tmdbId: String(tmdbId), lang: subtitleLanguage });
  if (episode) {
    params.set("season", String(episode.season));
    params.set("episode", String(episode.episode));
  }
  const subtitleUrl = `${baseUrl}/api/subtitles?${params.toString()}`;
  return `${source}${source.includes("?") ? "&" : "?"}sub_file=${encodeURIComponent(subtitleUrl)}&sub_label=${encodeURIComponent(subtitleLanguage === "id" ? "Indonesia" : subtitleLanguage === "en" ? "English" : subtitleLanguage)}`;
};

/**
 * Generates a list of movie players with their respective titles and source URLs.
 * Each player is constructed using the provided movie ID.
 *
 * @param {string | number} id - The ID of the movie to be embedded in the player URLs.
 * @param {number} [startAt] - The start position in seconds to be embedded in the player URLs. Optional.
 * @returns {PlayersProps[]} - An array of objects, each containing
 * the title of the player and the corresponding source URL.
 */
export const getMoviePlayers = (
  id: string | number,
  startAt?: number,
  subtitleLanguage: SubtitleLanguage = DEFAULT_SUBTITLE_LANGUAGE,
): PlayersProps[] => {
  return [
    {
      title: "VidSrc (VIP)",
      source: addSubtitleLanguage(`https://vidsrc.to/embed/movie/${id}`, subtitleLanguage),
      recommended: true,
      fast: true,
      supportsSubtitles: true,
    },
    {
      title: "AutoEmbed",
      source: `https://autoembed.co/movie/tmdb/${id}`,
      recommended: true,
      fast: true,
      supportsSubtitles: true,
    },
    {
      title: "VidSrc Pro",
      source: addSubtitleLanguage(`https://vidsrc.me/embed/movie/${id}`, subtitleLanguage),
      recommended: true,
      fast: true,
      supportsSubtitles: true,
    },
    {
      title: "SmashyStream",
      source: `https://embed.smashystream.com/playere.php?tmdb=${id}`,
      fast: true,
      supportsSubtitles: true,
    },
    {
      title: "VidLink",
      source: addWyzieSubtitle(`https://vidlink.pro/movie/${id}?player=jw&primaryColor=006fee&secondaryColor=a2a2a2&iconColor=eefdec&autoplay=true&startAt=${startAt || ""}`, id, subtitleLanguage),
      recommended: true,
      fast: true,
      resumable: true,
      supportsSubtitles: true,
    },
    {
      title: "VidSrc CC",
      source: addSubtitleLanguage(`https://vidsrc.cc/v2/embed/movie/${id}?autoPlay=false`, subtitleLanguage),
      supportsSubtitles: true,
    },
    {
      title: "SuperEmbed",
      source: `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1`,
      fast: true,
      supportsSubtitles: true,
    },
    {
      title: "FilmKu",
      source: `https://filmku.stream/embed/${id}`,
      supportsSubtitles: true,
    },
    {
      title: "2Embed",
      source: `https://www.2embed.cc/embed/${id}`,
      supportsSubtitles: true,
    },
  ];
};

export const getTvShowPlayers = (
  id: string | number,
  season: number,
  episode: number,
  startAt?: number,
  subtitleLanguage: SubtitleLanguage = DEFAULT_SUBTITLE_LANGUAGE,
): PlayersProps[] => {
  return [
    {
      title: "AutoEmbed (Stabil & K-Drama)",
      source: `https://autoembed.co/tv/tmdb/${id}-${season}-${episode}`,
      recommended: true,
      fast: true,
      supportsSubtitles: true,
    },
    {
      title: "VidSrc (Aktif)",
      source: addSubtitleLanguage(
        `https://vidsrc.to/embed/tv/${id}/${season}/${episode}`,
        subtitleLanguage,
      ),
      recommended: true,
      fast: true,
      supportsSubtitles: true,
    },
    {
      title: "VidSrc Me",
      source: addSubtitleLanguage(
        `https://vidsrc.me/embed/tv/${id}/${season}/${episode}`,
        subtitleLanguage,
      ),
      recommended: true,
      fast: true,
      supportsSubtitles: true,
    },
    {
      title: "SmashyStream",
      source: `https://embed.smashystream.com/playere.php?tmdb=${id}&season=${season}&episode=${episode}`,
      fast: true,
      supportsSubtitles: true,
    },
    {
      title: "VidLink (Default)",
      source: addWyzieSubtitle(`https://vidlink.pro/tv/${id}/${season}/${episode}?player=jw&primaryColor=f5a524&secondaryColor=a2a2a2&iconColor=eefdec&autoplay=true&startAt=${startAt || ""}`, id, subtitleLanguage, { season, episode }),
      recommended: true,
      fast: true,
      resumable: true,
      supportsSubtitles: true,
    },
    {
      title: "SuperEmbed",
      source: `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1&s=${season}&e=${episode}`,
      fast: true,
      supportsSubtitles: true,
    },
    {
      title: "FilmKu",
      source: `https://filmku.stream/embed/series?tmdb=${id}&sea=${season}&epi=${episode}`,
      supportsSubtitles: true,
    },
    {
      title: "2Embed",
      source: `https://www.2embed.cc/embedtv/${id}&s=${season}&e=${episode}`,
      supportsSubtitles: true,
    },
  ];
};
