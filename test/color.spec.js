describe('Color test', function(){

  var fixture = "<button class='btn btn-primary'>TEST</button>";


  beforeAll(function() {
    $.ajax({
      async: false,
      url: "/base/bower_components/bootstrap/dist/css/bootstrap.min.css",
      dataType: 'text',
      success: function(data) {
        $('<style type="text/css">\n' + data + '</style>').appendTo("head");
      }
    });
  });

  beforeEach(function(){
    $('body').empty().append(fixture);
    toggleColor($('.btn'));
  });

  afterAll(function() {
    $('head').find('style').remove();
  });

  it('should change class on click', function(){
    var btn = $('.btn').click();
    expect(btn.hasClass('btn-danger')).toBeTruthy();
    expect(btn.css('background-color')).toEqual('rgb(217, 83, 79)');
  });

  it('should have the same class when clicked two times', function(){
    var btn = $('.btn').click().click();
    expect(btn.hasClass('btn-primary')).toBeTruthy();
    expect(btn.css('background-color')).toEqual('rgb(51, 122, 183)');
  });
});
