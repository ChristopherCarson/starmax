<?php
    include 'defs.php';

    session_start();
    //session_destroy();

    if (isset($_POST['fName'])) {
        switch ($_POST['fName']) {

            // alterStock.php functions
            case 'DeleteItem':
                include 'alterStock.php';
                if (isset($_POST['shipId'])) {
                    error_log($_POST['shipId'] . " is the item to be removed");
                    deleteItem($_POST['shipId']);
                }
                break;
            case 'UpdateItem':
                include 'alterStock.php';
                updateDB();
                break;
            case 'AddItem':
                include 'alterStock.php';
                addItem();
                break;

            // cart.php functions
            case 'CheckCart':
                include 'cart.php';
                checkCart();
                break;
            case 'RemoveItem':
                if (isset($_POST['shipId'])) {
                    include 'cart.php';
                    removeItem($_POST['shipId']);
                }
                break;
            case 'AddToCart':
                if (isset($_POST['shipId'])) {
                    include 'cart.php';
                    addToCart($_POST['shipId']);
                }
                break;
            case 'UpdateCart':
                if(isset($_POST['shipId'])) {
                    include 'cart.php';
                    updateCart($_POST['shipId'], $_POST['update']);
                }
                break;
            case 'GetCart':
                $cart = array();
                if (isset($_SESSION['cart'])) {
                    include 'cart.php';
                    $cart = getCart();
                    echo json_encode($cart);
                }
                
                break;
            case 'GetCartCount':
                $count = $count = array('count'=>0);
                if (isset($_SESSION['cart'])) {
                    include 'cart.php';
                    $count = getCartCount();
                }
                echo json_encode($count);
                break;

            // loginAuth.php functions
            case 'CheckLoggedIn':
                include 'loginAuth.php';
                checkLoggedIn("");
                break;
            case 'LoginAuth':
                include 'loginAuth.php';
                if (isset($_POST['username'])) {
                    loginAuth();
                }
                break;
            case 'Logout':
                include'loginAuth.php';
                logout();
                break;

            // stock.php functions
            case 'GetSearchResults':
                include 'stock.php';
                $results = getSearchResults();
                echo json_encode($results);
                break;
            case 'GetShip':
                if (isset($_POST['shipId'])) {
                    include 'stock.php';
                    $record = getShip($_POST['shipId']);
                    echo json_encode($record);
                }
                break;
            case 'GetAll':
                include 'stock.php';
                $records = array();
                if (isset($_POST['inventory'])) {
                    $records = getAll('inventory');
                    echo json_encode($records);
                } elseif (isset($_POST['purchases'])){
                    $records = getAll('purchases');
                    echo json_encode($records);
                } elseif (isset($_POST['ships'])){
                    $records = getAll('ships');
                    echo json_encode($records);
                }
                break;

            // reports
            case 'DisplayPurchaseHistory':
                include 'stock.php';
                $records = displayPurchaseHistory($_POST['shipId']);
                echo json_encode($records);
                break;
            case 'DisplayUserSales':
                include 'php/functions.php';
                $records = reportSalesByUser();
                echo json_encode($records);
                break;
            case 'DisplayInventoryByYear':
                include 'php/functions.php';
                $records = reportInventoryByYear();
                echo json_encode($records);
                break;

        }
    }
