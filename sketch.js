let r1 = 125;
let r2 = 125;
let m1 = 10;
let m2 = 10;
let a1 = 0;
let a2 = 0;
let a1_v = 0;
let a2_v = 0;
let g = 1;

let px2 = -1;
let py2 = -1;
let cx, cy;

let buffer;
let a1slider, a2slider, g_slider, r1slider, r2slider, m1slider, m2slider, damp_slider;

function setup() {
	createCanvas(900, 900);
	pixelDensity(1);
	a1slider = createSlider(0, PI, PI / 2, PI / 32)
	a2slider = createSlider(0, PI, PI / 2, PI / 32)
	g_slider = createSlider(0, 10, 1, 1)
	r1_slider = createSlider(1, 100, 10, 10)
	r2_slider = createSlider(1, 100, 10, 10)
	m1_slider = createSlider(1, 100, 10, 10)
	m2_slider = createSlider(1, 100, 10, 10)
	damp_slider = createSlider(0, 1, 0.1, 0.1)
	// a1slider.changed(draw);
	a1 = PI / 2;
	a2 = PI / 2;
	cx = width / 2;
	cy = height / 2;
	buffer = createGraphics(width, height);
	buffer.background(175);
	buffer.translate(cx, cy);

}

function draw() {
	background(175);
	imageMode(CORNER);
	image(buffer, 0, 0, width, height);

	// g = g_slider.value();
	// a1 = a1slider.value();
	// a2 = a2slider.value();
	// r1 = r1_slider.value();
	// r2 = r2_slider.value();
	// m1 = m1_slider.value();
	// m2 = m2_slider.value();
	// damp_factor = damp_slider.value();

	let num1 = -g * (2 * m1 + m2) * sin(a1);
	let num2 = -m2 * g * sin(a1 - 2 * a2);
	let num3 = -2 * sin(a1 - a2) * m2;
	let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * cos(a1 - a2);
	let den = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
	let a1_a = (num1 + num2 + num3 * num4) / den;
	// a1_a = 1;
	// a2_a = 1;
	num1 = 2 * sin(a1 - a2);
	num2 = (a1_v * a1_v * r1 * (m1 + m2));
	num3 = g * (m1 + m2) * cos(a1);
	num4 = a2_v * a2_v * r2 * m2 * cos(a1 - a2);
	den = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
	let a2_a = (num1 * (num2 + num3 + num4)) / den;

	// translate(500, 500);
	translate(cx, cy);
	stroke(0);
	strokeWeight(2);

	let x1 = r1 * sin(a1);
	let y1 = r1 * cos(a1);

	let x2 = x1 + r2 * sin(a2);
	let y2 = y1 + r2 * cos(a2);

	line(0, 0, x1, y1);
	fill(0);
	ellipse(x1, y1, m1, m1);

	line(x1, y1, x2, y2);
	fill(0);
	ellipse(x2, y2, m2, m2);

	a1_v += a1_a;
	a2_v += a2_a;
	a1 += a1_v;
	a2 += a2_v;

	// Dampening by slowly reducing the velocity
	// a1_v *= 0.99;
	// a2_v *= 0.99;

	buffer.stroke(0);
	if (frameCount > 1) {
		buffer.line(px2, py2, x2, y2);
	}

	px2 = x2;
	py2 = y2;
}