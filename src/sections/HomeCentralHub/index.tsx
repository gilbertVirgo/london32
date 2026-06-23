import CollaborateAnimation from "./CollaborateAnimation";
import CommunicateAnimation from "./CommunicateAnimation";
import ConnectAnimation from "./ConnectAnimation";
import VideoHeader from "@/components/VideoHeader";

const HomeCentralHub = () => {
	return (
		<>
			<VideoHeader
				videoSrc="/video/central-hub.mov"
				subtext="London 32 is"
				text="a central hub"
				id="central-hub"
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
		</>
	);
};

export default HomeCentralHub;
