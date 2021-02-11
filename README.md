# cli-bespoke

Parse and validate commandlines. Simple, well-typed and customizable.

No dependencies.


## Usage

To parse any commandline, use `parse()` and pass `Converter` functions for each option.

```ts
type Converter<Input, Output> = (value: Input, sendError: ErrorSender) => Output;
```

The return type of `parse()` is determined by which `Converter` you pass.  
There are several built-in `Converter`s, but you can also pass user-defined ones.


## Example

```ts
import {
  parse,
  flag,
  first,
  converters as cv,
  converterFactories as cvf,
} from "cli-bespoke";

const args = parse({
  // Arguments to parse.
  args: process.argv.slice(2),

  // Specify all options and their `Converter` functions.
  convert: {
    // Error if multiple values.
    _: cv.optionalOne,

    // No values. Parsed as boolean.
    help: flag,

    // Error if either undefined, zero or multiple values.
    outfile: cv.justOne,

    // Split strings, accepting undefined.
    strs: cvf.optional(cvf.split(",")),

    // A complex example including user-defined converter.
    nums: first(cvf.zeroOrMore(cv.int)).then(cvf.map((n) => n + 1)),
  },

  // Option names and their aliases (not required).
  alias: {
    // -h will be parsed as --help
    help: "h",
  },
});
```

The result will be typed as follows:

```ts
const args: {
  _: string | undefined;
  help: boolean;
  outfile: string;
  strs: string[] | undefined;
  nums: number[]
}
```

Details about `convert`:

- Underscore `_` is for parameters that do not belong to any options.
- Use `flag` for options that do not receive values.
- All values are `readonly string[] | undefined` before converting.
- Namespace `converters` provides built-in `Converter`s.
- Namespace `converterFactories` provieds functions that produces `Converter`s.
- You can also use any user-defined converter function.
- Use `first()`/`then()` for chaining multiple `Converter`s.


## Config

You can replace any field of `config`.

```ts
import { config } from "cli-bespoke";

config.onError = (err) => {
  console.error(err);
  process.exit(1);
};
```
