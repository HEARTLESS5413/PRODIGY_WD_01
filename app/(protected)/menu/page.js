import { redirect } from "next/navigation";
import { MenuExperience } from "@/components/menu/menu-experience";
import { getMenuPageData } from "@/lib/data";

export const metadata = {
  title: "Menu"
};

export default async function MenuPage() {
  const data = await getMenuPageData();

  if (!data) {
    redirect("/login");
  }

  return (
    <MenuExperience
      initialFavoriteIds={data.favoriteIds}
      isAdmin={data.isAdmin}
      menuItems={data.menuItems}
      profile={data.profile}
      user={data.user}
    />
  );
}
