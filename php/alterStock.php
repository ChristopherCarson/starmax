<?php
/**
 * Functions to alter stock in the DB
 */
include 'php/functions.php';

function deleteItem($id) {
    $id = $_POST['shipId'];
    deleteShip($id);
}

function updateDB() {
    if (isset($_POST['updateShip'])) {
        $id = $_POST['shipId'];
        $np = array();
        $np[":long_description"] = $_POST['long_description'];
        $np[":make"] = $_POST['make'];
        $np[":model"] = $_POST['model'];
        $np[":price"] = $_POST['price'];
        $np[":image_url"] = $_POST['image_url'];
        $np[":action_image_url"] = $_POST['action_image_url'];
        updateShip($id, $np);
    } elseif (isset($_POST['updateInventory'])) {
        $id = $_POST['inv_id'];
        $np = array();
        $np[":ship"] = $_POST['ship'];
        $np[":ship_condition"] = $_POST['ship_condition'];
        $np[":cost"] = $_POST['cost'];
        $np[":year_of_production"] = $_POST['year_of_production'];
        updateInventory($id, $np);
    }
}

function addItem() {
    if (isset($_POST['createShip'])) {
        $np = array();
        $np[":long_description"] = $_POST['long_description'];
        $np[":make"] = $_POST['make'];
        $np[":model"] = $_POST['model'];
        $np[":image_url"] = $_POST['image_url'];
        $np[":action_image_url"] = $_POST['action_image_url'];
        createShip($np);
    } elseif (isset($_POST['createInventory'])) {
        $np = array();
        $np[":ship"] = $_POST['ship'];
        $np[":ship_condition"] = $_POST['ship_condition'];
        $np[":cost"] = $_POST['cost'];
        $np[":year_of_production"] = $_POST['year_of_production'];
        createInventory($np);
    }
}