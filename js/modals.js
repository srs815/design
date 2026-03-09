$(document).ready(function () {

  // Set footer year dynamically
  $('#date').text(new Date().getFullYear());

  // Collect all project row IDs
  var items = [];
  storeid();

  // Store original video srcs before anything blanks them
  items.forEach(function (id) {
    var $video = $('#video-' + id);
    if ($video.length) {
      $video.data('src', $video.attr('src'));
    }
  });

  // Create audio element programmatically
  var pop = new Audio('sounds/smallPop.wav');
  pop.preload = 'auto';

  // Track scroll position per modal
  var scrollPositions = {};

  // Flag to prevent popstate interference when intentionally closing
  var isClosingModal = false;

  // Initialize modals
  items.forEach(function (id) {
    initModal(id);
  });

  // Handle browser back/forward navigation
  $(window).on('popstate', function () {
    if (isClosingModal) return;
    items.forEach(function (id) {
      if ($('#modal-' + id).is(':visible')) {
        $(document).scrollTop(scrollPositions[id] || 0);
        $('#modal-' + id).fadeOut('fast');
      }
    });
    $('body').removeClass('my-body-noscroll-class');
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
  // Helper: stop an iframe video by setting src to about:blank
  // ----------------------------
  function stopVideo(id) {
    var $video = $('#video-' + id);
    if ($video.length) {
      $video.attr('src', 'about:blank');
    }
  }

  // ----------------------------
  // Helper: close a specific modal
  // ----------------------------
  function closeModal(id) {
    document.activeElement.blur();
    isClosingModal = true;
    $('#modal-' + id).fadeOut('fast');
    $('body').removeClass('my-body-noscroll-class');
    stopVideo(id);
    if (pop) pop.play();
    window.history.go(-1);
    setTimeout(function () {
      $(document).scrollTop(scrollPositions[id] || 0);
      isClosingModal = false;
    }, 50);
  }

  // ----------------------------
  // Set up open/close for one modal
  // ----------------------------
  function initModal(id) {
    $('#modal-' + id).css('display', 'none');

    // Open
    $('#' + id + '-cta').on('click', function () {
      scrollPositions[id] = $(document).scrollTop();
      var $video = $('#video-' + id);
      if ($video.length) {
        var originalSrc = $video.data('src');
        if (!originalSrc) {
          $video.data('src', $video.attr('src'));
        }
        $video.attr('src', $video.data('src'));
      }
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