describe('Ecosia', function () {
  it('demo test', function (browser) {
    browser
      .url('http://localhost:3000/login')
      .setValue('input[type=email]', 'walanybnegro@gmail.com')
      .assert.visible('input[type=email]')
      .end();
  });
});
