import { AnchorHTMLAttributes } from "react";

export const A = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a {...props} />
);
A.defaultProps = {
  target: "_blank",
  rel: "noreferrer noopener"
};
