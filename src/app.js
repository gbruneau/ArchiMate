$(function () {

  $(function () {
    $("#layers").tabs({});
    $("#layers").tabs().addClass("ui-tabs-vertical ");
    $("#layers li").removeClass("ui-corner-top").addClass("ui-corner-left");
  });


  $(function () {
    $(".gbTabs").tabs({});
  });

  $(function () {
    $(document).tooltip({
      track: true,
      position: { my: "right-50 bottom", at: "left bottom", collision: "flipfit" }
    });
  });



  /* === Dialog box functions for references ===*/

  $(function () {
    // Dialog Caracteristics
    $(".gbDialog").dialog(
      {
        autoOpen: false,
        minWidth: 500,
        position: {
          my: "top",
          at: "center top"
        },
        hide: { effect: 'fade', duration: 500 },
        show: { effect: 'fade', duration: 500 },
        duration: 50
      }
    );
    // On click event         

    $(".gbHelp").click(function () {
      $("#diagRef").dialog("open");
    });
  });


  /* Add full screen on click */
  function toggleFull(targetelement) {
    var inFullElem = document.fullscreenElement;
    if (inFullElem != null) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
      }
    } else {
      if (targetelement.requestFullscreen) {
        targetelement.requestFullscreen();
      }
      if (targetelement.webkitRequestFullscreen) {
        targetelement.webkitRequestFullscreen();
      }
      if (targetelement.mozRequestFullScreen) {
        targetelement.mozRequestFullScreen();
      }
      if (targetelement.msRequestFullscreen) {
        targetelement.msRequestFullscreen();
      }
    }
  }


  function addFullScreen(obj) {
    $(obj).on("click", function () {
      toggleFull(obj);
    });
  }


  /*   Add Zoom  */

  function addZoom(obj) {
    var newImg;
    src = $(obj).attr('src');
    newImg = '<div class="container" ><div class="zoom"><img  src=' + src + '></div></div>';
    $(newImg).insertAfter(obj);
    $(obj).css('display', 'none');
  }


  /* var newImg; */
  $(".arcExample , .arcBigDiagram").each(function () {
    addZoom(this);
  })

  $(".zoom img").each(function () {
    addFullScreen(this);
  })


  zoom();



});

function updateLanguage() {
  var lang = $('#langSelector').val();

  // Load t9ntable from a JSON file based on the selected language
  $.getJSON('data/' + lang + '.json', function(t9ntable) {
    // t9ntable is now populated with the data from the JSON file

    // Loop through all elements with data-t9n attribute
    $('[data-t9n]').each(function () {
      var key = $(this).data('t9n');
      // Replace content with the translation based on lang
      $(this).html(t9ntable[key] || ''); // Use empty string if translation is not available
    });

    $('[data-t9n-t]').each(function () {
      var key = $(this).data('t9n-t');
      // Replace content with the translation based on lang
      $(this).prop('title',t9ntable[key] || ''); // Use empty string if translation is not available
    });


  });
}

$(document).ready(function () {
  // Load the list of languages
  $.getJSON('data/languages.json', function(languages) {
    // Populate the language selector dropdown
    var langSelector = $('#langSelector');
    $.each(languages, function(index, language) {
      langSelector.append($('<option>', {
        value: language.code,
        text: language.name
      }));
    });

    // Initialize language switcher
    langSelector.change(updateLanguage);

    // Retrieve the selected language from the cookie or default to 'en'
    var selectedLang = document.cookie.replace(/(?:(?:^|.*;\s*)selectedLang\s*=\s*([^;]*).*$)|^.*$/, "$1") || 'en';

    // Set the initial language
    langSelector.val(selectedLang);

    // Trigger the initial language update
    updateLanguage();
  });
});