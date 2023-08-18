"use client";

import { gql } from "@apollo/client";
import { getServerSession } from "next-auth/next";
import { Word } from "./types";
import { getClient } from "@/lib/apollo-client";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Langua | Vocabulary",
};

const FIND_MANY_WORDS_BY_VOCABULARY_ID = gql`
  query FindManyWordsByVocabularyId(
    $vocabularyId: String!
    $limit: Int
    $page: Int
  ) {
    findManyWordsByVocabularyId(
      limit: $limit
      page: $page
      vocabularyId: $vocabularyId
    ) {
      count
      rows {
        language
        transcription
        word
        lexicCategories {
          categoryName
          creatorUserId
        }
        wordToVocabulary {
          isFinished
          vocabularyId
          wordId
        }
      }
    }
  }
`;

export interface VocabularyPageProps {}

export default async function VocabularyPage(props: VocabularyPageProps) {
  const session = await getServerSession(options);
  const { data } = await getClient().query({
    query: FIND_MANY_WORDS_BY_VOCABULARY_ID,
    variables: {
      vocabularyId: "6484bf8d7ea7dbf0bf3db785",
      limit: 10,
      page: 0,
    },
  });

  return <>{JSON.stringify(data)}</>;
}
