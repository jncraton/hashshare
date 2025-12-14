# hashshare

[![Lint](https://github.com/jncraton/hashshare/actions/workflows/lint.yml/badge.svg)](https://github.com/jncraton/hashshare/actions/workflows/lint.yml)
[![Test](https://github.com/jncraton/hashshare/actions/workflows/test.yml/badge.svg)](https://github.com/jncraton/hashshare/actions/workflows/test.yml)

A JS microlibrary to allow simple local-first apps to be shared via URL hashes

## Example

The following implements a simple paste-bin like application:

```html
<textarea id="text" hashshare></textarea>
```

## Data Storage

### URL Hash

Data is stored in the [URL hash](https://en.wikipedia.org/wiki/URI_fragment).
