"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Particle = function () {
    function Particle(svg, coordinates, friction) {
        _classCallCheck(this, Particle);

        this.svg = svg;
        this.steps = $(window).height() / 2;
        this.item = null;
        this.friction = friction;
        this.coordinates = coordinates;
        this.position = this.coordinates.y;
        this.dimensions = this.render();
        this.rotation = Math.random() > 0.5 ? -1 : 1;
        this.scale = 0.5 + Math.random();
        this.siner = 200 * Math.random();
    }

    Particle.prototype.destroy = function destroy() {
        this.item.remove();
    };

    Particle.prototype.move = function move() {
        this.position -= this.friction;
        var top = this.position;
        var left = this.coordinates.x + Math.sin(this.position * Math.PI / this.steps) * this.siner;
        this.item.css({
            transform: "translateX(" + left + "px) translateY(" + top + "px) scale(" + this.scale + ") rotate(" + ((this.rotation * (this.position + this.dimensions.height)) % 360) + "deg)"
        });

        if (this.position < -this.coordinates.y) {
            this.destroy();
            return false;
        } else {
            return true;
        }
    };

    Particle.prototype.render = function render() {
        this.item = $(this.svg);
        this.item.css({
            transform: "translateX(" + this.coordinates.x + "px) translateY(" + this.coordinates.y + "px)"
        });
        this.item.appendTo("#banner");
        return {
            width: this.item.width(),
            height: this.item.height()
        };
    };

    return Particle;
}();

var rhombus = '<svg viewBox="0 0 13 14"><path class="rhombus" d="M5.9,1.2L0.7,6.5C0.5,6.7,0.5,7,0.7,7.2l5.2,5.4c0.2,0.2,0.5,0.2,0.7,0l5.2-5.4 C12,7,12,6.7,11.8,6.5L6.6,1.2C6.4,0.9,6.1,0.9,5.9,1.2L5.9,1.2z M3.4,6.5L6,3.9c0.2-0.2,0.5-0.2,0.7,0l2.6,2.6 c0.2,0.2,0.2,0.5,0,0.7L6.6,9.9c-0.2,0.2-0.5,0.2-0.7,0L3.4,7.3C3.2,7.1,3.2,6.8,3.4,6.5L3.4,6.5z" /></svg>';
var pentahedron = '<svg viewBox="0 0 561.8 559.4"><path class="pentahedron" d="M383.4,559.4h-204l-2.6-0.2c-51.3-4.4-94-37-108.8-83l-0.2-0.6L6,276.7l-0.2-0.5c-14.5-50,3.1-102.7,43.7-131.4 L212.1,23C252.4-7.9,310.7-7.9,351,23l163.5,122.5l0.4,0.3c39,30.3,56,82.6,42.2,130.3l-0.3,1.1l-61.5,198 C480.4,525.6,435.5,559.4,383.4,559.4z M185.5,439.4h195.2l61.1-196.8c0-0.5-0.3-1.6-0.7-2.1L281.5,120.9L120.9,241.2 c0,0.3,0.1,0.7,0.2,1.2l60.8,195.8C182.5,438.5,183.7,439.1,185.5,439.4z M441,240.3L441,240.3L441,240.3z"/></svg>';
var x = '<svg viewBox="0 0 12 12"> <path class="x" d="M10.3,4.3H7.7V1.7C7.7,0.8,7,0,6,0S4.3,0.8,4.3,1.7v2.5H1.7C0.8,4.3,0,5,0,6s0.8,1.7,1.7,1.7h2.5v2.5 C4.3,11.2,5,12,6,12s1.7-0.8,1.7-1.7V7.7h2.5C11.2,7.7,12,7,12,6S11.2,4.3,10.3,4.3z"/></svg>';
var circle = '<svg x="0px" y="0px" viewBox="0 0 13 12"> <path class="circle" d="M6.5,0.1C3.4,0.1,0.8,2.8,0.8,6s2.6,5.9,5.7,5.9s5.7-2.7,5.7-5.9S9.7,0.1,6.5,0.1L6.5,0.1z M6.5,8.8 C5,8.8,3.8,7.6,3.8,6S5,3.2,6.5,3.2S9.2,4.4,9.2,6S8,8.8,6.5,8.8L6.5,8.8z"/> </svg>';
var point = '<svg viewBox="0 0 12 12"> <path class="point" d="M6,7.5L6,7.5C5.1,7.5,4.5,6.9,4.5,6v0c0-0.9,0.7-1.5,1.5-1.5h0c0.9,0,1.5,0.7,1.5,1.5v0C7.5,6.9,6.9,7.5,6,7.5z "/> </svg>';

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var data = [point, rhombus, pentahedron, circle, x];
var particles = [];

