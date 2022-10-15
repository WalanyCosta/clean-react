const { faker } = require('@faker-js/faker');
const helper = require('../page-object/form-helper');

const simulateValidSubmit = (sut, email = 'yonelma@gmail.com', password = 'yo#450') =>{
  sut.setInput('email', email);
  sut.setInput('password', password);
  sut.click('@submit');
};


describe('SurveyList', function () {
  beforeEach(()=>{
    helper.visit(browser, 'login');
    const surveyList = browser.page.object();
    simulateValidSubmit(surveyList);
  })

  it('should present correct UserName', async function (browser) {
    const surveyList = browser.page.object();
    surveyList.assert.urlContains('localhost:3000');
    helper.assertContainText(surveyList, 'userEmail', 'yonelma@gmail.com');
  });
});
