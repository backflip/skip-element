# `skip-element` web component

The `<skip-element>` custom elements adds skips links before and after its content.

## Usage

Wrap the content you want to be able to skip with `<skip-element>`:

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
