"use client";

import Button from "@/components/Button";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import Image from "next/image";
import Link from "next/link";

const Navigation = () => {
	const handleClick = (
		e: React.MouseEvent<HTMLAnchorElement>,
		href: string,
	) => {
		if (href && href.startsWith("#")) {
			e.preventDefault();
			const targetId = href.substring(1);
			const element = document.getElementById(targetId);
			if (element) {
				const navElement = document.querySelector("nav");
				const navHeight = navElement ? navElement.getBoundingClientRect().height : 0;
				const elementPosition = element.getBoundingClientRect().top;
				const offsetPosition = elementPosition + window.scrollY - navHeight;

				window.scrollTo({
					top: offsetPosition,
					behavior: "smooth",
				});
			}
		}
	};

	return (
		<nav className="wrapper py-4 sticky top-0 left-0 w-full z-100 bg-brand-charcoal/15 backdrop-blur-lg">
			<div className="container flex-row! justify-between items-center">
				<Image
					src="/logo.svg"
					width={101.25}
					height={96}
					alt="London 32 Logo"
				/>
				<div className="flex flex-row gap-8 items-center">
					{[
						{
							title: "About",
							href: "#about",
						},
						{
							title: "Core Convictions",
							href: "#core-convictions",
						},
					].map(({ title, href }, index) => (
						<Link
							href={href}
							onClick={(e) => handleClick(e, href)}
							className="font-body"
							key={`navigation-link-${index}`}
						>
							{title}
						</Link>
					))}
					<Button size="sm" href="#stay-updated" icon={faEnvelope}>
						Stay Updated
					</Button>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
