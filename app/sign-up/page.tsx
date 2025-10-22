import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <div className="min-h-dvh flex items-center justify-center p-4">
      <SignUp afterSignUpUrl="/dashboard" appearance={{ layout: { socialButtonsVariant: "blockButton" } }} />
    </div>
  )
}
