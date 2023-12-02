window.onload = function() {
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
    });
  };
// This function runs when the page has loaded.
window.onload = function() {

  window.PlaySound = function(soundobj) {
    var thissound = document.getElementById(soundobj);
    thissound.volume = 0; // Set initial volume to 0
    thissound.play();

    // Gradually increase the volume to 100% over 4 seconds.
    var fadeInterval = setInterval(function() {
      if (thissound.volume <= 0.99) {
        thissound.volume += 0.01;
      } else {
        // Stop the interval when the volume reaches 99%.
        clearInterval(fadeInterval);
      }
    }, 20); // Increase volume by 1% every 20 milliseconds.
  };

  window.StopSound = function(soundobj) {
    var thissound = document.getElementById(soundobj);
    thissound.pause();
    thissound.currentTime = 0;
  };
};

//https://stackoverflow.com/a/14926552 ja Bing AI