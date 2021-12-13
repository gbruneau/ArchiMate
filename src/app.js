
$(function () {
    $("#layers").accordion({
        heightStyle: "auto",
        collapsible: true
    });
});

$(function () {
    $(".gbTabs").tabs();

    $(function () {
        $(document).tooltip({
            track: true,
            position: { my: "right-50 bottom", at: "left bottom", collision: "flipfit" }
        });
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
            hide: {effect: 'fade',  duration: 500  },
            show: {effect: 'fade',  duration: 500  },
            duration: 50
        }
    );
    // On click event         

    $(".gbHelp").click(function () {
        $("#diagRef").dialog("open");
    });
});

/* === For the Examples Dialog === */

$(function () {
    var w = window.innerWidth - 500;
    var h = window.innerHeight -50;
    $("#diagExample").dialog({
        autoOpen: false,
        modal: false,
        hide: {effect: 'fade',duration: 500  },
        show: {effect: 'fade',  duration: 500  },
        height: "auto",
        width: w,
        position: { my: "right top", at: "right top"}
    });
});

$("#diagExample").on("dialogopen",function(event, ui) {
    $(".ui-dialog-titlebar-close").hide();
});   


$(document).ready(function(){
    $(".arcExample").on("mouseenter",function () {
        $("#diagExample img").attr("src", $(this).attr("src"));
        $("#diagExample").click(function () {
            $("#diagExample").dialog("close");
        });
/*        $("#diagExample").parent().mouseleave(function () {
            $("#diagExample").dialog("close");
        }); */
        $("#diagExample").dialog("open"); 
    });
});



