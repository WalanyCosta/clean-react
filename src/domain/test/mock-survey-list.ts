import faker, { Faker } from '@faker-js/faker';
import { SurveyModel } from '../model';

export const mockSurveyList = (): SurveyModel[] => ([{
  id: faker.random.alphaNumeric(8),
  question: faker.random.words(10),
  answers: [{
    image: faker.image.image(),
    answer: faker.random.words(5)
  },
  {
    answer: faker.random.words(5)
  }],
  date: faker.date.recent(),
  didAnswer: faker.datatype.boolean()
}]);
