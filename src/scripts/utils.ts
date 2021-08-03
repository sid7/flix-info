import type { IMedia, IMediaType } from "../types/common";
import { img } from "./tmdb-helper";

export function prettyTime(time: number) {
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
    return "-";
  }
  const d = new Date(str);
  return formatDate.format(d);
}

export const prettryMoney = new Intl.NumberFormat("en", {
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
