import { cn } from "#/lib/utils";

const WEEK_DAYS = [
	{ key: "mon", label: "M" },
	{ key: "tue", label: "T" },
	{ key: "wed", label: "W" },
	{ key: "thu", label: "T" },
	{ key: "fri", label: "F" },
	{ key: "sat", label: "S" },
	{ key: "sun", label: "S" },
] as const;

interface WeeklyStreakCardProps {
	streakCount: number;
	xpCurrent: number;
	xpTarget: number;
}

export function WeeklyStreakCard({
	streakCount,
	xpCurrent,
	xpTarget,
}: WeeklyStreakCardProps) {
	const dayOfWeek = new Date().getDay(); // 0=Sun
	const todayMonIdx = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // 0=Mon, 6=Sun
	const effectiveStreak = Math.min(streakCount, todayMonIdx + 1);
	const streakStartIdx = todayMonIdx - effectiveStreak + 1;
	const xpPct = Math.min(100, Math.round((xpCurrent / xpTarget) * 100));

	return (
		<div
			className="rounded-xl border-[1.5px] bg-white p-5"
			style={{ borderColor: "var(--ice-mid)", boxShadow: "var(--shadow-card)" }}
		>
			<p
				className="mb-3 flex items-center gap-1.5 text-[13px] font-extrabold uppercase tracking-[0.5px]"
				style={{ color: "var(--milk-soft)" }}
			>
				🗓 Weekly streak
			</p>

			{/* Day cells */}
			<div className="flex gap-1.5">
				{WEEK_DAYS.map(({ key, label }, i) => {
					const isToday = i === todayMonIdx;
					const isDone = !isToday && i >= streakStartIdx && i < todayMonIdx;

					return (
						<div
							key={key}
							className={cn(
								"flex h-8 flex-1 items-center justify-center rounded-lg text-[9px] font-bold",
								isToday || isDone ? "text-white" : "",
							)}
							style={{
								background: isToday
									? "var(--sky-deep)"
									: isDone
										? "var(--sky)"
										: "var(--bg-base)",
								border: isToday
									? "2px solid var(--sky)"
									: "2px solid transparent",
								color: !isToday && !isDone ? "var(--milk-soft)" : undefined,
							}}
						>
							{label}
						</div>
					);
				})}
			</div>

			{/* XP progress */}
			<div className="mt-4">
				<div
					className="mb-1.5 flex justify-between text-[12px]"
					style={{ color: "var(--milk-soft)" }}
				>
					<span>XP this week</span>
					<span className="font-bold">
						{xpCurrent} / {xpTarget}
					</span>
				</div>
				<div
					className="h-2.5 overflow-hidden rounded-full"
					style={{ background: "var(--ice-mid)" }}
				>
					<div
						className="h-full rounded-full transition-[width] duration-700"
						style={{
							width: `${xpPct}%`,
							background:
								"linear-gradient(90deg, var(--sky), var(--lavender-deep))",
						}}
					/>
				</div>
			</div>
		</div>
	);
}
