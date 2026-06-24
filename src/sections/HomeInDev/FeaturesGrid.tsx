"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface FeatureItem {
	glyph: string;
	title: string;
	body: string;
}

const INITIAL_FEATURES: FeatureItem[] = [
	{
		glyph: "church",
		title: "Church Directory",
		body: "Find churches by borough, denomination, or community.",
	},
	{
		glyph: "three-nodes",
		title: "Pastors' Hubs",
		body: "Connect with local leaders and build borough networks.",
	},
	{
		glyph: "calendar",
		title: "Events Calendar",
		body: "Discover and coordinate events across the city.",
	},
	{
		glyph: "hammer",
		title: "Shared Resources",
		body: "Access teaching, training, and ministry tools.",
	},
	{
		glyph: "chatboxes",
		title: "Discussion Forums",
		body: "Share ideas, ask questions, and support one another.",
	},
	{
		glyph: "target",
		title: "Volunteer Opportunities",
		body: "Find ways to serve in mission and community work.",
	},
	{
		glyph: "bell",
		title: "News & Updates",
		body: "Stay informed about church life across London.",
	},
];

export default function FeaturesCarousel() {
	const [activeItem, setActiveItem] = useState<FeatureItem>(
		INITIAL_FEATURES[0],
	);
	const [gridItems, setGridItems] = useState<FeatureItem[]>(
		INITIAL_FEATURES.slice(1),
	);
	const [isAutoPlayActive, setIsAutoPlayActive] = useState(true);

	useEffect(() => {
		if (!isAutoPlayActive) return;

		const interval = setInterval(() => {
			const currentIdx = INITIAL_FEATURES.findIndex(
				(item) => item.glyph === activeItem.glyph,
			);
			const nextIdx = (currentIdx + 1) % INITIAL_FEATURES.length;
			const nextFeature = INITIAL_FEATURES[nextIdx];

			const gridIdx = gridItems.findIndex(
				(item) => item.glyph === nextFeature.glyph,
			);

			if (gridIdx !== -1) {
				handleSwap(gridIdx, true);
			}
		}, 3000);

		return () => clearInterval(interval);
	}, [activeItem, gridItems, isAutoPlayActive]);

	const handleSwap = (clickedIndex: number, isAuto = false) => {
		if (!isAuto) {
			setIsAutoPlayActive(false);
		}

		const clickedItem = gridItems[clickedIndex];
		const currentActive = activeItem;

		// Swap active item and the clicked grid item
		setActiveItem(clickedItem);
		setGridItems((prev) => {
			const nextGrid = [...prev];
			nextGrid[clickedIndex] = currentActive;
			return nextGrid;
		});
	};

	return (
		<>
			<div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16 w-full">
				{/* Left Side: Active Feature (Glyph + Text) */}
				<div
					key={activeItem.glyph}
					className="flex flex-row items-center gap-4 lg:gap-8 max-w-2xl w-full"
				>
					{/* Active Glyph Drawer */}
					<div className="shrink-0 overflow-hidden">
						<div>
							<Image
								src={`/glyph/${activeItem.glyph}.png`}
								width={256}
								height={256}
								alt={`${activeItem.title} glyph`}
								className="w-24 lg:w-auto object-contain"
								priority
							/>
						</div>
					</div>

					{/* Active Text (Mimics #gods-word--items typography) */}
					<div className="flex flex-col gap-1 lg:gap-2">
						{/* Title Word-by-Word Drawers */}
						<h3 className="text-xl lg:text-4xl leading-5 lg:leading-9 flex flex-wrap max-w-sm text-balance">
							{activeItem.title.split(" ").map((word, i) => (
								<span
									key={i}
									className="inline-block overflow-hidden mr-[0.25em] pb-1"
								>
									<span
										className="inline-block fc-drawer-slide-up"
										style={{
											animationDelay: `${i * 0.1}s`,
											animationFillMode: "both",
										}}
									>
										{word}
									</span>
								</span>
							))}
						</h3>

						{/* Body Drawer */}
						<p className="text-sm lg:text-base">
							{activeItem.body}
						</p>
					</div>
				</div>

				{/* Right Side: Grid of remaining 6 features */}
				<div className="grid grid-cols-3 gap-4 lg:gap-6 ">
					{gridItems.map((item, index) => (
						<div
							key={item.glyph}
							className="cursor-pointer select-none opacity-66 hover:opacity-100 transition-all duration-300 hover:scale-105 active:scale-95 transform"
							onMouseEnter={() => handleSwap(index)}
							onClick={() => handleSwap(index)}
							title={`Hover to view ${item.title}`}
						>
							<Image
								src={`/glyph/${item.glyph}.png`}
								width={128}
								height={128}
								alt={`${item.title} glyph`}
								className="object-contain"
							/>
						</div>
					))}
				</div>
			</div>

			{/* CSS Animations */}
			<style jsx global>{`
				@keyframes fcDrawerSlideUp {
					from {
						transform: translateY(110%);
					}
					to {
						transform: translateY(0);
					}
				}
				.fc-drawer-slide-up {
					transform: translateY(110%);
					animation: fcDrawerSlideUp 0.8s
						cubic-bezier(0.16, 1, 0.3, 1) forwards;
				}
			`}</style>
		</>
	);
}
