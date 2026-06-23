"use client";

import Button from "@/components/Button";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { useEffect, useRef, useState } from "react";
import { bridgeGapPaths } from "./bridgeGapPaths";

const phrases = ["Church", "London", "London 32"];

const HomeHero = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [svgVisible, setSvgVisible] = useState(false);
	const svgRef = useRef<SVGSVGElement | null>(null);
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
			const availableWidth =
				container.clientWidth - paddingLeft - paddingRight;

			let maxWordWidth = 0;
			const outerSpans = mainText.children;
			for (let i = 0; i < outerSpans.length; i++) {
				const child = outerSpans[i] as HTMLElement;
				const innerSpan = child.firstElementChild as HTMLElement;
				const wordWidth = innerSpan
					? innerSpan.getBoundingClientRect().width
					: child.getBoundingClientRect().width;
				if (wordWidth > maxWordWidth) {
					maxWordWidth = wordWidth;
				}
			}

			if (maxWordWidth > availableWidth && availableWidth > 0) {
				const scaleFactor = availableWidth / maxWordWidth;
				const mainTextStyle = window.getComputedStyle(mainText);
				const defaultFontSize =
					parseFloat(mainTextStyle.fontSize) || 128;

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

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setSvgVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0, rootMargin: "0px 0px -10% 0px" },
		);

		if (svgRef.current) {
			observer.observe(svgRef.current);
		}

		return () => observer.disconnect();
	}, []);

	const words = phrases[currentIndex].split(" ");

	return (
		<>
			<div className="wrapper py-32 relative">
				<video
					src="/video/reel.mov"
					playsInline
					loop
					muted
					autoPlay
					className="inset-0 absolute z-0 w-full h-full object-cover object-center brightness-50"
				/>
				<div
					ref={containerRef}
					className="container relative z-10 gap-12"
				>
					<div className="flex flex-col gap-4">
						<h1
							ref={mainTextRef}
							className="text-9xl leading-26 tracking-tight flex flex-wrap pb-2"
						>
							{/* Static persistent word */}
							<span className="inline-block overflow-hidden mr-[0.25em] shrink-0">
								<span className="inline-block hero-drawer-slide-up">
									Think
								</span>
							</span>

							{/* Cycled words */}
							{words.map((word, i) => (
								<span
									key={`${currentIndex}-${i}`}
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
						<p className="text-balance max-w-md">
							A platform serving all 32 boroughs. Helping God’s
							people connect, strengthen, and serve.
						</p>
					</div>
					<Button href="#central-hub" icon={faArrowRight}>
						Find out more
					</Button>
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

					@keyframes svgDrawerSlideUp {
						from {
							transform: translateY(195px);
						}
						to {
							transform: translateY(0);
						}
					}

					.svg-letter-drawer {
						transform: translateY(195px);
					}

					.svg-letter-drawer-animate {
						animation: svgDrawerSlideUp 0.8s
							cubic-bezier(0.16, 1, 0.3, 1) forwards;
					}
				`}</style>
			</div>
			<div className="container py-24 gap-16 items-center">
				<p className="text-center text-balance max-w-md">
					London has a vibrant and diverse Christian community
					spanning all 32 boroughs. But connection across such a large
					city is not easy.
				</p>
				<svg
					ref={svgRef}
					width="1168"
					height="193"
					viewBox="0 0 1168 193"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="w-full h-auto overflow-hidden"
				>
					{bridgeGapPaths.map((path, index) => (
						<path
							key={index}
							d={path.d}
							fill={path.fill}
							className={`svg-letter-drawer ${svgVisible ? "svg-letter-drawer-animate" : ""}`}
							style={{
								animationDelay: `${(bridgeGapPaths.length - 1 - index) * 0.03}s`,
								animationFillMode: "both",
							}}
						/>
					))}
				</svg>
				<p className="text-center text-balance max-w-md">
					We exist to signpost, strengthen, and serve the Church
					locally and across the whole city.
				</p>
			</div>
		</>
	);
};

export default HomeHero;
