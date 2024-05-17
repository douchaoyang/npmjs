$(function () {
  $(".article-content img").on("click", function () {
    if (/img\/bad\.jpg/.test(this.src)) return false;
    $("#light-container")
      .html('<img src="' + $(this).attr("data-src") + '">')
      .show();
    $("html").css("overflow", "hidden");
  });
  $("#light-container").on("click", function () {
    $(this).hide().html("");
    $("html").css("overflow", "");
  });
});
