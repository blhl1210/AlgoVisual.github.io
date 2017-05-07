$(document).ready(function($) {
    $("#canvas").click(function(e) {
        getPosition(e);
    });

    $("#connect").click(function(e) {
        lb = parseInt($("#lineBegin").val());
        le = parseInt($("#lineEnd").val());
        if (lb < 0 || le >= size || le === lb) {
            alert("Please Input Again");
        } else {
            drawLine(listCircle[lb], listCircle[le], 'black');
        }
    });

    $("#submit").click(function(e) {
        result();
    });

     $("#btn-toggle").click(function(){
        $("#panel").slideToggle("slow");
    });
});
var pointSize = 10;
var count = 0;
var listCircle = [];
var size = 0;
var connects = new Array(20);

function init() {
    for (var i = 0; i < 20; i++) {
        connects[i] = new Array(20);
    }
}

function result() {
    var des = [];
    var level = [];
    alert(size);
    for (i = 0; i < size; i++) {
        des[i] = 0;
        level[i] = i;
    }
    for (i = 0; i < size; i++)
        for (j = 0; j < size; j++) {
            if (connects[i][j] === 1 || connects[j][i] === 1)
                des[i]++;
        }
    level.sort(function(a, b) {
        return des[a] < des[b];
    });

    var colors = ['aqua', 'yellow', 'blue', 'fuchsia', 'gray', 'green',
        'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red',
        'silver', 'teal'
    ];
    var res = 0;
    var numColor = -1;

    function tint() {
        var count = 0;
        var id = setInterval(frame, 1000);
        function frame() {
            if (count >= size) {
                clearInterval(id);
            } else {
                setTimeout(function() {
                    numColor++;
                    for (var i = 0; i < size; i++)
                        if (listCircle[level[i]].c.localeCompare('black') === 0) {
                            var check = true;
                                for (var j = i - 1; j >= 0; j--)
                                    if ((listCircle[level[j]].c.localeCompare(colors[numColor]) === 0) && (connects[level[i]][level[j]] === 1 || connects[level[j]][level[i]] === 1)) {
                                        check = false;
                                        break;
                                    }
                                if (check) {
                                    listCircle[level[i]].c = colors[numColor];
                                    drawCircle(listCircle[level[i]]);
                                    count++;
                                }
                        }
                }, j * 1000);
            }

        }
    }
    tint();

    function run() {
        var res = 0;
        var id = setInterval(frs, 1000);

        function frs() {
            if (res >= size)
                clearInterval(res);
            else {
                console.log("Hello " + numColor);
                res++;
            }
        }
    }
    //    run();
}

function getPosition(event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    var myCircle = {
        x: x,
        y: y,
        r: 13,
        c: 'black',
        index: size
    }
    listCircle[size] = myCircle;
    drawCircle(myCircle);
    size++;
}

function drawCircle(myCircle) {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.beginPath();
    ctx.arc(myCircle.x, myCircle.y, myCircle.r, 0, 2 * Math.PI);
    ctx.fillStyle = myCircle.c;
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.fillText(myCircle.index.toString(), myCircle.x - 4, myCircle.y + 2);
}

function drawLine(circle1, circle2, color) {
    connects[circle1.index][circle2.index] = 1;
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(circle1.x, circle1.y);
    ctx.lineTo(circle2.x, circle2.y);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    drawCircle(circle1);
    drawCircle(circle2);
}
init();