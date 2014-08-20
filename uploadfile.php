<?php
if ($_FILES["image"]["error"] > 0) {
  echo "Error: " . $_FILES["image"]["error"] . "<br>";
} else {
  echo "Upload: " . $_FILES["image"]["name"] . "<br>";
  echo "Upload: " . $_FILES["file"]["name"] . "<br>";
  echo "Type: " . $_FILES["image"]["type"] . "<br>";
  echo "Size: " . ($_FILES["image"]["size"] / 1024) . " kB<br>";
  echo "Stored in: " . $_FILES["image"]["tmp_name"] . "<br>";
  echo "Upload: " . $_FILES["pdf"]["name"] . "<br>";
  echo "Type: " . $_FILES["pdf"]["type"] . "<br>";
  echo "Size: " . ($_FILES["pdf"]["size"] / 1024) . " kB<br>";
  echo "Stored in: " . $_FILES["pdf"]["tmp_name"];
}
?>