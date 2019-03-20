//global variables
const seconds = document.querySelector('.sec');
const minutes = document.querySelector('.min');



const audio = document.querySelector('audio');

const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.stop');
const breakButton = document.querySelector('.break');

const increaseSession = document.querySelector('.session-increment');
const decreaseSession = document.querySelector('.session-decrement');
const increaseBreak = document.querySelector('.break-increment');
const decreaseBreak = document.querySelector('.break-decrement');

const zeroSec = document.querySelector('.zero-sec');
const zeroMin = document.querySelector('.zero-min');

const sessionLength = document.getElementById('session-length');
const breakLength = document.getElementById('break-length');

const timerLabel = document.getElementById('timer-label');

const resetButton = document.querySelector('#reset');

const time = {
	seconds: 59,
	minutes: 25,
	break: 5,
	count: 0,
	isTrue: true

};


addListener();

function addListener() {

	startButton.addEventListener('click', sessionCountDown);
	breakButton.addEventListener('click', breakCountDown);
	stopButton.addEventListener('click', pauseTime);

	increaseSession.addEventListener('click', sessionIncrease);

	increaseBreak.addEventListener('click', breakIncrease);

	decreaseSession.addEventListener('click', sessionDecrease);

	decreaseBreak.addEventListener('click', breakDecrease);

	resetButton.addEventListener('click', resetTimer);

}

function sessionCountDown() {


	if (time.count == 0) {

		//set minute and seconds value
		seconds.textContent = time.seconds;
		minutes.textContent = sessionLength.textContent;

		//substract 1 from minutes once
		minutes.textContent--;
		time.count++;
	}

	//display and hide seconds 0
	removeSecondsZero(seconds.textContent);

	//display and hide minute 0
	removeMinutesZero(minutes.textContent);

	resumeTime(); //start time;

	//pause and start button
	stopButton.style.zIndex = "3";
	startButton.style.zIndex = "2";


	var sessionInterval = setInterval(function () {

		//show current time label
		timerLabel.textContent = 'Session Started...';


		if (time.isTrue) {

			//countdown seconds
			seconds.textContent--;

			//update min when seconds reach 0
			if (seconds.textContent == -1) {
				minutes.textContent--;
			}


			//keep looping seconds
			if (seconds.textContent == -1) {
				seconds.textContent = time.seconds - 1;
			}


			//start break if session finish counting
			if (seconds.textContent == 0 && minutes.textContent == 0) {

				//stop session
				clearInterval(sessionInterval);

				//reset time count to 0
				time.count = 0;

				/*
				  seconds reaches 00 by delaying
					breakCountdown
					
				*/

				//play audio
				audio.play();

				setTimeout(function () {

					//start break
					breakCountDown();

				}, 900)

			}


		} else {

			//pause and start button
			stopButton.style.zIndex = "2";
			startButton.style.zIndex = "3";

			//stop time when isTrue is false;
			clearInterval(sessionInterval);

		}

		//display and hide seconds 0
		removeSecondsZero(seconds.textContent);

		//display and hide minute 0
		removeMinutesZero(minutes.textContent);

	}, 1000)


}


function breakCountDown() {


	if (time.count == 0) {

		//set minute and seconds value
		seconds.textContent = time.seconds;
		minutes.textContent = breakLength.textContent;

		//substract 1 from minutes once
		minutes.textContent--;
		time.count++;
	}

	resumeTime(); //start time;

	//display and hide seconds 0
	removeSecondsZero(seconds.textContent);

	//display and hide minute 0
	removeMinutesZero(minutes.textContent);

	//pause and start button
	stopButton.style.zIndex = "3";
	breakButton.style.zIndex = "2"
	startButton.style.zIndex = "-1";

	var breakInterval = setInterval(function () {

		//show current time label
		timerLabel.textContent = 'Break Started...';

		if (time.isTrue) {

			//countdown seconds
			seconds.textContent--


			//update min when seconds reach 0
			if (seconds.textContent == -1) {
				minutes.textContent--;
			}


			//keep looping seconds
			if (seconds.textContent == -1) {
				seconds.textContent = time.seconds - 1;
			}


			//start session again if break finish counting
			if (minutes.textContent == 0 && seconds.textContent == 0) {

				//stop break
				clearInterval(breakInterval);

				//reset time count to 0
				time.count = 0;


				/*
				  seconds reaches 00 by delaying
					breakCountdown
					
				*/

				//play audio
				audio.play();

				setTimeout(function () {

					//start session
					sessionCountDown();

				}, 900)
			}

			//display and hide seconds 0
			removeSecondsZero(seconds.textContent);

			//display and hide minute 0
			removeMinutesZero(minutes.textContent);

		} else {

			//pause and start button
			stopButton.style.zIndex = "2";
			breakButton.style.zIndex = "3"
			startButton.style.zIndex = "-1";

			//stop time when isTrue is false;
			clearInterval(breakInterval);
		}
	}, 1000)


}


function pauseTime() {

	time.isTrue = false;
}

function resumeTime() {

	time.isTrue = true;
}

//display and hide seconds 0
function removeSecondsZero(sec) {



	if (sec > 9) {
		zeroSec.style.display = "none";
	} else {
		zeroSec.style.display = "block";
	}

}

//display and hide seconds 0
function removeMinutesZero(min) {



	if (min > 9) {
		zeroMin.style.display = "none";
	} else {
		zeroMin.style.display = "block";
	}

}

//increase session length value
function sessionIncrease() {

	if (sessionLength.textContent < 60) {
		sessionLength.textContent++;
	}

}

//increase break length value
function breakIncrease() {

	if (breakLength.textContent < 60) {
		breakLength.textContent++;
	}
}

//decrease session length value
function sessionDecrease() {

	if (sessionLength.textContent > 1) {
		sessionLength.textContent--;
	}

}

//decrease break length value
function breakDecrease() {

	if (breakLength.textContent > 1) {
		breakLength.textContent--;
	}

}


function resetTimer() {

	window.location.reload(true);

}