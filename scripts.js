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


// Smooth-scroll offset is handled by Tailwind's scroll-mt-* classes above.
    // This script highlights the active link as you scroll.
    const links = [...document.querySelectorAll('.toc-link')];
    const sections = links
      .map(link => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);
    const linkById = Object.fromEntries(
      links.map(a => [a.getAttribute('href').slice(1), a])
    );

    // Utility to update active link styles
    function setActive(id) {
      links.forEach(a => {
        a.classList.remove(
          'bg-neutral-900','text-white','font-medium','shadow',
          //'ring-1','ring-neutral-200'
        );
        a.classList.add('text-neutral-200');
      });
      const active = linkById[id];
      if (active) {
        active.classList.remove('text-neutral-700');
        active.classList.add(
          'bg-neutral-900','text-white','font-medium','shadow',//'ring-1','ring-neutral-200'
        );
      }
    }

    // Observe which section is in view
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => {
          if (a.intersectionRatio !== b.intersectionRatio) {
            return b.intersectionRatio - a.intersectionRatio;
          }
          return a.boundingClientRect.top - b.boundingClientRect.top;
        })[0];
      if (visible) setActive(visible.target.id);
    }, {
      root: null,
      rootMargin: '0px 0px -60% 0px', // react as soon as section enters upper half
      threshold: [0.15, 0.4, 0.75, 1]
    });

    sections.forEach(sec => observer.observe(sec));

    // Optional: close keyboard focus loop on click (keeps focus styles tidy)
    links.forEach(a => {
      a.addEventListener('click', () => {
        const targetId = a.getAttribute('href').slice(1);
        setActive(targetId);
        // small timeout so scrolling happens first
        setTimeout(() => a.blur(), 300);
      });
    });
