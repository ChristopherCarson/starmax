<?php
    include 'functions.php';
    
    if (isset($_GET['submit'])) {
        $ship = $_GET['ship'];
        $ship_condition = $_GET['ship_condition'];
        $cost = $_GET['cost'];
        $year_of_production = $_GET['year_of_production'];
        $namedParameters = array();
        $namedParameters[':ship'] = $ship;
        $namedParameters[':ship_condition'] = $ship_condition;
        $namedParameters[':cost'] = $cost;
        $namedParameters[':year_of_production'] = $year_of_production;
        
            echo "<!DOCTYPE html>
            <html>
            <head>
            inventory created with inv_id = ";
            $records =  createInventory($namedParameters);
            foreach ($records as $record) {
            echo " " . $record['inv_id'] . " ";
            }
            echo "</body>
            </html>";
            
        
    }
?>

