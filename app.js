jQuery(function($){

  var max_delay = 3000; // longest update pause (in ms)
  var processing_time = 0;
  var last = null;
  var help_text = '';

  var tx_input     = $('#tx_input');
  var input        = tx_input[0];
  var text_preview = $('#text_preview')[0];
  var html_output  = $('#html_output')[0];


  function convert_text ( newval ) {

    // make sure we're getting a string here because we want to 
    // be able to pass this function to setTimeout (passes number)
    if ( arguments.length === 1 && typeof newval === 'string' ) {
      input.value = newval;
    }

    var text = tx_input.val();

    if ( text && text == last ) { return; } // no action needed
    last = text;

    var startTime = new Date() * 1;	
    var html = textile.convert( text );
    var endTime = new Date() * 1;
    processing_time = endTime - startTime;

    text_preview.innerHTML = html;
    html_output.value = html;

    // save last output text to storage if we have it
    if ( supports_html5_storage() ) {
      if ( !input.value || input.value == help_text ) {
        localStorage.removeItem( "textile-dingus" );
      }
      else {
        localStorage.setItem( "textile-dingus", input.value );
      }
    }

  }


  var supports_html5_storage = function () {
    var r = false;
    try { r = 'localStorage' in window && window['localStorage'] !== null; } catch (e) { r = false; }
    supports_html5_storage = r ? function () { return true; } : function () { return false; };
    return r;
  };

  function sync_panels () {
    var col = $('#col_left');
    var md  = $('#tx_input');
    var tally = $('body > h1').outerHeight();
    col.children().each(function(){ tally += $(this).outerHeight(); });
    var space = col.height() - ( tally - md.outerHeight() );
    $('#tx_input, #text_preview, #html_output, #syntax_guide').height( space - 4 );
  }


  var convertTextTimer;
  function on_input ( e ) {
    clearTimeout( convertTextTimer );
    defer_time = Math.min( processing_time, max_delay );
    convertTextTimer = setTimeout( convert_text, defer_time );
  }


  $( '.tab' ).minitabs();


  // load syntax guide
  $.get('syntax.txt', function ( txt ) {
    $( '#syntax_guide' ).val( txt );
  });

  $( window ).bind( 'resize', sync_panels ).trigger( 'resize' );

  $( '#tx_input' ).bind( 'keyup', on_input ).focus();


  // app saves and loads from local storage
  if ( supports_html5_storage() ) {
    var prev = localStorage.getItem( 'textile-dingus' ) || '';
    // id form holds default text or is empty, load from localStorage
    if ( prev && !input.value || input.value == input.defaultValue ) {
      input.value = prev;
    }
  }
  
  if ( !input.value ) {
    $.get('help.txt', function ( txt ) {
      convert_text( (help_text = txt) );
    });
  }
  else {
    convert_text();
  }


  // enable loading desktop files
  
  if ( typeof window.FileReader !== 'undefined' ) {
    tx_input.bind('dragover', function (e) {
      $( this ).addClass('drophover');
      e.preventDefault();
    });
    tx_input.bind('dragleave dragend drop', function (e) { $( this ).removeClass('drophover'); });
    tx_input.bind('drop', function (e) {
      var file = e.originalEvent.dataTransfer.files[0];
      var reader = new FileReader();
      reader.onload = function ( event ) {
        convert_text( event.target.result );
      };
      reader.readAsText( file );
      e.preventDefault();
    });
  }


  $( 'html' ).delegate( 'button.clear,a.clear', 'click', function (e) {
    convert_text( '' );
    e.preventDefault();
  });



});
