<?php
    session_start();
    include('php/loginAuth.php');
    header("Location:".checkLoggedIn("page"));
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title> ShipMax - Admin </title>
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
        <h5 class="text-success">Admin Console</h5>
    </div>
    <hr>
    
    <div class="container">
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link active show" data-toggle="tab" href="#inventory-stock">Inventory</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#ship-stock">Ships</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#purchase-history">Purchase History</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#user-sales">User Sales</a>
            </li>
            <li class="nav-item">
	        
	        <a class="nav-link" data-toggle="tab" href="#inventory-by-year">Inventory By Year</a>
	        
           </li>
        </ul>
        <script type="text/javascript">displayInventoryStock();</script>
        <script type="text/javascript">displayShipStock();</script>
        <script type="text/javascript">displayPurchaseHistory();</script>
        <script type="text/javascript">displayUserSales();</script>
	<script type="text/javascript">displayInventoryByYear();</script>
        
        <div id="adminTabs" class="tab-content">
            <div class="tab-pane fade active show" id="inventory-stock">
                
            </div>
            
            <div class="tab-pane fade" id="ship-stock">
                
            </div>
            
            <div class="tab-pane fade" id="purchase-history">
                
            </div>
            
            <div class="tab-pane fade" id="user-sales">
                
            </div>

	    <div class="tab-pane fade" id="inventory-by-year">
   
  
          
	    </div>
        </div>
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