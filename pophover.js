// Get the object and the audio elements.
var object = document.getElementById("myObject");
var audio = document.getElementById("myAudio");

// Play the audio when the mouse enters the object.
object.addEventListener("mouseenter", function() {
  audio.play();
});

// (Optional) Stop the audio when the mouse leaves the object.
object.addEventListener("mouseleave", function() {
  audio.pause();
  audio.currentTime = 0;
});
