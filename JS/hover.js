// This function runs when the page has loaded.
window.onload = function() {
  document.querySelector('#overlay').addEventListener('click', function () {
      this.style.display = 'none';
  });

  window.PlaySound = function(soundobj) {
    var thissound = document.getElementById(soundobj);
    thissound.volume = 0; // Set initial volume to 0
    thissound.play();

    // Gradually increase the volume to 50% over 2 seconds.
    var fadeInterval = setInterval(function() {
      if (thissound.volume <= 0.5) {
        thissound.volume += 0.01;
      } else {
        // Stop the interval when the volume reaches 50%.
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
