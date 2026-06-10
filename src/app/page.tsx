export default function Home() {
	return (
		<main className="flex flex-col">
			<div className="bg-brand-charcoal flex flex-col">
				{/* 1. Video Hero Section */}
				<section className="relative w-full h-[420px] overflow-hidden">
					{/* Background Video */}
					<video
						autoPlay
						loop
						muted
						playsInline
						className="absolute inset-0 w-full h-full object-cover z-0"
					>
						<source src="/video/central-hub.mov" type="video/mp4" />
						<source
							src="/video/central-hub.mov"
							type="video/quicktime"
						/>
					</video>

					{/* Dark Overlay (0.33 opacity) */}
					<div className="absolute inset-0 bg-[#080708]/33 z-10" />

					{/* Text Overlay */}
					<div className="absolute inset-0 z-20 flex flex-col justify-center">
						<div className="max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24 w-full">
							<div className="flex flex-col space-y-2 select-none">
								<span className="font-body-custom text-[32px] sm:text-[40px] md:text-[48px] text-white tracking-normal leading-[1.2]">
									London 32 is
								</span>
								<h1 className="font-title-wide text-[56px] sm:text-[88px] md:text-[112px] lg:text-[128px] text-white leading-[0.9] tracking-tight">
									a central hub
									<span className="text-brand-yellow">.</span>
								</h1>
							</div>
						</div>
					</div>
				</section>

				{/* 2. Content Section */}
				<section className="bg-[#080708] pt-20 pb-32">
					<div className="max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24 w-full">
						{/* Introductory copy */}
						<div className="grid grid-cols-12 gap-4 mb-24">
							<div className="col-span-12">
								<p className="font-body-custom text-[20px] sm:text-[24px] text-white leading-relaxed">
									We help{" "}
									<span className="text-brand-yellow">
										churches
									</span>
									,{" "}
									<span className="text-brand-yellow">
										Christians
									</span>{" "}
									and{" "}
									<span className="text-brand-yellow">
										pastors
									</span>{" "}
									to
								</p>
							</div>
						</div>

						{/* Connect section title */}
						<div className="flex flex-col mb-24">
							<h2 className="font-title-wide text-[40px] sm:text-[52px] md:text-[64px] text-white leading-none tracking-tight">
								connect,
							</h2>
						</div>

						{/* Communicate section title */}
						<div className="flex flex-col mb-24">
							<h2 className="font-title-wide text-[40px] sm:text-[52px] md:text-[64px] text-white leading-none tracking-tight">
								communicate,
							</h2>
						</div>

						{/* Collaborate section title */}
						<div className="flex flex-col">
							<h2 className="font-title-wide text-[40px] sm:text-[52px] md:text-[64px] text-white leading-none tracking-tight">
								and collaborate.
							</h2>
						</div>
					</div>
				</section>
			</div>
		</main>
	);
}
