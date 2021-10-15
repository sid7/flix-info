const config = {
  lang: {
    region: "en",
  },
};

class RegionName {
  private __Intl = new (Intl as any).DisplayNames([config.lang.region], {
    type: "region",
  });
  format(str: string, widthcode = false): string {
    const region = this.__Intl.of(str);
    if (!widthcode) {
      return region;
    }
    return `${region} (${str})`;
  }
}
export const regionName = new RegionName();

class LangName {
  private __Intl = new (Intl as any).DisplayNames(["en"], { type: "language" });

  format(str: string, withCode = false) {
    const lang = this.__Intl.of(str);
    if (!withCode) {
      return lang;
    }
    return `${lang} (${str})`;
  }
}
export const langName = new LangName();
