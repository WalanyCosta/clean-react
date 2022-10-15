const pageCommand = {
  getTestById: function(id){
    return this.expect.element(`[data-testid="${id}"]`);
  },
  setInput: function(id, value){
    return this.setValue(`[data-testid="${id}"]`, value);
  }
}

module.exports ={
  elements: {
    errorWrap: {
      selector: '[data-testid="errorWrap"]'
    },
    email:{
      selector: '[data-testid="email"]'
    },
    submit: {
      selector: '[data-testid="submit"]'
    },
    logout: {
      selector: '[data-testid="logout"]'
    }
  },
  commands: [pageCommand]
}