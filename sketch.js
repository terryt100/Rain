// var symbol;
var symbolSize = 15;
var streams = [];

//setup makes the canvas for sketch area, making it for whole page
function setup() {
	createCanvas(
		window.innerWidth,
		window.innerHeight
		);
	background(0);
	var x = 0;
	
	// for loop to create array of streams
	for (var i = 0; i <= width / symbolSize; i++) {
		var stream = new Stream();
		stream.generateSymbols(x, random(-1000));
		streams.push(stream);
		x += symbolSize;
	}
	textSize(symbolSize);
}

// draw carries out function to paint canvas
function draw() {
	//adding draw makes it so that the background is repeated (symbol doesnt repeat down screen)
	//adding 150 opacity to background for glow effect
	background(0, 150);
	// creating and rendering stream
	streams.forEach(function(stream) {
		stream.render();
	}) ;

	
}

// class for creating symbols, x and y for location on canvas of symbols
// value holds symbol itself, set using following function using random range of
// katakana charater unicode block
// speed holds speed of character rain down, which is at 60fps now
//
function Symbol(x,y, speed, first) {
	this.x = x;
	this.y = y;
	this.value;
	this.speed = speed;
	this.switchInterval = round(random(2,100));
	this.first = first;
	//when framecount divided by random number between 1 and 20 has no remainder
	//that decides the duration of character change
	this.setToRandomSymbol = function() {
		if (frameCount % this.switchInterval == 0) {
		this.value = String.fromCharCode(
			0x30A0 + round(random(0,96))
			);
		}
	}

	//function to display symbol and set symbol color
	// moving this into the Stream.render()
	
	// this.render = function() {
	// 	fill(0, 255, 70);
	// 	text(this.value, this.x, this.y);
	// 	this.rain();
	// 	this.setToRandomSymbol();
	// }

	//function to move character down page, increment y value
	this.rain = function() {
		if(this.y >= height) {
			this.y = 0;
		} else {
			this.y += this.speed;
		}
		// shorthand form:
		//  this.y = (this.y >= height) ? 0 : this.y += this.speed;
	}
}
//class for creating array of stream of symbols
function Stream() {
	this.symbols = [];
	this.totalSymbols = round(random(5,30));
	this.speed = random(random(5,20));

	this.generateSymbols = function(x, y) {
		var first = round(random(0,4)) == 1;
		//loop through symbols array
		for (var i = 0; i<= this.totalSymbols; i++) {
			//create new symbol
			symbol = new Symbol(x, y, this.speed, first);
			//set symbol value
			symbol.setToRandomSymbol();
			//put it into symbols array
			this.symbols.push(symbol);
			//decrement y by the symbol size to put next symbol above it
			y -= symbolSize;
			first = false;

		}
	}
	//function to create individual symbols
	this.render = function() {
		this.symbols.forEach(function(symbol) {
			if (symbol.first) {
				fill(180, 255, 180);
			} else {
			fill(0, 255, 70);
		}
			text(symbol.value, symbol.x, symbol.y);
			symbol.rain();
			symbol.setToRandomSymbol();
			} );
	}

}