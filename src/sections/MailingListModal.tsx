"use client";

import { useEffect, useRef } from "react";
import Button from "@/components/Button";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";

const MailingListModal = () => {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const handleOpen = () => {
			dialogRef.current?.showModal();
		};
		window.addEventListener("open-mailing-list", handleOpen);
		return () => {
			window.removeEventListener("open-mailing-list", handleOpen);
		};
	}, []);

	return (
		<dialog
			ref={dialogRef}
			className="bg-transparent border-none outline-none p-4 backdrop:bg-brand-charcoal/50 open:flex open:justify-center open:items-start open:fixed open:inset-0 open:w-full open:h-full open:max-w-none open:max-h-none z-1000 open:overflow-y-auto"
			onClick={(e) => {
				if (e.target === dialogRef.current) {
					dialogRef.current?.close();
				}
			}}
		>
			<div className="flex flex-col p-12 border border-brand-platinum/25 bg-brand-charcoal max-w-md gap-8 relative text-brand-platinum my-auto">
				<button
					type="button"
					onClick={() => dialogRef.current?.close()}
					className="absolute top-4 right-4 text-brand-platinum/50 hover:text-brand-platinum text-2xl font-body cursor-pointer transition-colors"
					aria-label="Close dialog"
				>
					<FontAwesomeIcon icon={faClose} size="xs" />
				</button>
				<h2 className="text-3xl md:text-5xl leading-7 md:leading-11 text-balance">
					{["Stay", "Connected", "with", "London", "32"].map(
						(word, i, arr) => (
							<span
								key={i}
								className={`inline-block overflow-y-hidden ${i < arr.length - 1 ? "pr-[0.22em]" : ""} shrink-0"`}
							>
								<span
									className="inline-block modal-drawer-slide-up"
									style={{
										animationDelay: `${0.1 + i * 0.1}s`,
										animationFillMode: "both",
									}}
								>
									{word}
								</span>
							</span>
						),
					)}
					<span className="inline-block overflow-y-hidden shrink-0">
						<span
							className="font-serif text-brand-yellow inline-block modal-drawer-slide-up"
							style={{
								animationDelay: `${0.6}s`,
								animationFillMode: "both",
							}}
						>
							.
						</span>
					</span>
				</h2>
				<div className="flex flex-col gap-2">
					<p>London 32 is currently being built.</p>
					<p>
						Join our mailing list to receive updates, launch news,
						and opportunties to connect with churches across London.
					</p>
				</div>
				<div className="flex flex-col gap-2">
					{/*<p>Be among the first to hear when we launch.</p>*/}
					<input
						type="email"
						className="px-4 py-3 border border-brand-platinum font-body outline-none bg-brand-charcoal text-brand-platinum"
						placeholder="Enter your email"
					/>
					<Button href="" size="sm" icon={faArrowRight}>
						Join Mailing List
					</Button>
					<p className="text-brand-platinum/50 text-sm">
						No spam. Only meaningful updates.
					</p>
				</div>
			</div>

			<style jsx global>{`
				@keyframes modalDrawerSlideUp {
					from {
						transform: translateY(102%);
					}
					to {
						transform: translateY(0);
					}
				}
				.modal-drawer-slide-up {
					transform: translateY(102%);
				}
				dialog[open] .modal-drawer-slide-up {
					animation: modalDrawerSlideUp 0.8s
						cubic-bezier(0.16, 1, 0.3, 1) forwards;
				}
			`}</style>
		</dialog>
	);
};

export default MailingListModal;
