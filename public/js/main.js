var cursor = document.getElementById("cursor");
var paintmap = $("#paintmap");
var xcoord = document.getElementById("xcoord");
var ycoord = document.getElementById("ycoord");

$('#paintmap').click(function (event) {
  var offset = paintmap.offset();
  var x = event.pageX - offset.left;
  var y = event.pageY - offset.top;

  var xpercent = (x / paintmap.outerWidth()) * 100;
  var ypercent = (y / paintmap.outerHeight()) * 100;

  // drop cursor
  cursor.style.left = xpercent + '%';
  cursor.style.top = ypercent + '%';

  // set form values
  xcoord.value = xpercent;
  ycoord.value = ypercent;

  $(form).find(".form-error:first").hide();
});

smoothScroll.init();

function update() {
  $.get('/drops/current', function (data) {
    var info = $("#info");
    info.html(data["name"] + ' &ndash; ' + data["location"] + data['id']);
  });
}
update();
setInterval(update, 20000);

var form = $('#form');

$(form).submit(function () {
  if (xcoord.value == "") {
    $(this).find(".form-error:first").show();
    return false;
  }
  var name = $(this).find("input[name='name']");
  if (name.val() == "") {
    $(name).next().show();
    $(name).focus();
    return false;
  }
  var location = $(this).find("input[name='location']");
  if (location.val() == "") {
    $(location).next().show();
    $(location).focus();
    return false;
  }
});

$(form).find("input[name='name']").keypress(function () {
  $(this).next().hide();
});
$(form).find("input[name='location']").keypress(function () {
  $(this).next().hide();
});