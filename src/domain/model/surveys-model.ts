export type SurveyModel = {
  id?: string,
  question: string,
  answers?: Array<{
    image?: string,
    answer: string,
    count?: number,
    percent?: number,
    isCurrentAccountAnswer?: boolean
  }>,
  date: Date,
  didAnswer?: boolean
}
