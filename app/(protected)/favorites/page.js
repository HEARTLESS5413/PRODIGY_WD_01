import { redirect } from "next/navigation";
import { FavoritesExperience } from "@/components/favorites/favorites-experience";
import { getFavoritesPageData } from "@/lib/data";

export const metadata = {
  title: "Favorites"
};

export default async function FavoritesPage() {
  const data = await getFavoritesPageData();

  if (!data) {
    redirect("/login");
  }

  return (
    <FavoritesExperience
      favoriteItems={data.favoriteItems}
      initialFavoriteIds={data.favoriteIds}
      user={data.user}
    />
  );
}
