const config = {
  lang: {
    date: "en",
    money: "en",
  },
};

class PrettyDate {
  private __Intl = new Intl.DateTimeFormat(config.lang.date, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    weekday: "short",
  });
  format(str: string | null) {
    if (typeof str !== "string") {
      return "—";
    }

    const d = new Date(str);
    return this.__Intl.format(d);
  }
}
export const prettyDate = new PrettyDate();

class PrettyMoney {
  private __Intl = new Intl.NumberFormat(config.lang.money, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    currencyDisplay: "symbol",
  });

  format(money: number | null) {
    if (!money) {
      return "—";
    }

    return this.__Intl.format(money);
  }
}
export const prettyMoney = new PrettyMoney();

export function prettyTime(time: number | null) {
  if (!time) {
    return "—";
  }

  return time <= 60 ? `${time} min` : `${Math.floor(time / 60)}h ${time % 60}m`;
}
