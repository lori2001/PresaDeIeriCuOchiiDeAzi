<?php
/**
 * Returns the list of news.
 */
require 'connect.php';
    
$newsgroup = [];

$sql = "SELECT * FROM `news`";
if($result = mysqli_query($con,$sql))
{
  $index = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $id = 0; // takes in number
    $id += $row['id'];

    $newsgroup[$index]['name'] = $row['name']; // name of news
    $newsgroup[$index]['img'] = $row['img']; // limage displayed as preview
    $newsgroup[$index]['href'] = $row['href']; // link to news file
    $newsgroup[$index]['description'] = $row['description']; // small description
    $newsgroup[$index]['category'] = $row['category']; // category
    $newsgroup[$index]['publish_date'] = $row['publish_date']; // date published in

    $index++;
  }

  echo json_encode(['data'=>$newsgroup]);
}
else
{
  http_response_code(404);
}

?>