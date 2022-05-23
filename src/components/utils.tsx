import { createPortal } from "react-dom";
import { IconTmdbShot, IconIMDB, IconLink, SocialIcons } from "./icons";
import { genSocialLinks } from "../scripts/utils";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import type { IExternalIDs, IMediaType } from "../types/common";

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

interface IBarLinks {
  tag: string;
  id: number;
  scope: IMediaType;
  ids: IExternalIDs;
  imdb?: string;
  homepage: string | null;
}
export function BarLinks(props: IBarLinks) {
  const social = genSocialLinks(props.ids);
  const imdb = props.imdb || props.ids.imdb_id;
  const imdb_path = props.scope === "person" ? "name" : "title";
  const tag = `${props.tag}-links`;
  const iconProps = {
    height: "1.5em",
    width: "1.5em",
  };

  return (
    <>
      <div className={tag}>
        <dt className="v-hidden">Links</dt>
        {props.homepage && (
          <dd>
            <A className="btn btn-shine" href={props.homepage} title="Homepage">
              <IconLink {...iconProps} />
            </A>
          </dd>
        )}
        <dd>
          <A
            className="btn btn-shine"
            href={`https://www.themoviedb.org/${props.scope}/${props.id}`}
            title="TMDB"
          >
            <IconTmdbShot {...iconProps} />
          </A>
        </dd>
        {imdb && (
          <dd>
            <A
              className="btn btn-shine"
              href={`https://www.imdb.com/${imdb_path}/${imdb}`}
              title="IMDb"
            >
              <IconIMDB {...iconProps} />
            </A>
          </dd>
        )}
      </div>
      {social.length > 0 && (
        <div className={`${tag} links-social`}>
          <dt className="v-hidden">Social Links</dt>
          {social.map(({ platform, url }) => {
            const Icon = SocialIcons[platform as keyof typeof SocialIcons];
            return (
              <dd key={platform}>
                <A className="btn btn-shine" href={url} title={platform}>
                  <Icon {...iconProps} />
                </A>
              </dd>
            );
          })}
        </div>
      )}
    </>
  );
}
BarLinks.defaultProps = {
  tag: "wi",
};
