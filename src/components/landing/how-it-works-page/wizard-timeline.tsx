import { cn } from "@/lib/utils";

type Step = {
	num: string;
	title: string;
	body: string;
	badge?: string;
	highlight?: boolean;
	done?: boolean;
};

const steps: Step[] = [
	{
		num: "1",
		title: "Daftar",
		body: "Cukup email, nomor WA, dan password — tanpa perlu verifikasi email. Masuk berikutnya pakai email atau nomor WA."
	},
	{
		num: "2",
		title: "Isi 3 hal, langsung jalan",
		body: "Hanya tiga isian: nama kost, jumlah kamar, dan harga sewa. Kota, tipe kamar, dan aturan jatuh tempo bisa menyusul belakangan."
	},
	{
		num: "3",
		title: "Pesan tagihan nyata",
		badge: "Momen wow · bagian 1",
		highlight: true,
		body: 'Kamu langsung melihat contoh pesan tagihan WhatsApp dengan nama kost dan harga aslimu — bukan contoh kosong. Tombol "Kirim contoh ke WhatsApp saya" mengirim pesan itu ke nomor pemilik dalam hitungan detik.'
	},
	{
		num: "4",
		title: "Sampai uang masuk",
		badge: "Momen wow · bagian 2",
		highlight: true,
		body: 'Tepat di bawahnya, kamu juga melihat contoh notifikasi saat penyewa membayar: "Kamar 1 — Rp1.500.000 diterima, tercatat otomatis ✓". Jadi jelas dari awal — tagihan terkirim, uang masuk, semua tercatat.'
	},
	{
		num: "5",
		title: "Balik dari WhatsApp",
		body: 'Setelah kamu cek pesannya di WhatsApp, layar Semang sudah menunggu dengan tombol besar "Lanjutkan" — tidak perlu bingung harus ke mana setelahnya.'
	},
	{
		num: "6",
		title: "Perayaan kecil",
		body: 'Begitu kamu lanjut, muncul kabar gembira: "[Nama kost-mu] sudah bisa menagih otomatis!" — pencapaian pertamamu, kurang dari 5 menit.'
	},
	{
		num: "7",
		title: "Lengkapi pelan-pelan",
		body: "Sisanya bisa diisi santai: kota, tipe kamar (boleh dilewati), cara menentukan jatuh tempo, dan cara mengisi data penyewa — lewat QR atau ketik sendiri."
	},
	{
		num: "8",
		title: "Dashboard pertama",
		body: 'Dashboard-mu langsung terisi: daftar yang sudah beres, plus kartu "Tagihan berikutnya terkirim otomatis tanggal ..." — bukan layar kosong.'
	},
	{
		num: "✓",
		title: "Aktifkan pembayaran online kapan pun siap",
		done: true,
		body: "Cukup verifikasi KTP & nomor rekening — sekali saja. Sebelum itu pun tagihan tetap terkirim otomatis, hanya saja pesannya berisi nomor rekeningmu untuk transfer biasa."
	}
];

export function WizardTimeline() {
	return (
		<section>
			<div className="container py-10 md:py-14 lg:py-18">
				<div className="mx-auto max-w-190">
					{steps.map((step, index) => (
						<div key={step.num} className="flex gap-3.5 lg:gap-5">
							<div className="flex flex-none flex-col items-center">
								<span
									className={cn(
										"flex size-7.5 items-center justify-center rounded-full text-xs font-extrabold text-white lg:size-8.5 lg:text-sm",
										step.done
											? "bg-success"
											: step.highlight
												? "bg-primary shadow-warm-teal"
												: "bg-teal-700"
									)}
								>
									{step.num}
								</span>
								{index < steps.length - 1 && (
									<span className="bg-border min-h-5 w-0.5 flex-1 lg:min-h-6" />
								)}
							</div>
							<div
								className={index < steps.length - 1 ? "pb-5.5 lg:pb-7" : undefined}
							>
								{step.badge && (
									<span className="mb-1.5 inline-flex rounded-full bg-teal-100 px-2.5 py-1 text-[10px] font-extrabold tracking-wide text-teal-700 uppercase lg:mb-2">
										{step.badge}
									</span>
								)}
								<h3 className="mb-1 text-base font-bold text-teal-900 lg:mb-1.5 lg:text-lg">
									{step.title}
								</h3>
								<p className="text-warm-600 text-sm leading-relaxed">{step.body}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
