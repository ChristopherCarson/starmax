<?php
    session_start();
    include('php/loginAuth.php');
    include('php/cart.php');
    checkCart();
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title> ShipMax </title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
        <link href="https://bootswatch.com/4/darkly/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="css/styles.css" rel="stylesheet" type="text/css" />
        <script src="js/classes.js" type="text/javascript"></script>
        <script src="js/functions.js" type="text/javascript"></script>
    </head>
    <body>
    
    <div id="alert-modal" class="alert alert-dismissible alert-success">
        <button type="button" class="close" onclick="hideAlert();">&times;</button>
        <span id="alert-text"></span>
    </div>
    
    <div id="header-container">
        <?php
            populateHeader();
        ?>
    </div>
    
    <hr>
    <div id="title-container" class="container text-center">
        <h1>ShipMax</h1>
        <h5 class="text-success">Your largest selection of new and used StarShips anywhere in the galaxy!</h5>
    </div>
    <hr>
    
    <div class="floating-container">
        <h4 class="text-center">Filter Options</h4>
        <div class="filter-container">
            <div class="form-group">
                <input id="search-field" class="form-control" placeholder="Search" type="text" name="search">
                <br>
                <button id="search-button" class="btn btn-primary" onclick="getSearchResults();">Search</button>
            </div>
            
            <!-- Price Range -->
            <details>
                <summary class="card-header"><b></n>Price Range</b></summary>
                <div class="card-body">
                    <div class="form-group">
                        <!-- Min -->
                        Min
                        <div class="input-group mb-3">
                            <input id="price-min" class="form-control" aria-label="Amount (in Bitcoins)" type="number" min="0" value="0" name="priceFrom">
                            <div class="input-group-append">
                                <span class="input-group-text">BTC</span>
                            </div>
                        </div>
                        
                        Max
                        <!-- Max -->
                        <div class="input-group mb-3">
                            <input id="price-max" class="form-control" aria-label="Amount (in Bitcoins)" type="number" min="0" value="0" name="priceTo">
                            <div class="input-group-append">
                                <span class="input-group-text">BTC</span>
                            </div>
                        </div>
                    </div>
                </div>
            </details>
            <br>
            
            <!-- Sort -->
            <details>
                <summary class="card-header"><b></n>Sort</b></summary>
                <div class="card-body">
                    <div id="sort-group" class="form-group">
                        <div class="custom-control custom-radio">
                            <input id="name" name="order" class="custom-control-input" checked="" type="radio">
                            <label class="custom-control-label" for="name">Name</label>
                        </div>
                        <div class="custom-control custom-radio">
                            <input id="price" name="order" class="custom-control-input" type="radio">
                            <label class="custom-control-label" for="price">Price</label>
                        </div>
                    </div>
                </div>
            </details>
            
            <br>
            
            <div class="form-group">
                <button id="clear-all" class="btn btn-warning" name="clear-button" onclick="clearAll();">Remove Filters</button>
            </div>
        </div>
    </div>
    
    <script type="text/javascript">
        getInventory();
    </script>
    
    <div id="inventory" class="grid-container">
        
    </div>
    
    <div id="popout" class="modal fade">
        <div id="modal-dialog" class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div id="modal-header" class="modal-header">
                    <h5 id="popout-name" class="modal-title"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div id="modal-body" class="modal-body">

                </div>
                <div id="modal-footer" class="modal-footer">
                    
                </div>
            </div>
        </div>
    </div>
    
    
    </body>
</html>