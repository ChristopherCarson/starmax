<?php
/**
 * Auth functions
 */
session_start();

function checkLoggedIn($caller) {
    if (!isset($_SESSION['incorrect']) || $_SESSION['incorrect']) {
        if ($caller === 'page'){
            return "index.php";
        } else {
            echo "index.php";
        }
    }
}


/*
 * // the 'right' way to salt and hash a password then check it
 * $crypted =  password_hash('correct horse battery staple', PASSWORD_DEFAULT);
 * // correct will be true
 * $correct = password_verify('correct horse battery staple', $crypted);
 * // incorrect will be false
 * $incorrect = password_verify('correct  battery staple', $crypted);
 */
function loginAuth() {
    include 'php/functions.php';
    $np = array();
    $np[":username"] = $_POST['username'];
    $password = sha1($_POST['password']);

    $record = retrieveUser($np);

    if (empty($record) || $password != $record['password'] ) {
        // case wrong
        $_SESSION['incorrect'] = true;
        echo "index.php";
    } else {
        error_log($record['password']);
        error_log($password);
        // case correct username and password
        $_SESSION['incorrect'] = false;
        $_SESSION['adminName'] = $record['firstName'] . " " . $record['lastName'];
        echo "admin.php";
    }
}

function logout() {
    session_start();
    session_destroy();
    $_SESSION['incorrect'] = true;
    echo "index.php";
}

function populateHeader() {
    if($_SERVER['PHP_SELF'] == "/336final/admin.php") {
        echo '<button id="header-logout" class="btn btn-secondary" onclick="onLogout();">Logout</button>';
        echo '<button id="back-button" class="btn btn-primary" onclick="onHome()">Home</button>';
    } else {
        if(isset($_SESSION['adminName'])) {
            echo '<button id="header-logout" class="btn btn-secondary" onclick="onLogout()">Logout</button>';
        } else {
            echo '<button id="header-login" class="btn btn-primary" data-toggle="modal" data-target="#popout" onclick="promptLogin()">Login</button>';
        }
        echo '<button id="header-cart" class="btn btn-success" data-toggle="modal" data-target="#popout" onclick="getCart()">Cart</button>';
    }
}