"use client";

import { useEffect, useRef, useState } from "react";

interface VideoHeaderProps {
	videoSrc: string;
	subtext: string;
	text: string;
	textSizeSmaller?: boolean;
}

const VideoHeader = ({
	videoSrc,
	subtext,
	text,
	textSizeSmaller,
}: VideoHeaderProps) => {
	const [isVisible, setIsVisible] = useState(false);
	const textRef = useRef<HTMLHeadingElement | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const mainTextRef = useRef<HTMLSpanElement | null>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0, rootMargin: "0px 0px -15% 0px" },
		);

		if (textRef.current) {
			observer.observe(textRef.current);
		}

		return () => observer.disconnect();
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
				const defaultFontSize = parseFloat(mainTextStyle.fontSize);

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
	}, [text]);

	const words = text.split(" ");

	return (
		<div
			className={`wrapper overflow-y-hidden relative ${isVisible ? "is-visible" : ""}`}
		>
			<video
				className="inset-0 absolute z-0 w-full h-full object-cover object-center brightness-75"
				autoPlay
				muted
				loop
				playsInline
				src={videoSrc}
			/>
			<div
				ref={containerRef}
				className="container pt-48 pb-16 relative z-10 gap-6"
			>
				<h2 ref={textRef}>
					{/* Subtext with drawer clip animation */}
					<span className="text-4xl block tracking-tight ">
						<span className="inline-block">{subtext}</span>
					</span>

					{/* Main Text with word-by-word drawer clip animation */}
					<span
						ref={mainTextRef}
						className={`${textSizeSmaller ? "text-8xl leading-24" : "text-9xl leading-28"} tracking-tight flex flex-wrap`}
					>
						{words.map((word, i) => (
							<span
								key={i}
								className="inline-block overflow-y-hidden pb-[0.1em] pr-[0.22em] shrink-0"
							>
								<span
									className="inline-block vh-drawer-slide-up"
									style={{
										animationDelay: `${0.2 + i * 0.1}s`,
										animationFillMode: "both",
									}}
								>
									{word}
									{i === words.length - 1 && (
										<span className="text-brand-yellow font-serif">
											.
										</span>
									)}
								</span>
							</span>
						))}
					</span>
				</h2>
			</div>

			<style jsx global>{`
				@keyframes vhDrawerSlideUp {
					from {
						transform: translateY(102%);
					}
					to {
						transform: translateY(0);
					}
				}
				.vh-drawer-slide-up {
					transform: translateY(102%);
				}
				.is-visible .vh-drawer-slide-up {
					animation: vhDrawerSlideUp 0.8s
						cubic-bezier(0.16, 1, 0.3, 1) forwards;
				}
			`}</style>
		</div>
	);
};

export default VideoHeader;
