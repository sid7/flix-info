import type { ICast, ICrew } from "../../types/person/parts";
import type { ITableItem } from "../../components/credit-block";

type IAnyCredit = Partial<ICast> & Partial<ICrew>;
interface ICombinedCredits {
  cast: ICast[];
  crew: ICrew[];
}

export function processCreditsForTable(
  credits: ICombinedCredits,
  primary: string
) {
  const cast = processCreditsByDepartments(credits.cast, true);
  const crew = processCreditsByDepartments(credits.crew);

  if (primary === "Acting") {
    return {
      primary: cast[0],
      rest: crew,
    };
  }

  return {
    primary: crew.filter(([c]) => c === primary)[0],
    rest: [...cast, ...crew.filter(([c]) => c !== primary)],
  };
}

function tableItemInOrder(items: ITableItem[]) {
  const year: { [yr: string]: ITableItem[] } = {};

  for (const item of items) {
    if (item.yr in year) {
      year[item.yr].push(item);
    } else {
      year[item.yr] = [item];
    }
  }

  return Object.entries(year).sort(
    ([a], [b]) => (Number(b) || Infinity) - (Number(a) || Infinity)
  );
}

function formateCredits(items: IAnyCredit[], isCast: boolean) {
  const data: { [name: string]: ITableItem } = {};

  for (const item of items) {
    const yr = (item.first_air_date || item.release_date)?.split("-")[0] || "—";
    const name = item.name || item.title!;
    const entry = {
      ep_count: item.episode_count,
      label: isCast
        ? item.character && `as ${item.character}`
        : item.job && `... ${item.job}`,
    };

    if (name in data) {
      data[name].labels.push(entry);
    } else {
      data[name] = {
        name,
        yr,
        id: item.id!,
        type: item.media_type!,
        labels: [entry],
      };
    }
  }

  return Object.values(data);
}

function formateDepartment(credits: { [department: string]: IAnyCredit[] }) {
  const data: { [department: string]: [string, ITableItem[]][] } = {};

  for (const department in credits) {
    const credit = credits[department];
    const formatedCredit = formateCredits(credit, department === "Acting");
    data[department] = tableItemInOrder(formatedCredit);
  }

  return Object.entries(data);
}

function processCreditsByDepartments(credits: IAnyCredit[], isCast = false) {
  const data: { [department: string]: IAnyCredit[] } = {};

  for (const credit of credits) {
    const department = isCast ? "Acting" : credit.department!;

    if (department in data) {
      data[department].push(credit);
    } else {
      data[department] = [credit];
    }
  }
  return formateDepartment(data);
}
