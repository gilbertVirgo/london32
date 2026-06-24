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
	const hiddenContainerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const currentPhrase = phrases[currentIndex];
		const duration = currentPhrase === "London 32" ? 2500 : 1250;

		const timer = setTimeout(() => {
			setCurrentIndex((prev) => (prev + 1) % phrases.length);
		}, duration);

		return () => clearTimeout(timer);
	}, [currentIndex]);

	useEffect(() => {
		const measureAndScale = () => {
			const container = containerRef.current;
			const mainText = mainTextRef.current;
			const hiddenContainer = hiddenContainerRef.current;
			if (!container || !mainText || !hiddenContainer) return;

			const computedStyle = window.getComputedStyle(container);
			const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
			const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
			const availableWidth =
				container.clientWidth - paddingLeft - paddingRight;

			// Position and size the hidden container to match the available content area exactly
			hiddenContainer.style.width = `${availableWidth}px`;

			const hiddenH1s = hiddenContainer.children;
			let maxH1Height = 0;
			let activeFontSize = "";
			let activeLineHeight = "";

			for (let phraseIdx = 0; phraseIdx < hiddenH1s.length; phraseIdx++) {
				const hiddenH1 = hiddenH1s[phraseIdx] as HTMLElement;

				// Reset font size and line height to measure true base layout dimensions
				hiddenH1.style.fontSize = "";
				hiddenH1.style.lineHeight = "";

				let maxWordWidth = 0;
				const outerSpans = hiddenH1.children;
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
					const mainTextStyle = window.getComputedStyle(hiddenH1);
					const defaultFontSize =
						parseFloat(mainTextStyle.fontSize) || 128;

					const newFontSize = `${defaultFontSize * scaleFactor}px`;
					const newLineHeight = `${defaultFontSize * scaleFactor * 0.875}px`;

					hiddenH1.style.fontSize = newFontSize;
					hiddenH1.style.lineHeight = newLineHeight;

					if (phraseIdx === currentIndex) {
						activeFontSize = newFontSize;
						activeLineHeight = newLineHeight;
					}
				} else {
					hiddenH1.style.fontSize = "";
					hiddenH1.style.lineHeight = "";
					if (phraseIdx === currentIndex) {
						activeFontSize = "";
						activeLineHeight = "";
					}
				}

				const height = hiddenH1.getBoundingClientRect().height;
				if (height > maxH1Height) {
					maxH1Height = height;
				}
			}

			// Apply active phrase styling to the visible H1
			mainText.style.fontSize = activeFontSize;
			mainText.style.lineHeight = activeLineHeight;

			// Apply maximum height to avoid layout shift
			mainText.style.height = `${maxH1Height}px`;
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
			<div
				className={`wrapper py-12 md:py-32 h-[calc(100vh-var(--nav-height,136px))] md:h-auto relative`}
			>
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
					className="container relative z-10 h-full md:h-auto justify-between md:justify-start md:gap-12"
				>
					<div className="flex md:flex-0 flex-col gap-4 relative">
						<h1
							ref={mainTextRef}
							className="text-6xl md:text-9xl leading-12 md:leading-26 tracking-tight"
						>
							{/* Static persistent word */}
							<span className="block overflow-hidden mr-[0.25em] h-min ">
								<span className="inline-block hero-drawer-slide-up h-min">
									Think
								</span>
							</span>

							{/* Cycled words */}
							{words.map((word, i) => (
								<span
									key={`${currentIndex}-${i}`}
									className="inline-block overflow-hidden mr-[0.25em] h-min"
								>
									<span
										className="inline-block hero-drawer-slide-up h-min"
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

						{/* Hidden helper elements for measuring maximum height */}
						<div
							ref={hiddenContainerRef}
							className="absolute top-0 left-0 pointer-events-none invisible flex flex-col"
							aria-hidden="true"
						>
							{phrases.map((phrase, phraseIdx) => (
								<h1
									key={`hidden-h1-${phraseIdx}`}
									className="text-6xl md:text-9xl leading-12 md:leading-26 tracking-tight"
								>
									{/* Static persistent word */}
									<span className="block overflow-hidden mr-[0.25em] h-min">
										<span className="inline-block h-min">
											Think
										</span>
									</span>

									{/* Cycled words */}
									{phrase.split(" ").map((word, wordIdx) => (
										<span
											key={`hidden-word-${phraseIdx}-${wordIdx}`}
											className="inline-block overflow-hidden mr-[0.25em] h-min"
										>
											<span className="inline-block h-min">
												{word}
											</span>
										</span>
									))}
								</h1>
							))}
						</div>

						<p className="text-balance max-w-md">
							A platform serving all 32 boroughs. Helping God’s
							people connect, strengthen, and serve.
						</p>
					</div>
					<Button href="#vision" icon={faArrowRight}>
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
			<div className="wrapper">
				<div
					className="container py-12 lg:py-24 gap-8 lg:gap-16 items-center"
					id="vision"
				>
					<p className="text-center text-balance max-w-md">
						London has a vibrant and diverse Christian community
						spanning all 32 boroughs. But connection across such a
						large city is not easy.
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
						{bridgeGapPaths.map((wordPaths, wordIndex) => {
							const delay = `${(bridgeGapPaths.length - 1 - wordIndex) * 0.15}s`;
							return wordPaths.map((path, pathIndex) => (
								<path
									key={`${wordIndex}-${pathIndex}`}
									d={path.d}
									fill={path.fill}
									className={`svg-letter-drawer ${svgVisible ? "svg-letter-drawer-animate" : ""}`}
									style={{
										animationDelay: delay,
										animationFillMode: "both",
									}}
								/>
							));
						})}
					</svg>
					<p className="text-center text-balance max-w-md">
						We exist to signpost, strengthen, and serve the Church
						locally and across the whole city.
					</p>
				</div>
			</div>
		</>
	);
};

export default HomeHero;
