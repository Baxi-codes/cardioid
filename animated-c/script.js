/*important functions*/

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
};

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
};

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
};

function log(argument) {
	console.log(argument)
}

/*core variables*/

const canvas = document.getElementById('screen');
const c = canvas.getContext('2d');

canvas.width  = innerWidth;
canvas.height = innerHeight;

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

/*event listeners*/

window.addEventListener('resize', function() {
	canvas.width  = innerWidth;
	canvas.height = innerHeight;
	init();
});

/*main code*/

let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);

let counts = 0;
let times = 2;
let points;
let links;

const circle = {
	x: innerWidth/2,
	y: innerHeight/2,
	radius: (innerWidth + innerHeight)/8,
	draw: function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
		c.stroke()
		c.closePath();
	}
}

class Point {
	constructor(x, y, id){
		this.x = x;
		this.y = y;
		this.id=id;
	}
	draw(){
		c.beginPath();
		c.arc(this.x, this.y, 5, 0, Math.PI * 2, true);
		c.fill()
		c.closePath();
	}
}

class Link{
	constructor(from, to){
		this.from = from;
		this.to = to;
	}
	draw(){
		c.beginPath();
		c.moveTo(this.from.x, this.from.y);
		c.lineTo(this.to.x, this.to.y);
		c.stroke()
		c.closePath();
	}
}

/*animation loop*/

function screen() {
	c.clearRect(0,0,innerWidth, innerHeight);
	init();
	if(counts<200)
		counts++
	circle.draw();
	for (var i = 0; i < points.length; i++) {
		points[i].draw()
	}
	for (var i = 0; i < links.length; i++) {
		links[i].draw()
	}
	requestAnimationFrame(screen)
}

/*initialization*/

function init() {
	c.strokeStyle = '#fff';
	c.fillStyle   = '#fff';
	points = [];
	links  = []
	for (let i = 0; i < counts; i++) {
		const point = new Point();
		point.id= i;
		point.x = circle.x + Math.sin(((Math. PI * 2)/(counts))*i)*circle.radius;
		point.y = circle.y + Math.cos(((Math. PI * 2)/(counts))*i)*circle.radius;
		points.push(point)
	}
	for (var i = 0; i < points.length; i++) {
		for (var j = 0; j < points.length; j++) {
			if((points[i].id * times) % points.length == points[j].id){
				links.push(new Link(points[i], points[j]))
			}
		}
	}
}

/*finalization*/

window.onload = function() {
	init()
	screen()
}