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
        
        
            echo "<!DOCTYPE html>
            <html>
            <head>
            ship created with ship_id = ";
            $records =  createShip($namedParameters);
            foreach ($records as $record) {
            echo " " . $record['ship_id'] . " ";
            }
            echo "</body>
            </html>";
            
        
    }
?>

