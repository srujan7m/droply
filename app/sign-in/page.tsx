import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="min-h-dvh flex items-center justify-center p-4">
      <SignIn afterSignInUrl="/dashboard" appearance={{ layout: { socialButtonsVariant: "blockButton" } }} />
    </div>
  )
}
