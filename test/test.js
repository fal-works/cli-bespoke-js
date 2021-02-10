import { parse, first, flag, asIs, convert } from "../lib/index.js";

const args = [
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
];

const { zeroOrOne, atDefault } = convert;

const result = parse(
  args,
  {
    foo: flag,
    outfile: first(zeroOrOne).then(atDefault("dist.js")),
    src: asIs,
  },
  { src: "s" }
);

console.log(result);
