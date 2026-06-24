"use client";

import Button from "@/components/Button";
import FeaturesGrid from "./FeaturesGrid";
import VideoHeader from "@/components/VideoHeader";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";

const HomeInDev = () => {
	return (
		<>
			<VideoHeader
				videoSrc="/video/in-dev.mov"
				subtext="London 32 is"
				text="in development"
				id="stay-updated"
			/>
			<div className="wrapper gap-18 relative pt-8 lg:pt-16 pb-16 lg:pb-32 ">
				<div className="container gap-6 lg:gap-8" id="in-dev">
					<p className="max-w-md text-balance">
						Features will include:
					</p>
					<FeaturesGrid />
				</div>
				<div className="container">
					<Button
						href=""
						icon={faEnvelope}
						onClick={(e) => {
							e.preventDefault();
							window.dispatchEvent(
								new CustomEvent("open-mailing-list"),
							);
						}}
					>
						Stay Updated
					</Button>
				</div>
			</div>
		</>
	);
};

export default HomeInDev;
