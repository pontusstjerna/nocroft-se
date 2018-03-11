<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/main.css">
    <link href="https://fonts.googleapis.com/css?family=Joti+One|Raleway" rel="stylesheet">
    <title>Pontek.se</title>
</head>
<body>
    <div class="main-container">
        <h1 id="header">Alpacas are totally awesome </h1>
        <img id="alpaca" src="assets/Alpaca_headshot.jpg" />
        <div id="compliment">
            <input id="form-compliment" class="compliment-value" type="text" name="compliment" placeholder="Compliment alpacas"/>
            <input id="form-name" class="compliment-value" type="text" name="name" placeholder="Your name" />
            <input id="send" type="submit" value="Send"/>
        </div>
        <p id="alpaca-description"></p>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="js/alpacas.js"></script>
</body>
</html>