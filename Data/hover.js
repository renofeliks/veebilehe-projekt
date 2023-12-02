// This function runs when the page has loaded.
window.onload = function() {

  window.PlaySound = function(soundobj) {
    var thissound = document.getElementById(soundobj);
    thissound.volume = 0; // Set initial volume to 0
    thissound.play();

    // Gradually increase the volume to 50% over 2 seconds.
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