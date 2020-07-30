<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Pizza...</title>
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="/css/app.css">
    <link rel="shortcut icon" href="/images/fav2.ico" type="image/x-icon">
    <link rel="icon" href="/images/fav2.ico" type="image/x-icon">
    <!-- include the site stylesheet -->
    <link rel="stylesheet" href="{{ URL::asset('css/bootstrap.min.css') }}">
    <!-- main stylesheet -->
    <link rel="stylesheet" href="{{ URL::asset('css/style.css') }}">
    <!-- color stylesheet -->
    <link rel="stylesheet" href="{{ URL::asset('css/colors.css') }}" id="ui-theme-color">
    <!-- responsive css -->
    <link rel="stylesheet" href="{{ URL::asset('css/responsive.css') }}">
</head>
<body>
	<div class="loader_wrapper">
        <div class="loader">
            <img src="{{ URL::asset('images/loader.gif') }}" alt="" class="img-fluid">
        </div>
    </div>
    <div id="app">
    </div>
    <script src="{{ URL::asset('js/app.js') }}"></script>
    <!-- include jQuery -->
    <script src="{{ URL::asset('js/jquery.min.js') }}"></script>
    <!-- bootstrap -->
    <script src="{{ URL::asset('js/bootstrap.min.html') }}"></script>
    <!-- bootstrap -->
    <script src="{{ URL::asset('js/owl.carousel.min.js') }}"></script>
    <!-- slick slider  -->
    <script src="{{ URL::asset('js/slick.js') }}"></script>
    <!-- dscountdown  -->
    <script src="{{ URL::asset('js/dscountdown.min.js') }}"></script>
    <!-- jquery.nice-select -->
    <script src="{{ URL::asset('js/jquery.nice-select.js') }}"></script>
    <!-- magnific-popup -->
    <script src="{{ URL::asset('js/jquery.magnific-popup.min.js') }}"></script>
    <!-- Mixitup -->
    <script src="{{ URL::asset('js/mixitup.min.js') }}"></script>
    <!-- Google Map -->
    <script src="{{ URL::asset('https://maps.googleapis.com/maps/api/js?key=AIzaSyBP1lPhUhDU6MINpruPDinAzXffRlpzzFo') }}"></script>
    <script src="{{ URL::asset('js/map.js') }}"></script>
    <!-- custom js -->
    <script src="{{ URL::asset('js/custom.js') }}"></script>
</body>
</html>
