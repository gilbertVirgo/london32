"use client";

import { useEffect, useRef, RefObject } from "react";

interface BaseCanvasAnimationOptions {
	canvasRef: RefObject<HTMLCanvasElement | null>;
	onStart: () => void;
	onStop: () => void;
	onResize?: (width: number, height: number) => void;
}

export function useBaseCanvasAnimation({
	canvasRef,
	onStart,
	onStop,
	onResize,
}: BaseCanvasAnimationOptions) {
	const isIntersectingRef = useRef<boolean>(false);

	// Use refs to store callback values to avoid restarting useEffect when they change
	const onStartRef = useRef(onStart);
	const onStopRef = useRef(onStop);
	const onResizeRef = useRef(onResize);

	// Update the callback refs after render to ensure we always have the latest functions
	useEffect(() => {
		onStartRef.current = onStart;
		onStopRef.current = onStop;
		onResizeRef.current = onResize;
	});

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		// Intersection Observer to detect scroll into view
		const intersectionObserver = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				isIntersectingRef.current = entry.isIntersecting;

				if (entry.isIntersecting) {
					onStartRef.current();
				} else {
					onStopRef.current();
				}
			},
			{ threshold: 0.1 }
		);

		intersectionObserver.observe(canvas);

		// Resize Observer to detect changes in container size
		const resizeObserver = new ResizeObserver((entries) => {
			if (entries.length === 0) return;
			const canvasEl = canvasRef.current;
			if (!canvasEl) return;

			const rect = canvasEl.getBoundingClientRect();
			const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

			// Set width and height matching high DPI screens
			const physicalWidth = rect.width * dpr;
			const physicalHeight = (rect.width / 24) * dpr;

			canvasEl.width = physicalWidth;
			canvasEl.height = physicalHeight;

			if (onResizeRef.current) {
				onResizeRef.current(physicalWidth, physicalHeight);
			}

			// If in view, trigger start/restart, otherwise stop
			if (isIntersectingRef.current) {
				onStartRef.current();
			} else {
				onStopRef.current();
			}
		});

		resizeObserver.observe(canvas);

		return () => {
			intersectionObserver.disconnect();
			resizeObserver.disconnect();
			onStopRef.current();
		};
	}, [canvasRef]);
}
