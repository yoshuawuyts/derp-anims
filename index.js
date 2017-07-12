// https://medium.com/outsystems-experts/how-to-achieve-60-fps-animations-with-css3-db7b98610108

var html = require('choo/html')
var css = require('sheetify')
var choo = require('choo')

css('tachyons')

css`
  .menu {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
    z-index: 150;
  }

  .menu--visible {
    pointer-events: auto;
  }

  .app-menu {
    background-color: #fff;
    color: #fff;
    position: relative;
    width: 90%;
    height: 100%;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
    transform: translateX(-103%);
    contain: strict;
    display: flex;
    flex-direction: column;
    will-change: transform;
    z-index: 160;
    pointer-events: auto;
    width: 300px;
    height: 667px;
    box-shadow: none;
    background-color: #ddd;
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
  return html`
    <body class="ma0">
      <aside class="${state.visible ? 'menu menu--visible' : 'menu'}" onclick=${toggle}>
        <div class="app-menu"></div>
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
