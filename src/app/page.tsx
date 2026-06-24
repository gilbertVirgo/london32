import HomeCentralHub from "@/sections/HomeCentralHub";
import HomeNonDenom from "@/sections/HomeNonDenom";
import HomeGodsWord from "@/sections/HomeGodsWord";
import HomeInDev from "@/sections/HomeInDev";
import HomeHero from "@/sections/HomeHero";
import Navigation from "@/sections/Navigation";
import Footer from "@/sections/Footer";
import MailingListModal from "@/sections/MailingListModal";

// Features are managed in FeaturesCarousel component

export default function Home() {
	return (
		<main className="flex flex-col bg-brand-charcoal">
			<Navigation />
			<HomeHero />
			<HomeCentralHub />
			<HomeNonDenom />
			<HomeGodsWord />
			<HomeInDev />
			<Footer />
			<MailingListModal />
		</main>
	);
}
