$(function () {
    $("#layers").accordion({
        heightStyle: "content"
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

$(function () {
    // Dialog Caracteristics
    $("#diagRef").dialog(
        {
            autoOpen: false,
            minWidth: 700,
            position: {
                my: "top",
                at: "center top"
            } ,
            hide: 'explode',
            show: 'puff'
        }
    );
    // On click event         

    $(".arcExample").click(function () {
        $("#diagRef").dialog("open");
    });

});

function loadHtml(aSelection,url) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function () {
        $(aSelection).append(this.responseText);
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

