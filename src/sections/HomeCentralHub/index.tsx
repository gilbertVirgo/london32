import CollaborateAnimation from "./CollaborateAnimation";
import CommunicateAnimation from "./CommunicateAnimation";
import ConnectAnimation from "./ConnectAnimation";
import VideoHeader from "@/components/VideoHeader";

const HomeCentralHub = () => {
	return (
		<>
			<VideoHeader
				videoSrc="/video/central-hub.mp4"
				subtext="London 32 is"
				text="a central hub"
				id="central-hub"
			/>
			<div className="wrapper gap-8 lg:gap-16 relative pt-8 lg:pt-16 pb-16 lg:pb-32">
				<div className="container">
					<p className="max-w-md text-balance">
						We help{" "}
						<span className="text-brand-yellow">churches</span>,{" "}
						<span className="text-brand-yellow">Christians</span>{" "}
						and <span className="text-brand-yellow">pastors</span>{" "}
						to
					</p>
				</div>
				<div className="gap-4 lg:gap-8 wrapper">
					<h3 className="text-3xl lg:text-6xl container">connect,</h3>
					<ConnectAnimation />
				</div>
				<div className="gap-4 lg:gap-8 wrapper">
					<h3 className="text-3xl lg:text-6xl container">
						communicate,
					</h3>
					<CommunicateAnimation />
				</div>
				<div className="gap-4 lg:gap-8 wrapper">
					<h3 className="text-3xl lg:text-6xl container">
						and collaborate.
					</h3>
					<CollaborateAnimation />
				</div>
			</div>
		</>
	);
};

export default HomeCentralHub;
