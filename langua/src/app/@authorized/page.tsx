import VocabularyWordsListCard from "@/modules/words/widgets/Cards/VocabularyWordsListCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Langua",
};


export default function Page(){

  return (
    <VocabularyWordsListCard/>   
  );
}


