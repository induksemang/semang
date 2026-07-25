"use client";

import type { ComponentProps } from "react";
import { scrollToHash } from "@/lib/utils";

// Anchor ke section di halaman yang sama, tanpa meninggalkan hash di URL.
// Dipakai dari server component supaya anchor-nya tetap <a> biasa (fallback
// tanpa JS jalan normal), cukup satu boundary client tipis di sini.
export function HashLink(props: ComponentProps<"a">) {
	return <a {...props} onClick={scrollToHash} />;
}
