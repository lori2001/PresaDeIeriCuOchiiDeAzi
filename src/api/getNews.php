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
    $newsgroup[$index]['id'] = 0;
    $newsgroup[$index]['id'] += $row['id'];

    $newsgroup[$index]['name'] = $row['name']; // string
    $newsgroup[$index]['href'] = $row['href']; // string
    $newsgroup[$index]['description'] = $row['description']; // string
    $newsgroup[$index]['category'] = $row['category']; // string(bv, sb)
    $newsgroup[$index]['language'] = $row['language']; // string(ro, hu, de)

    if($row['noDay'] == 1){
      $newsgroup[$index]['noDay'] = true;
    } else {
      $newsgroup[$index]['noDay'] = false;
    }

    if($row['noMonth'] == 1){
      $newsgroup[$index]['noMonth'] = true;
    } else {
      $newsgroup[$index]['noMonth'] = false;
    }

    $newsgroup[$index]['page'] = 0;
    $newsgroup[$index]['page'] += $row['page']; // integer
    $newsgroup[$index]['num'] = 0;
    $newsgroup[$index]['num'] += $row['num']; // integer

    $newsgroup[$index]['publish_date'] = $row['publish_date']; // date published in

    $newsgroup[$index]['keywords'] = $row['keywords']; // string

    $index++;
  }

  echo json_encode(['data'=>$newsgroup]);
}
else
{
  http_response_code(404);
}

?>