const fs = require("fs");

export default function (pathSuffix: string): string {
  const pathPrefix = "/Users/nicolemccabe/dev/aoc2021-ts/";
  return fs.readFileSync(
    `${pathPrefix}${pathSuffix}`,
    "utf8",
    (err: string, data: string) => {
      if (err) {
        console.error(err);
        return err;
      }
      return data;
    }
  );
}
