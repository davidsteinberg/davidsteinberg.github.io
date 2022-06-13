# Project Hub

This is a simple site that serves as a project hub to share with people. It has
links to the user-facing pages for various projects.

### Color

A `color` button in the top right lets you toggle between a random darker color
background with white text and a white background with random darker color text.

### Bundling

The site's script, `index.js`, is bundled from the TypeScript source in the `ts`
directory using this command:

`deno bundle ts/index.ts index.js`

The `deno.json` file is implicitly required, as it specifies dom-related
libraries to use when bundling.
