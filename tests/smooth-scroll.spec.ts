import { test, expect } from "@playwright/test";

test.describe("Smooth scrolling with navigation bar height offset", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	test("should scroll to #about and align below the sticky navigation bar", async ({ page }) => {
		// Ensure page is initially at the top
		const initialScrollY = await page.evaluate(() => window.scrollY);
		expect(initialScrollY).toBe(0);

		// Click the 'About' link in the navigation
		const aboutLink = page.locator('nav a:has-text("About")');
		await aboutLink.click();

		// Wait for scroll behavior to settle
		await page.waitForTimeout(1500);

		// Measure positions
		const scrollData = await page.evaluate(() => {
			const nav = document.querySelector("nav");
			const target = document.getElementById("about");
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
			console.log(`Scroll Y after clicking About: ${scrollData.scrollY}`);
			console.log(`Nav bottom: ${scrollData.navBottom}, Target top: ${scrollData.targetTop}`);
			// Target top should align with the bottom of the sticky navigation bar (difference should be very small/close to 0)
			expect(Math.abs(scrollData.targetTop - scrollData.navBottom)).toBeLessThan(2);
		}
	});

	test("should scroll to #core-convictions and align below the sticky navigation bar", async ({ page }) => {
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
			console.log(`Scroll Y after clicking Core Convictions: ${scrollData.scrollY}`);
			console.log(`Nav bottom: ${scrollData.navBottom}, Target top: ${scrollData.targetTop}`);
			expect(Math.abs(scrollData.targetTop - scrollData.navBottom)).toBeLessThan(2);
		}
	});

	test("should scroll to #stay-updated using the Stay Updated button", async ({ page }) => {
		// Click the 'Stay Updated' button in the navigation
		const button = page.locator('nav a:has-text("Stay Updated")');
		await button.click();

		// Wait for scroll behavior to settle
		await page.waitForTimeout(1500);

		// Measure positions
		const scrollData = await page.evaluate(() => {
			const nav = document.querySelector("nav");
			const target = document.getElementById("stay-updated");
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
			console.log(`Scroll Y after clicking Stay Updated button: ${scrollData.scrollY}`);
			console.log(`Nav bottom: ${scrollData.navBottom}, Target top: ${scrollData.targetTop}`);
			expect(Math.abs(scrollData.targetTop - scrollData.navBottom)).toBeLessThan(2);
		}
	});

	test("should scroll to #central-hub using the Hero Find out more button", async ({ page }) => {
		// Click the 'Find out more' button in the Hero section
		const button = page.locator('main a:has-text("Find out more")');
		await button.click();

		// Wait for scroll behavior to settle
		await page.waitForTimeout(1500);

		// Measure positions
		const scrollData = await page.evaluate(() => {
			const nav = document.querySelector("nav");
			const target = document.getElementById("central-hub");
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
			console.log(`Scroll Y after clicking Find out more: ${scrollData.scrollY}`);
			console.log(`Nav bottom: ${scrollData.navBottom}, Target top: ${scrollData.targetTop}`);
			expect(Math.abs(scrollData.targetTop - scrollData.navBottom)).toBeLessThan(2);
		}
	});

	test("should scroll to #about and align below sticky navigation bar when clicking footer About link", async ({ page }) => {
		// Click the 'About' link in the footer
		const aboutLink = page.locator('footer a:has-text("About")');
		await aboutLink.click();

		// Wait for scroll behavior to settle
		await page.waitForTimeout(1500);

		// Measure positions
		const scrollData = await page.evaluate(() => {
			const nav = document.querySelector("nav");
			const target = document.getElementById("about");
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
			console.log(`Scroll Y after clicking footer About: ${scrollData.scrollY}`);
			console.log(`Nav bottom: ${scrollData.navBottom}, Target top: ${scrollData.targetTop}`);
			expect(Math.abs(scrollData.targetTop - scrollData.navBottom)).toBeLessThan(2);
		}
	});

	test("should scroll to #core-convictions and align below sticky navigation bar when clicking footer Core Convictions link", async ({ page }) => {
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
			console.log(`Scroll Y after clicking footer Core Convictions: ${scrollData.scrollY}`);
			console.log(`Nav bottom: ${scrollData.navBottom}, Target top: ${scrollData.targetTop}`);
			expect(Math.abs(scrollData.targetTop - scrollData.navBottom)).toBeLessThan(2);
		}
	});

	test("should scroll to #stay-updated and align below sticky navigation bar when clicking footer Stay Updated link", async ({ page }) => {
		// Click the 'Stay Updated' link in the footer
		const link = page.locator('footer a:has-text("Stay Updated")');
		await link.click();

		// Wait for scroll behavior to settle
		await page.waitForTimeout(1500);

		// Measure positions
		const scrollData = await page.evaluate(() => {
			const nav = document.querySelector("nav");
			const target = document.getElementById("stay-updated");
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
			console.log(`Scroll Y after clicking footer Stay Updated: ${scrollData.scrollY}`);
			console.log(`Nav bottom: ${scrollData.navBottom}, Target top: ${scrollData.targetTop}`);
			expect(Math.abs(scrollData.targetTop - scrollData.navBottom)).toBeLessThan(2);
		}
	});
});
