/* globals document fetch textile localStorage setTimeout clearTimeout  */
(function () {
  function getElm (selector) {
    return document.querySelector(selector);
  }

  function attach (selector, eventName, handler) {
    const elm = getElm(selector);
    elm.addEventListener(eventName, handler);
    return elm;
  }

  function loadText (url, handler) {
    return fetch(url)
      .then(d => {
        if (d.ok) { return d.text(); }
        throw d;
      })
      .then(handler);
  }


  const max_delay = 3000; // longest update pause (in ms)
  let processing_time = 0;
  let help_text = '';

  const input        = getElm('#tx_input');
  const text_preview = getElm('#text_preview');
  const html_output  = getElm('#html_output');

  let last = null;
  function convert_text (newval) {
    // make sure we're getting a string here because we want to
    // be able to pass this function to setTimeout (passes number)
    if (arguments.length === 1 && typeof newval === 'string') {
      input.value = newval;
    }

    const text = input.value;
    if (text && text === last) { return; } // no action needed
    last = text;

    const startTime = Date.now();
    const html = textile.convert(text);
    const endTime = Date.now();
    processing_time = endTime - startTime;

    text_preview.innerHTML = html;
    html_output.textContent = html;

    // save last output text to storage if we have it
    if (!input.value || input.value === help_text) {
      localStorage.removeItem('textile-dingus');
    }
    else {
      localStorage.setItem('textile-dingus', input.value);
    }
  }


  const tabs = Array.from(document.querySelectorAll('.tab a'));
  tabs.forEach(d => {
    d.addEventListener('click', e => {
      e.preventDefault();
      const id = e.target.href.replace(/^[^#]+/, '');
      tabs.forEach(d => {
        const targetId = d.href.replace(/^[^#]+/, '');
        const show = targetId === id;
        d.parentNode.classList.toggle('current', show);
        getElm(targetId).style.display = show ? 'block' : 'none';
      });
    });
  });


  let convertTextTimer;
  attach('#tx_input', 'keyup', () => {
    clearTimeout(convertTextTimer);
    const defer_time = Math.min(processing_time, max_delay);
    convertTextTimer = setTimeout(convert_text, defer_time);
  }).focus();


  // app saves and loads from local storage
  const prev = localStorage.getItem('textile-dingus') || '';
  // id form holds default text or is empty, load from localStorage
  if (prev && !input.value || input.value === input.defaultValue) {
    input.value = prev;
  }

  // load syntax guide
  loadText('syntax.txt', txt => {
    getElm('#syntax_guide').textContent = txt;
  });

  // load help text
  loadText('help.txt', d => {
    help_text = d;
    if (!input.value) {
      convert_text(d);
    }
  });

  attach('button.clear', 'click', () => {
    convert_text('');
  });

  convert_text();
})();
