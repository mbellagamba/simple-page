var toggleColor = function(selector){
  selector.click(function(){
    $(this).toggleClass('btn-primary');
    $(this).toggleClass('btn-danger');
  });
};

$(function(){
  toggleColor($('.btn'));
});
