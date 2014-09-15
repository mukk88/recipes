<?php
$allowedExts = array("gif", "jpeg", "jpg", "png");
$temp = explode(".", $_FILES["image"]["name"]);
$extension = end($temp);
$success = False;

if ((($_FILES["image"]["type"] == "image/gif")
|| ($_FILES["image"]["type"] == "image/jpeg")
|| ($_FILES["image"]["type"] == "image/jpg")
|| ($_FILES["image"]["type"] == "image/pjpeg")
|| ($_FILES["image"]["type"] == "image/x-png")
|| ($_FILES["image"]["type"] == "image/png"))
&& ($_FILES["image"]["size"] < 1000000)
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
      
      // echo "Stored in: " . "images/" . $_FILES["image"]["name"] . "<br>";
      // echo "Stored in: " . "pdf/" . $_FILES["pdf"]["name"];
      $success=True;
    }
  }
}

if($_FILES["pdf"]["size"] < 5000000){
  if ($_FILES["pdf"]["error"] > 0) {
    echo "Return Code: " . $_FILES["pdf"]["error"] . "<br>";
  }else{
    move_uploaded_file($_FILES["pdf"]["tmp_name"], "images/pdf/" . $_FILES["pdf"]["name"]);
    $success = True;
  }
}

if($success){
  echo "Upload successful! <br> Go to <a href='http://woorecipes.azurewebsites.net'>Home</a> to check it out!";
}else{
  echo "Invalid file";
}
?>