"use client";

import React, { useCallback, useRef } from "react";
import { useBaseCanvasAnimation } from "./useBaseCanvasAnimation";

export default function CommunicateAnimation() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const animationRef = useRef<number | null>(null);
	const leftCountRef = useRef<number>(1); // begins as 1 circle
	const rightCountRef = useRef<number>(1); // begins as 1 circle
	const frameCountRef = useRef<number>(0);
	const progressRef = useRef<number[]>(Array(24).fill(0));

	const draw = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const w = canvas.width;
		const h = canvas.height;

		// Clear canvas
		ctx.clearRect(0, 0, w, h);

		// Diameter of each circle is w / 24
		// Radius is half of the diameter
		// Centered vertically using canvas height h
		const diameter = w / 24;
		const radius = diameter / 2;
		const centerY = h / 2;

		// Draw all 24 circles with individual ease-out progress
		for (let i = 0; i < 24; i++) {
			const p = progressRef.current[i];
			if (p <= 0.001) continue; // Skip drawing if too small

			const x = i * diameter + radius;
			const y = centerY;

			ctx.save();
			ctx.globalAlpha = p; // Simultaneously fade
			ctx.fillStyle = i < 12 ? "#df2935" : "#fdca40"; // brand-red on left, brand-yellow on right
			ctx.beginPath();
			// Simultaneously scale from center
			ctx.arc(x, y, radius * p, 0, 2 * Math.PI);
			ctx.fill();
			ctx.restore();
		}
	}, [canvasRef]);

	const startAnimation = useCallback(() => {
		// Cancel any existing animation frame
		if (animationRef.current !== null) {
			cancelAnimationFrame(animationRef.current);
		}

		const tick = () => {
			frameCountRef.current += 1;

			// Every 4 frames (approx. 66ms at 60fps), change the circle count
			if (frameCountRef.current >= 4) {
				frameCountRef.current = 0;

				// Change in left circle-count should only be up to +3 or -3, min=0, max=9
				const deltaLeft = Math.floor(Math.random() * 7) - 3; // -3, -2, -1, 0, 1, 2, 3
				leftCountRef.current = Math.max(
					0,
					Math.min(9, leftCountRef.current + deltaLeft),
				);

				// Change in right circle-count should only be up to +3 or -3, min=0, max=9
				const deltaRight = Math.floor(Math.random() * 7) - 3; // -3, -2, -1, 0, 1, 2, 3
				rightCountRef.current = Math.max(
					0,
					Math.min(9, rightCountRef.current + deltaRight),
				);
			}

			// Smoothly update progress of all 24 circles towards target with an ease-out timing formula
			for (let i = 0; i < 24; i++) {
				const target =
					i < leftCountRef.current || i >= 24 - rightCountRef.current
						? 1.0
						: 0.0;
				const current = progressRef.current[i];

				// Easing constant (0.20 matches a fast but super smooth volume meter glide)
				progressRef.current[i] = current + (target - current) * 0.2;
			}

			draw();
			animationRef.current = requestAnimationFrame(tick);
		};

		// Start the loop
		animationRef.current = requestAnimationFrame(tick);
	}, [draw]);

	const stopAnimation = useCallback(() => {
		if (animationRef.current !== null) {
			cancelAnimationFrame(animationRef.current);
			animationRef.current = null;
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
				id="communicate-animation"
				className="w-full h-auto block"
				style={{ aspectRatio: "24 / 1" }}
			/>
		</div>
	);
}
