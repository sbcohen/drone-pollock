var cursor = document.getElementById("cursor");
var paintmap = $("#paintmap");
var xcoord = document.getElementById("xcoord");
var ycoord = document.getElementById("ycoord");
var submit = false;

$('#paintmap').click(function (event) {
  if (submit) return false;
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
    info.html(data["name"] + ' &ndash; ' + data["location"]);
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

  $.post($(this).attr('action'), $(this).serialize(), function (data, textStatus) {
    if (textStatus == 'success') {
      $('#form-fade').hide();
      $('#success').show().addClass('fade-in-up');
      submit = true;
    }
  });
  return false;
});

$(form).find("input[name='name']").keypress(function () {
  $(this).next().hide();
});
$(form).find("input[name='location']").keypress(function () {
  $(this).next().hide();
});

$(document).ready(function () {
  var c = document.getElementById("canvas");
  var ctx = c.getContext("2d");
  c.width = paintmap.outerWidth();
  c.height = paintmap.outerHeight();
  var width = c.width;
  var height = c.height;
  //get drop
  ctx.imageSmoothingEnabled = false;
  $.get('/drops', function (data) {
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = 'cyan';
    for (var i = 0; i < data.drops.length; i++) {
      var drop = data.drops[i];
      var xcoord = Math.floor(drop.xcoord * width / 100);
      var ycoord = Math.floor(drop.ycoord * height / 100);
      //ctx.fillRect(xcoord, ycoord, 10, 10);
      circle(ctx, xcoord, ycoord, 10);
      if (i % 2 == 0)
        ctx.fillStyle = '#ff7bac';
      else ctx.fillStyle = 'cyan';
    }
  });
  //get xcoord ycoord
  //set color
  //draw dot
  //get next drop
});

function circle(ctx, x, y, rad) {
  ctx.beginPath();
  ctx.ellipse(x, y, rad, rad, 0, Math.random(0, Math.PI * 2), false);
  ctx.fill();
}