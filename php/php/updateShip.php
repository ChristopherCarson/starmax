<?php
    include 'functions.php';
    
    if (isset($_GET['submit'])) {
        $name = $_GET['name'];
        $long_description = $_GET['long_description'];
        $make = $_GET['make'];
        $model = $_GET['model'];
        $image_url = $_GET['image_url'];
        $action_image_url = $_GET['action_image_url'];
        $namedParameters = array();
        $namedParameters[':name'] = $name;
        $namedParameters[':long_description'] = $long_description;
        $namedParameters[':make'] = $make;
        $namedParameters[':model'] = $model;
        $namedParameters[':image_url'] = $image_url;
        $namedParameters[':action_image_url'] = $action_image_url;
        
            $ship_id = 2;
            echo "<!DOCTYPE html>
            <html>
            <head>
            ship updated with ship_id = ";
            if (updateShip($ship_id, $namedParameters) == $ship_id){
            echo $ship_id;
            echo "</body>
            </html>";
            }
    }
?>

