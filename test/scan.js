import { scan } from "../lib/scan.js";

const result = scan(
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
  (name) => name === "bar",
  (name) => name
);

console.log(result);
