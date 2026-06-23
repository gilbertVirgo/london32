"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import VideoHeader from "@/components/VideoHeader";
import { faBible } from "@fortawesome/free-solid-svg-icons/faBible";
import Image from "next/image";

const HomeGodsWord = () => {
	const [isVisible, setIsVisible] = useState(false);
	const sectionRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0, rootMargin: "-25% 0px -25% 0px" },
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		return () => observer.disconnect();
	}, []);

	return (
		<>
			<VideoHeader
				videoSrc="/video/gods-word.mov"
				subtext="London 32 is"
				text="shaped by the authority of God’s word"
				id="core-convictions"
			/>
			<div
				ref={sectionRef}
				className={`wrapper gap-18 relative pt-16 pb-48 ${isVisible ? "is-visible" : ""}`}
			>
				<div className="container gap-12">
					<p className="max-w-md text-balance">
						We hold to essential biblical truths:
					</p>
					<div className="flex flex-row gap-12" id="gods-word--items">
						{[
							{
								glyph: "cross",
								title: "Salvation",
								body: "Salvation by grace through faith in Christ, grounded in his atoning death and resurrection.",
							},
							{
								glyph: "target",
								title: "Ministry",
								body: "Word-centred ministry: preaching Scripture to equip the Church and proclaim Christ.",
							},
							{
								glyph: "two-rings",
								title: "Marriage",
								body: "Marriage as a covenant union of one man and one woman, with distinct, complementary roles.",
							},
						].map(({ glyph, title, body }, index) => (
							<div
								key={`gods-word-detail-wrapper-${index}`}
								className="flex flex-col gap-6 flex-1"
							>
								<Image
									src={`/glyph/${glyph}.png`}
									width={192}
									height={192}
									alt={`${glyph} glyph`}
								/>
								<div className="overflow-hidden">
									<div
										className="flex flex-col gap-2 gw-drawer-slide-up"
										style={{
											animationDelay: `${0.1 + index * 0.15}s`,
											animationFillMode: "both",
										}}
									>
										<h3 className="text-4xl!">{title}</h3>
										<p>{body}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="container">
					<Button href="" icon={faBible}>
						Read our Statement of Faith
					</Button>
				</div>
			</div>

			<style jsx global>{`
				@keyframes gwDrawerSlideUp {
					from {
						transform: translateY(105%);
					}
					to {
						transform: translateY(0);
					}
				}
				.gw-drawer-slide-up {
					transform: translateY(105%);
				}
				.is-visible .gw-drawer-slide-up {
					animation: gwDrawerSlideUp 0.8s
						cubic-bezier(0.16, 1, 0.3, 1) forwards;
				}
			`}</style>
		</>
	);
};

export default HomeGodsWord;
