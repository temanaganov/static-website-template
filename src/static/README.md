1. `favicon.ico` is for legacy browsers (resolution: `32x32`)
2. `icon.svg` with light/dark versions for modern browsers. On large sizes, it is more efficient than raster images. SVG is an XML format and can contain a `<style>` tag that describes CSS. As any CSS, it can contain media queries like `@media (prefers-color-scheme: dark)`. This will allow you to toggle the same icon between light and dark system themes.
3. `apple-touch-icon.png` is an image that Apple devices will use if you add the webpage as a shortcut to your home screen on an iPhone or iPad. iPads since iOS 8+ require a `180×180` resolution. Other devices will downscale the image.
4. `mask-icon.svg` is optional icon type. Safari used to have a separate requirement to display an icon in pinned tabs. However, since Safari 12, we can use a regular favicon for pinned tabs. Even apple.com doesn’t use the mask-icon anymore. It should be done with only one color and placed on a transparent background. Browser adds color from attribute. The SVG file must be a single layer and the `viewBox` attribute must be set to `"0 0 16 16"`.