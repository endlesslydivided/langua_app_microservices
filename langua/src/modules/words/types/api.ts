export interface CreateWordParams
{
    language:string,
    lexicCategoryId:string,
    transcription:string,
    word:string,
}

export interface FindOneWordById{
    id:string;
} 


export interface FindManyWordsByVocabularyIdParams
{
  vocabularyId:string,
  page:number,
  limit:number
}

export interface FindManyWordsByLexicCategoryIdParams
{
  lexicCategoryId:string,
  page:number,
  limit:number
}

export interface CreateWordToVocabularyParams
{
  vocabularyId:string,
  wordId:string,
}

export interface UpdateWordToVocabularyParams
{
  id:string,
  userId:string,
  isFinished:boolean,
}


