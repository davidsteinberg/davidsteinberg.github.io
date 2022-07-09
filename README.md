# David Steinberg

This is a simple personal site. It lets people:

1. see my head on top of some fun line drawings,
2. read briefly about me/my approach to creating,
3. jump to a handful of my projects, and
4. contact me.

### Bundling

The site's script, `index.js`, is bundled from the TypeScript source in the `ts`
directory using this command:

`deno bundle ts/index.ts index.js`

The `deno.json` file is implicitly required, as it specifies dom-related
libraries to use when bundling.
