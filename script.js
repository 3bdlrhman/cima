const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect =  document.getElementById('movie');
var ticketPrice = +movieSelect.value;

populateUi();

//update count
function updateCount(){
	const selectedSeats = document.querySelectorAll('.row .seat.selected');
	const selectedseatsNumber = selectedSeats.length;
	count.innerText = selectedseatsNumber ;
	total.innerText = selectedseatsNumber * ticketPrice;

	const indexOfSelectedSeats = [...selectedSeats].map(seat => [...seats].indexOf(seat));

	localStorage.setItem('seatsIndex', JSON.stringify(indexOfSelectedSeats));
}

//show the saved data in user interface
function populateUi(){
	const selectedSeats = JSON.parse(localStorage.getItem('seatsIndex'));
	if(selectedSeats !== null && selectedSeats.length > 0){
		seats.forEach((seat, index) => {
			if(selectedSeats.indexOf(index) > -1){
				seat.classList.add('selected');
			}

		})
	}

	const movieIndex = localStorage.getItem('movieIndex');
	if(movieIndex !== null){
		movieSelect.selectedIndex = movieIndex;
	}
}

// change event of the select
movieSelect.addEventListener('change', e => {
	ticketPrice = +movieSelect.value;
	updateCount();
	localStorage.setItem('movieIndex', (e.target.selectedIndex));
	localStorage.setItem('moviePrice', (e.target.value));
})

// listen to the click event
container.addEventListener('click', e=>{
	if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
		e.target.classList.toggle('selected');
	}
	updateCount();
})



updateCount();