setInterval(function () {
    particles.push(new Particle(data[randomInt(0, data.length - 1)], {
        "x": Math.random() * $(window).width(),
        "y": $("#banner").outerHeight()
    }, 1 + Math.random() * 3));
}, 800 + (Math.random() * 300));

function update() {
    particles = particles.filter(function (p) {
        return p.move();
    });
    requestAnimationFrame(update.bind(this));
}
update();

(function () {
    var width, height, container, canvas, ctx, points, target, animateHeader = true;

    initHeader();
    initAnimation();
    addListeners();

    function initHeader() {
        target = { x: width / 2, y: height / 2 };

        container = document.getElementById('banner');
        width = container.clientWidth;
        height = container.clientHeight;

        canvas = document.getElementById('canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        points = [];
        for (var x = 0; x < width; x = x + width / 10) {
            for (var y = 0; y < height; y = y + height / 10) {
                var px = x + Math.random() * width / 10;
                var py = y + Math.random() * height / 10;
                var p = { x: px, originX: px, y: py, originY: py };
                points.push(p);
            }
        }

        for (var i = 0; i < points.length; i++) {
            var closest = [];
            var p1 = points[i];
            for (var j = 0; j < points.length; j++) {
                var p2 = points[j]
                if (!(p1 == p2)) {
                    var placed = false;
                    for (var k = 0; k < 5; k++) {
                        if (!placed) {
                            if (closest[k] == undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }

                    for (var k = 0; k < 5; k++) {
                        if (!placed) {
                            if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }

        for (var i in points) {
            var c = new Circle(points[i], 1 + Math.random() * 1.5, 'rgba(255,255,255,0.3)');
            points[i].circle = c;
        }
    }

    function addListeners() {
        if (!('mousemove' in container)) {
            container.addEventListener('mousemove', mouseMove);
        }
        window.addEventListener('scroll', scrollCheck);
    }

    function mouseMove(e) {
        var posx = 0;
        var posy = 0;

        if (e.pageX || e.pageY) {
            posx = e.pageX - container.offsetLeft;
            posy = e.pageY - container.offsetTop;
        }
        target.x = posx;
        target.y = posy;
    }

    function scrollCheck() {
        if (document.body.scrollTop > height) animateHeader = true;
        else animateHeader = true;
    }

    function initAnimation() {
        animate();
        for (var i in points) {
            shiftPoint(points[i]);
        }
    }

    function animate() {
        if (animateHeader) {
            ctx.clearRect(0, 0, width, height);
            for (var i in points) {
                if (Math.abs(getDistance(target, points[i])) < 20000) {
                    points[i].active = 0.2;
                    points[i].circle.active = 0.4;
                } else if (Math.abs(getDistance(target, points[i])) < 60000) {
                    points[i].active = 0.075;
                    points[i].circle.active = 0.15;
                } else if (Math.abs(getDistance(target, points[i])) < 160000) {
                    points[i].active = 0.0375;
                    points[i].circle.active = 0.05;
                } else if (Math.abs(getDistance(target, points[i])) < 240000) {
                    points[i].active = 0.015;
                    points[i].circle.active = 0.025;
                } else {
                    points[i].active = 0;
                    points[i].circle.active = 0;
                }

                drawLines(points[i]);
                points[i].circle.draw();
            }
        }
        requestAnimationFrame(animate);
    }

    function shiftPoint(p) {
        TweenLite.to(p, 1 + 1 * Math.random(), {
            x: p.originX - 50 + Math.random() * 50,
            y: p.originY - 50 + Math.random() * 50,
            ease: Circ.ease,
            onComplete: function () {
                shiftPoint(p);
            }
        });
    }

    function drawLines(p) {
        if (!p.active) return;
        for (var i in p.closest) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.closest[i].x, p.closest[i].y);
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = 'rgba(180, 222, 255,' + p.active + ')';
            ctx.stroke();
        }
    }

    function Circle(pos, rad, color) {
        var _this = this;

        (function () {
            _this.pos = pos || null;
            _this.radius = rad || null;
            _this.color = color || null;
        })();

        this.draw = function () {
            if (!_this.active) return;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(180, 222, 255,' + _this.active + ')';
            ctx.fill();
        };
    }

    // Util
    function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }

})();