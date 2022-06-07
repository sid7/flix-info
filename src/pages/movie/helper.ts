import type { ICrew } from "../../types/movie/parts";
import type { ISpokenLang } from "../../types/common";

const crewLst = [
  "Characters",
  "Director",
  "Novel",
  "Story",
  "Screenplay",
  "Writer",
];

export interface ICredit {
  name: string;
  id: number;
  job: string[];
  credits: Omit<ICrew, "name" | "id" | "job">[];
}
export function cherryPickCrew(crew: ICrew[]) {
  const rtn: { [name: string]: ICredit } = {};
  const filterCrew = crew.filter((c) => crewLst.includes(c.job));

  for (const { name, id, job, ...credits } of filterCrew) {
    if (rtn[name]) {
      rtn[name].job.push(job);
      rtn[name].credits.push(credits);
    } else {
      rtn[name] = {
        name,
        id,
        job: [job],
        credits: [credits],
      };
    }
  }
  return Object.entries(rtn);
}

export const langName = new Intl.DisplayNames(["en"], {
  type: "language",
});
