"use client";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";

interface ButtonProps {
	children: ReactNode;
	href: string | undefined;
	icon?: IconProp;
	size?: "sm" | "md";
}

const Button = ({ children, href, icon, size }: ButtonProps) => {
	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (href && href.startsWith("#")) {
			e.preventDefault();
			const targetId = href.substring(1);
			const element = document.getElementById(targetId);
			if (element) {
				element.scrollIntoView({ behavior: "smooth" });
			}
		}
	};

	const sizeSelectors = { sm: "py-3 px-4", md: "py-4 px-6" }[size || "md"];

	return (
		<a
			href={href}
			onClick={handleClick}
			className={`group relative overflow-hidden border border-brand-yellow border-width-1 font-sans w-max flex flex-row items-center gap-4 text-brand-platinum hover:text-brand-charcoal transition-colors duration-500 ${sizeSelectors}`}
		>
			<span
				aria-hidden
				className="absolute inset-0 bg-brand-yellow translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
			/>
			<span className="relative z-10">{children}</span>
			{icon && (
				<FontAwesomeIcon
					icon={icon}
					className="relative z-10"
					color="currentColor"
				/>
			)}
		</a>
	);
};

export default Button;
