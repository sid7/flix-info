import { Link } from "react-router-dom";
import cn from "classnames";

export interface ITableItem {
  id: number;
  name: string;
  type: string;
  yr: string;
  labels: { ep_count?: number; label?: string }[];
}

interface ICreditBlock {
  entry: [string, [string, ITableItem[]][]];
  primary: boolean;
}

export default function creditBlock({
  entry: [department, items],
  primary
}: ICreditBlock) {
  return (
    <details className={cn("credit-block", { primary })} open={primary}>
      <summary>{department}</summary>
      <table>
        <tbody>
          {items.map(([yr, item], i) => (
            <tr key={i}>
              <td className="entry-yr">
                <span>{yr}</span>
              </td>
              <td>
                {item.map((entry, j) => (
                  <table key={j}>
                    <tbody>
                      <tr>
                        <td
                          className={cn("entry-credit", {
                            "span-block": entry.labels.length > 1
                          })}>
                          <Link
                            className="link"
                            to={`/${entry.type}/${entry.id}`}>
                            {entry.name}
                          </Link>{" "}
                          {entry.labels.map(({ ep_count, label }, k) => (
                            <span key={k}>
                              {ep_count && `(${ep_count} episodes)`} {label}
                            </span>
                          ))}
                        </td>
                        <td className="entry-type">
                          <span className="badge">{entry.type}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  );
}
creditBlock.defaultProps = {
  primary: false
};
