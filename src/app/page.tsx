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
		let targetProgress = 15; // Initial loading budget

		const monitorMedia = () => {
			const images = Array.from(document.querySelectorAll("img"));
			const videos = Array.from(document.querySelectorAll("video"));

			const totalMedia = images.length + videos.length;
			if (totalMedia === 0) {
				targetProgress = 100;
				return;
			}

			let loadedCount = 0;

			const updateCount = () => {
				loadedCount++;
				const percent = Math.min(
					100,
					Math.round(15 + (loadedCount / totalMedia) * 85),
				);
				if (percent > targetProgress) {
					targetProgress = percent;
				}
			};

			images.forEach((img) => {
				if (img.complete) {
					updateCount();
				} else {
					img.addEventListener("load", updateCount, { once: true });
					img.addEventListener("error", updateCount, { once: true });
				}
			});

			videos.forEach((video) => {
				if (video.readyState >= 3) {
					updateCount();
				} else {
					video.addEventListener("canplaythrough", updateCount, {
						once: true,
					});
					video.addEventListener("error", updateCount, { once: true });
				}
			});
		};

		// Run monitor immediately and observe DOM updates
		monitorMedia();

		const observer = new MutationObserver(() => {
			monitorMedia();
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});

		// Animate the visible progress state smoothly to match target progress
		const timer = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(timer);
					observer.disconnect();
					setTimeout(() => setIsLoading(false), 500);
					return 100;
				}
				if (prev < targetProgress) {
					return prev + 1;
				}
				if (prev < 99) {
					return prev + 0.2;
				}
				return prev;
			});
		}, 20);

		return () => {
			clearInterval(timer);
			observer.disconnect();
		};
	}, []);

	if (isLoading) {
		const percentStr = String(Math.floor(progress));
		const digits = percentStr.split("");

		return (
			<div className="fixed inset-0 z-[5000] flex flex-col items-center justify-center bg-brand-charcoal text-brand-platinum">
				<div className="flex flex-row items-center font-title text-8xl md:text-9xl tracking-tight select-none tabular-nums">
					{digits.map((digit, index) => (
						<span
							key={`${index}-${digit}`}
							className="inline-block overflow-hidden relative h-[1.2em] w-[0.65em] text-center"
						>
							<span className="inline-block absolute left-0 right-0 loader-digit-slide-up">
								{digit}
							</span>
						</span>
					))}
					<span className="inline-block font-sans text-brand-yellow font-light ml-2">
						%
					</span>
				</div>
				<style jsx global>{`
					@keyframes loaderDigitSlideUp {
						from {
							transform: translateY(105%);
						}
						to {
							transform: translateY(0);
						}
					}
					.loader-digit-slide-up {
						animation: loaderDigitSlideUp 0.4s
							cubic-bezier(0.16, 1, 0.3, 1) forwards;
					}
				`}</style>
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
