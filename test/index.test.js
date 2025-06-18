import { expect, test } from "vitest";
import { getByText } from "@testing-library/dom";
import { SkipElement } from "../index.js";

class CustomSkipElement extends SkipElement {}

function createElement(customElementName = "skip-element") {
	const iframe = document.createElement("iframe");

	iframe.title = "Exemplary iframe using https://example.com";
	iframe.src = "https://example.com";

	const element = document.createElement(customElementName);

	element.appendChild(iframe);

	return element;
}

test("inserts skip links", () => {
	const element = createElement();

	document.body.appendChild(element);

	const beforeLink = getByText(element, "Skip forward over element");
	const afterLink = getByText(element, "Skip backwards over element");

	// @ts-ignore Property 'toBeInTheDocument' does not exist on type 'Assertion<HTMLElement>'.
	expect(beforeLink).toBeInTheDocument();

	// @ts-ignore Property 'toBeInTheDocument' does not exist on type 'Assertion<HTMLElement>'.
	expect(afterLink).toBeInTheDocument();
});

test("changes labels via attributes", () => {
	const element = createElement();

	document.body.appendChild(element);

	element.setAttribute("name", "iFrame");
	element.setAttribute("before", "{name} überspringen");
	element.setAttribute("after", "{name} rückwärts überspringen");

	const beforeLink = getByText(element, "iFrame überspringen");
	const afterLink = getByText(element, "iFrame rückwärts überspringen");

	// @ts-ignore Property 'toBeInTheDocument' does not exist on type 'Assertion<HTMLElement>'.
	expect(beforeLink).toBeInTheDocument();

	// @ts-ignore Property 'toBeInTheDocument' does not exist on type 'Assertion<HTMLElement>'.
	expect(afterLink).toBeInTheDocument();
});

test("allows for custom element name", () => {
	customElements.define("custom-skip-element", CustomSkipElement);

	const element = createElement("custom-skip-element");

	document.body.appendChild(element);

	const beforeLink = getByText(element, "Skip forward over element");

	// @ts-ignore Property 'toBeInTheDocument' does not exist on type 'Assertion<HTMLElement>'.
	expect(beforeLink).toBeInTheDocument();
});
