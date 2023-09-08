# textile.js

_Textile.js_ is a fully featured implementation of Textile parser/converter in JavaScript that runs reasonably fast and avoids outputting broken HTML.

Give it a go in [a live textile web editor](http://borgar.github.com/textile-js/).


## Install

The library is available 

```sh
npm install textile-js
```


## Usage

```js
import { textile } from 'textile-js';

console.log(textile("I am using __textile__."));
```

You may supply a number of options to the converter:

```js
textile("I am using __textile__.", { breaks: false })
```

* `breaks` - Used to disable the default behavior of line-breaking single newlines within blocks.
* `auto_backlink` - Turn this on to have footnotes automatically link back to their references (otherwise enabled by syntax: `fn1^`).
* `glyph_entities` - Allows disabling of processing glyph syntax ([->]) to glyphs (→)
* [...and more](./API.md#textile)

You can also get to the parsed document tree:

```js
const vdom = textile.parse(text);
console.log(vdom);
```

See [API documentation](./API.md) for more detailed descriptions.


## CLI interface included

```
$ textile -o hello.html
hello world
^D
$ cat hello.html
<p>hello world</p>
```

Usage: `textile [-o outputfile] [inputfile]`

If no input file is provided, the program will listen to data on `stdin`.


## License

Copyright © 2012, Borgar Þorsteinsson (MIT License).

See [LICENSE](./LICENSE)
