const toggleStates = {};

function toggleAB(id) {
  const a = document.getElementById(`audioA${id}`);
  const b = document.getElementById(`audioB${id}`);

  if (!a || !b) return;

  // Determine which clip should play next based on current playback/state.
  if (!a.paused) {
    toggleStates[id] = 'B';
  } else if (!b.paused) {
    toggleStates[id] = 'A';
  } else if (!toggleStates[id]) {
    toggleStates[id] = 'A';
  }

  if (toggleStates[id] === 'A') {
    b.pause();
    b.currentTime = 0;
    a.currentTime = 0;
    a.play();
    toggleStates[id] = 'B';
  } else {
    a.pause();
    a.currentTime = 0;
    b.currentTime = 0;
    b.play();
    toggleStates[id] = 'A';
  }
}
 /*
  function playBoth(id) {
    const a = document.getElementById(`audioA${id}`);
    const b = document.getElementById(`audioB${id}`);
  
    a.currentTime = b.currentTime = 0;
    a.play();
    setTimeout(() => b.play(), 500); // 500ms stagger
  }
*/