<?php
$allowedExts = array("gif", "jpeg", "jpg", "png");
$temp = explode(".", $_FILES["image"]["name"]);
$extension = end($temp);

if ((($_FILES["image"]["type"] == "image/gif")
|| ($_FILES["image"]["type"] == "image/jpeg")
|| ($_FILES["image"]["type"] == "image/jpg")
|| ($_FILES["image"]["type"] == "image/pjpeg")
|| ($_FILES["image"]["type"] == "image/x-png")
|| ($_FILES["image"]["type"] == "image/png"))
&& ($_FILES["image"]["size"] < 20000)
&& in_array($extension, $allowedExts)) {
  if ($_FILES["image"]["error"] > 0) {
    echo "Return Code: " . $_FILES["image"]["error"] . "<br>";
  } else {
    // echo "Upload: " . $_FILES["image"]["name"] . "<br>";
    // echo "Type: " . $_FILES["image"]["type"] . "<br>";
    // echo "Size: " . ($_FILES["image"]["size"] / 1024) . " kB<br>";
    // echo "Temp file: " . $_FILES["image"]["tmp_name"] . "<br>";
    if (file_exists("upload/" . $_FILES["image"]["name"])) {
      echo $_FILES["image"]["name"] . " already exists. ";
    } else {
      move_uploaded_file($_FILES["image"]["tmp_name"], "images/" . $_FILES["image"]["name"]);
      move_uploaded_file($_FILES["pdf"]["tmp_name"], "pdf/" . $_FILES["pdf"]["name"]);
      // echo "Stored in: " . "images/" . $_FILES["image"]["name"] . "<br>";
      // echo "Stored in: " . "pdf/" . $_FILES["pdf"]["name"];
      echo "Upload successful! <br> Go to <a href='http://www.woorecipes.azurewebsites.net'>Home</a> to check it out!";
    }
  }
} else {
  echo "Invalid file";
}
?>