import { SurveyModel } from '@/domain/model';
import faker from '@faker-js/faker';
import { RemoteLoadSurveyResult } from '@/data/usecases';

export const mockRemoteSurveyResult = (): RemoteLoadSurveyResult.Model => ({
  question: faker.random.words(18),
  date: faker.date.future().toISOString(),
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
