let r1 = 100;
let r2 = 100;
let m1 = 10;
let m2 = 10;
let a1 = 0;
let a2 = 0;

function setup() {
	createCanvas(600, 600);
}

function draw() {
	background(255);
	stroke(0);
	strokeWeight(2);
	translate(300, 50);
	let x1 = r1 * sin(a1);
	let y1 = r1 * cos(a1);



	let x2 = x1 + r2 * sin(a2);
	let y2 = y1 + r2 * cos(a2);

	line(0, 0, x1, y1);
	fill(0)
	ellipse(x1, y1, m1, m1);

	line(x1, y1, x2, y2);
	fill(0)
	ellipse(x2, y2, m2, m2);

	a1 += 0.1;
}