import { createPortal } from "react-dom";
import type { AnchorHTMLAttributes, ReactNode } from "react";

export const A = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a {...props} />
);
A.defaultProps = {
  target: "_blank",
  rel: "noreferrer noopener",
};

interface IPortal {
  children: ReactNode;
  target: string;
}
export const Portal = ({ children, target }: IPortal) =>
  createPortal(children, document.getElementById(target)!);
