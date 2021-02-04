import { scan } from "../lib/scan.js";

console.log(
  scan(
    ["command", "--foo", "-f", "--outfile", "a.ts", "--bar", "omg"],
    (name) => name === "outfile"
  )
);
