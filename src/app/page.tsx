import HomeCentralHub from "@/sections/HomeCentralHub";
import HomeNonDenom from "@/sections/HomeNonDenom";
import HomeGodsWord from "@/sections/HomeGodsWord";
import HomeInDev from "@/sections/HomeInDev";
import HomeHero from "@/sections/HomeHero";

// Features are managed in FeaturesCarousel component

export default function Home() {
	return (
		<main className="flex flex-col bg-brand-charcoal">
			<HomeHero />
			<HomeCentralHub />
			<HomeNonDenom />
			<HomeGodsWord />
			<HomeInDev />
		</main>
	);
}
