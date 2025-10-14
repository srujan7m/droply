import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
	return (
		<div className="min-h-dvh">
			<AppHeader />
			<div className="px-4 sm:px-6 grid grid-cols-1 md:grid-cols-[auto,1fr] gap-0">
				<AppSidebar />
				<main className="py-6">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<Card>
							<CardHeader>
								<CardTitle>Total Files</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-semibold">—</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Storage Used</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-semibold">—</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Shares</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-semibold">—</div>
							</CardContent>
						</Card>
					</div>
					<div className="mt-6">
						<Card>
							<CardHeader>
								<CardTitle>Recent Files</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">Connect your API to populate recent files.</p>
							</CardContent>
						</Card>
					</div>
				</main>
			</div>
		</div>
	);
}
