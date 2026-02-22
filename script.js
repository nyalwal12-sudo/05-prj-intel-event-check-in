//Get all DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const greetingPara = document.getElementById("greeting");
const attendeeList = document.getElementById("attendeeList");

//Checkins
let count = 0;
const MaxCount = 50;
const attendeeCountSpan = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");

//Form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  //Get values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, team, teamName);

  //Increment amount
  count++;
  console.log("Checkins:", count);

  //Update total attendee display
  attendeeCountSpan.textContent = count;

  //Update progress bar
  const percentage = Math.round((count / MaxCount) * 100) + "%";
  progressBar.style.width = percentage;
  console.log(`Progress: ${percentage}`);

  //Update team counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  //Greeting message
  const message = `Welcome, ${name} from ${teamName}!`;
  greetingPara.textContent = message;
  greetingPara.classList.add("success-message");
  greetingPara.style.display = "block";

  // add attendee to list display
  const li = document.createElement("li");
  li.textContent = `${name} - ${teamName}`;
  attendeeList.appendChild(li);

  //hide greeting after a few seconds
  setTimeout(function () {
    greetingPara.style.display = "none";
  }, 3000);

  //Celebration message for when we reach max capacity
  if (count === MaxCount) {
    // determine winning team
    const waterCount = parseInt(
      document.getElementById("waterCount").textContent,
      10,
    );
    const zeroCount = parseInt(
      document.getElementById("zeroCount").textContent,
      10,
    );
    const powerCount = parseInt(
      document.getElementById("powerCount").textContent,
      10,
    );

    let winningTeam;
    if (waterCount > zeroCount && waterCount > powerCount) {
      winningTeam = "Team Water Wise";
    } else if (zeroCount > waterCount && zeroCount > powerCount) {
      winningTeam = "Team Net Zero";
    } else if (powerCount > waterCount && powerCount > zeroCount) {
      winningTeam = "Team Renewables";
    } else {
      winningTeam = "a tie between teams";
    }

    //Show celebration message
    greetingPara.textContent = `🎉 Fantastic job! Attendance goal reached! ${winningTeam} takes the lead — let's celebrate!`;
    greetingPara.classList.remove("success-message");
    greetingPara.classList.add("celebration-message");
    greetingPara.style.display = "block";

    //Confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    //Disable form
    nameInput.disabled = true;
    teamSelect.disabled = true;
    form.querySelector("button").disabled = true;
  }

  //Reset form
  form.reset();
});
