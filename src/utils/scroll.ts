import { MouseEvent } from "react";

/**
 * Smoothly scrolls to a target element identified by a hash URL (e.g. "#about"),
 * subtracting the dynamic height of the sticky navigation bar.
 *
 * @param e - The mouse click event.
 * @param href - The target URL/hash.
 */
export const handleSmoothScroll = (
	e: MouseEvent<HTMLAnchorElement>,
	href: string | undefined,
): void => {
	if (href && href.startsWith("#")) {
		e.preventDefault();
		const targetId = href.substring(1);
		const element = document.getElementById(targetId);
		if (element) {
			const navElement = document.querySelector("nav");
			const navHeight = navElement ? navElement.getBoundingClientRect().height : 0;
			const elementPosition = element.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.scrollY - navHeight;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});
		}
	}
};
