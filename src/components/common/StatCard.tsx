import { cn } from "#/lib/utils";

interface StatCardProps {
	icon: string;
	value: string | number;
	label: string;
	className?: string;
}

export function StatCard({ icon, value, label, className }: StatCardProps) {
	return (
		<div
			className={cn(
				"rounded-xl border-[1.5px] bg-white p-4",
				"transition-all duration-200 hover:-translate-y-0.5",
				className,
			)}
			style={{
				borderColor: "var(--ice-mid)",
				boxShadow: "var(--shadow-card)",
			}}
		>
			<div className="mb-2 text-xl leading-none">{icon}</div>
			<div
				className="text-[26px] font-extrabold leading-none"
				style={{ color: "var(--sky-deep)" }}
			>
				{value}
			</div>
			<div
				className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.5px]"
				style={{ color: "var(--milk-soft)" }}
			>
				{label}
			</div>
		</div>
	);
}
