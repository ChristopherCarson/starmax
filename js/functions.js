var inventory = new Array();

function getInventory() {
    $.ajax({
        type: "POST",
        url: "php/commands.php",
        data: { fName: "GetAll",
                inventory: "",
                stock: ""
        },
        dataType: "json",
        success: function(json) {
            var data = JSON.parse(JSON.stringify(json));
            
            document.getElementById("inventory").innerHTML = "";
            inventory = new Array();
            for(var i = 0; i < data.length; i++) {
                var ship = new Ship(data[i].ship_id,
                                    data[i].inv_id,
                                    data[i].name,
                                    data[i].make,
                                    data[i].model,
                                    data[i].ship_condition,
                                    data[i].long_description,
                                    data[i].cost,
                                    data[i].year_of_production,
                                    data[i].image_url,
                                    data[i].action_image_url
                );
                inventory.push(ship);
                
                var shipData = "";
                shipData += '<div inv_id="' + data[i].inv_id + '" ship_id="' + data[i].ship_id + '" class="card border-success mb-3" data-toggle="modal" data-target="#popout" onclick="getShip(this);">';
                shipData += '<div class="card-header">';
                shipData += '<h5 class="card-title">' + data[i].name + '</h5>';
                shipData += '</div>';
                shipData += '<img class="card-img" style="max-height:150px;" src="' + data[i].image_url + '">';
                shipData += '<div class="card-body">' + data[i].cost + ' BTC';
                shipData += '</div>';
                shipData += '</div>';
                document.getElementById("inventory").innerHTML += shipData;
            }
        },
        error: function(e) {
            //alert(e.responseText);
        }
    });
}

function getSearchResults() {
    var searchText = document.getElementById("search-field").value;
    var priceMin = document.getElementById("price-min").value;
    var priceMax = document.getElementById("price-max").value;
    var orderValue = document.querySelector('input[name="order"]:checked').id;

    console.log(searchText);
    console.log(priceMin);
    console.log(priceMax);
    console.log(orderValue);

    $.ajax({
        type: "POST",
        url: "php/commands.php",
        data: { fName: "GetSearchResults",
                inventory: "",
                stock: "",
                search: searchText,
                name: searchText,
                priceFrom: priceMin,
                priceTo: priceMax,
                orderBy: orderValue
        },
        dataType: "json",
        success: function(json) {
            var data = JSON.parse(JSON.stringify(json));
            //alert("success");
            document.getElementById("inventory").innerHTML = "";
            inventory = new Array();
            for(var i = 0; i < data.length; i++) {
                var ship = new Ship(data[i].ship_id,
                                    data[i].inv_id,
                                    data[i].name,
                                    data[i].make,
                                    data[i].model,
                                    data[i].ship_condition,
                                    data[i].long_description,
                                    data[i].cost,
                                    data[i].year_of_production,
                                    data[i].image_url,
                                    data[i].action_image_url
                );
                inventory.push(ship);
                
                var shipData = "";
                shipData += '<div inv_id="' + data[i].inv_id + '" ship_id="' + data[i].ship_id + '" class="card border-success mb-3" data-toggle="modal" data-target="#popout" onclick="getShip(this);">';
                shipData += '<div class="card-header">';
                shipData += '<h5 class="card-title">' + data[i].name + '</h5>';
                shipData += '</div>';
                shipData += '<img class="card-img" src="' + data[i].image_url + '">';
                shipData += '<div class="card-body">' + data[i].cost + ' BTC';
                shipData += '</div>';
                shipData += '</div>';
                document.getElementById("inventory").innerHTML += shipData;
            }
        },
        error: function(e) {
            //alert(e.responseText);
        }
    });
}

function clearAll() {
    document.getElementById("search-field").value = "";
    document.getElementById("price-min").value = 0;
    document.getElementById("price-max").value = 0;
    
    getInventory();
}

