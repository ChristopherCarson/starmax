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
        
            $inv_id = 3;
            echo "<!DOCTYPE html>
            <html>
            <head>
            inventory updated with inv_id = ";
            if (updateInventory($inv_id, $namedParameters) == $inv_id){
            echo $inv_id;
            echo "</body>
            </html>";
            }
    }
?>