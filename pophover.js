<!DOCTYPE html>
<html>
<body>

<!-- This is your object. Replace it with your actual object. -->
<div id="myObject" style="width: 100px; height: 100px; background: red;"></div>

<!-- This is the audio file that will be played. -->
<audio id="myAudio">
  <source src="sound.mp3" type="audio/mpeg">
</audio>

<script>
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
</script>

</body>
</html>
