var colours = []
var bgcolour= document.querySelector('body').style.backgroundColor;
var pickedColour=colours[Math.floor(Math.random()*num_squares)];
var RGB_title_select = document.getElementById('RGB_title');
var msg_select = document.getElementById('msg');
var square_selector = document.getElementsByClassName('square');
var easy_mode = false;
var num_squares= 6;

var modes = document.querySelectorAll('.mode');

//start
init();

function init() {
	// squares click logic
	for (var i=0; i<square_selector.length; i++) {
		// add click event listener
		square_selector[i].addEventListener('click', function() {
			console.log(this.style.backgroundColor);
			if (this.style.backgroundColor != pickedColour) {
				this.style.backgroundColor = bgcolour;
				msg_select.textContent = 'Try again';
			} else {
				//RGB_title_select.style.color=pickedColour;
				msg_select.textContent = 'Correct';
				changeColours(pickedColour);
				document.querySelector('h1').style.backgroundColor = pickedColour;
				document.querySelector('button').textContent = 'Play again?';
			}
		});
	}

	// reset button event listener
	document.querySelector('#resetBtn').addEventListener('click', function() {
		reset();
	});

	// initialise colours
	reset();
}


// click easy button
document.getElementById('easyBtn').addEventListener('click', function() {
	this.classList.add('selected');
	document.getElementById('hardBtn').classList.remove('selected');

	easy_mode = true;
	reset();

});
//click hard button
document.getElementById('hardBtn').addEventListener('click', function() {
	this.classList.add('selected');
	document.getElementById('easyBtn').classList.remove('selected');

	easy_mode = false;
	reset();
	
}); 

function reset() {
	var n = (easy_mode ? 3 : 6);
	colours = generateColours(n);
	for (var i=0; i<square_selector.length; i++) {
		// add colours to squsare
		if (i<3) {
			console.log('new color: '+colours[i]);
			square_selector[i].style.backgroundColor= colours[i];
		} else if (easy_mode) { // >3 and easy mode
			square_selector[i].style.display = 'none';
		} else { // >3 and hard mode
			square_selector[i].style.backgroundColor= colours[i];
			square_selector[i].style.display = 'block';
		}
	}
	// reset title colours
	RGB_title_select.style.color='white';
	document.querySelector('h1').style.backgroundColor = bgcolour;
	msg_select.textContent='';
	document.querySelector('button').textContent='New colours';
}

function changeColours(pickedColour) {
	// turn remain squares to correct colour
	for (var i=0; i<square_selector.length; i++) {
		square_selector[i].style.backgroundColor = pickedColour;
	}
}

function generateColours(n) {
	var colours = [];

	for (var i=0; i<n; i++) {
		// add random colours to array
		var r = Math.floor(Math.random()*255);
		var g = Math.floor(Math.random()*255);
		var b = Math.floor(Math.random()*255);

		colours.push('rgb('+r+', '+g+', '+ b+')');
	}

	pickedColour=colours[Math.floor(Math.random()*n)];
	RGB_title_select.textContent=pickedColour;
	RGB_title_select.textContent = RGB_title_select.textContent.replace('rgb', 'RGB');
	return colours;
	
	
}