$(document).ready(function () {

  // Set footer year dynamically
  $('#date').text(new Date().getFullYear());

  // Collect all project row IDs
  var items = [];
  storeid();

  // Create audio element programmatically
  var pop = new Audio('sounds/smallPop.wav');
  pop.preload = 'auto';

  // Track scroll position before opening a modal
  var scrollPositionBeforeModal = 0;

  // Initialize modals
  items.forEach(function (id) {
    initModal(id);
  });

  // Handle browser back/forward navigation
  $(window).on('popstate', function () {
    items.forEach(function (id) {
      $('#modal-' + id).fadeOut('fast');
      stopVideo(id);
    });
    $('body').removeClass('my-body-noscroll-class');
    $(document).scrollTop(scrollPositionBeforeModal);
  });

  // ----------------------------
  // Helper: collect row IDs
  // ----------------------------
  function storeid() {
    $('.row').each(function () {
      if (this.id) {
        items.push(this.id);
      }
    });
  }

  // ----------------------------
  // Helper: stop an iframe video by resetting its src
  // ----------------------------
  function stopVideo(id) {
  var $video = $('#video-' + id);
  if ($video.length) {
    var src = $video.attr('src');
    $video.attr('src', '');
    setTimeout(function() {
      $video.attr('src', src);
    }, 100);
  }
}

  // ----------------------------
  // Helper: close a specific modal
  // ----------------------------
  function closeModal(id) {
    $('#modal-' + id).fadeOut('fast');
    $('body').removeClass('my-body-noscroll-class');
    stopVideo(id);
    if (pop) pop.play();
    window.history.go(-1);
    $(document).scrollTop(scrollPositionBeforeModal);
  }

  // ----------------------------
  // Set up open/close for one modal
  // ----------------------------
  function initModal(id) {
    $('#modal-' + id).css('display', 'none');

    // Open
    $('#' + id + '-cta').on('click', function () {
      scrollPositionBeforeModal = $(document).scrollTop();
      $('#modal-' + id).css('z-index', '1000').fadeIn('fast').scrollTop(0);
      $('body').addClass('my-body-noscroll-class');
      if (pop) pop.play();
      window.history.pushState({}, '', '/portfolio/#modal-' + id);
      return false;
    });

    // Close (top button)
    $('#' + id + '-exit').on('click', function () {
      closeModal(id);
      return false;
    });

    // Close (bottom button)
    $('#' + id + '-exit-bottom').on('click', function () {
      closeModal(id);
      return false;
    });
  }

});//doc ready