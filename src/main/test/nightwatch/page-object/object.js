const loginCommand = {
  getTestById: function(id){
    return this.expect.element(`[data-testid="${id}"]`);
  }
}

module.exports ={
  url: 'http://localhost:3000/login',
  elements: {
    errorWrap: {
      selector: '[data-testid="errorWrap"]'
    }
  },
  commands: [loginCommand]
}