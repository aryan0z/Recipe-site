<?php
try {
    $dsn = 'mysql:host=localhost;dbname=veg_delight;charset=utf8mb4';
    $username = 'root';
    $password = '';
    $db = new PDO($dsn, $username, $password);
    echo "Database connection successful!";
} catch (Exception $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>