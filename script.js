//Get all DOM elements
const form = document.getElementById('checkInForm');
const nameInput = document.getElementById('attendeeName');
const teamName = document.getElementById('teamSelect');

//Checkins
  let count=0;
  const MaxCount = 50;

//Form submission
form.addEventListener('submit', function(event) {
  event.preventDefault();

  //Get values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name,team,teamName);

  //Increment amount
  count++;
  console.log("Checkins:", count);

  //Update progress bar
  const percentage = Math.round((count/MaxCount)*100) + "%";
  console.log('Progress: ${percentage}');

  //Update team counter
  const teamCounter = document.getElementById(team + 'Count');
  teamCounter.textContent = parseInt(teamCounter.textContent)+1;
  
  //Welcome message
  const message = 'Welcome, ${name} from ${teamName}!';

  form.reset();
});
