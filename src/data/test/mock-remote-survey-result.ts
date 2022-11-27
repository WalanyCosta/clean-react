import { SurveyModel } from '@/domain/model';
import faker from '@faker-js/faker';

export const mockRemoteSurveyResult = (): SurveyModel => ({
  question: faker.random.words(18),
  date: faker.datatype.datetime(),
  answers: [
    {
      answer: faker.random.words(18),
      image: faker.image.imageUrl(),
      count: faker.datatype.number(),
      percent: 10,
      isCurrentAccountAnswer: faker.datatype.boolean()
    },
    {
      answer: faker.random.words(18),
      image: faker.image.imageUrl(),
      count: faker.datatype.number(),
      percent: 20,
      isCurrentAccountAnswer: faker.datatype.boolean()
    }
  ]
});
