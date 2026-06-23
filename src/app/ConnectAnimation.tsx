"use client";

import React, { useCallback, useRef } from "react";
import { useBaseCanvasAnimation } from "./useBaseCanvasAnimation";

export default function ConnectAnimation() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const animationRef = useRef<number | null>(null);
	const currentStepRef = useRef<number>(0);
	const frameCountRef = useRef<number>(0);
	const progressRef = useRef<number[]>(Array(24).fill(0));

	const phaseRef = useRef<"in" | "hold" | "out">("in");
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const draw = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const w = canvas.width;
		const h = canvas.height;

		// Clear canvas
		ctx.clearRect(0, 0, w, h);

		// Diameter of each circle is h (full-height)
		// Radius is h / 2
		const diameter = h;
		const radius = h / 2;

		// Draw all 24 circles with individual ease-out progress
		for (let i = 0; i < 24; i++) {
			const p = progressRef.current[i];
			if (p <= 0.001) continue; // Skip drawing if too small

			const x = i * diameter + radius;
			const y = radius;

			ctx.save();
			ctx.globalAlpha = p; // Simultaneously fade in
			ctx.fillStyle = "#fdca40"; // Brand yellow
			ctx.beginPath();
			// Simultaneously scale in from the center
			ctx.arc(x, y, radius * p, 0, 2 * Math.PI);
			ctx.fill();
			ctx.restore();
		}
	}, [canvasRef]);

	const startAnimation = useCallback(() => {
		// Cancel any existing animation frame and timer
		if (animationRef.current !== null) {
			cancelAnimationFrame(animationRef.current);
		}
		if (timerRef.current !== null) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}

		// Reset animation state
		progressRef.current = Array(24).fill(0);
		currentStepRef.current = 0;
		frameCountRef.current = 0;
		phaseRef.current = "in";

		const tick = () => {
			if (phaseRef.current === "hold") {
				return;
			}

			frameCountRef.current += 1;

			// Add a circle on each side every 4 frames (approx 66ms)
			// to create a beautiful, cascaded easing wave
			if (currentStepRef.current < 12) {
				if (frameCountRef.current >= 4) {
					frameCountRef.current = 0;
					currentStepRef.current += 1;
				}
			}

			let allDone = true;

			// Update easing progress for each circle slot
			for (let i = 0; i < 24; i++) {
				let target = 0.0;
				if (phaseRef.current === "in") {
					target =
						i < currentStepRef.current ||
						i >= 24 - currentStepRef.current
							? 1.0
							: 0.0;
				} else if (phaseRef.current === "out") {
					target =
						i < currentStepRef.current ||
						i >= 24 - currentStepRef.current
							? 0.0
							: 1.0;
				}

				const current = progressRef.current[i];

				// Easing constant (0.15 matches an elegant ease-out timing curve)
				const next = current + (target - current) * 0.15;
				progressRef.current[i] = next;

				if (Math.abs(target - next) > 0.001) {
					allDone = false;
				} else {
					progressRef.current[i] = target; // snap to exact target
				}
			}

			draw();

			// Handle transition between phases
			if (currentStepRef.current >= 12 && allDone) {
				if (phaseRef.current === "in") {
					phaseRef.current = "hold";
					animationRef.current = null;
					timerRef.current = setTimeout(() => {
						phaseRef.current = "out";
						currentStepRef.current = 0;
						frameCountRef.current = 0;
						animationRef.current = requestAnimationFrame(tick);
					}, 2500);
				} else if (phaseRef.current === "out") {
					phaseRef.current = "in";
					currentStepRef.current = 0;
					frameCountRef.current = 0;
					animationRef.current = requestAnimationFrame(tick);
				}
			} else {
				animationRef.current = requestAnimationFrame(tick);
			}
		};

		// Start the loop
		animationRef.current = requestAnimationFrame(tick);
	}, [draw]);

	const stopAnimation = useCallback(() => {
		if (animationRef.current !== null) {
			cancelAnimationFrame(animationRef.current);
			animationRef.current = null;
		}
		if (timerRef.current !== null) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
	}, []);

	const handleResize = useCallback(() => {
		draw();
	}, [draw]);

	useBaseCanvasAnimation({
		canvasRef,
		onStart: startAnimation,
		onStop: stopAnimation,
		onResize: handleResize,
	});

	return (
		<div className="w-full">
			<canvas
				ref={canvasRef}
				id="connect-animation"
				className="w-full h-auto block"
				style={{ aspectRatio: "24 / 1" }}
			/>
		</div>
	);
}
