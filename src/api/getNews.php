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
    $id = 0;
    $id += $row['id']; // integer

    $newsgroup[$index]['name'] = $row['name']; // string
    $newsgroup[$index]['img'] = $row['img']; // string
    $newsgroup[$index]['href'] = $row['href']; // string
    $newsgroup[$index]['description'] = $row['description']; // string
    $newsgroup[$index]['category'] = $row['category']; // string(bv, sb)
    $newsgroup[$index]['language'] = $row['language']; // string(ro, hu, de)

    $newsgroup[$index]['noDay'] = false;
    $newsgroup[$index]['noDay'] = $row['noDay']; // true or false
    $newsgroup[$index]['noMonth'] = false;
    $newsgroup[$index]['noMonth'] = $row['noMonth']; // true or false

    $newsgroup[$index]['page'] = 0;
    $newsgroup[$index]['page'] += $row['page']; // integer
    $newsgroup[$index]['number'] = 0;
    $newsgroup[$index]['number'] += $row['number']; // integer

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