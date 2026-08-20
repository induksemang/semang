import type { ReactNode } from "react";

const pillars: { icon: ReactNode; title: string; body: string }[] = [
	{
		icon: (
			<>
				<path d="M3 8h18v10H3z" strokeWidth="1.8" />
				<path d="M3 8l9-5 9 5" strokeWidth="1.8" strokeLinejoin="round" />
			</>
		),
		title: "Tidak memegang uangmu",
		body: "Tidak ada saldo yang menginap di Semang dan tidak ada pencairan yang perlu kamu tunggu. Dananya memang tidak pernah singgah di sini."
	},
	{
		icon: (
			<>
				<circle cx="12" cy="12" r="8.5" strokeWidth="1.8" />
				<path d="M6 6l12 12" strokeWidth="1.8" />
			</>
		),
		title: "Tidak menjual datamu",
		body: "Data kost dan penyewa dipakai untuk menagih dan mencatat. Bukan untuk iklan, dan tidak dibagikan demi kepentingan komersial pihak lain."
	},
	{
		icon: (
			<>
				<path d="M4 12h16" strokeWidth="1.8" />
				<path d="M14 6l6 6-6 6" strokeWidth="1.8" strokeLinejoin="round" />
			</>
		),
		title: "Tidak menyandera datamu",
		body: "Berhenti berlangganan tidak menghapus apa pun, dan semua catatan bisa diekspor kapan saja ke CSV atau Excel."
	}
];

export function SecurityHero() {
	// data-nav-dark: nav ikut gelap selama section ini masih di belakang nav
	return (
		<header data-nav-dark className="bg-teal-900">
			<div className="container pt-[clamp(32px,6vw,84px)] pb-[clamp(28px,5vw,64px)]">
				<p className="mb-6 font-mono text-[11px] leading-normal font-bold tracking-widest text-teal-400 uppercase">
					Keamanan dana &amp; data
				</p>
				<h1 className="text-title mb-5 max-w-225 font-extrabold text-balance text-white">
					Semang mencatat uangmu. Semang tidak pernah memegangnya.
				</h1>
				<p className="mb-7 max-w-160 text-base leading-relaxed text-pretty text-teal-200 lg:mb-10 lg:text-lg">
					Pemilik kost menyerahkan dua hal paling sensitif ke sebuah aplikasi: uang sewa
					dan data penghuninya. Halaman ini menjelaskan persis apa yang kami lakukan
					dengan keduanya, dan apa yang tidak.
				</p>

				<div className="grid border-t border-teal-600 lg:grid-cols-3">
					{pillars.map((pillar) => (
						<div
							key={pillar.title}
							className="border-teal-600 pt-7 pb-7 not-first:border-t lg:px-7 lg:pb-0 lg:not-first:border-t-0 lg:not-first:border-l lg:first:pl-0 lg:last:pr-0"
						>
							<div className="mb-4 grid size-11 place-items-center border-[1.5px] border-teal-400">
								<svg
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									aria-hidden="true"
									className="text-teal-350 size-5"
								>
									{pillar.icon}
								</svg>
							</div>
							<h2 className="mb-2 text-lg font-extrabold text-white">
								{pillar.title}
							</h2>
							<p className="text-sm leading-relaxed text-teal-200">{pillar.body}</p>
						</div>
					))}
				</div>
			</div>
		</header>
	);
}
