"use client";

import { useEffect, useRef, useState } from "react";

const phrases = ["Think Church", "Think London", "Think London 32"];

const HomeHero = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const mainTextRef = useRef<HTMLHeadingElement | null>(null);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % phrases.length);
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const measureAndScale = () => {
			const container = containerRef.current;
			const mainText = mainTextRef.current;
			if (!container || !mainText) return;

			// Reset font size and line height to measure true base layout dimensions
			mainText.style.fontSize = "";
			mainText.style.lineHeight = "";

			const computedStyle = window.getComputedStyle(container);
			const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
			const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
			const availableWidth = container.clientWidth - paddingLeft - paddingRight;

			let maxWordWidth = 0;
			const outerSpans = mainText.children;
			for (let i = 0; i < outerSpans.length; i++) {
				const child = outerSpans[i] as HTMLElement;
				const innerSpan = child.firstElementChild as HTMLElement;
				const wordWidth = innerSpan ? innerSpan.getBoundingClientRect().width : child.getBoundingClientRect().width;
				if (wordWidth > maxWordWidth) {
					maxWordWidth = wordWidth;
				}
			}

			if (maxWordWidth > availableWidth && availableWidth > 0) {
				const scaleFactor = availableWidth / maxWordWidth;
				const mainTextStyle = window.getComputedStyle(mainText);
				const defaultFontSize = parseFloat(mainTextStyle.fontSize) || 128;

				mainText.style.fontSize = `${defaultFontSize * scaleFactor}px`;
				mainText.style.lineHeight = `${defaultFontSize * scaleFactor * 0.875}px`;
			} else {
				mainText.style.fontSize = "";
				mainText.style.lineHeight = "";
			}
		};

		measureAndScale();

		window.addEventListener("resize", measureAndScale);
		if (typeof document !== "undefined" && document.fonts) {
			document.fonts.ready.then(measureAndScale);
		}

		return () => {
			window.removeEventListener("resize", measureAndScale);
		};
	}, [currentIndex]);

	const words = phrases[currentIndex].split(" ");

	return (
		<div className="wrapper py-48">
			<video
				src="/video/reel.mov"
				playsInline
				loop
				muted
				autoPlay
				className="inset-0 absolute z-0 w-full h-full object-cover object-center brightness-50"
			/>
			<div ref={containerRef} className="container relative z-10 gap-4">
				<h1
					ref={mainTextRef}
					className="text-9xl leading-28 tracking-tight flex flex-wrap pb-2"
					key={currentIndex}
				>
					{words.map((word, i) => (
						<span
							key={i}
							className="inline-block overflow-hidden mr-[0.25em] shrink-0"
						>
							<span
								className="inline-block hero-drawer-slide-up"
								style={{
									animationDelay: `${i * 0.1}s`,
									animationFillMode: "both",
								}}
							>
								{word}
							</span>
						</span>
					))}
				</h1>
				<p className="text-balance max-w-md ">
					A platform serving all 32 boroughs. Helping God’s people
					connect, strengthen, and serve.
				</p>
			</div>

			<style jsx global>{`
				@keyframes heroDrawerSlideUp {
					from {
						transform: translateY(105%);
					}
					to {
						transform: translateY(0);
					}
				}

				.hero-drawer-slide-up {
					transform: translateY(105%);
					animation: heroDrawerSlideUp 0.8s
						cubic-bezier(0.16, 1, 0.3, 1) forwards;
				}
			`}</style>
		</div>
	);
};

export default HomeHero;
