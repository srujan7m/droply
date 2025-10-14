"use client";

import Link from "next/link";
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { useSearchParams } from "next/navigation";
import { useFiles } from "@/hooks/use-files";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/common/empty-state";

export default function FilesPage() {
	const params = useSearchParams();
	const query = params.get("query") || undefined;
	const { files, isLoading } = useFiles(query);

	return (
		<div className="min-h-dvh">
			<AppHeader />
			<div className="px-4 sm:px-6 grid grid-cols-1 md:grid-cols-[auto,1fr] gap-0">
				<AppSidebar />
				<main className="py-6">
					<div className="flex items-center justify-between mb-4">
						<h1 className="text-xl font-semibold text-pretty">Files</h1>
						<Button asChild>
							<Link href="/files/upload">Upload</Link>
						</Button>
					</div>

					{isLoading ? (
						<div className="text-sm text-muted-foreground">Loading…</div>
					) : files.length === 0 ? (
						<EmptyState />
					) : (
						<div className="rounded-md border overflow-x-auto">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>Type</TableHead>
										<TableHead>Size</TableHead>
										<TableHead>Created</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{files.map((f) => (
										<TableRow key={f.id}>
											<TableCell className="font-medium">
												<Link className="text-primary underline-offset-4 hover:underline" href={`/files/${f.id}`}>
													{f.name}
												</Link>
											</TableCell>
											<TableCell>{f.type || "—"}</TableCell>
											<TableCell>{typeof f.size === "number" ? `${(f.size / 1024).toFixed(1)} KB` : "—"}</TableCell>
											<TableCell>{f.createdAt ? new Date(f.createdAt).toLocaleString() : "—"}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					)}
				</main>
			</div>
		</div>
	);
}
