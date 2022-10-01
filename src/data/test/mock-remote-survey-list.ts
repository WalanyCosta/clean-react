import faker from '@faker-js/faker';
import { RemoteLoadSurveyList } from '@/data/usecases/load-survey-list/remote-load-survey-list';

export const mockRemoteSurvey = (): RemoteLoadSurveyList.Model => ({
  id: faker.random.alphaNumeric(8),
  question: faker.random.words(10),
  answers: [{
    image: faker.image.image(),
    answer: faker.random.words(5)
  },
  {
    answer: faker.random.words(5)
  }],
  date: faker.date.recent().toString(),
  didAnswer: faker.datatype.boolean()
});

export const mockRemoteSurveyList = (): RemoteLoadSurveyList.Model[] => ([
  mockRemoteSurvey(),
  mockRemoteSurvey(),
  mockRemoteSurvey()
]);
