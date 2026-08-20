import Link from "next/link";
import { LogoLockup } from "./logo";

const columns = [
	{
		title: "Produk",
		links: [
			{ href: "/", label: "Beranda" },
			{ href: "/fitur", label: "Fitur" },
			{ href: "/cara-kerja", label: "Cara kerja" },
			{ href: "/harga", label: "Harga" }
		]
	},
	{
		title: "Kepercayaan",
		links: [
			{ href: "/keamanan", label: "Keamanan dana & data" },
			{ href: "/privasi", label: "Kebijakan Privasi" },
			{ href: "/privasi#hak-anda", label: "Hak penyewa (UU PDP)" }
		]
	}
];

export function Footer() {
	return (
		<footer className="bg-teal-900">
			<div className="container pt-[clamp(32px,5vw,60px)]">
				<div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-[2fr_1fr_1fr] lg:gap-0">
					<div className="col-span-2 lg:col-span-1 lg:pr-[clamp(24px,4vw,56px)]">
						<LogoLockup tone="dark" className="mb-4" />
						<p className="max-w-85 text-sm leading-relaxed text-pretty text-teal-200">
							Kostmu ditagih otomatis, uang masuk tercatat sendiri, tanpa kamu menagih
							siapa-siapa.
						</p>
					</div>
					{columns.map((column, i) => (
						<nav
							key={column.title}
							className={
								i === 0
									? "lg:px-[clamp(16px,2vw,32px)]"
									: "lg:pl-[clamp(16px,2vw,32px)]"
							}
						>
							<h2 className="mb-4 font-mono text-[10.5px] leading-snug font-bold tracking-widest text-teal-400 uppercase">
								{column.title}
							</h2>
							<ul className="flex flex-col gap-2.5">
								{column.links.map((link) => (
									<li key={link.label}>
										<Link
											href={link.href}
											className="focus-ring text-sm font-semibold text-teal-100 transition-colors hover:text-white"
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</nav>
					))}
				</div>

				<div className="mt-[clamp(24px,4vw,48px)] flex flex-col gap-2 border-t border-teal-600 pt-4.5 pb-6 font-mono text-[11.5px] leading-relaxed font-semibold tracking-wider text-teal-400 sm:flex-row sm:flex-wrap sm:justify-between sm:gap-x-6 sm:gap-y-3 lg:pt-5">
					<p>© {new Date().getFullYear()} SEMANG</p>
					<p>Dibuat untuk pemilik kost Indonesia 🇮🇩</p>
				</div>
			</div>
		</footer>
	);
}
