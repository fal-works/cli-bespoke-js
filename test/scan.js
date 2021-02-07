import { scan } from "../lib/scan.js";

console.log(
  scan(
    [
      "command",
      "--foo",
      "-a",
      "some value",
      "-s=src.ts",
      "--outdir=dist",
      "--outfile",
      "out.js",
      "--bar",
      "omg",
      "--",
      "-valueWithHyphen",
    ],
    {
      bar: { isFlag: true },
    }
  )
);
