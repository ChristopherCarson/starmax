<?php
/**
 * Cart functions
 */
include 'defs.php';

session_start();

function checkCart() {
    if (!isset($_SESSION['cart'])) {
        $_SESSION['cart'] = array();
    }
}

function removeItem($id) {
    foreach ($_SESSION['cart'] as $itemKey => $item) {
        if ($item['id'] === $id) {
            unset($_SESSION['cart'][$itemKey]);
            error_log($itemKey);
            break;
        }
    }
    $_SESSION['cart'] = array_values($_SESSION['cart']);
}

function addToCart($id) {
    checkCart();
    $newItem = array();
    include 'stock.php';
    $record = getShip($id);
    $newItem['name'] = $record['name'];
    $newItem['id'] = $record['inv_id'];
    $newItem['price'] = $record['cost'];
    $newItem['image'] = $record['image_url'];
    $found = false;
    foreach ($_SESSION['cart'] as &$item) {
        if ($newItem['id'] == $item['id']) {
            $item['quantity'] += 1;
            $found = true;
        }
    }
    
    if ($found != true) {
        $newItem['quantity'] = 1;
        array_push($_SESSION['cart'], $newItem);
    }
}

function updateCart($id, $update) {
    foreach ($_SESSION['cart'] as &$item) {
        if ($item['id'] == $id) {
            $item['quantity'] = $update;
        }
    }
}

function getCart() {
    return $_SESSION['cart'];
}

function getCartCount() {
    $count = array('count'=>count($_SESSION['cart']));
    return $count;
}