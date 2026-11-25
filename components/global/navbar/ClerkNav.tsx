import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'

// ClerkProvider è nel layout: qui solo i controlli di login/utente
const ClerkNav = () => {
  return (
    <div className="flex items-center gap-4">
      <Show when="signed-out">
        <SignInButton mode="modal" />
        <SignUpButton mode="modal">
          <button className="bg-purple-700 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
            Sign Up
          </button>
        </SignUpButton>
      </Show>
      <Show when="signed-in">
        <UserButton />
      </Show>
    </div>
  )
}

export default ClerkNav
