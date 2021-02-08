import { parse, to, convert } from "../lib/index.js";

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

const { flag, zeroOrOne, atDefault } = convert;

console.log(
  parse(args, {
    foo: {
      convert: to(flag),
    },
    outfile: {
      convert: to(zeroOrOne).then(atDefault("dist.js")),
    },
  })
);
