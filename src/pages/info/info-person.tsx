import { IPersonInfo } from "../../types/person-info";

export default function InfoPerson(data: IPersonInfo) {
  return (
    <main className="page page-info info-person">
      <h1>{data.name}</h1>
    </main>
  );
}
