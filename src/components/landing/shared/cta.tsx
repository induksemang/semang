import type { ReactNode } from "react";
import { Action } from "./action";

type CtaProps = {
	title: ReactNode;
	description: ReactNode;
	action: string;
	href?: string;
};

export function Cta({ title, description, action, href = "/register" }: CtaProps) {
	return (
		<section className="border-t border-teal-200 bg-teal-50">
			<div className="container flex flex-wrap items-center justify-between gap-x-12 gap-y-6 py-12 lg:py-18">
				<div className="min-w-0 flex-[1_1_480px]">
					<h2 className="text-cta mb-2.5 max-w-140 font-extrabold text-balance text-teal-900">
						{title}
					</h2>
					<p className="max-w-135 text-base leading-relaxed text-teal-700">
						{description}
					</p>
				</div>
				<Action href={href} size="lg" className="w-full shrink-0 sm:w-auto">
					{action}
				</Action>
			</div>
		</section>
	);
}

export function CtaCentered() {
	return (
		<section className="border-t border-teal-200 bg-teal-50">
			<div className="container py-13 text-center lg:py-20">
				<h2 className="text-cta-lg mx-auto mb-4 max-w-180 font-extrabold text-balance text-teal-900">
					Bulan depan, tagihan kostmu berangkat tanpa kamu ingat
				</h2>
				<p className="mx-auto mb-7 max-w-140 text-base leading-relaxed text-teal-700">
					Coba 60 hari dengan fitur Pro terbuka. Tanpa kartu kredit, dan datamu tetap
					milikmu kalau ternyata tidak cocok.
				</p>
				<div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3">
					<Action href="/register" size="lg">
						Coba gratis 60 hari
					</Action>
					<Action href="/keamanan" variant="white" size="lg">
						Baca soal keamanan dana
					</Action>
				</div>
			</div>
		</section>
	);
}
