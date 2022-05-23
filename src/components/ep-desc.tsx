import { prettyDate } from "../scripts/utils";
import type { IEpInfo } from "../types/tv/parts";

interface IEpDesc {
  data: IEpInfo;
  label: string;
}

export default function EpDesc({ data, label }: IEpDesc) {
  const tag = `S${data.season_number}.E${data.episode_number}`;
  const airDate = prettyDate.format(data.air_date);

  return (
    <div>
      <dt>
        {tag} {data.name} <span className="badge">{label} Episode</span>
      </dt>
      <dd>{data.overview || "—"}</dd>
      <dd>{airDate}</dd>
    </div>
  );
}
