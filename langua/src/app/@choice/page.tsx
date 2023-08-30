import VocabulariesChoiceCard from "@/modules/vocabularies/widgets/Cards/VocabulariesChoiceCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Langua | Vocabularies",
};

export default function VocabularyPage() {
 
  return (
    <VocabulariesChoiceCard/>
  );
}
