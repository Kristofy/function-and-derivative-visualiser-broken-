let inc = 0.1;
let sclx = 30;
let scly = 50;
let TRASHOLD;
let startx = 100,
  starty = 100;
let x, dx, y, m, b;
let sampleSlider;
let sclxSlider, sclySlider;
let inputfucnction;
let derivativeFunction;
let applyButton;
let xaxisSlider, yaxisSlider;
let stepsSlider;


function setup() {
  let C = createCanvas(800, 600);
  C.parent('main');
  C.style('display', 'block');
  TRASHOLD = ((400*2) )*((400*2));
  
  sampleSlider = createSlider(-startx / sclx, (width - startx) / sclx, 2, 0);
  sampleSlider.style('width', `${width}px`);
  sampleSlider.input(reset);
  sampleSlider.parent('main');

  sclxSlider = createSlider(0.5, 100, sclx, 0);
  sclxSlider.id('horizontal-scale');
  sclxSlider.input(()=>{sclx = sclxSlider.value(); reset()});
  sclxSlider.parent('sclx');

  sclySlider = createSlider(0.5, 100, sclx, 0);
  sclySlider.id('vertical-scale');
  sclySlider.input(()=>{scly = sclySlider.value(); reset()});
  sclySlider.parent('scly');

  inputfucnction = createInput('sin(x)', 'text');
  inputfucnction.parent('function-container');
  inputfucnction.id('function');

  derivativeFunction = createInput('cos(x)', 'text');
  derivativeFunction.parent('derivative-container');
  derivativeFunction.id('derivative');

  xaxisSlider = createSlider(0, width, startx, 0);
  xaxisSlider.parent('xslider');
  xaxisSlider.input(()=>{startx = xaxisSlider.value(); reset();});

  yaxisSlider = createSlider(0, height, starty, 0);
  yaxisSlider.parent('yslider');
  yaxisSlider.input(()=>{starty = yaxisSlider.value(); reset();});

  stepsSlider = createSlider( 0.005, 0.5, inc, 0);
  stepsSlider.parent('inc');
  stepsSlider.input(()=>{inc = stepsSlider.value(); reset();});

  applyButton = createInput('Apply', 'button');
  applyButton.parent('apply');
  applyButton.mousePressed(()=>{
    f = (x) => eval(inputfucnction.value());
    diff = (x) => eval(derivativeFunction.value());
    reset();
  });

  strokeWeight(3);
  reset();  
}

class Vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function processPoints() {
  let points = [];
  let dpoints = [];

  while (x * sclx + startx < width) {
    points.push(new Vec2(x * sclx + startx, f(x) * scly + starty));
    dpoints.push(new Vec2(x * sclx + startx, df(x) * scly + starty));
    x += inc;
  }
 
  noFill();
  push();
  scale(1, -1);
  translate(0, -height);
  stroke(255);
  beginShape();
  
  vertex(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    let d = (points[i].x - points[i - 1].x) * (points[i].x - points[i - 1].x) + (points[i].y - points[i - 1].y) * (points[i].y - points[i - 1].y)
    if(d > TRASHOLD){
        endShape();
        beginShape();
    }
    vertex(points[i].x, points[i].y);

  }

   endShape();
   pop()

   push();
   scale(1, -1);
   translate(0, -height);
   stroke(60, 30, 190);
   beginShape();
   
   vertex(dpoints[0].x, dpoints[0].y);
   for (let i = 1; i < dpoints.length; i++) {
     let d = (dpoints[i].x - dpoints[i - 1].x) * (dpoints[i].x - dpoints[i - 1].x) + (dpoints[i].y - dpoints[i - 1].y) * (dpoints[i].y - dpoints[i - 1].y)
   
     vertex(dpoints[i].x, dpoints[i].y);
 
   }
 
    endShape();
    pop()

}

function draw() {
  
  push();
  scale(1, -1);
  translate(0, -height);

  // y axis
  stroke(200, 0, 0);
  line(startx, 0, startx, height);

  // x axis
  stroke(0, 200, 0);
  line(0, starty, width, starty);
  /*
    // function
    stroke(255);
    point(x * sclx + startx, f(x) * scly + starty);

    // derivative
    stroke(155, 150, 255);
    point(dx * sclx + startx, df(dx) * scly + starty);

    */
    // intersection
    strokeWeight(5)
    stroke(180, 30, 90);
    point(startdx * sclx + startx, f(startdx)*scly+starty); 
    
  pop();
  /*
  x += inc;
  dx += inc;
*/
}


function f(x) {
  return 1/x;
}

function df(t) {
  return t * m + b;
}

function diff(x) {
  return -1*(1/(x*x));
}

function reset() {
  x = dx = -startx / sclx;
  startdx = sampleSlider.value();
  m = diff(startdx);
  b = f(startdx) - m * startdx;

  background(51);
  processPoints();
}