function getShip(element) {
    // Show loading image.
    document.getElementById("popout-name").innerHTML = '';
    document.getElementById("modal-body").innerHTML = '<img class="loading" src="img/loading.gif"><hr>';
    document.getElementById("modal-footer").innerHTML = '';
    
    var id = element.getAttribute("inv_id");
    $.ajax({
        type: "POST",
        url: "php/commands.php",
        data: {fName: "GetShip", shipId: id},
        dataType: "json",
        success: function(json) {
            var shipData = JSON.parse(JSON.stringify(json));
            onPreview(new Ship(shipData.ship_id,
                                shipData.inv_id,
                                shipData.name,
                                shipData.make,
                                shipData.model,
                                shipData.ship_condition,
                                shipData.long_description,
                                shipData.cost,
                                shipData.year_of_production,
                                shipData.image_url,
                                shipData.action_image_url
                            )
            );
        },
        error: function(e) {
            //alert(e.responseText);
        }
    });
}

function searchInventory(inv_id) {
    var ship;
    for(var i = 0; i < inventory.length; i++) {
        if(inventory[i].inv_id == inv_id) {
            ship = inventory[i];
            return ship;
        }
    }
    return ship;
}

function getCart() {
    // Show loading image.
    document.getElementById("popout-name").innerHTML = '';
    document.getElementById("modal-body").innerHTML = '<img class="loading" src="img/loading.gif"><hr>';
    document.getElementById("modal-footer").innerHTML = '';
    
    $.ajax({
        type: "POST",
        url: "php/commands.php",
        data: {fName: "GetCart"},
        dataType: "json",
        success: function(json) {
            var cart = JSON.parse(JSON.stringify(json));
            onCart(cart);
        },
        error: function(e) {
            //alert(e.responseText);
        }
    })
}

function addToCart(element) {
    var id = element.getAttribute("inv_id");
    $.ajax({
        type: "POST",
        url: "php/commands.php",
        data: {fName: "AddToCart", shipId: id},
        dataType: "text",
        success: function(t) {
            var text = 'An item has been added to your cart. <button onclick="getCart()" class="alert-link" data-toggle="modal" data-target="#popout">Click here to view.</button>';
            showAlert(true, text);
        },
        error: function(e) {
            var text = 'This item could not be added to your cart, please try again.';
            showAlert(false, text);
        }
    })
}

function removeFromCart(id) {
    $.ajax({
        type: "POST",
        url: "php/commands.php",
        data: { fName: "RemoveItem", 
                shipId: id},
        dataType: "text",
        success: function(json) {
            var data = JSON.parse(JSON.stringify(json));
            getCart();
        },
        error: function(e) {
            //alert(e.responseText);
        }
    });
}

function updateCartQuantity(ship) {
    var id = ship.getAttribute("inv_id");
    var quantity = ship.value;
    
    $.ajax({
        type: "POST",
        url: "php/commands.php",
        data: { fName: "UpdateCart", 
                shipId: id,
                update: quantity
        },
        dataType: "text",
        success: function(json) {
            var data = JSON.parse(JSON.stringify(json));
            getCart();
        },
        error: function(e) {
            alert(e.responseText);
        }
    });
}

function onPreview(ship) {
    var inventoryItem = searchInventory(ship.inv_id);
    
    document.getElementById("modal-dialog").className = "modal-dialog";
    
    // Populate header
    document.getElementById("popout-name").innerHTML = inventoryItem.name;

    // Populate body
    document.getElementById("modal-body").innerHTML = '';
    document.getElementById("modal-body").innerHTML += '<img id="popout-img" src="' + inventoryItem.action_image_url + '"><hr>';
    document.getElementById("modal-body").innerHTML += '<p id="popout-desc">' + inventoryItem.long_description + '</p>';
    document.getElementById("modal-body").innerHTML += '<p id="popout-make">Make: ' + inventoryItem.make + '</p>';
    document.getElementById("modal-body").innerHTML += '<p id="popout-model">Model: ' + inventoryItem.model + '</p>';
    document.getElementById("modal-body").innerHTML += '<p id="popout-make">Condition: ' + inventoryItem.ship_condition + '</p>';
    document.getElementById("modal-body").innerHTML += '<p id="popout-year">Production Year: ' + inventoryItem.year_of_production + '</p>';
    document.getElementById("modal-body").innerHTML += '<p id="popout-cost">Cost: ' + inventoryItem.cost + ' BTC</p>';
    
    
    // Populate footer
    document.getElementById("modal-footer").innerHTML = '';
    
    // Add to cart button
    document.getElementById("modal-footer").innerHTML += '<button id="add-button" inv_id="' + inventoryItem.inv_id + '" type="button" class="btn btn-success" data-toggle="alert" data-target="#alert-modal" data-dismiss="modal" shipId="-1" onclick="addToCart(this)">Add to cart</button>';
    
    // Close button
    document.getElementById("modal-footer").innerHTML += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
}

