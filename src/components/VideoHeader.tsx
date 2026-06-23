"use client";

import { useEffect, useRef, useState } from "react";

interface VideoHeaderProps {
	videoSrc: string;
	subtext: string;
	text: string;
}

const VideoHeader = ({ videoSrc, subtext, text }: VideoHeaderProps) => {
	const [isVisible, setIsVisible] = useState(false);
	const textRef = useRef<HTMLHeadingElement | null>(null);

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
			<div className="container pt-48 pb-16 relative z-10 gap-6">
				<h2 ref={textRef}>
					{/* Subtext with drawer clip animation */}
					<span className="text-5xl block tracking-tight ">
						<span className="inline-block">{subtext}</span>
					</span>

					{/* Main Text with word-by-word drawer clip animation */}
					<span className="text-9xl leading-28 tracking-tight flex flex-wrap">
						{words.map((word, i) => (
							<span
								key={i}
								className="inline-block overflow-y-hidden pb-[0.1em] pr-[0.22em]"
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
