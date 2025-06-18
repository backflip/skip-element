# `skip-element` web component

The `<skip-element>` custom element adds skips links before and after its content.

## Usage

1. Install dependency:

   ```sh
   npm install skip-element
   ```

2. Import module:

   ```js
   import "skip-element";
   ```

   This will automatically register `skip-element` in the custom element registry. To avoid this, import the element with [`?nodefine`](https://www.zachleat.com/web/nodefine/) and register it yourself:

   ```js
   import { SkipElement } from "skip-element?nodefine";

   customElements.define("my-skip-element", SkipElement);
   ```

3. Wrap the content you want to be able to skip with `<skip-element>`:

   ```html
   <skip-element name="iframe">
   	<iframe src="https://example.com" title="Exemplary iframe using example.com"></iframe>
   </skip-element>
   ```

## Attributes

- `name`: Element name used in skip link labels, defaults to `"element"` (which is not very descriptive).
- `before`: Before skip link label, defaults to `"Skip forward over {name}"`.
- `after`: After skip link label, defaults to `"Skip backwards over {name}"`.
- `visible`: Whether to show the skip links even when not focused, defaults to `false`.