function onCart(cart) {
    document.getElementById("modal-dialog").className = "modal-dialog modal-lg";
    
    // Populate header
    document.getElementById("popout-name").innerHTML = "Cart";
    
    
    // Populate body
    var bodyHtml = '';
    if(cart != null) {
        if(cart.length == 0) {
            bodyHtml += '<div class="text-center"><h3>There are no ships in your cart yet!</h3></div>';
        } else {
            var total = 0;
            bodyHtml += '<table class="table table-hover">';
            
            // Table body
            bodyHtml += '<tbody>';
            for(var i = 0; i < cart.length; i++) {
                bodyHtml += '<tr><td><div class="column-name">' + cart[i].name + '</div></td>';
                bodyHtml += '<td><div class="column-number"><input class="column-number" type="number" inv_id="' + cart[i].id +'" min="1" max="99" value="' + cart[i].quantity + '" onchange="updateCartQuantity(this)" /></div></td>';
                bodyHtml += '<td><div class="column-price">' + cart[i].price + ' BTC</div></td>';
                bodyHtml += '<td><div class="column-button"><button class="btn btn-danger" onclick="removeFromCart(' + cart[i].id + ')">Remove</button></div></td></tr>';
                total += parseInt(cart[i].price) * cart[i].quantity;
            }
            
            bodyHtml += '</tbody>';
            bodyHtml += '</table>';
            
            bodyHtml += '<div id="total">Total: ' + total + ' BTC</div>';
        }
    } else {
        bodyHtml += '<div class="text-center"><h3>There are no ships in your cart yet!</h3></div>';
    }
    
    document.getElementById("modal-body").innerHTML = bodyHtml;
    
    
    // Populate footer
    document.getElementById("modal-footer").innerHTML = '';
    
    // Checkout button
    document.getElementById("modal-footer").innerHTML += '<button id="checkout-button" type="button" class="btn btn-success" data-toggle="alert" data-target="#alert-modal" data-dismiss="modal" shipId="-1" onclick="checkout()">Checkout</button>';
    
    // Close button
    document.getElementById("modal-footer").innerHTML += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
}

function onHome() {
    document.location = "index.php";
}

function onLogin() {
    var usernameValue = document.getElementById("username-field").value;
    var passwordValue = document.getElementById("password-field").value;
    
    $.ajax({
        type: "POST",
        url: "php/commands.php",
        data: { fName: "LoginAuth",
                username: usernameValue,
                password: passwordValue
        },
        dataType: "text",
        success: function(redir) {
            document.location = redir;
        },
        error: function(e) {
            //alert(e.responseText);
        }
    });
}

function onLogout() {
    $.ajax({
        type: "POST",
        url: "php/commands.php",
        data: { fName: "Logout"
        },
        dataType: "text",
        success: function(redir) {
            document.location = redir;
        },
        error: function(e) {
            //alert(e.responseText);
        }
    });
}

function promptLogin() {
    document.getElementById("modal-dialog").className = "modal-dialog";
    
    // Populate header
    document.getElementById("popout-name").innerHTML = "Login";

    // Populate body
    var bodyHtml = '';
    document.getElementById("modal-body").innerHTML = '';
    bodyHtml += '<div class="form-group">';
    bodyHtml += 'Username<br>';
    bodyHtml += '<input id="username-field" class="form-control" placeholder="Username" type="text" name="username"><br>';
    bodyHtml += 'Password<br>';
    bodyHtml += '<input id="password-field" class="form-control" placeholder="" type="password" name="password">';
    bodyHtml += '</div>';
    document.getElementById("modal-body").innerHTML = bodyHtml;
    
    // Populate footer
    document.getElementById("modal-footer").innerHTML = '';
    
    // Add to cart button
    document.getElementById("modal-footer").innerHTML += '<button id="confirm-login" " type="button" class="btn btn-success" data-toggle="alert" data-target="#alert-modal" data-dismiss="modal" onclick="onLogin()">Login</button>';
    
    // Close button
    document.getElementById("modal-footer").innerHTML += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
}

