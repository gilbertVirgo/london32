"use client";

import { useState } from "react";
import Loader from "@/components/Loader";
import HomeCentralHub from "@/sections/HomeCentralHub";
import HomeNonDenom from "@/sections/HomeNonDenom";
import HomeGodsWord from "@/sections/HomeGodsWord";
import HomeInDev from "@/sections/HomeInDev";
import HomeHero from "@/sections/HomeHero";
import Navigation from "@/sections/Navigation";
import Footer from "@/sections/Footer";
import MailingListModal from "@/sections/MailingListModal";

export default function Home() {
	const [isLoading, setIsLoading] = useState(true);

	return (
		<>
			{isLoading && <Loader onComplete={() => setIsLoading(false)} />}
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
		</>
	);
}

