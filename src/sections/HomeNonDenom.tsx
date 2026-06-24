"use client";

import { useState, useEffect } from "react";
import VideoHeader from "@/components/VideoHeader";
import Image from "next/image";

const HomeNonDenom = () => {
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveIndex((prev) => (prev + 1) % 3);
		}, 1250);
		return () => clearInterval(interval);
	}, []);

	return (
		<>
			<VideoHeader
				videoSrc="/video/non-denom.mov"
				subtext="London 32 is"
				text="non-<wbr/>denominational and independent"
				id="vision"
			/>
			<div className="wrapper gap-32 relative pt-8 lg:pt-16 pb-16 lg:pb-32 ">
				<div className="container gap-6 lg:flex-row! lg:justify-between">
					<p className="max-w-md text-balance">
						We&rsquo;re supported by Christians who long for{" "}
						<span
							className={`transition-colors duration-300 ${activeIndex === 0 ? "text-brand-yellow" : "text-brand-platinum"}`}
						>
							the glory of Christ
						</span>
						,{" "}
						<span
							className={`transition-colors duration-300 ${activeIndex === 1 ? "text-brand-yellow" : "text-brand-platinum"}`}
						>
							the health of his Church
						</span>{" "}
						and{" "}
						<span
							className={`transition-colors duration-300 ${activeIndex === 2 ? "text-brand-yellow" : "text-brand-platinum"}`}
						>
							the salvation of London
						</span>
						.
					</p>
					<div className="flex flex-row gap-4 lg:gap-8">
						{["cross", "church", "target"].map((glyph, index) => (
							<Image
								alt={`${glyph} glyph`}
								width={128}
								height={128}
								key={`non-denom-glyph-${index}`}
								src={`/glyph/${glyph}.png`}
								className={`transition-opacity duration-300 flex-1 min-w-0 aspect-square ${activeIndex === index ? "opacity-100" : "opacity-66"}`}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default HomeNonDenom;
