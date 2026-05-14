export interface SrsItem {
	label: string;
	count: number;
	color: string;
}

interface SrsQueueCardProps {
	items: SrsItem[];
}

export function SrsQueueCard({ items }: SrsQueueCardProps) {
	const total = items.reduce((sum, item) => sum + item.count, 0);

	return (
		<div
			className="rounded-xl border-[1.5px] bg-white p-5"
			style={{ borderColor: "var(--ice-mid)", boxShadow: "var(--shadow-card)" }}
		>
			<p
				className="mb-4 flex items-center gap-1.5 text-[13px] font-extrabold uppercase tracking-[0.5px]"
				style={{ color: "var(--milk-soft)" }}
			>
				🔁 Spaced repetition queue
			</p>

			<div className="flex flex-col gap-3">
				{items.map(({ label, count, color }) => {
					const barPct = total > 0 ? Math.round((count / total) * 100) : 0;
					return (
						<div key={label}>
							<div className="mb-1 flex items-center gap-2.5">
								<div
									className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
									style={{ background: color }}
								/>
								<span
									className="flex-1 text-[12px]"
									style={{ color: "var(--milk-soft)" }}
								>
									{label}
								</span>
								<span
									className="text-[14px] font-extrabold"
									style={{ color: "var(--milk)" }}
								>
									{count}
								</span>
							</div>
							{/* Mini bar */}
							<div
								className="ml-5 h-[5px] overflow-hidden rounded-full"
								style={{ background: "var(--bg-base)" }}
							>
								<div
									className="h-full rounded-full transition-[width] duration-700"
									style={{ width: `${barPct}%`, background: color }}
								/>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