function showAlert(success, text) {
    if(success) {
        document.getElementById("alert-modal").class = "alert alert-dismissible alert-success";
        document.getElementById("alert-text").innerHTML = text;
    } else {
        document.getElementById("alert-modal").class = "alert alert-dismissible alert-danger";
        document.getElementById("alert-text").innerHTML = text;
    }
    
    document.getElementById("alert-modal").style.display = "block";
}

function displayPurchaseHistory() {
    $.ajax({
        type: "POST",
        url: "php/commands.php",
        data: { fName: "GetAll",
            purchases: "purchases"
        },
        dataType: "json",
        success: function(json) {
            var data = JSON.parse(JSON.stringify(json));
            var bodyHtml = '';
             
            // Table header
            bodyHtml += '<br><br><table class="table table-hover">';
            bodyHtml += '<thead><tr><th class="text-success" scope="col">Purchase ID</th>';
            bodyHtml += '<th class="text-success" scope="col">Username</th>';
            bodyHtml += '<th class="text-success" scope="col">Date</th>';
            bodyHtml += '<th class="text-success" scope="col">Item</th>';
            bodyHtml += '<th class="text-success" scope="col">Quantity</th>';
            bodyHtml += '<th class="text-success" scope="col">Price</th>';
            bodyHtml += '</tr></thead>';
            
            // Table body
            bodyHtml += '<tbody>';
            for(var i = 0; i < data.length; i++) {
                bodyHtml += '<tr><td><div class="column-number">' + data[i].purchase_id + '</div></td>';
                bodyHtml += '<td><div>' + data[i].username + '</div></td>';
                bodyHtml += '<td><div>' + data[i].date + '</div></td>';
                bodyHtml += '<td><div>' + data[i].name + '</div></td>';
                bodyHtml += '<td><div>' + data[i].quantity + '</div></td>';
                bodyHtml += '<td><div>' + data[i].sell_price + ' BTC</div></td></tr>';
            }
            
            bodyHtml += '</tbody>';
            bodyHtml += '</table>';
            document.getElementById("purchase-history").innerHTML = bodyHtml;
        },
        error: function(e) {
            //alert(e.responseText);
        }
    });
}




function displayInventoryByYear() {
        $.ajax({
        type: "POST",
        url: "php/commands.php",
        data: { fName: "DisplayInventoryByYear"
        },
        dataType: "json",
        success: function(json) {
            var data = JSON.parse(JSON.stringify(json));
            //alert(JSON.stringify(json));
            var bodyHtml = '';
             
            // Table header
            bodyHtml += '<br><br><table class="table table-hover">';
            bodyHtml += '<thead><tr><th class="text-success" scope="col">Year of Production</th>';
            bodyHtml += '<th class="text-success" scope="col">Number of Ships</th>';
            bodyHtml += '<th class="text-success" scope="col">Total Costs</th>';
            bodyHtml += '</tr></thead>';
            
            // Table body
            bodyHtml += '<tbody>';
            for(var i = 0; i < data.length; i++) {
                bodyHtml += '<tr><td><div class="column-number">' + data[i].year_of_production + '</div></td>';
                bodyHtml += '<td><div>' + data[i].count + '</div></td>';
                bodyHtml += '<td><div>' + data[i].cost + ' BTC</div></td></tr>';
            }
            
            bodyHtml += '</tbody>';
            bodyHtml += '</table>';
            document.getElementById("inventory-by-year").innerHTML = bodyHtml;
        },
        error: function(e) {
            //alert(e.responseText);
        }
    });
}





