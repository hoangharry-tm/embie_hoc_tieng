import GoogleIcon from "#/components/common/GoogleIcon.tsx";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { cn } from "#/lib/utils";
import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({ component: Home });

const HSK_LEVELS = [
	"HSK 1",
	"HSK 2",
	"HSK 3",
	"HSK 4",
	"HSK 5",
	"HSK 6",
] as const;

type AuthTab = "login" | "signup";

const inputClass = cn(
	// geometry & layout
	"h-11 w-full rounded-xl px-4",
	// override shadcn defaults
	"border-[1.5px] border-ice-mid shadow-none",
	"bg-foam text-[14px] text-milk",
	"placeholder:text-warm-gray/60",
	// focus: swap ring color + tighten ring, shift bg to pure white
	"focus-visible:border-sky focus-visible:ring-[3px]",
	"focus-visible:ring-[rgba(90,174,212,0.18)] focus-visible:bg-white",
	"transition-[border-color,background-color,box-shadow] duration-150",
);

// ─── Primary button class — overrides shadcn's h-9 rounded-md bg-primary ─────

const primaryBtnClass = cn(
	// override size + shape
	"h-12 w-full rounded-full px-6",
	// override color
	"bg-sky text-white font-extrabold text-[15px] tracking-[0.3px]",
	// hover: deepen color + lift + glow
	"hover:bg-sky-deep hover:-translate-y-0.5",
	"hover:shadow-[0_6px_20px_rgba(90,174,212,0.35)]",
	// reset shadcn shadow & transition
	"shadow-none transition-all duration-200",
);

function LandingHero() {
	return (
		<div
			className="relative flex flex-col justify-center overflow-hidden px-10 py-12"
			// Inline style so the gradient resolves our CSS vars at runtime
			style={{
				background:
					"linear-gradient(160deg, var(--bg-base) 0%, #D0EDFB 60%, var(--lavender) 100%)",
			}}
		>
			{/* Decorative blobs — match prototype ::before / ::after */}
			<div className="pointer-events-none absolute -right-15 -top-15 h-55 w-55 rounded-full bg-white/35" />
			<div className="pointer-events-none absolute -bottom-10 -left-7.5 h-35 w-35 rounded-full bg-[rgba(157,208,238,0.3)]" />

			{/* Logo */}
			<div className="relative z-10 mb-6 flex items-center gap-3.5">
				<span
					className="text-[52px] leading-none"
					style={{
						filter: "drop-shadow(0 4px 8px rgba(90,174,212,0.28))",
					}}
				>
					🍼
				</span>
				<div>
					<p
						className="text-[22px] font-extrabold leading-snug"
						style={{ color: "var(--sky-deep)" }}
					>
						em bíe học tiếng
					</p>
					<p
						className="mt-1 text-[13px] font-medium"
						style={{ color: "var(--milk-soft)" }}
					>
						baby learns language ✨
					</p>
				</div>
			</div>

			{/* Tagline */}
			<h1
				className="relative z-10 text-[28px] font-extrabold leading-[1.35]"
				style={{ color: "var(--sky-deep)" }}
			>
				Learn Chinese,
				<br />
				<span style={{ color: "var(--milk)" }}>one word at a time.</span>
			</h1>
			<p
				className="relative z-10 mt-3 text-sm leading-relaxed"
				style={{ color: "var(--milk-soft)" }}
			>
				A cozy space built with love 💙
				<br />
				Flashcards, writing practice &amp; spaced repetition — all in one place.
			</p>

			{/* HSK level badges */}
			<div className="relative z-10 mt-6 flex flex-wrap gap-2">
				{HSK_LEVELS.map((level) => (
					<span
						key={level}
						className="rounded-full border-[1.5px] bg-white px-3 py-1 text-[11px] font-bold"
						style={{
							color: "var(--sky-deep)",
							borderColor: "var(--ice-deep)",
						}}
					>
						{level}
					</span>
				))}
			</div>
		</div>
	);
}

