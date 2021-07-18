import { ITvInfo } from "../../types/tv-info";

export default function InfoTV(data: ITvInfo) {
  return (
    <main className="page page-info info-tv">
      <h1>{data.name}</h1>
    </main>
  );
}
