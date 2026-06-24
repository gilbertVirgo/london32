"use client";

import { useState, useEffect, useRef } from "react";
import Button from "@/components/Button";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

import { handleSmoothScroll } from "@/utils/scroll";

const Navigation = () => {
	const [isOpen, setIsOpen] = useState(false);
	const navRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const updateHeight = () => {
			if (navRef.current) {
				const height = navRef.current.getBoundingClientRect().height;
				document.documentElement.style.setProperty(
					"--nav-height",
					`${height}px`,
				);
			}
		};

		updateHeight();

		const observer = new ResizeObserver(updateHeight);
		if (navRef.current) {
			observer.observe(navRef.current);
		}

		window.addEventListener("resize", updateHeight);

		return () => {
			observer.disconnect();
			window.removeEventListener("resize", updateHeight);
		};
	}, []);

	const handleClick = (
		e: React.MouseEvent<HTMLAnchorElement>,
		href: string,
	) => {
		handleSmoothScroll(e, href);
	};

	return (
		<nav
			ref={navRef}
			className="wrapper py-4 sticky top-0 left-0 w-full z-100 bg-brand-charcoal/15 backdrop-blur-lg border-b border-brand-platinum/25"
		>
			<div className="container flex-col! items-stretch gap-4">
				<div className="flex flex-row justify-between items-center w-full">
					<Image
						src="/logo.svg"
						width={64 * 1.0546875}
						height={64}
						alt="London 32 Logo"
					/>

					{/* Desktop Menu */}
					<div className="hidden lg:flex flex-row gap-8 items-center">
						{[
							{
								title: "Vision",
								href: "#vision",
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
						<Button
							size="sm"
							href="#stay-updated"
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

					{/* Mobile Menu Button */}
					<button
						type="button"
						onClick={() => setIsOpen(!isOpen)}
						className="lg:hidden flex items-center justify-center text-brand-platinum border border-brand-platinum/25 p-3 hover:text-brand-yellow hover:border-brand-yellow transition-colors cursor-pointer"
						aria-label="Toggle menu"
					>
						<FontAwesomeIcon
							icon={isOpen ? faClose : faBars}
							className="w-5 h-5"
						/>
					</button>
				</div>

				{/* Mobile Menu (Dropdown/Extended navbar) */}
				{isOpen && (
					<div className="lg:hidden flex flex-col gap-6 items-center py-4 w-full border-t border-brand-platinum/25">
						{[
							{
								title: "Vision",
								href: "#vision",
							},
							{
								title: "Core Convictions",
								href: "#core-convictions",
							},
						].map(({ title, href }, index) => (
							<Link
								href={href}
								onClick={(e) => {
									setIsOpen(false);
									handleClick(e, href);
								}}
								className="font-body text-xl text-brand-platinum hover:text-brand-yellow transition-colors text-center w-full"
								key={`mobile-nav-link-${index}`}
							>
								{title}
							</Link>
						))}
						<div className="w-full flex justify-center pt-2">
							<Button
								size="sm"
								href="#stay-updated"
								icon={faEnvelope}
								onClick={(e) => {
									e.preventDefault();
									setIsOpen(false);
									window.dispatchEvent(
										new CustomEvent("open-mailing-list"),
									);
								}}
							>
								Stay Updated
							</Button>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navigation;