function displayInventoryStock() {
    $.ajax({
        type: "POST",
        url: "php/commands.php",
        data: { fName: "GetAll",
            inventory: "inventory"
        },
        dataType: "json",
        success: function(json) {

            var data = JSON.parse(JSON.stringify(json));
            var bodyHtml = '<br><button id="add-inventory-btn" class="btn btn-success" data-toggle="modal" data-target="#popout" onclick="onAddInventory()">Add New Item</button>';
             
            // Table header
            bodyHtml += '<br><br><table class="table table-hover">';
            bodyHtml += '<thead><tr><th class="text-success" scope="col">Inventory ID</th>';
            bodyHtml += '<th class="text-success" scope="col">Ship ID</th>';
            bodyHtml += '<th class="text-success" scope="col">Name</th>';
            bodyHtml += '<th class="text-success" scope="col">Condition</th>';
            bodyHtml += '<th class="text-success" scope="col">Price</th>';
            bodyHtml += '<th class="text-success" scope="col">Manage</th>';
            bodyHtml += '<th class="text-success" scope="col"></th>';
            bodyHtml += '</tr></thead>';
            
            // Table body
            bodyHtml += '<tbody>';
            for(var i = 0; i < data.length; i++) {
                bodyHtml += '<tr><td><div>' + data[i].inv_id + '</div></td>';
                bodyHtml += '<td><div>' + data[i].ship_id + '</div></td>';
                bodyHtml += '<td><div>' + data[i].name + '</div></td>';
                bodyHtml += '<td><div>' + data[i].ship_condition + '</div></td>';
                bodyHtml += '<td><div>' + data[i].cost + '</div></td>';
                bodyHtml += '<td><div><button class="btn btn-primary" data-toggle="modal" data-target="#popout" onclick="onUpdateInventory(' + data[i].inv_id + ')">Update</button></div></td>';
                bodyHtml += '<td><div><button class="btn btn-danger" onclick="deleteInventory(' + data[i].inv_id + ')" >Remove</button></div></td>';
                bodyHtml += '</tr>';
            }
            
            bodyHtml += '</tbody>';
            bodyHtml += '</table>';
            document.getElementById("inventory-stock").innerHTML = '';
            document.getElementById("inventory-stock").innerHTML = bodyHtml;
        },
        error: function(e) {
            //alert(e.responseText);
        }
    });
}

function displayUserSales() {
        $.ajax({
        type: "POST",
        url: "php/commands.php",
        data: { fName: "DisplayUserSales"
        },
        dataType: "json",
        success: function(json) {
            var data = JSON.parse(JSON.stringify(json));
            //alert(JSON.stringify(json));
            var bodyHtml = '';
             
            // Table header
            bodyHtml += '<br><br><table class="table table-hover">';
            bodyHtml += '<thead><tr><th class="text-success" scope="col">Username</th>';
            bodyHtml += '<th class="text-success" scope="col">Units Sold</th>';
            bodyHtml += '<th class="text-success" scope="col">Total Sales</th>';
            bodyHtml += '</tr></thead>';
            
            // Table body
            bodyHtml += '<tbody>';
            for(var i = 0; i < data.length; i++) {
                bodyHtml += '<tr><td><div class="column-number">' + data[i].username + '</div></td>';
                bodyHtml += '<td><div>' + data[i].quantity + '</div></td>';
                bodyHtml += '<td><div>' + data[i].sales + ' BTC</div></td></tr>';
            }
            
            bodyHtml += '</tbody>';
            bodyHtml += '</table>';
            document.getElementById("user-sales").innerHTML = bodyHtml;
        },
        error: function(e) {
            //alert(e.responseText);
        }
    });
}

function displayShipStock() {
    $.ajax({
        type: "POST",
        url: "php/commands.php",
        data: { fName: "GetAll",
            ships: "ships"
        },
        dataType: "json",
        success: function(json) {
            //alert(JSON.stringify(json));
            var data = JSON.parse(JSON.stringify(json));
            var bodyHtml = '<br><button id="add-ship-btn" class="btn btn-success" data-toggle="modal" data-target="#popout" onclick="onAddShip()">Add New Ship</button>';
             
            // Table header
            bodyHtml += '<br><br><table class="table table-hover">';
            bodyHtml += '<thead><tr>';
            bodyHtml += '<th class="text-success" scope="col">Ship ID</th>';
            bodyHtml += '<th class="text-success" scope="col">Name</th>';
            bodyHtml += '<th class="text-success" scope="col">Make</th>';
            bodyHtml += '<th class="text-success" scope="col">Model</th>';
            bodyHtml += '</tr></thead>';
            
            // Table body
            bodyHtml += '<tbody>';
            for(var i = 0; i < data.length; i++) {
                bodyHtml += '<tr><td><div>' + data[i].ship_id + '</div></td>';
                bodyHtml += '<td><div>' + data[i].name + '</div></td>';
                bodyHtml += '<td><div>' + data[i].make + '</div></td>';
                bodyHtml += '<td><div>' + data[i].model + '</div></td>';
                //bodyHtml += '<td><div><button class="btn btn-primary" data-toggle="modal" data-target="#popout" onclick="onUpdateShip(' + data[i].ship_id + ')">Update</button></div></td>';
                //bodyHtml += '<td><div><button class="btn btn-danger" onclick="deleteShip(' + data[i].ship_id + ')" >Remove</button></div></td>';
                bodyHtml += '</tr>';
            }
            
            bodyHtml += '</tbody>';
            bodyHtml += '</table>';
            document.getElementById("ship-stock").innerHTML = bodyHtml;
        },
        error: function(e) {
            //alert(e.responseText);
        }
    });
}

