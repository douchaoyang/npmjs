/* 
  修改 os/editor-js.php 53 行
  imagedialog: '<p><b><?php _e('插入图片'); ?></b></p><p><?php _e('请在下方的输入框内输入要插入的图片地址'); ?></p><p id="pi-button"><i class="loading"></i><button id="pi-trigger" type="button" class="btn btn-s primary">上传</button><input id="pi-file" type="file" accept=".jpg,.gif,.jpeg,.png"></p>'
 */

$(function () {
  $(document).on("click", "#pi-trigger", function () {
    $("#pi-file")[0].click();
  });

  $(document).on("change", "#pi-file", function () {
    uploadStart();
    var file = this.files[0];
    upload(file);
  });

  function uploadStart() {
    $("#pi-button .loading").show();
  }

  function uploadEnd() {
    $("#pi-button .loading").hide();
    $("#pi-file").val("");
  }

  function upload(file) {
    var formData = new FormData();
    formData.append("file", file);
    $.ajax({
      url: "/postimage?action=upload",
      method: "POST",
      processData: false,
      contentType: false,
      data: formData,
      dataType: "json",
      success: function (response) {
        if (response.code == 0 && response.data.hotlink) {
          $("#pi-button")
            .parents(".wmd-prompt-dialog")
            .find("input[type=text]")
            .val(response.data.hotlink);
        } else {
          alert("Sorry, upload failed...");
        }
        uploadEnd();
      },
      error: function () {
        alert("Sorry, upload failed...");
        uploadEnd();
      },
    });
  }
});
