var strokeValue = 5;
var colorValue = '#ffffff';

function setup(){
    createCanvas(windowWidth, windowHeight);
    background(0);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(0);
}

function draw(){
    fill(200,200,200);
    noStroke();
    if(mouseIsPressed) {
        strokeWeight(strokeValue);
        stroke(colorValue)
        line(mouseX,mouseY, pmouseX, pmouseY);
        socket.emit('mouseMove', {mouseX, mouseY, pmouseX, pmouseY, strokeValue, colorValue})
    }
    socket.on('mouseMove', (data) => {
        strokeWeight(data.strokeValue);
        stroke(data.colorValue);
        line(data.mouseX,data.mouseY, data.pmouseX, data.pmouseY);
    });
}

$(document).on('click', '.size .button', (() => {
    var $this = event.target;
    if (!$($this).hasClass('active')) {
        $('.buttons .button').removeClass('active');
        $($this).addClass('active');
        $size = $($this).data("size");
        if($size === "little") {
            $('body, html').css('cursor: url("/img/5.png"), auto');
            strokeValue = 5;
        } else if($size === "med") {
            $('body, html').css('cursor: url("/img/10.png"), auto');
            strokeValue = 10;
        } else {
            $('body, html').css('cursor: url("/img/15.png"), auto');
            strokeValue = 15;
        }
    }
}));

$('.colors .button').click(() => {
    var $this = event.target;
    $('.colors .button').removeClass('active');
    $($this).addClass('active');
    $color = $($this).data("color");
    colorValue = $color;
});

$('.clear .clear').click(() => {
    socket.emit('clear', true);
    clear();
    background(0);
});

socket.on('clear', () => {
    clear();
    background(0);
});

$(window).on('load', function() {
    $('.colors .button').each(function() {
        $color = $(this).data("color");
        $(this).css('background-color', $color);
    });
});