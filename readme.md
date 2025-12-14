# hashshare

[![Lint](https://github.com/jncraton/hashshare/actions/workflows/lint.yml/badge.svg)](https://github.com/jncraton/hashshare/actions/workflows/lint.yml)
[![Test](https://github.com/jncraton/hashshare/actions/workflows/test.yml/badge.svg)](https://github.com/jncraton/hashshare/actions/workflows/test.yml)
[![Deploy](https://github.com/jncraton/hashshare/actions/workflows/deploy.yml/badge.svg)](https://github.com/jncraton/hashshare/actions/workflows/deploy.yml)

A JS microlibrary to allow simple local-first apps to share state via URL hashes

## Example

The following implements a simple paste-bin like application (see [example.html](example.html)):

```html
<textarea id="text" hash-share></textarea>
```

This is example can also be [used live](https://jncraton.github.io/hashshare/example.html).

## Data Storage

### URL Hash

Data is stored in the [URL hash](https://en.wikipedia.org/wiki/URI_fragment).

The data is currently stored in the following format.

```json
{
  "id1": "value1",
  "id2": "value2",
  "id3": "value3"
}
```

This JSON string is then compressed using `deflate-raw` from [CompressionStream](https://developer.mozilla.org/en-US/docs/Web/API/CompressionStream) and base64 encoded. A `;` is prepended to the data to provide some indication of its format. Bcause the JSON string will always be in enclosed in `{` and `}`, these are optional to save two bytes.
