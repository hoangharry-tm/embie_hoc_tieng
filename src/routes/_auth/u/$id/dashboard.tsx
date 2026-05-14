import { HSK_LEVELS, HskSelector } from "#/components/common/HskSelector";
import { type SrsItem, SrsQueueCard } from "#/components/common/SrsQueueCard";
import { StatCard } from "#/components/common/StatCard";
import { WeeklyStreakCard } from "#/components/common/WeeklyStreakCard";
import { Button } from "#/components/ui/button";
import { cn } from "#/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_auth/u/$id/dashboard")({
	component: Dashboard,
});

// ─── Mock data ────────────────────────────────────────────────────────────────

interface DashboardStats {
	name: string;
	streak: number;
	totalXp: number;
	dueToday: number;
	wordsLearned: number;
	xpTarget: number;
	srsQueue: SrsItem[];
}

async function fetchDashboard(_userId: string): Promise<DashboardStats> {
	return {
		name: "Em Bé",
		streak: 7,
		totalXp: 420,
		dueToday: 18,
		wordsLearned: 142,
		xpTarget: 700,
		srsQueue: [
			{ label: "Overdue", count: 5, color: "#E24B4A" },
			{ label: "Due today", count: 13, color: "#EF9F27" },
			{ label: "Due tomorrow", count: 22, color: "var(--sky)" },
			{ label: "Mastered 🎉", count: 102, color: "#5DCAA5" },
		],
	};
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function Dashboard() {
	const { id } = Route.useParams();
	const [selectedHsk, setSelectedHsk] = useState(1);

	const { data, isPending } = useQuery({
		queryKey: ["dashboard", id],
		queryFn: () => fetchDashboard(id),
	});

	if (isPending || !data) {
		return (
			<div
				className="flex min-h-screen items-center justify-center text-[14px] font-semibold"
				style={{ color: "var(--milk-soft)" }}
			>
				Loading…
			</div>
		);
	}

	const { name, streak, totalXp, dueToday, wordsLearned, xpTarget, srsQueue } =
		data;

	return (
		<div className="min-h-screen p-4 sm:p-6">
			<div className="mx-auto w-full max-w-5xl space-y-5">
				{/* ── App header ── */}
				<header
					className="flex items-center justify-between rounded-xl border-[1.5px] bg-white px-4 py-3"
					style={{
						borderColor: "var(--ice-mid)",
						boxShadow: "var(--shadow-card)",
					}}
				>
					<Link to="/" className="flex items-center gap-2.5 no-underline">
						<span className="text-2xl leading-none">🍼</span>
						<span
							className="text-[15px] font-extrabold"
							style={{ color: "var(--sky-deep)" }}
						>
							em bíe học tiếng
						</span>
					</Link>
					<nav className="flex items-center gap-1">
						<Link
							to="/u/$id/dashboard"
							params={{ id }}
							className={cn(
								"rounded-lg px-3 py-1.5 text-[13px] font-bold transition-colors",
								"bg-(--bg-base)",
							)}
							style={{ color: "var(--sky-deep)" }}
						>
							Dashboard
						</Link>
						<Link
							to="/u/$id/vocab"
							params={{ id }}
							className="rounded-lg px-3 py-1.5 text-[13px] font-bold transition-colors hover:bg-(--bg-base)"
							style={{ color: "var(--milk-soft)" }}
						>
							Study
						</Link>
					</nav>
				</header>

				{/* ── Greeting + avatar ── */}
				<div className="flex items-center justify-between">
					<div>
						<h1
							className="text-[24px] font-extrabold"
							style={{ color: "var(--milk)" }}
						>
							Good morning,{" "}
							<span style={{ color: "var(--sky-deep)" }}>{name} 🍼</span>
						</h1>
						<p
							className="mt-1 text-[13px]"
							style={{ color: "var(--milk-soft)" }}
						>
							You've studied {streak} days in a row — keep it up! 🔥
						</p>
					</div>

					<div
						className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-[22px]"
						style={{
							background:
								"linear-gradient(135deg, var(--ice-deep), var(--lavender-deep))",
							border: "2.5px solid white",
							boxShadow: "0 2px 10px rgba(90,174,212,0.25)",
						}}
					>
						🍼
					</div>
				</div>

				{/* ── Stat cards ── */}
				<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
					<StatCard icon="🔥" value={streak} label="Day streak" />
					<StatCard icon="⭐" value={totalXp} label="Total XP" />
					<StatCard icon="📚" value={dueToday} label="Due today" />
					<StatCard icon="✅" value={wordsLearned} label="Words learned" />
				</div>

				{/* ── Main grid ── */}
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
					{/* Left: HSK selector */}
					<div
						className="rounded-xl border-[1.5px] bg-white p-5"
						style={{
							borderColor: "var(--ice-mid)",
							boxShadow: "var(--shadow-card)",
						}}
					>
						<p
							className="mb-3 flex items-center gap-1.5 text-[13px] font-extrabold uppercase tracking-[0.5px]"
							style={{ color: "var(--milk-soft)" }}
						>
							📖 HSK level progress
						</p>

						<HskSelector
							levels={HSK_LEVELS}
							selectedLevel={selectedHsk}
							onSelect={setSelectedHsk}
						/>

						<Button
							asChild
							className={cn(
								"mt-4 h-12 w-full rounded-full text-[14px] font-extrabold tracking-[0.3px]",
								"bg-linear-to-b from-(--sky) to-(--sky-deep) text-white",
								"shadow-[0_2px_12px_rgba(90,174,212,0.32)]",
								"hover:from-(--sky-deep) hover:to-(--sky-deep) hover:-translate-y-0.5",
								"hover:shadow-[0_8px_28px_rgba(90,174,212,0.45)]",
								"transition-all duration-200",
							)}
						>
							<Link to="/u/$id/vocab" params={{ id }}>
								Study now ✨
							</Link>
						</Button>
					</div>

					{/* Right: streak + SRS queue */}
					<div className="flex flex-col gap-4">
						<WeeklyStreakCard
							streakCount={streak}
							xpCurrent={totalXp}
							xpTarget={xpTarget}
						/>
						<SrsQueueCard items={srsQueue} />
					</div>
				</div>
			</div>
		</div>
	);
}
