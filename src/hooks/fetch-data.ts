import { useState, useEffect } from "react";
import { request, img } from "../scripts/tmdb-helper";
import type { IMedia } from "../types/common";

function processData(data: IMedia[]) {
  return data.map((d) => ({
    id: d.id!,
    label: d.name || d.title!,
    img: {
      poster: img.poster(d.poster_path!, "md"),
      profile: img.profile(d.profile_path!, "md")
    },
    media_type: d.media_type
  }));
}

interface IBlock {
  page: number;
  results: IMedia[];
  total_pages: number;
  total_results: number;
}

export default function useFetchData(path: string) {
  const [data, setData] = useState<ReturnType<typeof processData>>([]);

  useEffect(() => {
    request<IBlock>(path).then((payload) => {
      if (payload.status === "Success") {
        const Data = processData(payload.data!.results);
        setData(Data);
      } else {
        setData([]);
        console.warn(payload);
      }
    });
  }, [path]);

  return data;
}
