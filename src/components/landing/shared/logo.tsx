type LogoMarkProps = {
	className?: string;
};

/** Semang brand mark — the "antrean" arch with a status dot. */
export function LogoMark({ className }: LogoMarkProps) {
	return (
		<svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
			<path
				d="M9 27V11a7 7 0 0 1 14 0v16"
				stroke="currentColor"
				strokeWidth="2.4"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<circle cx="19.2" cy="18" r="1.4" fill="currentColor" />
		</svg>
	);
}
