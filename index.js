// https://medium.com/outsystems-experts/how-to-achieve-60-fps-animations-with-css3-db7b98610108

var html = require('choo/html')
var css = require('sheetify')
var choo = require('choo')

css('./index.css')
css('tachyons')

css`
  .menu--visible {
    pointer-events: auto;
  }

  .app-menu {
    background-color: #fff;
    color: #fff;
    position: relative;
    height: 100%;
    transform: translateX(-103%);
    contain: strict;
    will-change: transform;
    z-index: 1;
    pointer-events: auto;
  }

  .menu--visible .app-menu {
    transform: none;
  }

  .app-menu {
    transition: all 130ms ease-in;
  }

  .menu--visible .app-menu {
    transition: all 330ms ease-out;
  }

  .menu:after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.4);
    opacity: 0;
    will-change: opacity;
    pointer-events: none;
    transition: opacity 0.3s cubic-bezier(0,0,0.3,1);
    width: 375px;
  }

  .menu--visible.menu:after {
    opacity: 1;
    pointer-events: auto;
  }
`

var app = choo()
app.use(require('choo-log')())
app.route('/', function (state, emit) {
  var visible = state.visible

  return html`
    <body class="ma0">
      <aside class="${visible ? 'menu menu--visible' : 'menu'}" onclick=${toggle}>
        <div class="h-100 mw-90 app-menu"></div>
      </aside>
      <main class="mw6 vh-100 bg-light-gray">
        <div class="bg-silver">
          <div class="bg-gray tc white h3 w3" onclick=${toggle}></div>
        </div>
      </main>
    </body>
  `

  function toggle () {
    emit('toggle')
  }
})

app.use(function (state, emitter) {
  state.visible = false
  emitter.on('toggle', function () {
    state.visible = !state.visible
    emitter.emit('render')
  })
})
app.mount('body')
