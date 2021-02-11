import {
  parse,
  flag,
  first,
  converters as cv,
  converterFunctions as cvf,
} from "../lib/index.js";

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

const result = parse({
  args,
  convert: {
    foo: flag,
    outfile: first(cv.zeroOrOne).then(cvf.atDefault("dist.js")),
    src: cv.asIs,
  },
  alias: { src: "s" },
});

console.log(result);
