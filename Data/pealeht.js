// This function runs when the page has loaded.
window.onload = function() {

  window.PlaySound = function(soundobj) {
    var thissound = sounds[soundobj];
    if (thissound) {
      thissound.volume = 0; // Set initial volume to 0
      thissound.play();

      // Gradually increase the volume to 50% over 2 seconds.
      var fadeInterval = setInterval(function() {
        if (thissound.volume <= 0.99) {
          thissound.volume += 0.01;
        } else {
          // Stop the interval when the volume reaches 50%.
          clearInterval(fadeInterval);
        }
      }, 20); // Increase volume by 1% every 20 milliseconds.
    }
  };

  window.StopSound = function(soundobj) {
    var thissound = sounds[soundobj];
    if (thissound) {
      thissound.pause();
      thissound.currentTime = 0;
    }
  };

  var startButton = document.getElementById('startButton');
  var overlay = document.getElementById('overlay');

  // Check if the user has visited the page before
  if (!localStorage.getItem('visited')) {
    // If not, show the overlay
    overlay.style.display = 'flex';
  } else {
    // If yes, hide the overlay
    overlay.style.display = 'none';
  }

  // When the start button is clicked, hide the overlay and set 'visited' to true
  startButton.addEventListener('click', function() {
    overlay.style.display = 'none';
    localStorage.setItem('visited', true);
  })}