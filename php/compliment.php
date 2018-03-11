<?php
        $servername = "localhost";
        $username = "username";
        $password = "password";
        $dbname = "myDB";

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Escape user inputs for security
        $compliment = mysqli_real_escape_string($conn, $_POST['compliment']);
        $name = mysqli_real_escape_string($conn, $_POST['name']);

        $sql = "INSERT INTO AlpacaCompliments (compliment, name)
        VALUES ($compliment, $name)";

        if ($conn->query($sql) === TRUE) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }

        $conn->close();
    ?> 