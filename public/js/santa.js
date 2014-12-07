$(document).ready(function () {
    $('#who').click(function () {
        var member = $("#family option:selected").text();
        console.log(member);
        window.location = '/Santa/?Person=' + member;
    });
});