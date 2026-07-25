import Image from "next/image";
import Link from "next/link";

const columns = [
	{
		title: "Produk",
		links: [
			{ href: "/", label: "Beranda" },
			{ href: "/fitur", label: "Fitur" },
			{ href: "/cara-kerja", label: "Cara kerja" },
			{ href: "/harga", label: "Harga" },
			{ href: "/keamanan", label: "Keamanan" }
		]
	},
	{
		title: "Perusahaan",
		links: [
			{ href: "#", label: "Tentang" },
			{ href: "#", label: "Privasi" },
			{ href: "#", label: "Kontak" }
		]
	}
];

export function Footer() {
	return (
		<footer className="border-border border-t">
			<div className="container space-y-9 py-8 md:py-12">
				<div className="flex flex-wrap justify-between gap-8">
					<div className="max-w-75 space-y-3.5">
						<div className="flex items-center gap-2.75">
							<Image
								src="/logo.svg"
								alt="Semang"
								width={36}
								height={36}
								className="size-9 rounded-md"
							/>
							<span className="text-lg font-extrabold tracking-tight text-teal-900">
								Semang
							</span>
						</div>
						<p className="text-warm-500 text-sm leading-relaxed">
							Kost-mu ditagih otomatis, uang masuk tercatat sendiri, tanpa kamu
							menagih siapa-siapa.
						</p>
					</div>
					<div className="flex w-full flex-wrap justify-between gap-12 sm:w-fit sm:justify-between sm:gap-14">
						{columns.map((column) => (
							<nav key={column.title} className="space-y-3.5">
								<div className="text-warm-400 text-xs font-bold tracking-wider uppercase">
									{column.title}
								</div>
								<ul className="flex flex-col gap-2.5">
									{column.links.map((link) => (
										<li key={link.label}>
											<Link
												href={link.href}
												className="text-warm-700 text-sm font-semibold transition-colors hover:text-teal-500"
											>
												{link.label}
											</Link>
										</li>
									))}
								</ul>
							</nav>
						))}
					</div>
				</div>
				<div className="border-border flex flex-col gap-1.5 border-t pt-6 sm:flex-row sm:flex-wrap sm:justify-between sm:gap-3">
					<span className="text-warm-400 text-xs font-medium sm:text-sm">
						© 2026 Semang
					</span>
					<span className="text-warm-400 text-xs font-medium sm:text-sm">
						Dibuat untuk pemilik kost Indonesia 🇮🇩
					</span>
				</div>
			</div>
		</footer>
	);
}