function onAddShip() {
    
    // Populate Header
    document.getElementById("modal-dialog").className = "modal-dialog";
    document.getElementById("popout-name").innerHTML = "New Ship";
        
    // Populate Body
    var bodyHtml = '';
    bodyHtml += '<div class="form-group">';
    
    bodyHtml += 'Make<br>';
    bodyHtml += '<input class="form-control" placeholder="Make" id="ship-make" type="text" value=""><br>';
    
    bodyHtml += 'Model<br>';
    bodyHtml += '<input class="form-control" placeholder="Model" id="ship-model" type="text" value=""><br>';
    
    bodyHtml += 'Description<br>';
    bodyHtml += '<textarea class="form-control" placeholder="Description" id="ship-description" type="text" rows="4"></textarea><br>';
    
    bodyHtml += 'Thumbnail URL<br>';
    bodyHtml += '<input class="form-control" id="ship-thumb" type="text" value=""><br>';
    
    bodyHtml += 'Action Image URL<br>';
    bodyHtml += '<input class="form-control" id="ship-action" type="text" value=""><br>';
    bodyHtml += '</div>';
    
    document.getElementById("modal-body").innerHTML = bodyHtml;
    
    // Populate Footer
    document.getElementById("modal-footer").innerHTML += '<button id="add-new-ship" type="button" class="btn btn-success" data-dismiss="modal" onclick="addShip()">Add Ship</button>';

    // Close button
    document.getElementById("modal-footer").innerHTML += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
}

function onUpdateShip(id) {
    // Show loading image.
    document.getElementById("popout-name").innerHTML = '';
    document.getElementById("modal-body").innerHTML = '<img class="loading" src="img/loading.gif"><hr>';
    document.getElementById("modal-footer").innerHTML = '';
    
    $.ajax({
        type: "POST",
        url: "php/commands.php",
        data: { fName: "GetShip",
                shipId: id
        },
        dataType: "json",
        success: function(json) {
            var ship = JSON.parse(JSON.stringify(json));

            
            // Populate Header
            document.getElementById("modal-dialog").className = "modal-dialog";
            document.getElementById("popout-name").innerHTML = ship.name;
            
            // Populate Body
            var bodyHtml = '';
            bodyHtml += '<div class="form-group">';
            
            bodyHtml += 'Make<br>';
            bodyHtml += '<input class="form-control" placeholder="Make" id="ship-make" type="text" value="' + ship.make + '"><br>';
            
            bodyHtml += 'Model<br>';
            bodyHtml += '<input class="form-control" placeholder="Model" id="ship-model" type="text" value="' + ship.model + '"><br>';
            
            bodyHtml += 'Description<br>';
            bodyHtml += '<textarea class="form-control" placeholder="Description" id="ship-description" type="text" rows="4">' + ship.long_description + '</textarea><br>';
            
            bodyHtml += 'Thumbnail URL<br>';
            bodyHtml += '<input class="form-control" id="ship-thumb" type="text" value="' + ship.image_url + '"><br>';
            
            bodyHtml += 'Action Image URL<br>';
            bodyHtml += '<input class="form-control" id="ship-action" type="text" value="' + ship.action_image_url + '"><br>';
            bodyHtml += '</div>';
            
            document.getElementById("modal-body").innerHTML = bodyHtml;
            
            // Populate Footer
            document.getElementById("modal-footer").innerHTML += '<button id="update-ship" type="button" class="btn btn-success" data-dismiss="modal" onclick="updateShip()">Update</button>';
    
            // Close button
            document.getElementById("modal-footer").innerHTML += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
        },
        error: function(e) {
            //alert(e.responseText);
        }
    });
}

