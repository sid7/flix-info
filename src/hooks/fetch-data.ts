import { useState, useEffect } from "react";
import { request } from "../scripts/tmdb-helper";
import { mediaToScrollerItems } from "../scripts/utils";
import type { IMedia } from "../types/common";

export type IData = ReturnType<typeof mediaToScrollerItems>;

interface IBlock {
  page: number;
  results: IMedia[];
  total_pages: number;
  total_results: number;
}

export default function useFetchData(path: string) {
  const [data, setData] = useState<IData>([]);

  useEffect(() => {
    request<IBlock>(path).then((payload) => {
      if (payload.status === "Success") {
        const Data = mediaToScrollerItems(payload.data!.results);
        setData(Data);
      } else {
        setData([]);
        console.warn(payload);
      }
    });
  }, [path]);

  return data;
}
