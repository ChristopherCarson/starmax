<?php
function getDatabaseConnection()
{
    $host = "us-cdbr-iron-east-04.cleardb.net";
    $dbname = "heroku_95f57077cc03cf4";
    $username = "b96490505fd6c1";
    $password = "bed64dc3";
    
    $dbConn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $dbConn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    return $dbConn;
}
?>