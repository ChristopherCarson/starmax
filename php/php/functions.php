<?php
    include'dbConnection.php';
    
    
    
    function reportInventoryByYear() {
        $conn = getDatabaseConnection();
        $sql="select year_of_production, count(inv_id) as count, sum(cost) as cost
        from inventory group by year_of_production";
        $statement = $conn->prepare($sql);
        $statement->execute();
        $records = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $records;
    }
    
    function reportSalesByUser() {
        $conn = getDatabaseConnection();
        $sql="select  username, SUM(quantity) as quantity, sum(sell_price) sales
            from purchase_history as p join users as u
            on p.user_id = u.user_id
            join purchased_items as i on i.purchase_id = p.purchase_id
            join ships as s on s.ship_id = i.ship_id
            group by username
            order by quantity desc";
        $statement = $conn->prepare($sql);
        $statement->execute();
        $records = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $records;
    }
    
    function selectPurchaseHistory($ship_id) {
        $conn = getDatabaseConnection();
        $sql="select p.purchase_id, username, p.date,
        s.name, quantity, sell_price
        from purchase_history as p join users as u
        on p.user_id = u.user_id
        join purchased_items as i on i.purchase_id = p.purchase_id
        join ships as s on s.ship_id = i.ship_id
        where i.ship_id = " . $ship_id;
        
        $statement = $conn->prepare($sql);
        $statement->execute();
        $records = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $records;
    }
    
    
    function searchInventory($namedParameters) {
        $conn = getDatabaseConnection();
        
        $sql="select i.inv_id, s.ship_id, s.name, make, model, i.ship_condition, long_description, 
            cost, i.year_of_production, image_url, action_image_url
            from inventory as i join ships as s on ship = s.ship_id
            WHERE 1 ";
            
        if (isset($namedParameters[":name"]))
            {
                $sql .= " AND name LIKE :name";
                //$namedParameters[":name"] = "%" . $namedParameters[":name"] . "%";
            }
        if (isset($namedParameters[":priceFrom"]))
            {
                $sql .= " AND cost >= :priceFrom";
            }
        if (isset($namedParameters[":priceTo"]))
            {
                $sql .= " AND cost <= :priceTo";
            }
        if (isset($namedParameters[":order"]))
            {
                if ($namedParameters[":order"] === "cost")
                {
                    //$namedParameters[":orderBy"] == "cost";
                    $sql .= " ORDER BY :order";
                }
                else
                {
                    $sql .= " ORDER BY :order";
                }
            }
            $stmt = $conn->prepare($sql);
            $stmt->execute($namedParameters);
            $records = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $records;
    }
    
    
    function retrieveUser($namedParameters)
    {
        $conn = getDatabaseConnection();
        $sql = 'SELECT * FROM users
        WHERE username = :username';
        $stmt = $conn->prepare($sql);
        $stmt->execute($namedParameters);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        error_log($user['username']);
        return $user;
    }
    
    function selectSingleInventory($inv_id) {
        $conn = getDatabaseConnection();
        $sql="select i.inv_id, s.ship_id, s.name, make, model, i.ship_condition, long_description, 
        cost, i.year_of_production, image_url, action_image_url
        from inventory as i join ships as s on ship = s.ship_id
        WHERE i.inv_id = " . $inv_id;
        //WHERE ship_id = " . $_GET['ship_id'];
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $record = $stmt->fetch(PDO::FETCH_ASSOC);
        return $record;
    }
    
    function selectShipInfo($ship_id) {
        $conn = getDatabaseConnection();
        $sql="select * from ships
        WHERE ship_id = " . $ship_id;
        //WHERE ship_id = " . $_GET['ship_id'];
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $record = $stmt->fetch(PDO::FETCH_ASSOC);
        return $record;
    }
    
    function selectInventoryInfo($inv_id) {
        $conn = getDatabaseConnection();
        $sql="select * from inventory
        WHERE inv_id = " . $inv_id;
        //WHERE inv_id = " . $_GET['inv_id'];
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $record = $stmt->fetch(PDO::FETCH_ASSOC);
        return $record;
    }
    
    function createShip($namedParameters) {
        $conn = getDatabaseConnection();
        $sql = "INSERT INTO ships 
            (name, long_description, make, model, image_url, action_image_url) 
                   VALUES (:name, :long_description, :make, :model, :image_url, :action_image_url)";
        $stmt = $conn->prepare($sql);
        $stmt->execute($namedParameters);
        error_log(getShipCreatedLast()['ship_id']);
    }
    
    function getShipCreatedLast() {
        $conn = getDatabaseConnection();
        $sql="select max(ship_id) as ship_id from ships";
        $statement = $conn->prepare($sql);
        $statement->execute();
        $records = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $records;
    }
    
    function createInventory($namedParameters) {
        $conn = getDatabaseConnection();
        $sql = "INSERT INTO inventory 
            (ship, ship_condition, cost, year_of_production) 
                   VALUES (:ship, :ship_condition, :cost, :year_of_production)";
        $stmt = $conn->prepare($sql);
        $stmt->execute($namedParameters);
        return getInventoryCreatedLast();
    }
    
    function getInventoryCreatedLast() {
        $conn = getDatabaseConnection();
        $sql="select max(inv_id) as inv_id from inventory";
        $statement = $conn->prepare($sql);
        $statement->execute();
        $records = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $records;
    }

    
    function selectAllShips() {
        $conn = getDatabaseConnection();
        $sql="SELECT * FROM ships";
        $statement = $conn->prepare($sql);
        $statement->execute();
        $records = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $records;
    }
    
    function selectAllInventory() {
        $conn = getDatabaseConnection();
        $sql="select inv_id, ship_id, s.name, make, model, i.ship_condition, long_description, 
        cost, i.year_of_production, image_url, action_image_url,
        action_image_url from
        inventory as i join ships as s on ship = ship_id";
        $statement = $conn->prepare($sql);
        $statement->execute();
        $records = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $records;
    }
    
    function selectAllPurchases() {
        $conn = getDatabaseConnection();
        $sql="select p.purchase_id, username, p.date,
        s.name, quantity, sell_price
        from purchase_history as p join users as u
        on p.user_id = u.user_id
        join purchased_items as i on i.purchase_id = p.purchase_id
        join ships as s on s.ship_id = i.ship_id";
        $statement = $conn->prepare($sql);
        $statement->execute();
        $records = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $records;
    }
    
    function updateShip($ship_id, $namedParameters) {
        $conn = getDatabaseConnection();
            $sql = "UPDATE ships 
                    SET name = :name, 
                        long_description = :long_description, 
                        make = :make, 
                        model = :model, 
                        image_url = :image_url, 
                        action_image_url = :action_image_url  
                    WHERE ship_id = " . $ship_id;
            $stmt = $conn->prepare($sql);
            $stmt->execute($namedParameters);
            return $ship_id;
    }
    
    function updateInventory($inv_id, $namedParameters) {
        $conn = getDatabaseConnection();
            $sql = "UPDATE inventory 
                    SET ship = :ship, 
                        ship_condition = :ship_condition, 
                        cost = :cost, 
                        year_of_production = :year_of_production 
                    WHERE inv_id = " . $inv_id;
            $stmt = $conn->prepare($sql);
            $stmt->execute($namedParameters);
            return $inv_id;
    }
    
    function deleteShip($id) {
        $conn = getDatabaseConnection();
            $sql = "DELETE from inventory where inv_id = " . $id;
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            return $ship_id;
    }
    
    function shipDropDown($ship_id = 0) {
        $conn = getDatabaseConnection();
        $sql = "SELECT ship_id, name FROM ships ORDER BY name";
        $statement = $conn->prepare($sql);
        $statement->execute();
        $records = $statement->fetchAll(PDO::FETCH_ASSOC);
        foreach ($records as $record) {
            echo "<option ";
            echo ($record["ship_id"] == $ship_id) ? "selected" : "";
            echo " value='" . $record["ship_id"] ."'>" . $record['name'] . " </option>";
        }
    }
    
    function invDropDown($inv_id = 0) {
        $conn = getDatabaseConnection();
        $sql = 'SELECT inv_id, concat(name," - $", cost) as name  FROM inventory
            join ships on ship = ship_id ORDER BY name';
        $statement = $conn->prepare($sql);
        $statement->execute();
        $records = $statement->fetchAll(PDO::FETCH_ASSOC);
        foreach ($records as $record) {
            echo "<option ";
            echo ($record["inv_id"] == $inv_id) ? "selected" : "";
            echo " value='" . $record["inv_id"] ."'>" . $record['name'] . " </option>";
        }
    }
    
    
?>