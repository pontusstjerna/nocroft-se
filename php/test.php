<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PHP test</title>
</head>
<body>
    <h2>You just wrote: <?php echo $_POST["input"]; ?></h2>

    <form action="test.php" method="post">
        <input type="text" name="input" placeholder="Write something"/>
        <input type="submit" value="Send" />
    </form>
</body>
</html>