function onAddInventory() {
    // Show loading image.
    document.getElementById("popout-name").innerHTML = '';
    document.getElementById("modal-body").innerHTML = '<img class="loading" src="img/loading.gif"><hr>';
    document.getElementById("modal-footer").innerHTML = '';
        
    $.ajax({
        type: "POST",
        url: "php/commands.php",
        data: { fName: "GetAll",
            ships: "ships"
        },
        dataType: "json",
        success: function(allships) {
            
            var ships = JSON.parse(JSON.stringify(allships));
            
            // Populate Header
            document.getElementById("modal-dialog").className = "modal-dialog";
            document.getElementById("popout-name").innerHTML = "New Item";
            
            // Populate Body
            var bodyHtml = '';
            
            bodyHtml += '<div class="form-group">';
            bodyHtml += 'Ship<br>';
            bodyHtml += '<select id="add-ship-id" class="custom-select">';
            for(var i = 0; i < ships.length; i++) {
                if(i == 0) {
                    bodyHtml += '<option selected="" value="' + ships[i].ship_id + '">' + ships[i].name + '</option>';
                } else {
                    bodyHtml += '<option value="' + ships[i].ship_id + '">' + ships[i].name + '</option>';
                }
            }
            bodyHtml += '</select><br>';
            
            bodyHtml += '<br>Condition<br>';
            bodyHtml += '<input class="form-control" placeholder="Model" id="ship-condition" type="text" value=""><br>';

            bodyHtml += 'Cost<br>';
            bodyHtml += '<input class="form-control" id="ship-cost" type="number" min="1" value=""><br>';
            
            bodyHtml += 'Production Year<br>';
            bodyHtml += '<input class="form-control" id="ship-year" type="text" value=""><br>';
            
            document.getElementById("modal-body").innerHTML = bodyHtml;
            
            // Populate Footer
            document.getElementById("modal-footer").innerHTML += '<button id="add-inventory" type="button" class="btn btn-success" data-dismiss="modal" onclick="addInventory()">Add Item</button>';
    
            // Close button
            document.getElementById("modal-footer").innerHTML += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
        },
        error: function(e) {
            //alert(e.responseText);
        }
    });
}

function onUpdateInventory(id) {
    // Show loading image.
    document.getElementById("popout-name").innerHTML = '';
    document.getElementById("modal-body").innerHTML = '<img class="loading" src="img/loading.gif"><hr>';
    document.getElementById("modal-footer").innerHTML = '';
    
    $.ajax({
        type: "POST",
        url: "php/commands.php",
        data: { fName: "GetShip",
                shipId: id
        },
        dataType: "json",
        success: function(json) {
            var ship = JSON.parse(JSON.stringify(json));
            
            $.ajax({
                type: "POST",
                url: "php/commands.php",
                data: { fName: "GetAll",
                    ships: "ships"
                },
                dataType: "json",
                success: function(allships) {
                    
                    var ships = JSON.parse(JSON.stringify(allships));
                    
                    // Populate Header
                    document.getElementById("modal-dialog").className = "modal-dialog";
                    document.getElementById("popout-name").innerHTML = ship.name;
                    
                    // Populate Body
                    var bodyHtml = '';
                    
                    bodyHtml += '<div class="form-group">';
                    bodyHtml += 'Ship<br>';
                    bodyHtml += '<select id="upd-ship-id" class="custom-select">';
                    for(var i = 0; i < ships.length; i++) {
                        if(ships[i].ship_id == ship.ship_id) {
                            bodyHtml += '<option selected="" value="' + ships[i].ship_id + '">' + ships[i].name + '</option>';
                        } else {
                            bodyHtml += '<option value="' + ships[i].ship_id + '">' + ships[i].name + '</option>';
                        }
                    }
                    bodyHtml += '</select><br>';
                    
                    bodyHtml += '<br>Condition<br>';
                    bodyHtml += '<input class="form-control" placeholder="Model" id="ship-condition" type="text" value="' + ship.ship_condition + '"><br>';
        
                    bodyHtml += 'Cost<br>';
                    bodyHtml += '<input class="form-control" id="ship-cost" type="number" min="1" value="' + ship.cost + '"><br>';
                    
                    bodyHtml += 'Production Year<br>';
                    bodyHtml += '<input class="form-control" id="ship-year" type="text" value="' + ship.year_of_production + '"><br>';
                    
                    document.getElementById("modal-body").innerHTML = bodyHtml;
                    
                    // Populate Footer
                    document.getElementById("modal-footer").innerHTML += '<button id="update-inventory" type="button" class="btn btn-success" data-dismiss="modal" onclick="updateInventory(' + ship.inv_id + ')">Update</button>';
            
                    // Close button
                    document.getElementById("modal-footer").innerHTML += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
                },
                error: function(e) {
                    //alert(e.responseText);
                }
            });
        },
        error: function(e) {
            //alert(e.responseText);
        }
    });
}

