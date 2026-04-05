import { redirect } from "next/navigation";
import { LandingPage } from "@/components/landing/landing-page";
import { getSessionUser } from "@/lib/data";

export default async function LandingPageRoute() {
  const user = await getSessionUser();

  if (user) {
    redirect("/menu");
  }

  return <LandingPage />;
}

