import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

const plusJakartaSans = Plus_Jakarta_Sans({
	variable: "--font-plus-jakarta",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800"]
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
	preload: false
});

export const metadata: Metadata = {
	title: "Semang",
	description:
		"Kost-mu ditagih otomatis, uang masuk tercatat sendiri, tanpa kamu menagih siapa-siapa."
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="id"
			className={`${plusJakartaSans.variable} ${geistMono.variable} h-full antialiased`}
		>
			<body className="flex min-h-full flex-col">
				{children}
				{process.env.VERCEL && <SpeedInsights />}
			</body>
		</html>
	);
}
