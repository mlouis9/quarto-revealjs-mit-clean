window.MathJax = {
  tex: {
    inlineMath: [['\\(', '\\)']],
    displayMath: [['\\[', '\\]']],
    processEscapes: true,
    processRefs: true,
    processEnvironments: true
  },
  chtml: {
    font: 'mathjax-asana'
  },
  startup: {
    ready: () => {
      console.log('MathJax is loaded and ready with font: mathjax-asana (Asana Math)');
      
      // 1. Let MathJax do its normal setup and initial rendering
      MathJax.startup.defaultReady();

      // 2. Attach our fragment logic to MathJax's typesetting promise
      MathJax.startup.promise.then(() => {
        // Find all fragment elements. 
        // Note: Because you use tex-svg.js, these are SVG <g> tags.
        const fragElements = document.querySelectorAll('.fragment[class*="frag-index-"]');
        
        if (fragElements.length > 0) {
          fragElements.forEach(el => {
            // Safely get the class string from SVG elements
            const classStr = el.getAttribute('class') || "";
            const match = classStr.match(/frag-index-(\d+)/);
            
            if (match) {
              // Apply the Reveal.js data attribute
              el.setAttribute('data-fragment-index', match[1]);
              // Remove the utility class
              el.classList.remove(match[0]);
            }
          });

          // 3. If Reveal is already initialized, tell it to rescan the DOM.
          // If Reveal hasn't loaded yet, it will naturally read these attributes when it does.
          if (typeof Reveal !== 'undefined' && Reveal.isReady()) {
            Reveal.sync();
          }
        }
      });
    }
  }
}
