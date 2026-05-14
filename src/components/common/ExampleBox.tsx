interface ExampleBoxProps {
	chinese: string;
	pinyin: string;
	english: string;
}

export function ExampleBox({ chinese, pinyin, english }: ExampleBoxProps) {
	return (
		<div
			className="mt-5 rounded-xl border-l-[3px] px-5 py-4"
			style={{ background: "var(--bg-base)", borderLeftColor: "var(--sky)" }}
		>
			<p
				className="font-chinese mb-1 text-[17px] leading-relaxed"
				style={{ color: "var(--milk)" }}
			>
				{chinese}
			</p>
			<p className="mb-1 text-[13px]" style={{ color: "var(--milk-soft)" }}>
				{pinyin}
			</p>
			<p
				className="text-[13px] font-semibold"
				style={{ color: "var(--sky-deep)" }}
			>
				{english}
			</p>
		</div>
	);
}