function FieldWrap({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) {
	return (
		<div className="space-y-1.5">
			<Label
				className="text-[11px] font-bold uppercase tracking-[0.6px]"
				style={{ color: "var(--milk-soft)" }}
			>
				{label}
			</Label>
			{children}
		</div>
	);
}

// ─── Login form ───────────────────────────────────────────────────────────────

function LoginForm() {
	const form = useForm({
		defaultValues: { email: "", password: "" },
		onSubmit: async ({ value }) => {
			console.log("login →", value);
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				void form.handleSubmit();
			}}
			className="space-y-4"
		>
			<form.Field name="email">
				{(field) => (
					<FieldWrap label="Email">
						<Input
							id={field.name}
							type="email"
							placeholder="em@cutemail.com"
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							className={inputClass}
						/>
					</FieldWrap>
				)}
			</form.Field>

			<form.Field name="password">
				{(field) => (
					<FieldWrap label="Password">
						<Input
							id={field.name}
							type="password"
							placeholder="••••••••"
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							className={inputClass}
						/>
					</FieldWrap>
				)}
			</form.Field>

			<Button
				type="submit"
				className={cn(
					primaryBtnClass,
					// CSS-var arbitrary values guarantee color resolution in Tailwind v4
					"bg-linear-to-b from-(--sky) to-(--sky-deep)",
					"shadow-[0_2px_12px_rgba(90,174,212,0.32)]",
					"hover:from-(--sky-deep) hover:to-(--sky-deep)",
					"hover:shadow-[0_8px_28px_rgba(90,174,212,0.45)]",
				)}
			>
				Log in 🍼
			</Button>
		</form>
	);
}

// ─── Signup form ──────────────────────────────────────────────────────────────

function SignupForm() {
	const form = useForm({
		defaultValues: { name: "", email: "", password: "" },
		onSubmit: async ({ value }) => {
			console.log("signup →", value);
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				void form.handleSubmit();
			}}
			className="space-y-4"
		>
			<form.Field name="name">
				{(field) => (
					<FieldWrap label="Your name">
						<Input
							id={field.name}
							type="text"
							placeholder="Em Bé 🍼"
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							className={inputClass}
						/>
					</FieldWrap>
				)}
			</form.Field>

			<form.Field name="email">
				{(field) => (
					<FieldWrap label="Email">
						<Input
							id={field.name}
							type="email"
							placeholder="em@cutemail.com"
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							className={inputClass}
						/>
					</FieldWrap>
				)}
			</form.Field>

			<form.Field name="password">
				{(field) => (
					<FieldWrap label="Password">
						<Input
							id={field.name}
							type="password"
							placeholder="Create a password"
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							className={inputClass}
						/>
					</FieldWrap>
				)}
			</form.Field>

			<Button
				type="submit"
				className={cn(
					primaryBtnClass,
					"bg-linear-to-b from-(--sky) to-(--sky-deep)",
					"shadow-[0_2px_12px_rgba(90,174,212,0.32)]",
					"hover:from-(--sky-deep) hover:to-(--sky-deep)",
					"hover:shadow-[0_8px_28px_rgba(90,174,212,0.45)]",
				)}
			>
				Start learning 🚀
			</Button>
		</form>
	);
}

// ─── Auth panel (right panel) ─────────────────────────────────────────────────

function AuthPanel() {
	const [tab, setTab] = useState<AuthTab>("login");

	return (
		<div className="flex flex-col justify-center px-10 py-12">
			<h2
				className="mb-1.5 text-[22px] font-extrabold"
				style={{ color: "var(--milk)" }}
			>
				Welcome back 👋
			</h2>
			<p className="mb-6 text-[13px]" style={{ color: "var(--milk-soft)" }}>
				Ready to study today, em bé?
			</p>

			{/* Tab switcher — pill container uses exact --bg-base ice color */}
			<div
				className="mb-6 flex rounded-full p-0.75"
				style={{ background: "var(--bg-base)" }}
			>
				{(["login", "signup"] as const).map((t) => (
					<button
						key={t}
						type="button"
						onClick={() => setTab(t)}
						className={cn(
							"flex-1 rounded-full py-2 text-[13px] font-bold transition-all duration-200",
							tab === t
								? "bg-white shadow-[0_2px_8px_rgba(90,174,212,0.2)]"
								: "hover:opacity-80",
						)}
						style={{
							color: tab === t ? "var(--sky-deep)" : "var(--milk-soft)",
						}}
					>
						{t === "login" ? "Log in" : "Sign up"}
					</button>
				))}
			</div>

			{tab === "login" ? <LoginForm /> : <SignupForm />}

			{/* Divider */}
			<div className="my-5 flex items-center gap-3">
				<div className="h-px flex-1" style={{ background: "var(--ice-mid)" }} />
				<span
					className="text-[12px] font-semibold"
					style={{ color: "var(--warm-gray)" }}
				>
					or
				</span>
				<div className="h-px flex-1" style={{ background: "var(--ice-mid)" }} />
			</div>

			{/* Google sign-in */}
			<button
				type="button"
				className="flex w-full items-center justify-center gap-2 rounded-full border-[1.5px] bg-white py-2.75 text-[14px] font-bold transition-all duration-200 hover:-translate-y-px hover:border-(--sky) hover:bg-(--frost)"
				style={{
					borderColor: "var(--ice-mid)",
					color: "var(--milk)",
				}}
			>
				<GoogleIcon />
				Continue with Google
			</button>
		</div>
	);
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function Home() {
	return (
		<div className="flex min-h-screen items-center justify-center p-4 sm:p-6">
			<div
				className={cn(
					"w-full max-w-5xl overflow-hidden",
					"rounded-[18px] border-[1.5px] bg-white",
					"grid grid-cols-1 md:grid-cols-2 md:min-h-140",
				)}
				style={{
					borderColor: "var(--ice-mid)",
					boxShadow: "var(--shadow)",
				}}
			>
				<LandingHero />
				<AuthPanel />
			</div>
		</div>
	);
}
