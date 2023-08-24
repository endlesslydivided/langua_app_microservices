import { LexicCategoriesList } from "@/widgets/Lists/LexicCategoriesList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Langua | Vocabulary",
};

export interface VocabularyPageProps {}

export default async function Page(props: VocabularyPageProps) {
  

  return (
    <>
      <LexicCategoriesList/>
    </>
  );
}
