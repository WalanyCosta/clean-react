module.exports = {
    testInputStatus: (sut, field, error) => {
      sut.getTestById(`${field}-wrap`).to.have.attribute('data-status').which.contain(error ? 'invalid' : 'valid' );
      if(error){
        sut.getTestById(field).to.have.attribute('title').which.contains(error);
        sut.getTestById(`${field}-label`).to.have.attribute('title').which.contains(error);
      }else{
        sut.getTestById(field).to.not.have.attribute('title');
        sut.getTestById(`${field}-label`).to.not.have.attribute('title');
      }
    },
    testMainError: (sut, message) =>{
      sut.getTestById('spinner-status').to.be.present;
      sut.getTestById('mainError').to.not.be.present;
      sut.getTestById('spinner-status').to.not.be.present;
      if(message) sut.getTestById('mainError').text.to.contain(message);
    },
    testNoPresentSpinner: (sut) =>{
      sut.getTestById('mainError').to.not.be.present;
      sut.getTestById('spinner-status').to.not.be.present;
    },
    visit: (sut, route) => {
      sut.url(`http://localhost:3000/${route}`);
    }
}




