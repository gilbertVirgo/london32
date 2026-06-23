"use client";

import { useState } from "react";
import VideoHeader from "@/components/VideoHeader";
import Image from "next/image";

const HomeNonDenom = () => {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<>
			<VideoHeader
				videoSrc="/video/non-denom.mov"
				subtext="London 32 is"
				text="non-denominational and independent"
				id="about"
			/>
			<div className="wrapper gap-32 relative pt-16 pb-48 ">
				<div className="container flex-row! justify-between">
					<p className="max-w-md text-balance">
						We&rsquo;re supported by Christians who long for{" "}
						<span
							className={`transition-colors duration-300 ${hoveredIndex === 0 ? "text-brand-yellow" : "text-brand-platinum"}`}
						>
							the glory of Christ
						</span>
						,{" "}
						<span
							className={`transition-colors duration-300 ${hoveredIndex === 1 ? "text-brand-yellow" : "text-brand-platinum"}`}
						>
							the health of his Church
						</span>{" "}
						and{" "}
						<span
							className={`transition-colors duration-300 ${hoveredIndex === 2 ? "text-brand-yellow" : "text-brand-platinum"}`}
						>
							the salvation of London
						</span>
						.
					</p>
					<div className="flex flex-row gap-8">
						{["cross", "church", "target"].map((glyph, index) => (
							<Image
								alt={`${glyph} glyph`}
								width={128}
								height={128}
								key={`non-denom-glyph-${index}`}
								src={`/glyph/${glyph}.png`}
								className="cursor-pointer transition-transform duration-300 hover:scale-110"
								onMouseEnter={() => setHoveredIndex(index)}
								onMouseLeave={() => setHoveredIndex(null)}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default HomeNonDenom;
