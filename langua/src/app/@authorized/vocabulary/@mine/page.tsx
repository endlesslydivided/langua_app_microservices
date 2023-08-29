import MineLexicCategoriesCard from "@/modules/lexicCategories/widgets/Cards/MineLexicCategoriesCard";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Langua | My categories",
};

export interface MineCategoriesPageProps {}

export default function MineCategoriesPage(props: MineCategoriesPageProps) {
 
  return (
    <MineLexicCategoriesCard/>   
  );
}
