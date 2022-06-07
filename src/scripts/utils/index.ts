export * from "./credit-table";
export * from "./prettfy";
export * from "./display-names";
import { VideoSitesIcon } from "../../components/icons";
import { img } from "../tmdb-helper";
import type {
  IExternalIDs,
  IMedia,
  IMediaType,
  IVideo,
} from "../../types/common";
import type { ISpokenLang } from "../../types/common";

const inStandaloneMode = window.matchMedia(
  "(display-mode: minimal-ui), (display-mode: standalone)"
).matches;

interface ITitleOpt {
  type: string;
  start?: string;
  end?: string | false;
}
export function genTitle(title: string, opt: ITitleOpt) {
  let stamp = opt.type;

  if (opt.start) {
    stamp += ` ${opt.start}`;
    if (opt.end) {
      stamp += ` - ${opt.end}`;
    }
  }

  stamp = `${title} (${stamp})`;

  return inStandaloneMode ? stamp : stamp + " | Flix Info";
}

export function numPluralize(word: string, num: number, suffix = "s") {
  return num > 1 ? `${word}${suffix}` : word;
}

export const mediaToScrollerItems = (item: IMedia[], type?: IMediaType) =>
  item.map((d) => ({
    id: d.id!,
    label: d.name || d.title!,
    img: {
      poster: img.poster(d.poster_path!, "md"),
      profile: img.profile(d.profile_path!, "md"),
    },
    media_type: d.media_type || type!,
  }));

export type IScrollerItem = ReturnType<typeof mediaToScrollerItems>;

const sites = {
  YouTube: "https://www.youtube.com/watch?v=",
  Vimeo: " https://vimeo.com/",
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
    url: `${sites[trailer.site]}${trailer.key}`,
    Icon: VideoSitesIcon[trailer.site],
  };
}

export function processLangs(
  original: string,
  spoken: ISpokenLang[],
  langs: string[]
) {
  const data: {
    [lang: string]: { labels?: string[]; code?: string; ogName?: string };
  } = {
    [original]: { labels: ["original"] },
  };

  for (const lang of spoken) {
    if (lang.english_name in data) {
      data[lang.english_name].labels!.push("spoken");
    } else {
      data[lang.english_name] = {
        labels: ["spoken"],
      };
      if (lang.iso_639_1 !== "en") {
        data[lang.english_name].code = lang.iso_639_1;
        data[lang.english_name].ogName = lang.name;
      }
    }
  }

  for (const lang of langs) {
    if (lang in data) {
      // data[lang].labels.push
    } else {
      data[lang] = {};
    }
  }

  return Object.entries(data);
}

export function genSocialLinks(ids: IExternalIDs) {
  const platforms = ["facebook", "twitter", "instagram"];
  const links = [];
  for (const platform of platforms) {
    const id = ids[`${platform}_id` as keyof IExternalIDs];
    if (id) {
      links.push({
        platform,
        url: `https://www.${platform}.com/${id}`,
      });
    }
  }

  return links;
}
