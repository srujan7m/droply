import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { UploadDropzone } from "@/components/upload-dropzone";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UploadPage() {
	return (
		<div className="min-h-dvh">
			<AppHeader />
			<div className="px-4 sm:px-6 grid grid-cols-1 md:grid-cols-[auto,1fr] gap-0">
				<AppSidebar />
				<main className="py-6">
					<Card>
						<CardHeader>
							<CardTitle>Upload files</CardTitle>
						</CardHeader>
						<CardContent>
							<UploadDropzone />
						</CardContent>
					</Card>
				</main>
			</div>
		</div>
	);
}
