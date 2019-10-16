<?php

// db credentials


define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'presaia_db');
/*
define('DB_HOST', 'server52');
define('DB_USER', 'presaia_1');
define('DB_PASS', 'n@W0SbqbIOX(');
define('DB_NAME', 'presaia_db');
*/

// Connect with the database.
function connect()
{
  $connect = mysqli_connect(DB_HOST ,DB_USER ,DB_PASS ,DB_NAME);

  if (mysqli_connect_errno($connect)) {
    die("Failed to connect:" . mysqli_connect_error());
  }

  mysqli_set_charset($connect, "utf8");

  return $connect;
}

$con = connect();

?>