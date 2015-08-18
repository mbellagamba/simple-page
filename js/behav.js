var toggleColor = function(selector){
  selector.click(function(){
    $(this).toggleClass('btn');
    $(this).toggleClass('btn-clicked');
  });
};

$(function(){
  toggleColor($('.btn'));
});
