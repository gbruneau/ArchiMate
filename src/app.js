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