function addShip() {
    var description = document.getElementById("ship-description").value;
    var make = document.getElementById("ship-make").value;
    var model = document.getElementById("ship-model").value;
    var price = document.getElementById("ship-price").value;
    var image_url = document.getElementById("ship-thumb").value;
    var action_image_url = document.getElementById("ship-action").value;
    console.log("addShip");
    $.ajax({
        type: "POST",
        url: "php/commands.php",
        data: { fName: "AddItem",
                createShip: "createShip",
                long_description: description,
                make: make,
                model: model,
                price: price,
                image_url: image_url,
                action_image_url: action_image_url
        },
        dataType: "text",
        complete: function(text) {
            displayShipStock();
        },
        error: function(e) {
            //alert(e.responseText);
        }
    });
}

function addInventory() {
    var ship_id = document.getElementById("add-ship-id").value;
    var condition = document.getElementById("ship-condition").value;
    var cost = document.getElementById("ship-cost").value;
    var year = document.getElementById("ship-year").value;
        
    $.ajax({
        type: "POST",
        url: "php/commands.php",
        data: { fName: "AddItem",
                createInventory: "createInventory",
                ship: ship_id,
                ship_condition: condition,
                cost: cost,
                year_of_production: year,
        },
        dataType: "text",
        success: function(text) {
            displayInventoryStock();
        },
        error: function(e) {
            //alert(e.responseText);
        }
    });
}

function updateInventory(inv_id) {
    var ship_id = document.getElementById("upd-ship-id").value;
    var condition = document.getElementById("ship-condition").value;
    var cost = document.getElementById("ship-cost").value;
    var year = document.getElementById("ship-year").value;
        
    $.ajax({
        type: "POST",
        url: "php/commands.php",
        data: { fName: "UpdateItem",
                updateInventory: "updateInventory",
                inv_id: inv_id,
                ship: ship_id,
                ship_condition: condition,
                cost: cost,
                year_of_production: year
        },
        dataType: "text",
        success: function(text) {
            displayInventoryStock();
        },
        error: function(e) {
            //alert(e.responseText);
        }
    });
}

function updateShip() {
    var description = document.getElementById("ship-description").innerHTML;
    var make = document.getElementById("ship-make").value;
    var model = document.getElementById("ship-model").value;
    var price = document.getElementById("ship-price").value;
    var image_url = document.getElementById("ship-thumb").value;
    var action_image_url = document.getElementById("ship-action").value;
        
    $.ajax({
        type: "POST",
        url: "php/commands.php",
        data: { fName: "UpdateItem",
                updateShip: "updateShip",
                long_description: description,
                make: make,
                model: model,
                price: price,
                image_url: image_url,
                action_image_url: action_image_url
        },
        dataType: "text",
        success: function(text) {
            //alert("Ship updated.");
        },
        error: function(e) {
            //alert(e.responseText);
        }
    });
}

function deleteInventory(id) {
    $.ajax({
        type: "POST",
        url: "php/commands.php",
        data: { fName: "DeleteItem",
                shipId: id
        },
        dataType: "text",
        success: function(text) {
            displayInventoryStock();
        },
        error: function(e) {
            //alert(e.responseText);
        }
    });
}

function hideAlert() {
    document.getElementById("alert-modal").style.display = "none";
}

function hideModal() {
    
}
