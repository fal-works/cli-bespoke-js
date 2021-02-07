import { parse } from "../lib/index.js";

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

console.log(
  parse(args, {
    outfile: {
      validate: (values) => {
        if (!values) throw "";
        const value = values[0];
        if (!value) throw "";
        return value;
      },
    },
  })
);
