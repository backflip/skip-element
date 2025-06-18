export class SkipElement extends HTMLElement {
	#isConnected = false;

	/** @type {string} */
	id = "";
	/** @type {HTMLAnchorElement | undefined} */
	beforeLink;
	/** @type {HTMLAnchorElement | undefined} */
	afterLink;

	static observedAttributes = ["name", "before", "after", "visible"];

	constructor() {
		super();

		this.id = crypto.randomUUID();
	}

	connectedCallback() {
		this.#isConnected = true;

		this.update();
	}

	render() {
		const idBeforeLink = `${this.id}-before`;
		const idAfterLink = `${this.id}-after`;

		// Skip link before element
		this.beforeLink = document.createElement("a");
		this.beforeLink.href = `#${idAfterLink}`;
		this.beforeLink.setAttribute("id", idBeforeLink);
		this.beforeLink.classList.add("skip-element-link");

		this.insertAdjacentElement("afterbegin", this.beforeLink);

		// Skip link after element
		this.afterLink = document.createElement("a");
		this.afterLink.href = `#${idBeforeLink}`;
		this.afterLink.setAttribute("id", idAfterLink);
		this.afterLink.classList.add("skip-element-link");

		this.insertAdjacentElement("beforeend", this.afterLink);

		// Styles (using minimal specificity to simplify overrides)
		const style = document.createElement("style");

		style.textContent = `
			skip-element:where(:not(.skip-element--visible)) a:where(.skip-element-link) {
				position: absolute;
				background: white;
			}

			skip-element:where(:not(.skip-element--visible)) a:where(.skip-element-link:not(:focus):not(:active)) {
				clip: rect(0 0 0 0); 
				clip-path: inset(50%);
				height: 1px;
				overflow: hidden;
				position: absolute;
				white-space: nowrap; 
				width: 1px;
			}

			skip-element:where(.skip-element--visible) {
				display: flex;
				flex-direction: column;
				align-items: start;
			}
    `;

		this.appendChild(style);
	}

	update() {
		if (!this.#isConnected) {
			return;
		}

		if (!this.beforeLink) {
			this.render();
		}

		// Skip link labels
		const elementName = this.getAttribute("name") || "element";
		const beforeLinkLabel = this.getAttribute("before") || `Skip forward over {name}`;
		const afterLinkLabel = this.getAttribute("after") || `Skip backwards over {name}`;

		// @ts-expect-error possibly undefined
		this.beforeLink.textContent = beforeLinkLabel.replace("{name}", elementName);
		// @ts-expect-error possibly undefined
		this.afterLink.textContent = afterLinkLabel.replace("{name}", elementName);

		// Skip link visibility
		const visible = ![null, "false"].includes(this.getAttribute("visible"));

		this.classList.toggle("skip-element--visible", visible);
	}

	attributeChangedCallback() {
		this.update();
	}
}

// https://www.zachleat.com/web/nodefine/
if (!new URL(import.meta.url).searchParams.has("nodefine")) {
	customElements.define("skip-element", SkipElement);
}
