import { useEffect } from "react";

export default function useTitle(title: string) {
  useEffect(() => {
    document.title = title;

    return () => {
      document.title = "Flix Info";
    };
  }, [title]);

  return title;
}
