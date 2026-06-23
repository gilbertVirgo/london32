import ConnectAnimation from "./ConnectAnimation";
import CommunicateAnimation from "./CommunicateAnimation";
import CollaborateAnimation from "./CollaborateAnimation";
import VideoHeader from "@/components/VideoHeader";
import Image from "next/image";
import Button from "@/components/Button";
import { faBible } from "@fortawesome/free-solid-svg-icons/faBible";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import FeaturesCarousel from "@/components/FeaturesCarousel";

// Features are managed in FeaturesCarousel component

export default function Home() {
	return (
		<main className="flex flex-col bg-brand-charcoal">
			<VideoHeader
				videoSrc="/video/central-hub.mov"
				subtext="London 32 is"
				text="a central hub"
			/>
			<div className="wrapper gap-16 relative pt-16 pb-48">
				<div className="container">
					<p className="max-w-md text-balance">
						We help{" "}
						<span className="text-brand-yellow">churches</span>,{" "}
						<span className="text-brand-yellow">Christians</span>{" "}
						and <span className="text-brand-yellow">pastors</span>{" "}
						to
					</p>
				</div>
				<div className="gap-8 wrapper">
					<h3 className="text-6xl container">connect,</h3>
					<ConnectAnimation />
				</div>
				<div className="gap-8 wrapper">
					<h3 className="text-6xl container">communicate,</h3>
					<CommunicateAnimation />
				</div>
				<div className="gap-8 wrapper">
					<h3 className="text-6xl container">and collaborate.</h3>
					<CollaborateAnimation />
				</div>
			</div>
			<VideoHeader
				videoSrc="/video/non-denom.mov"
				subtext="London 32 is"
				text="non-denominational and independent"
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
			<VideoHeader
				videoSrc="/video/gods-word.mov"
				subtext="London 32 is"
				text="shaped by the authority of God’s word"
			/>
			<div className="wrapper gap-18 relative pt-16 pb-48 ">
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
								className="flex flex-col gap-6"
								key={`gods-word-detail-${index}`}
							>
								<Image
									src={`/glyph/${glyph}.png`}
									width={192}
									height={192}
									alt={`${glyph} glyph`}
								/>
								<div className="flex flex-col gap-2">
									<h3 className="text-5xl!">{title}</h3>
									<p>{body}</p>
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
			<VideoHeader
				videoSrc="/video/in-dev.mov"
				subtext="London 32 is"
				text="in development"
			/>
			<div className="wrapper gap-18 relative pt-16 pb-48 ">
				<div className="container gap-12" id="in-dev">
					<p className="max-w-md text-balance">
						Features will include:
					</p>
					<FeaturesCarousel />
				</div>
				<div className="container">
					<Button href="" icon={faEnvelope}>
						Stay updated
					</Button>
				</div>
			</div>
		</main>
	);
}
