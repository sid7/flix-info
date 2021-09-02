import type { IMedia, IMediaType, IVideo } from "../types/common";
import { img } from "./tmdb-helper";

export function genTitle(
  title?: string,
  opt?: Partial<{ [a in "start" | "end"]: string | false }>
) {
  if (!title) {
    return "Flix Info";
  }
  if (opt?.start) {
    return `${title} (${opt.start}${
      opt.end ? ` - ${opt.end})` : ")"
    } | Flix Info`;
  }

  return `${title} | Flix Info`;
}

export function prettyTime(time: number | null) {
  if (!time) {
    return "—";
  }
  return time <= 60 ? `${time} min` : `${Math.floor(time / 60)}h ${time % 60}m`;
}

export const formatDate = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  weekday: "short"
});
export function prettyDate(str: string | null) {
  if (!str) {
    return "—";
  }
  const d = new Date(str);
  return formatDate.format(d);
}

export const formatMoney = new Intl.NumberFormat("en", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
  currencyDisplay: "symbol"
});

export const mediaToScrollerItems = (item: IMedia[], type?: IMediaType) =>
  item.map((d) => ({
    id: d.id!,
    label: d.name || d.title!,
    img: {
      poster: img.poster(d.poster_path!, "md"),
      profile: img.profile(d.profile_path!, "md")
    },
    media_type: d.media_type || type!
  }));

export type IScrollerItem = ReturnType<typeof mediaToScrollerItems>;

const sites = {
  YouTube: "https://www.youtube.com/watch?v=",
  Vimeo: " https://vimeo.com/"
};

export function getTrailer(videos: IVideo[]) {
  if (videos.length === 0) {
    return null;
  }

  videos.sort(
    (a, b) =>
      new Date(a.published_at).getTime() - new Date(b.published_at).getTime()
  );
  const trailer = videos.filter((v) => v.type === "Trailer")[0] || videos[0];

  return {
    ...trailer,
    url: `${sites[trailer.site]}${trailer.key}`
  };
}
