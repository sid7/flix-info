import { Link } from "react-router-dom";
import { Image } from "react-feather";
import cn from "classnames";
import type { IData } from "../hooks/fetch-data";

interface IScroller {
  items: IData;
}
export default function Scroller({ items }: IScroller) {
  return (
    <ul className="scroller">
      {items.map((item) => {
        const img = item.img.poster || item.img.profile;
        return (
          <li
            className={`media-${item.media_type}`}
            data-id={item.id}
            key={item.id}>
            <Link to={`/${item.media_type}/${item.id}`}>
              <figure className={cn({ "no-img": !img })}>
                {img ? (
                  <picture>
                    <img
                      loading="lazy"
                      src={img}
                      alt={`${item.label}'s poster`}
                    />
                  </picture>
                ) : (
                  <Image strokeWidth={0.5} />
                )}
                <figcaption>{item.label}</figcaption>
              </figure>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
