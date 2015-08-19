describe('Color test', function(){

  var fixture = "<button class='btn btn-primary'>TEST</button>";

  beforeEach(function(){
    $('head').append("<link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css\">");
    $('body').empty();
    $('body').append(fixture);
    toggleColor($('.btn'));
  });

  it('should change class on click', function(){
    var btn = $('.btn').click();
    expect(btn).toHaveClass('btn-danger');
    expect(btn.css('background-color')).toEqual('rgb(217, 83, 79)');
  });

  it('should have the same class when clicked two times', function(){
    var btn = $('.btn').click().click();
    expect(btn).toHaveClass('btn-primary');
    expect(btn.css('background-color')).toEqual('rgb(51, 122, 183)');
  });
});
