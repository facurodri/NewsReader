import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";

("#scrape").on("click", function () {
    $.ajax({
        method: "GET",
        url: "/scrape",
    }).done(function (data) {
        window.location = "/"
    });
});
//Save article btn
$(".saveArticle").on("click", function () {
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "PUT",
        url: "/article/save/" +thisId
    }).done(function(data){
        window.location ="/"
    })
});
//Delete artcle button
$(".delete-from-save").on("click", function(){
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/article/delete/"+thisId
    }).done(function (data) {
        window.location = "/saved"
    })
});

$(".article-notes").on("click", function() {
    $("#article-note-title").empty();
    $("#article-note-id").empty();
    $(".previou-notes").empty();

    var thisId = $(this).attr("data-id");

    $.ajax({
        method:"GET",
        url:"/articles/"+thisId
    })
    .then(function(data) {
        $("#article-note-title").append("<h3>" + data.title + "</h3>");
        $("#article-note-title").attr("data-id" + thisId);
        $("#article-note-id").append("<h5" + thisId + "</h5>");
        $(".submit-noteBtn").attr("data-id",thisId);

        if (data.note) {
            for (var i = 0; data.note.length; i++){
                var noteCard = $("<div class='card'>"); 
                var noteCardBody = $("<div class=card-body>");
                var noteCardBodyText = $("<p>").text(data.note[i].body);
                $(".previous-notes").append(noteCard);
                $(noteCard).append(noteCard);
                $(noteCardBody).append(noteCardBodyText);
                $(noteCardBodyText).append("<button class='btn btn-primary delete-note-btn' data-id=" +data.note[i]._id + ">X</button>");
            }
        };
    });
    $("#notesModal").modal("show");
});



