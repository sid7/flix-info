import { useEffect, useState } from "react";
import { request } from "../scripts/tmdb-helper";
import { IAnyInfo } from "../types/common";

const append = {
  tv: "keywords,credits,videos,content_ratings",
  movie: "keywords,credits,videos,release_dates",
  person: "combined_credits,images,tagged_images"
};

interface IPayload<T> {
  data?: T;
  err?: any;
  status: "Loading" | "Success" | "Failed" | "Error";
}

export default function useFetchInfo<T = IAnyInfo>(
  scope: keyof typeof append,
  id: string
) {
  const [payload, setPayload] = useState<IPayload<T>>({ status: "Loading" });
  const append_to_response = append[scope] + ",external_ids,recommendations";
  useEffect(() => {
    request<T>(`/${scope}/${id}`, { append_to_response }).then(
      ({ status, data, err }) => {
        if (status === "Success") {
          setPayload({
            data,
            status: "Success"
          });
        } else {
          setPayload({ status, data, err });
        }
      }
    );
    return () => {
      setPayload({ status: "Loading" });
    };
  }, [scope, id]);
  return payload;
}
