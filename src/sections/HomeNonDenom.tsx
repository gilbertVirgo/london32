import VideoHeader from "@/components/VideoHeader";
import Image from "next/image";

const HomeNonDenom = () => {
	return (
		<>
			<VideoHeader
				videoSrc="/video/non-denom.mov"
				subtext="London 32 is"
				text="non-denominational and independent"
				textSizeSmaller
			/>
			<div className="wrapper gap-32 relative pt-16 pb-48 ">
				<div className="container flex-row! justify-between">
					<p className="max-w-md text-balance">
						We&rsquo;re supported by Christians who long for{" "}
						<span className="text-brand-yellow">
							the glory of Christ
						</span>
						,{" "}
						<span className="text-brand-yellow">
							the health of his Church
						</span>{" "}
						and{" "}
						<span className="text-brand-yellow">
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
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default HomeNonDenom;
