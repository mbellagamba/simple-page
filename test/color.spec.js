describe('Color test', function(){

  var fixture = "<button class='btn'>TEST</button>";

  beforeEach(function(){
    $('body').empty();
    $('body').append(fixture);
    toggleColor($('.btn'));
  });

  it('should change class on click', function(){
    var btn = $('.btn').click();
    expect(btn).toHaveClass('btn-clicked');
  });

  it('should have the same class when clicked two times', function(){
    var btn = $('.btn').click().click();
    expect(btn).toHaveClass('btn');
  });
});
