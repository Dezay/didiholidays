$(document).ready(function() {
  var date_counter = false;
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  console.log(today); // Saturday, September 17, 2016

  $('.floatingButton').on('click',
    function(e) {
      e.preventDefault();
      $(this).toggleClass('open');
      if ($(this).children('.icon-default').hasClass('fab fa-hubspot')) {
        $(this).children('.icon-default').removeClass('fab fa-hubspot');
        $(this).children('.icon-default').addClass('fa fa-share');
      } else if ($(this).children('.icon-default').hasClass('fa fa-share')) {
        $(this).children('.icon-default').removeClass('fa fa-share');
        $(this).children('.icon-default').addClass('fab fa-hubspot');
      }
      $('.floatingMenu').stop().slideToggle();
    }
  );
  $(this).on('click', function(e) {
    var container = $(".floatingButton");
    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && $('.floatingButtonWrap').has(e.target).length === 0) {
      if (container.hasClass('open')) {
        container.removeClass('open');
      }
      if (container.children('.icon-default').hasClass('fa fa-share')) {
        container.children('.icon-default').removeClass('fa fa-share');
        container.children('.icon-default').addClass('fab fa-hubspot');
      }
      $('.floatingMenu').hide();
    }
  });

  var selected = 'None';

  $(function() {
    $('.date').each(function() {
      var test = new Date($(this).attr('data'));
      test.setHours(0, 0, 0, 0);
      if (test - 1 < today) {
        $(this).parent().remove();
      }
    })
  });

  $('.date').on('click', function(e) {
    var date_id = $(this).attr('id');

    if (date_counter) {

      if (selected == date_id) {
        $('#' + date_id).removeClass('date_selected');
        selected = 'None';

      } else {
        $('#' + selected).removeClass('date_selected');
        $('#' + date_id).addClass('date_selected');
        update_date(date_id);
        selected = date_id;
      }
    } else {
      $('#' + date_id).addClass('date_selected');
      selected = date_id;
      update_date(date_id);
      date_counter = true;
    }

  });

  function update_date(date_id) {
    var original_url = $('#form').attr('data');
    var fill_url = $('#pre_fill').attr('data');
    var final_url = original_url + fill_url + date_id.replace('_', '+');

    var win = window.open(final_url, '_blank');
    if (win) {
      //Browser has allowed it to be opened
      win.focus();
    } else {
      //Browser has blocked it
      alert('Please allow popups for this website');
    }
    $("#form").attr('src', final_url);

  }
});

var $item = $('.carousel-item');
var $wHeight = $(window).height();
$item.eq(0).addClass('active');
$item.height($wHeight);
$item.addClass('full-screen');

$('.carousel img').each(function() {
  var $src = $(this).attr('src');
  var $color = $(this).attr('data-color');
  $(this).parent().css({
    'background-image': 'url(' + $src + ')',
    'background-color': $color
  });
  $(this).remove();
});

$(window).on('resize', function() {
  $wHeight = $(window).height();
  $item.height($wHeight);
});

$('.carousel').carousel({
  interval: 6000,
  pause: "false"
});