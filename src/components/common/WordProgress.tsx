interface WordProgressProps {
	current: number;
	total: number;
}

export function WordProgress({ current, total }: WordProgressProps) {
	const pct = Math.min(100, Math.round((current / total) * 100));

	return (
		<div className="mb-6">
			<div
				className="mb-1.5 flex justify-between text-[12px] font-semibold"
				style={{ color: "var(--milk-soft)" }}
			>
				<span>
					Card {current} of {total}
				</span>
				<span>{pct}% complete</span>
			</div>
			<div
				className="h-[7px] overflow-hidden rounded-full"
				style={{ background: "var(--ice-mid)" }}
			>
				<div
					className="h-full rounded-full transition-[width] duration-500"
					style={{ width: `${pct}%`, background: "var(--sky)" }}
				/>
			</div>
		</div>
	);
}
