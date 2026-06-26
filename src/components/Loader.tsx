"use client";

import { useState, useEffect } from "react";

interface LoaderProps {
	onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		let fontsLoaded = false;
		if (typeof document !== "undefined" && document.fonts) {
			document.fonts.ready
				.then(() => {
					fontsLoaded = true;
				})
				.catch(() => {
					fontsLoaded = true;
				});
		} else {
			fontsLoaded = true;
		}

		let targetProgress = 15;
		let forceComplete = false;

		// Bypass loader in automated test environments to prevent delays and test timeouts
		if (typeof window !== "undefined" && window.navigator.webdriver) {
			forceComplete = true;
			targetProgress = 100;
		}

		// Safety timeout: 12 seconds max loading time
		const safetyTimeout = setTimeout(() => {
			forceComplete = true;
			targetProgress = 100;
		}, 12000);

		// Periodically measure real DOM progress for above-the-fold elements
		const measureInterval = setInterval(() => {
			if (forceComplete) return;

			// We only want to measure and wait for above-the-fold (critical) assets
			// to avoid blocking on lazy-loaded below-the-fold images and videos.
			const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 800;

			const videos = Array.from(document.querySelectorAll("video")).filter((v) => {
				const rect = v.getBoundingClientRect();
				return rect.top < viewportHeight;
			});

			const images = Array.from(document.querySelectorAll("img")).filter((img) => {
				const rect = img.getBoundingClientRect();
				return rect.top < viewportHeight;
			});

			// If no critical elements are found yet, we assume minimum expected ones
			const expectedVideos = Math.max(1, videos.length);
			const expectedImages = Math.max(1, images.length);

			let loadedItems = 0;
			let totalItems = expectedVideos + expectedImages + 1; // +1 for fonts

			if (fontsLoaded) loadedItems++;

			images.forEach((img) => {
				if (img.complete && img.naturalWidth > 0) {
					loadedItems++;
				}
			});

			videos.forEach((video) => {
				if (video.readyState >= 3) {
					loadedItems++;
				}
			});

			const calculatedPercent = Math.round(
				(loadedItems / totalItems) * 100,
			);
			
			// Target progress can only increase, and maxes out at 99% until fully loaded
			const newTarget = Math.min(99, calculatedPercent);
			if (newTarget > targetProgress) {
				targetProgress = newTarget;
			}

			// If everything is truly loaded, target is 100%
			const allVideosLoaded =
				videos.length > 0 &&
				videos.every((v) => v.readyState >= 3);
			const allImagesLoaded =
				images.length > 0 &&
				images.every((i) => i.complete && i.naturalWidth > 0);
				
			if (fontsLoaded && allVideosLoaded && allImagesLoaded) {
				targetProgress = 100;
			}
		}, 100);

		// Smoothly animate the progress state towards targetProgress
		const timer = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(timer);
					clearInterval(measureInterval);
					setTimeout(onComplete, 500);
					return 100;
				}

				if (prev < targetProgress) {
					return prev + 1;
				}

				// Slow crawl to 95% if not loaded yet
				if (prev < 95 && !forceComplete) {
					return prev + 0.1;
				}

				return prev;
			});
		}, 20);

		return () => {
			clearTimeout(safetyTimeout);
			clearInterval(measureInterval);
			clearInterval(timer);
		};
	}, [onComplete]);

	const percentStr = String(Math.floor(progress));
	const digits = percentStr.split("");

	return (
		<div className="fixed inset-0 z-[5000] flex flex-col items-center justify-center bg-brand-charcoal text-brand-platinum">
			<div className="flex flex-row items-center font-title text-5xl md:text-7xl tracking-tight select-none tabular-nums">
				{digits.map((digit, index) => (
					<span
						key={`${index}-${digit}`}
						className="inline-block"
					>
						{digit}
					</span>
				))}
				<span className="inline-block font-sans text-brand-yellow font-light ml-2">
					%
				</span>
			</div>
			<div className="w-48 h-1 bg-brand-platinum/25 mt-4">
				<div
					className="h-full bg-brand-yellow transition-all duration-100 ease-out"
					style={{ width: `${progress}%` }}
				/>
			</div>
		</div>
	);
}
