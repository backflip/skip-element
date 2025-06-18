# `skip-element` web component

The `<skip-element>` custom element adds skip links before and after its content.

Why? For anyone not using a pointing device it can be cumbersome to navigate past an element with many focus stops. Imagine navigating by keyboard and having to tab past an iframe with many interactive elements. Or a carousel.

Demo: https://backflip.github.io/skip-element/

## Usage

1. Use module via npm:

   Install dependency:

   ```sh
   npm install skip-element
   ```

   Import module:

   ```js
   import "skip-element";
   ```

2. If you are feeling lucky, you can alternatively load it via [jsDelivr CDN](https://www.jsdelivr.com):

   ```html
   <script type="module" src="https://cdn.jsdelivr.net/npm/skip-element@1.0.3"></script>
   ```

   **NOTE**: This should be done for demo purposes only as it is _highly_ insecure to load arbitrary JavaScript into your page.

3. Wrap the content you want to be able to skip with `<skip-element>`:

   ```html
   <skip-element name="iframe">
   	<iframe src="https://example.com" title="Exemplary iframe using example.com"></iframe>
   </skip-element>
   ```

## Advanced usage

## Attributes

- `name`: Element name used in skip link labels, defaults to `"element"` (which is not very descriptive).
- `before`: Before skip link label, defaults to `"Skip forward over {name}"`.
- `after`: After skip link label, defaults to `"Skip backwards over {name}"`.
- `visible`: Whether to show the skip links even when not focused, defaults to `false`.

### Custom element name

By default, the module will automatically register as `skip-element` in the custom element registry. To avoid this, import it with [`?nodefine`](https://www.zachleat.com/web/nodefine/) and register it yourself:

```js
import { SkipElement } from "skip-element?nodefine";

customElements.define("my-skip-element", SkipElement);
```

### Custom styles

See [index.js](https://github.com/backflip/skip-element/blob/main/index.js#L48-L68) for default styles. They can be overriden from outside as everything is happening in light DOM.
