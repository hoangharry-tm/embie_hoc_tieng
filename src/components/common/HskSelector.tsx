import { cn } from "#/lib/utils";

export interface HskLevel {
	level: number;
	name: string;
	progress: number;
	color: string;
}

export const HSK_LEVELS: HskLevel[] = [
	{ level: 1, name: "Basics", progress: 80, color: "#5AAED4" },
	{ level: 2, name: "Elementary", progress: 45, color: "#7EC8E3" },
	{ level: 3, name: "Intermediate", progress: 12, color: "#A8D8EA" },
	{ level: 4, name: "Upper-intermediate", progress: 0, color: "#C9E8F5" },
	{ level: 5, name: "Advanced", progress: 0, color: "#D9F0F8" },
	{ level: 6, name: "Mastery", progress: 0, color: "#EAF6FB" },
];

interface HskSelectorProps {
	levels: HskLevel[];
	selectedLevel: number;
	onSelect: (level: number) => void;
}

export function HskSelector({
	levels,
	selectedLevel,
	onSelect,
}: HskSelectorProps) {
	return (
		<div className="flex flex-col gap-1">
			{levels.map(({ level, name, progress, color }) => {
				const isSelected = selectedLevel === level;
				return (
					<button
						key={level}
						type="button"
						onClick={() => onSelect(level)}
						className={cn(
							"flex w-full items-center gap-2.5 rounded-xl border-[1.5px] px-2.5 py-2 text-left",
							"transition-all duration-150",
							isSelected
								? "bg-(--bg-base) border-(--sky)"
								: "border-transparent hover:bg-(--bg-base)",
						)}
					>
						{/* Level pill */}
						<div
							className="flex h-[22px] w-9 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold"
							style={{
								background: color,
								color: level <= 2 ? "white" : "var(--sky-deep)",
							}}
						>
							{level}
						</div>

						{/* Label + progress bar */}
						<div className="min-w-0 flex-1">
							<div
								className="mb-1 flex justify-between text-[11px]"
								style={{ color: "var(--milk-soft)" }}
							>
								<span>
									HSK {level} — {name}
								</span>
								<span className="font-bold">{progress}%</span>
							</div>
							<div
								className="h-[6px] overflow-hidden rounded-full"
								style={{ background: "var(--ice-mid)" }}
							>
								<div
									className="h-full rounded-full transition-[width] duration-500"
									style={{
										width: `${progress}%`,
										background:
											"linear-gradient(90deg, var(--sky), var(--sky-deep))",
									}}
								/>
							</div>
						</div>
					</button>
				);
			})}
		</div>
	);
}
