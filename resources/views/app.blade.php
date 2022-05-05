<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>App</title>
</head>

<body>
    <div id="app"></div>
    <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
