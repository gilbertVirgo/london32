import { test, expect } from "@playwright/test";

test.use({
	viewport: { width: 375, height: 667 }, // mobile viewport
});

test("should scale down text so that no word overflows the container", async ({ page }) => {
	await page.goto("/");

	const container = page.locator(".container").first();
	await expect(container).toBeVisible();

	// Find the outer spans (children of mainTextRef)
	const outerSpans = page.locator(".text-9xl > span, .text-8xl > span, .text-7xl > span, .text-6xl > span");
	const count = await outerSpans.count();
	expect(count).toBeGreaterThan(0);

	const containerBox = await container.boundingBox();
	const containerWidth = containerBox!.width;

	console.log(`Container width: ${containerWidth}`);

	for (let i = 0; i < count; i++) {
		const outer = outerSpans.nth(i);
		const inner = outer.locator("span").first();

		const outerBox = await outer.boundingBox();
		const innerBox = await inner.boundingBox();
		const text = await inner.innerText();

		if (outerBox && innerBox) {
			console.log(`Word "${text}":`);
			console.log(`  Outer: x=${outerBox.x}, width=${outerBox.width}, right=${outerBox.x + outerBox.width}`);
			console.log(`  Inner: x=${innerBox.x}, width=${innerBox.width}, right=${innerBox.x + innerBox.width}`);
			
			// Check if inner span is wider than outer span
			if (innerBox.width > outerBox.width + 1) {
				console.log(`  WARNING: Inner is wider than outer! Cropping detected!`);
			}
		}
	}
});
