<?php
/**
 * Functions to retrieve and display stock
 */
include 'php/functions.php';

function displayPurchaseHistory($id) {
    $np = array();
    $np[":ship_id"] = $id;

    $records = selectPurchaseHistory($id);

    return $records;
}

function getSearchResults() {
    $np = array();
    if (isset($_POST['search'])) {

        if ($_POST['name'] != '') {
            $np[':name'] = '%' . $_POST['name'] . '%';
        }

        if ($_POST['priceFrom'] !=0) {
            $np[":priceFrom"] = $_POST['priceFrom'];
        }

        if ($_POST['priceTo'] !=0) {
            $np[":priceTo"] = $_POST['priceTo'];
        }

        if (isset($_POST['orderBy'])) {
            if ($_POST['orderBy'] === "price") {
                $np[':order'] = 'cost';
            } else {
                $np[':order'] = 'name';
            }
        }
    }
    if (isset($np)) {
        $records = searchInventory($np);
        return $records;
    }
}

function getShip($id) {
    //$np = array();
    //$np['shipId'] = $id;

    $record = selectSingleInventory($id);

    return $record;
}

function getAll($request) {
    if ($request === 'inventory') {
        $records = selectAllInventory();
    }elseif ($request === 'purchases') {
        $records = selectAllPurchases();
    } else {
        $records = selectAllShips();
    }
    return $records;
}
