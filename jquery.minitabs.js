/*
 *  jQuery minitabs plugin
 *  Version 1.0
 *
 *  Licenced under dual MIT/GPL license.
 *    GPL: http://www.opensource.org/licenses/gpl-2.0.php
 *    MIT: http://www.opensource.org/licenses/mit-license.php
 *
*/
(function($){

  var _defaultConfig = {
      open: 'tab-open',
      closed: 'tab-closed',
      current: 'current',
      active: 'tabs-active',
      panel: 'tab-panel'
    };

  function getRef ( a ) {
    return $.attr( a, 'href' ).replace( /^[^#]+/, '' );
  }

  function switchTabs ( link, c ) {
    var nav = $( link ).closest( '.' + c.active ),
        id  = getRef( link );
    if ( id && id !== c.current_id ) {
      nav.trigger( 'tabswitch', [ link, id ] );

      // find currenly active and close it 
      if ( c.current_id ) {
        var cid = c.current_id;
        $( cid ).trigger( 'tabclose' ).removeClass( c.open ).addClass( c.closed );
        nav.find( 'li:has(a[href$=' + cid + '])' ).removeClass( c.current );
      }

      // find the desired panel and open it
      $( id ).removeClass( c.closed ).addClass( c.open ).trigger( 'tabopen' );
      $( link ).closest('li').addClass( c.current );

      c.current_id = id;
    }
  }

  $.fn.minitabs = function ( cfg ) {
    var conf = $.extend( {}, _defaultConfig, cfg );
    return this.each(function () {

      var current = null;
      var links = $( 'a', this ).each(function ( i ) {
        $( getRef( this ) ).addClass( conf.panel + ' ' + conf.closed );
        if ( $( this ).closest( 'li' ).is( '.' + conf.current ) ) { current = this; }
      });

      var tab = $( this )
        .addClass( conf.active )
        .data( 'tab.config', conf )
        .undelegate( 'a', 'click.minitabs' )
        .delegate( 'a', 'click.minitabs', function (e) {
          switchTabs( this, $.data( e.delegateTarget, 'tab.config' ) );
          e.preventDefault();
        })
        ;
      switchTabs( current || links[0], conf );

    });
  };

})(jQuery);
