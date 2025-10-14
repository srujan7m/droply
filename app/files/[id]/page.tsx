"use client";

import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { useParams } from "next/navigation";
import { useFile } from "@/hooks/use-files";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function FileDetailsPage() {
	const params = useParams<{ id: string }>();
	const id = params?.id;
	const { file, isLoading } = useFile(id);

	return (
		<div className="min-h-dvh">
			<AppHeader />
			<div className="px-4 sm:px-6 grid grid-cols-1 md:grid-cols-[auto,1fr] gap-0">
				<AppSidebar />
				<main className="py-6 space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>File details</CardTitle>
						</CardHeader>
						<CardContent>
							{isLoading ? (
								<div className="text-sm text-muted-foreground">Loading…</div>
							) : !file ? (
								<div className="text-sm text-muted-foreground">File not found.</div>
							) : (
								<div className="space-y-3">
									<div className="text-lg font-semibold">{file.name}</div>
									<div className="text-sm text-muted-foreground">
										{file.type || "Unknown"} • {typeof file.size === "number" ? `${(file.size / 1024).toFixed(1)} KB` : "—"}
									</div>
									{file.url ? (
										<div className="rounded-md border p-3">
											{file.type?.startsWith("image/") ? (
												<Image src={file.url || "/placeholder.svg"} alt={file.name} width={800} height={600} className="h-auto max-h-[320px] w-auto rounded-md" />
											) : file.type === "application/pdf" ? (
												<iframe className="w-full h-[480px] rounded-md" src={file.url} />
											) : file.type?.startsWith("audio/") ? (
												<audio controls src={file.url} className="w-full" />
											) : file.type?.startsWith("video/") ? (
												<video controls src={file.url} className="w-full max-h-[400px]" />
											) : (
												<a className="text-primary underline" href={file.url} target="_blank" rel="noreferrer">
													Open file
												</a>
											)}
										</div>
									) : null}
								</div>
							)}
						</CardContent>
					</Card>
				</main>
			</div>
		</div>
	);
}
