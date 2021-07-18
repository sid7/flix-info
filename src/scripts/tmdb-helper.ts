import { ISearchResponse } from "../types/search";

const tmdb_api_base = "https://api.themoviedb.org/3";

// Request

interface IRequest<T> {
  data?: T;
  status: "Success" | "Failed" | "Error";
  err?: any;
}
export async function request<T = any>(
  pathname: string,
  opt = {}
): Promise<IRequest<T>> {
  opt = new URLSearchParams({
    ...opt,
    api_key: import.meta.env.VITE_TMDB_API_V3 as string
  });
  const url = `${tmdb_api_base}/${pathname}?${opt.toString()}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`${res.status} | ${res.statusText}`);
    }
    const data = await res.json();
    if (data.status_message) {
      return { data, status: "Failed" };
    }
    return { data: data as T, status: "Success" };
  } catch (err) {
    return { err, status: "Error" };
  }
}

// Search

export async function search(query: string, scope = "multi") {
  const { status, data, err } = await request<ISearchResponse>(
    `search/${scope}`,
    { query }
  );
  if (status === "Success") {
    const processedData = data!.results.map((d) => ({
      name: d.name || d.title!,
      id: d.id!,
      img: d.poster_path
        ? img.poster(d.poster_path, "md")
        : d.profile_path
        ? img.profile(d.profile_path, "md")
        : null,
      stamp: d.release_date || d.first_air_date,
      type: d.media_type as "tv" | "movie" | "person"
    }));

    return { data: processedData, status };
  }
  return { status, err };
}

// Image

const img = {
  base: "https://image.tmdb.org/t/p",
  sizes: {
    // prettier-ignore
    poster: {
      xs: "w45", sm: "w92", md: "w154",
      lg: "w185", xl: "w300", max: "w500",
    },
    profile: { sm: "w45", md: "w185", lg: "h632" },
    backdrop: { sm: "w300", md: "w780", lg: "w1280" }
  },
  __createURL(path: string, size: string) {
    return `${this.base}/${size}${path}`;
  },
  poster(this, path: string | null, size: keyof typeof this.sizes.poster) {
    return path && this.__createURL(path, this.sizes.poster[size]);
  },
  backdrop(this, path: string | null, size: keyof typeof this.sizes.backdrop) {
    return path && this.__createURL(path, this.sizes.backdrop[size]);
  },
  profile(this, path: string | null, size: keyof typeof this.sizes.profile) {
    return path && this.__createURL(path, this.sizes.profile[size]);
  },
  logo(this, path: string | null, size = "original") {
    return (
      path && [
        this.__createURL(path.replace(".png", ".svg"), "original"),
        this.__createURL(path, size)
      ]
    );
  }
};
