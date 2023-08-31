import AllLexicCategoriesCard from "@/modules/lexicCategories/widgets/Cards/AllLexicCategoriesCard";
import AllWordsListCard from "@/modules/words/widgets/Cards/AllWordsListCard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Langua | Words",
  };

export interface AllWordsPageProps {
    params: {
        id:string
    }
}
export default function AllWordsPage(route: AllWordsPageProps) {
 
    return (
        <AllWordsListCard lexicCategoryId={route.params.id}/>
    );
}
