"use client";

import Link from "next/link";
import { handleSmoothScroll } from "@/utils/scroll";

const Footer = () => {
	return (
		<footer className="wrapper border-t border-brand-platinum/25">
			<div className="container items-center gap-4 md:gap-2 py-6">
				<div className="flex flex-col md:flex-row gap-1 md:gap-4">
					{[
						{
							title: "Vision",
							href: "#vision",
						},
						{
							title: "Core Convictions",
							href: "#core-convictions",
						},
						{
							title: "Stay Updated",
							href: "#stay-updated",
						},
					].map(({ title, href }, index) => (
						<Link
							href={href}
							onClick={(e) => {
								if (href === "#stay-updated") {
									e.preventDefault();
									window.dispatchEvent(
										new CustomEvent("open-mailing-list"),
									);
								} else {
									handleSmoothScroll(e, href);
								}
							}}
							className="font-body text-center"
							key={`footer-link-${index}`}
						>
							{title}
						</Link>
					))}
				</div>
				<p className="text-sm text-brand-platinum/85">
					&copy; 2026 London 32
				</p>
			</div>
		</footer>
	);
};

export default Footer;
