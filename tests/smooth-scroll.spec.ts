import { test, expect } from "@playwright/test";

test.describe("Smooth scrolling with navigation bar height offset", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	test("should scroll to #vision and align below the sticky navigation bar", async ({
		page,
	}) => {
		// Ensure page is initially at the top
		const initialScrollY = await page.evaluate(() => window.scrollY);
		expect(initialScrollY).toBe(0);

		// Click the 'Vision' link in the navigation
		const visionLink = page.locator('nav a:has-text("Vision")');
		await visionLink.click();

		// Wait for scroll behavior to settle
		await page.waitForTimeout(1500);

		// Measure positions
		const scrollData = await page.evaluate(() => {
			const nav = document.querySelector("nav");
			const target = document.getElementById("vision");
			if (!nav || !target) return null;

			const navRect = nav.getBoundingClientRect();
			const targetRect = target.getBoundingClientRect();

			return {
				navBottom: navRect.bottom,
				targetTop: targetRect.top,
				scrollY: window.scrollY,
			};
		});

		expect(scrollData).not.toBeNull();
		if (scrollData) {
			console.log(`Scroll Y after clicking Vision: ${scrollData.scrollY}`);
			console.log(
				`Nav bottom: ${scrollData.navBottom}, Target top: ${scrollData.targetTop}`,
			);
			// Target top should align with the bottom of the sticky navigation bar (difference should be very small/close to 0)
			expect(
				Math.abs(scrollData.targetTop - scrollData.navBottom),
			).toBeLessThan(2);
		}
	});

	test("should scroll to #core-convictions and align below the sticky navigation bar", async ({
		page,
	}) => {
		// Click the 'Core Convictions' link in the navigation
		const link = page.locator('nav a:has-text("Core Convictions")');
		await link.click();

		// Wait for scroll behavior to settle
		await page.waitForTimeout(1500);

		// Measure positions
		const scrollData = await page.evaluate(() => {
			const nav = document.querySelector("nav");
			const target = document.getElementById("core-convictions");
			if (!nav || !target) return null;

			const navRect = nav.getBoundingClientRect();
			const targetRect = target.getBoundingClientRect();

			return {
				navBottom: navRect.bottom,
				targetTop: targetRect.top,
				scrollY: window.scrollY,
			};
		});

		expect(scrollData).not.toBeNull();
		if (scrollData) {
			console.log(
				`Scroll Y after clicking Core Convictions: ${scrollData.scrollY}`,
			);
			console.log(
				`Nav bottom: ${scrollData.navBottom}, Target top: ${scrollData.targetTop}`,
			);
			expect(
				Math.abs(scrollData.targetTop - scrollData.navBottom),
			).toBeLessThan(2);
		}
	});

	test("should open the mailing list modal using the Stay Updated button in navigation", async ({
		page,
	}) => {
		// Ensure the modal dialog starts closed (not visible)
		const dialog = page.locator("dialog");
		await expect(dialog).not.toBeVisible();

		// Click the 'Stay Updated' button in the navigation
		const button = page.locator('nav a:has-text("Stay Updated")');
		await button.click();

		// Verify the modal dialog is now visible
		await expect(dialog).toBeVisible();

		// Click close button inside dialog to close it
		const closeButton = dialog.locator('button[aria-label="Close dialog"]');
		await closeButton.click();

		// Verify the modal dialog is closed
		await expect(dialog).not.toBeVisible();
	});

	test("should scroll to #vision using the Hero Find out more button", async ({
		page,
	}) => {
		// Click the 'Find out more' button in the Hero section
		const button = page.locator('main a:has-text("Find out more")');
		await button.click();

		// Wait for scroll behavior to settle
		await page.waitForTimeout(1500);

		// Measure positions
		const scrollData = await page.evaluate(() => {
			const nav = document.querySelector("nav");
			const target = document.getElementById("vision");
			if (!nav || !target) return null;

			const navRect = nav.getBoundingClientRect();
			const targetRect = target.getBoundingClientRect();

			return {
				navBottom: navRect.bottom,
				targetTop: targetRect.top,
				scrollY: window.scrollY,
			};
		});

		expect(scrollData).not.toBeNull();
		if (scrollData) {
			console.log(
				`Scroll Y after clicking Find out more: ${scrollData.scrollY}`,
			);
			console.log(
				`Nav bottom: ${scrollData.navBottom}, Target top: ${scrollData.targetTop}`,
			);
			expect(
				Math.abs(scrollData.targetTop - scrollData.navBottom),
			).toBeLessThan(2);
		}
	});

	test("should scroll to #vision and align below sticky navigation bar when clicking footer Vision link", async ({
		page,
	}) => {
		// Click the 'Vision' link in the footer
		const visionLink = page.locator('footer a:has-text("Vision")');
		await visionLink.click();

		// Wait for scroll behavior to settle
		await page.waitForTimeout(1500);

		// Measure positions
		const scrollData = await page.evaluate(() => {
			const nav = document.querySelector("nav");
			const target = document.getElementById("vision");
			if (!nav || !target) return null;

			const navRect = nav.getBoundingClientRect();
			const targetRect = target.getBoundingClientRect();

			return {
				navBottom: navRect.bottom,
				targetTop: targetRect.top,
				scrollY: window.scrollY,
			};
		});

		expect(scrollData).not.toBeNull();
		if (scrollData) {
			console.log(
				`Scroll Y after clicking footer Vision: ${scrollData.scrollY}`,
			);
			console.log(
				`Nav bottom: ${scrollData.navBottom}, Target top: ${scrollData.targetTop}`,
			);
			expect(
				Math.abs(scrollData.targetTop - scrollData.navBottom),
			).toBeLessThan(2);
		}
	});

	test("should scroll to #core-convictions and align below sticky navigation bar when clicking footer Core Convictions link", async ({
		page,
	}) => {
		// Click the 'Core Convictions' link in the footer
		const link = page.locator('footer a:has-text("Core Convictions")');
		await link.click();

		// Wait for scroll behavior to settle
		await page.waitForTimeout(1500);

		// Measure positions
		const scrollData = await page.evaluate(() => {
			const nav = document.querySelector("nav");
			const target = document.getElementById("core-convictions");
			if (!nav || !target) return null;

			const navRect = nav.getBoundingClientRect();
			const targetRect = target.getBoundingClientRect();

			return {
				navBottom: navRect.bottom,
				targetTop: targetRect.top,
				scrollY: window.scrollY,
			};
		});

		expect(scrollData).not.toBeNull();
		if (scrollData) {
			console.log(
				`Scroll Y after clicking footer Core Convictions: ${scrollData.scrollY}`,
			);
			console.log(
				`Nav bottom: ${scrollData.navBottom}, Target top: ${scrollData.targetTop}`,
			);
			expect(
				Math.abs(scrollData.targetTop - scrollData.navBottom),
			).toBeLessThan(2);
		}
	});

	test("should open the mailing list modal when clicking Stay Updated button in HomeInDev section", async ({
		page,
	}) => {
		// Ensure the modal dialog starts closed
		const dialog = page.locator("dialog");
		await expect(dialog).not.toBeVisible();

		// Click the 'Stay Updated' button in the HomeInDev section
		const button = page.locator('#in-dev + div a:has-text("Stay Updated")');
		await button.click();

		// Verify the modal dialog is now visible
		await expect(dialog).toBeVisible();
	});

	test("should open the mailing list modal when clicking footer Stay Updated link", async ({
		page,
	}) => {
		// Ensure the modal dialog starts closed
		const dialog = page.locator("dialog");
		await expect(dialog).not.toBeVisible();

		// Click the 'Stay Updated' link in the footer
		const link = page.locator('footer a:has-text("Stay Updated")');
		await link.click();

		// Verify the modal dialog is now visible
		await expect(dialog).toBeVisible();
	});
});
