import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { type ReactNode, useState } from "react";
import { ExampleBox } from "#/components/common/ExampleBox";
import { type SrsRating, SrsRatingBar } from "#/components/common/SrsRatingBar";
import { WordProgress } from "#/components/common/WordProgress";
import { cn } from "#/lib/utils";

export const Route = createFileRoute("/_auth/u/$id/vocab")({
	component: Vocab,
});

// ─── Types ────────────────────────────────────────────────────────────────────

type StudyMode = "guess" | "flashcard" | "write" | "mcq";

interface McqOption {
	chinese: string;
	pinyin: string;
	isCorrect: boolean;
}

interface VocabCard {
	id: string;
	chinese: string;
	pinyin: string;
	definition: string;
	partOfSpeech: string;
	example: { chinese: string; pinyin: string; english: string };
	breakdown: { char: string; pinyin: string; meaning: string }[];
	mcqOptions: McqOption[];
	sessionCurrent: number;
	sessionTotal: number;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_CARD: VocabCard = {
	id: "xue-xi",
	chinese: "学习",
	pinyin: "xué xí",
	definition: "to study / to learn",
	partOfSpeech: "verb",
	example: {
		chinese: "我每天都在学习中文。",
		pinyin: "Wǒ měi tiān dōu zài xuéxí zhōngwén.",
		english: "I study Chinese every day.",
	},
	breakdown: [
		{ char: "学", pinyin: "xué", meaning: "learn" },
		{ char: "习", pinyin: "xí", meaning: "practice" },
	],
	mcqOptions: [
		{ chinese: "开心", pinyin: "kāixīn", isCorrect: false },
		{ chinese: "学习", pinyin: "xuéxí", isCorrect: true },
		{ chinese: "吃饭", pinyin: "chīfàn", isCorrect: false },
		{ chinese: "朋友", pinyin: "péngyou", isCorrect: false },
	],
	sessionCurrent: 7,
	sessionTotal: 20,
};

const MOCK_SESSION = {
	cardsReviewed: 6,
	accuracy: 83,
	timeMinutes: 12,
	xpEarned: 60,
};

const MODES: { id: StudyMode; label: string }[] = [
	{ id: "guess", label: "🎯 Guess the vocab" },
	{ id: "flashcard", label: "🃏 Flashcard" },
	{ id: "write", label: "✍️ Practice writing" },
	{ id: "mcq", label: "🔀 Reverse MCQ" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

function Vocab() {
	const { id: _id } = Route.useParams();
	const [mode, setMode] = useState<StudyMode>("guess");
	const [selectedRating, setSelectedRating] = useState<SrsRating | null>(null);
	const [flipped, setFlipped] = useState(false);
	const [selectedMcq, setSelectedMcq] = useState<number | null>(null);
	const [sideFlashRevealed, setSideFlashRevealed] = useState(false);

	const { data: card, isPending } = useQuery({
		queryKey: ["vocab-card", MOCK_CARD.id],
		queryFn: async () => MOCK_CARD,
	});

	function handleModeChange(newMode: StudyMode) {
		setMode(newMode);
		setSelectedRating(null);
		setFlipped(false);
		setSelectedMcq(null);
	}

	if (isPending || !card) {
		return (
			<div
				className="flex min-h-screen items-center justify-center text-[14px] font-semibold"
				style={{ color: "var(--milk-soft)" }}
			>
				Loading…
			</div>
		);
	}

	return (
		<div className="min-h-screen p-4 sm:p-6">
			<div className="mx-auto w-full max-w-5xl space-y-4">
				{/* Mode switcher */}
				<div className="flex flex-wrap gap-2">
					{MODES.map(({ id, label }) => (
						<button
							key={id}
							type="button"
							onClick={() => handleModeChange(id)}
							className={cn(
								"flex items-center gap-1.5 rounded-full border-[1.5px] px-4 py-2 text-[12px] font-bold",
								"transition-all duration-200",
								mode === id
									? "text-white"
									: "border-ice-mid bg-white hover:bg-(--bg-base)",
							)}
							style={
								mode === id
									? {
											background: "var(--sky)",
											borderColor: "var(--sky)",
											color: "white",
										}
									: { color: "var(--milk-soft)" }
							}
						>
							{label}
						</button>
					))}
				</div>

				{/* Main layout */}
				<div className="flex flex-col gap-4 lg:flex-row lg:items-start">
					{/* Word card */}
					<div
						className="min-w-0 flex-1 rounded-xl border-[1.5px] bg-white p-8"
						style={{
							borderColor: "var(--ice-mid)",
							boxShadow: "var(--shadow)",
						}}
					>
						<WordProgress
							current={card.sessionCurrent}
							total={card.sessionTotal}
						/>

						{mode === "guess" && (
							<GuessMode
								card={card}
								selectedRating={selectedRating}
								onRate={setSelectedRating}
							/>
						)}
						{mode === "flashcard" && (
							<FlashMode
								card={card}
								flipped={flipped}
								onFlip={() => setFlipped((f) => !f)}
								selectedRating={selectedRating}
								onRate={setSelectedRating}
							/>
						)}
						{mode === "write" && (
							<WriteMode
								card={card}
								selectedRating={selectedRating}
								onRate={setSelectedRating}
							/>
						)}
						{mode === "mcq" && (
							<McqMode
								card={card}
								selectedMcq={selectedMcq}
								onSelectMcq={setSelectedMcq}
								selectedRating={selectedRating}
								onRate={setSelectedRating}
							/>
						)}
					</div>

					{/* Side panel */}
					<div className="flex flex-col gap-3 lg:w-80 lg:flex-shrink-0">
						{/* Quick flashcard */}
						<SideCard title="📝 Quick flashcard">
							<button
								type="button"
								className="w-full rounded-xl p-5 text-center transition-transform duration-200 hover:scale-[1.02] active:scale-[0.99]"
								style={{
									background:
										"linear-gradient(135deg, var(--bg-base), var(--lavender))",
								}}
								onClick={() => setSideFlashRevealed((r) => !r)}
							>
								<span
									className="font-chinese block text-[36px] font-bold leading-none"
									style={{ color: "var(--sky-deep)" }}
								>
									{card.chinese}
								</span>
								<span
									className="mt-2 block text-[12px]"
									style={{ color: "var(--milk-soft)" }}
								>
									{sideFlashRevealed
										? `${card.pinyin} · ${card.definition}`
										: "Tap to reveal"}
								</span>
							</button>
						</SideCard>

						{/* Session stats */}
						<SideCard title="📊 Today's session">
							<div className="flex flex-col gap-2">
								<StatRow
									label="Cards reviewed"
									value={String(MOCK_SESSION.cardsReviewed)}
								/>
								<StatRow
									label="Accuracy"
									value={`${MOCK_SESSION.accuracy}%`}
									valueColor="#5DCAA5"
								/>
								<StatRow
									label="Time studying"
									value={`${MOCK_SESSION.timeMinutes} min`}
								/>
								<StatRow
									label="XP earned"
									value={`+${MOCK_SESSION.xpEarned} ⭐`}
									valueColor="var(--sky-deep)"
								/>
							</div>
						</SideCard>

						{/* Word breakdown */}
						<SideCard title="🗂 Word breakdown">
							<div className="text-center">
								<span
									className="font-chinese text-[36px] font-bold"
									style={{ color: "var(--sky-deep)" }}
								>
									{card.chinese}
								</span>
								<div className="mt-3 flex justify-center gap-2">
									{card.breakdown.map(({ char, pinyin: py, meaning }) => (
										<div
											key={char}
											className="rounded-xl px-3.5 py-2 text-center"
											style={{ background: "var(--bg-base)" }}
										>
											<span
												className="font-chinese block text-[24px]"
												style={{ color: "var(--sky-deep)" }}
											>
												{char}
											</span>
											<span
												className="mt-0.5 block text-[11px]"
												style={{ color: "var(--milk-soft)" }}
											>
												{py} · {meaning}
											</span>
										</div>
									))}
								</div>
							</div>
						</SideCard>
					</div>
				</div>
			</div>
		</div>
	);
}

// ─── Shared within-page helpers ───────────────────────────────────────────────

function PoSTag({ label }: { label: string }) {
	return (
		<span
			className="inline-block rounded-full px-2.5 py-0.5 text-[11px] font-extrabold"
			style={{ background: "var(--lavender)", color: "var(--sky-deep)" }}
		>
			{label}
		</span>
	);
}

function WordCenter({ card }: { card: VocabCard }) {
	return (
		<div className="py-6 text-center">
			<PoSTag label={card.partOfSpeech} />
			<div
				className="font-chinese mt-3 text-[72px] font-bold leading-none"
				style={{
					color: "var(--sky-deep)",
					textShadow: "0 2px 8px rgba(58,135,176,0.12)",
				}}
			>
				{card.chinese}
			</div>
			<div
				className="mt-2 text-[22px] font-semibold tracking-wide"
				style={{ color: "var(--milk-soft)" }}
			>
				{card.pinyin}
			</div>
			<div
				className="mt-3 text-[18px] font-bold"
				style={{ color: "var(--milk)" }}
			>
				{card.definition}
			</div>
		</div>
	);
}

function SideCard({ title, children }: { title: string; children: ReactNode }) {
	return (
		<div
			className="rounded-xl border-[1.5px] bg-white p-4"
			style={{ borderColor: "var(--ice-mid)", boxShadow: "var(--shadow-card)" }}
		>
			<p
				className="mb-3 flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.5px]"
				style={{ color: "var(--milk-soft)" }}
			>
				{title}
			</p>
			{children}
		</div>
	);
}

function StatRow({
	label,
	value,
	valueColor,
}: {
	label: string;
	value: string;
	valueColor?: string;
}) {
	return (
		<div className="flex items-center justify-between text-[13px]">
			<span style={{ color: "var(--milk-soft)" }}>{label}</span>
			<span
				className="font-bold"
				style={{ color: valueColor ?? "var(--milk)" }}
			>
				{value}
			</span>
		</div>
	);
}

// ─── Mode sub-components ──────────────────────────────────────────────────────

function GuessMode({
	card,
	selectedRating,
	onRate,
}: {
	card: VocabCard;
	selectedRating: SrsRating | null;
	onRate: (r: SrsRating) => void;
}) {
	return (
		<>
			<WordCenter card={card} />
			<ExampleBox
				chinese={card.example.chinese}
				pinyin={card.example.pinyin}
				english={card.example.english}
			/>
			<SrsRatingBar selectedRating={selectedRating} onRate={onRate} />
		</>
	);
}

function FlashMode({
	card,
	flipped,
	onFlip,
	selectedRating,
	onRate,
}: {
	card: VocabCard;
	flipped: boolean;
	onFlip: () => void;
	selectedRating: SrsRating | null;
	onRate: (r: SrsRating) => void;
}) {
	return (
		<>
			<button
				type="button"
				className="w-full py-6 text-center transition-opacity duration-150 hover:opacity-90"
				onClick={onFlip}
			>
				<div
					className="font-chinese text-[72px] font-bold leading-none"
					style={{
						color: "var(--sky-deep)",
						textShadow: "0 2px 8px rgba(58,135,176,0.12)",
					}}
				>
					{card.chinese}
				</div>

				{flipped ? (
					<>
						<div
							className="mt-2 text-[22px] font-semibold tracking-wide"
							style={{ color: "var(--milk-soft)" }}
						>
							{card.pinyin}
						</div>
						<div
							className="mt-2 text-[18px] font-bold"
							style={{ color: "var(--milk)" }}
						>
							{card.definition}
						</div>
					</>
				) : (
					<p className="mt-4 text-[13px]" style={{ color: "var(--milk-soft)" }}>
						Tap to reveal ↓
					</p>
				)}
			</button>

			<ExampleBox
				chinese={card.example.chinese}
				pinyin={card.example.pinyin}
				english={card.example.english}
			/>
			<SrsRatingBar selectedRating={selectedRating} onRate={onRate} />
		</>
	);
}

function WriteMode({
	card,
	selectedRating,
	onRate,
}: {
	card: VocabCard;
	selectedRating: SrsRating | null;
	onRate: (r: SrsRating) => void;
}) {
	return (
		<>
			<div className="py-6 text-center">
				<PoSTag label={card.partOfSpeech} />
				<div
					className="mt-3 text-[28px] font-semibold tracking-wide"
					style={{ color: "var(--milk-soft)" }}
				>
					{card.pinyin}
				</div>
				<div
					className="mt-2 text-[18px] font-bold"
					style={{ color: "var(--milk)" }}
				>
					{card.definition}
				</div>
			</div>

			<div
				className="rounded-xl px-6 py-7 text-center"
				style={{ background: "var(--bg-base)" }}
			>
				<span
					className="font-chinese block text-[56px] font-bold leading-none opacity-[0.18]"
					style={{ color: "var(--sky-deep)" }}
				>
					{card.chinese}
				</span>
				<p className="mt-3 text-[13px]" style={{ color: "var(--milk-soft)" }}>
					Trace the character above in the air, then rate yourself
				</p>
			</div>

			<SrsRatingBar
				question="How well could you write it?"
				selectedRating={selectedRating}
				onRate={onRate}
			/>
		</>
	);
}

function McqMode({
	card,
	selectedMcq,
	onSelectMcq,
	selectedRating,
	onRate,
}: {
	card: VocabCard;
	selectedMcq: number | null;
	onSelectMcq: (idx: number) => void;
	selectedRating: SrsRating | null;
	onRate: (r: SrsRating) => void;
}) {
	const revealed = selectedMcq !== null;

	return (
		<>
			<div className="py-6 text-center">
				<PoSTag label={card.partOfSpeech} />
				<div
					className="mt-4 text-[18px] font-bold"
					style={{ color: "var(--milk)" }}
				>
					Which character means "{card.definition}"?
				</div>
			</div>

			<div className="flex flex-col gap-2 pb-4">
				{card.mcqOptions.map(({ chinese, pinyin: py, isCorrect }, idx) => {
					const isSelected = selectedMcq === idx;
					return (
						<button
							key={chinese}
							type="button"
							disabled={revealed}
							onClick={() => onSelectMcq(idx)}
							className={cn(
								"rounded-xl border-[1.5px] px-4 py-3 text-left text-[13px] font-semibold",
								"transition-all duration-150",
								!revealed && "hover:bg-(--bg-base) cursor-pointer",
								revealed && isCorrect && "font-bold",
							)}
							style={{
								borderColor: revealed
									? isCorrect
										? "#5DCAA5"
										: isSelected
											? "#F0997B"
											: "var(--ice-mid)"
									: "var(--ice-mid)",
								background: revealed
									? isCorrect
										? "#F0FBF7"
										: isSelected
											? "#FFF5F2"
											: "white"
									: "white",
								color: revealed
									? isCorrect
										? "#0F6E56"
										: isSelected
											? "#993C1D"
											: "var(--milk-soft)"
									: "var(--milk)",
							}}
						>
							<span className="font-chinese">{chinese}</span>
							<span className="ml-1.5 font-normal opacity-70">({py})</span>
							{revealed && isCorrect && (
								<span className="ml-2 text-[12px]">✓</span>
							)}
							{revealed && isSelected && !isCorrect && (
								<span className="ml-2 text-[12px]">✗</span>
							)}
						</button>
					);
				})}
			</div>

			<SrsRatingBar selectedRating={selectedRating} onRate={onRate} />
		</>
	);
}
