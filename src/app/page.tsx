"use client";

import { useState, useEffect } from "react";
import HomeCentralHub from "@/sections/HomeCentralHub";
import HomeNonDenom from "@/sections/HomeNonDenom";
import HomeGodsWord from "@/sections/HomeGodsWord";
import HomeInDev from "@/sections/HomeInDev";
import HomeHero from "@/sections/HomeHero";
import Navigation from "@/sections/Navigation";
import Footer from "@/sections/Footer";
import MailingListModal from "@/sections/MailingListModal";

export default function Home() {
	const [progress, setProgress] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let fontsLoaded = false;
		document.fonts.ready
			.then(() => {
				fontsLoaded = true;
			})
			.catch(() => {
				fontsLoaded = true;
			});

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

		// Periodically measure real DOM progress
		const measureInterval = setInterval(() => {
			if (forceComplete) return;

			const videos = Array.from(document.querySelectorAll("video"));
			const images = Array.from(document.querySelectorAll("img"));

			const expectedVideos = 3;
			const expectedImages = 5;

			let loadedItems = 0;
			let totalItems =
				Math.max(expectedVideos, videos.length) +
				Math.max(expectedImages, images.length) +
				1; // +1 for fonts

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
				videos.length >= expectedVideos &&
				videos.every((v) => v.readyState >= 3);
			const allImagesLoaded =
				images.length >= expectedImages &&
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
					setTimeout(() => setIsLoading(false), 500);
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
	}, []);

	if (isLoading) {
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

	return (
		<main className="flex flex-col bg-brand-charcoal">
			<Navigation />
			<HomeHero />
			<HomeCentralHub />
			<HomeNonDenom />
			<HomeGodsWord />
			<HomeInDev />
			<Footer />
			<MailingListModal />
		</main>
	);
}
