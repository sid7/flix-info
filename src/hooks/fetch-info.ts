import { useEffect, useState } from "react";
import { request } from "../scripts/tmdb-helper";
import { IAnyInfo } from "../types/common";

interface IPayload<T> {
  data?: T;
  err?: any;
  status: "Loading" | "Success" | "Failed" | "Error";
}

export default function useFetchInfo<T = IAnyInfo>(scope: string, id: string) {
  const [payload, setPayload] = useState<IPayload<T>>({ status: "Loading" });
  useEffect(() => {
    request<T>(`/${scope}/${id}`).then(({ status, data, err }) => {
      if (status === "Success") {
        setPayload({
          data,
          status: "Success"
        });
      } else {
        setPayload({ status, data, err });
      }
    });
  }, [scope, id]);
  return payload;
}
