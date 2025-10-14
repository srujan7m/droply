"use client";

import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ModeToggle } from "@/components/mode-toggle";
import { useState } from "react";

export default function SettingsPage() {
	const [density, setDensity] = useState("comfortable");
	const [sort, setSort] = useState("createdAt:desc");

	return (
		<div className="min-h-dvh">
			<AppHeader />
			<div className="px-4 sm:px-6 grid grid-cols-1 md:grid-cols-[auto,1fr] gap-0">
				<AppSidebar />
				<main className="py-6 space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Appearance</CardTitle>
						</CardHeader>
						<CardContent className="flex items-center gap-4">
							<span className="text-sm text-muted-foreground">Theme</span>
							<ModeToggle />
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Preferences</CardTitle>
						</CardHeader>
						<CardContent className="grid gap-6 sm:grid-cols-2">
							<div className="grid gap-2">
								<Label>Density</Label>
								<Select value={density} onValueChange={setDensity}>
									<SelectTrigger>
										<SelectValue placeholder="Density" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="compact">Compact</SelectItem>
										<SelectItem value="comfortable">Comfortable</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="grid gap-2">
								<Label>Default sort</Label>
								<Select value={sort} onValueChange={setSort}>
									<SelectTrigger>
										<SelectValue placeholder="Sort" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="createdAt:desc">Newest first</SelectItem>
										<SelectItem value="createdAt:asc">Oldest first</SelectItem>
										<SelectItem value="name:asc">Name A–Z</SelectItem>
										<SelectItem value="name:desc">Name Z–A</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</CardContent>
					</Card>
				</main>
			</div>
		</div>
	);
}
