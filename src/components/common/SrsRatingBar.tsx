export type SrsRating = "superhard" | "hard" | "good" | "easy";

interface SrsButton {
	rating: SrsRating;
	emoji: string;
	label: string;
	interval: string;
	borderColor: string;
	bgColor: string;
}

const SRS_BUTTONS: SrsButton[] = [
	{
		rating: "superhard",
		emoji: "😰",
		label: "Super hard",
		interval: "Again (1 min)",
		borderColor: "#F4C0D1",
		bgColor: "#FDF5F8",
	},
	{
		rating: "hard",
		emoji: "😅",
		label: "Hard",
		interval: "10 minutes",
		borderColor: "#F0997B",
		bgColor: "#FFF5F2",
	},
	{
		rating: "good",
		emoji: "🙂",
		label: "Good",
		interval: "1 day",
		borderColor: "var(--ice-deep)",
		bgColor: "var(--bg-base)",
	},
	{
		rating: "easy",
		emoji: "😄",
		label: "Easy",
		interval: "4 days",
		borderColor: "#9FE1CB",
		bgColor: "#F0FBF7",
	},
];

interface SrsRatingBarProps {
	question?: string;
	selectedRating?: SrsRating | null;
	onRate: (rating: SrsRating) => void;
}

export function SrsRatingBar({
	question = "How well did you know this?",
	selectedRating,
	onRate,
}: SrsRatingBarProps) {
	return (
		<div
			className="mt-5 border-t-[1.5px] pt-5"
			style={{ borderColor: "var(--ice-mid)" }}
		>
			<p
				className="mb-3 text-center text-[13px] font-bold uppercase tracking-[0.5px]"
				style={{ color: "var(--milk-soft)" }}
			>
				{question}
			</p>

			<div className="grid grid-cols-4 gap-2">
				{SRS_BUTTONS.map(
					({ rating, emoji, label, interval, borderColor, bgColor }) => {
						const isSelected = selectedRating === rating;
						return (
							<button
								key={rating}
								type="button"
								onClick={() => onRate(rating)}
								className="rounded-xl border-[1.5px] px-2 py-2.5 text-center transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(90,174,212,0.18)]"
								style={{
									borderColor: isSelected ? "var(--sky)" : borderColor,
									background: bgColor,
									boxShadow: isSelected
										? "0 0 0 2px rgba(90,174,212,0.25)"
										: undefined,
								}}
							>
								<span className="mb-0.5 block text-[20px] leading-none">
									{emoji}
								</span>
								<span
									className="block text-[11px] font-extrabold"
									style={{ color: "var(--milk)" }}
								>
									{label}
								</span>
								<span
									className="mt-0.5 block text-[10px]"
									style={{ color: "var(--milk-soft)" }}
								>
									{interval}
								</span>
							</button>
						);
					},
				)}
			</div>
		</div>
	);
}
