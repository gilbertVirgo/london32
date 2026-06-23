import HomeCentralHub from "@/sections/HomeCentralHub";
import HomeNonDenom from "@/sections/HomeNonDenom";
import HomeGodsWord from "@/sections/HomeGodsWord";
import HomeInDev from "@/sections/HomeInDev";

// Features are managed in FeaturesCarousel component

export default function Home() {
	return (
		<main className="flex flex-col bg-brand-charcoal">
			<HomeCentralHub />
			<HomeNonDenom />
			<HomeGodsWord />
			<HomeInDev />
		</main>
	);
}
