import type { Metadata } from "next"
import { AccountView } from "@/components/account/account-view"

export const metadata: Metadata = {
  title: "Личный кабинет — Матрёшка",
}

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4">
      <AccountView />
    </div>
  )
}
