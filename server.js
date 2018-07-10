const fs = require('fs')
const path = require('path')
const LRU = require('lru-cache')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const resolve = file => path.resolve(__dirname, file)
const { createBundleRenderer } = require('vue-server-renderer')

const isProd = process.env.NODE_ENV === 'production'
const app = express()

require('./database')
.then(res => {
  global.db = res
})
.catch(err => {
  console.log(err.message)
})

app.use(bodyParser.urlencoded({ extended: true })) // urlcoded
app.use(bodyParser.json()) // Application/json
app.use(cookieParser())

var storage = multer.memoryStorage()
global.upload = multer({ storage: storage }) // Multipart/form-data

const authRouter = require('./server-router/auth')
const userRouter = require('./server-router/user')

app.use('/auth', authRouter)
app.use('/api/user', userRouter)


// #region Setup Server-side rendering

function createRenderer (bundle, options) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(bundle, Object.assign(options, {
    // for component caching
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    // recommended for performance
    runInNewContext: false
  }))
}

let renderer
let readyPromise
const templatePath = resolve('./index.html')
if (isProd) {
  // In production: create server renderer using template and built server bundle.
  // The server bundle is generated by vue-ssr-webpack-plugin.
  const template = fs.readFileSync(templatePath, 'utf-8')
  const bundle = require('./dist/vue-ssr-server-bundle.json')
  // The client manifests are optional, but it allows the renderer
  // to automatically infer preload/prefetch links and directly add <script>
  // tags for any async chunks used during render, avoiding waterfall requests.
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createRenderer(bundle, {
    template,
    clientManifest
  })
} else {
  // In development: setup the dev server with watch and hot-reload,
  // and create a new renderer on bundle / index template update.
  readyPromise = require('./build/setup-dev-server')(
    app,
    templatePath,
    (bundle, options) => {
      renderer = createRenderer(bundle, options)
    }
  )
}

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})

app.use('/dist', serve('./dist', true))

async function render (req, res) {
  try {
    const s = Date.now()

    res.setHeader("Content-Type", "text/html")

    const handleError = err => {
      if (err.url) {
        res.redirect(err.url)
      } else if(err.code === 404) {
        res.status(404).send('404 | Page Not Found')
      } else {
        // Render Error Page or Redirect
        res.status(500).send('500 | Internal Server Error')
        console.error(`error during render : ${req.url}`)
        console.error(err.stack)
      }
    }
    const context = {
      title: 'Moonlight', // default title
      url: req.url,
      token: req.cookies.access_token || null
    }
    renderer.renderToString(context, (err, html) => {
      if (err) {
        return handleError(err)
      }
      res.send(html)
      if (!isProd) {
        console.log(`whole request: ${Date.now() - s}ms`)
      }
    })
  }
  catch (err) {
    console.log('server.js error.')
    console.log(err)
  }
}

// #endregion Setup Server-side rendering

app.get('*', isProd ? render : function (req, res) {
  readyPromise.then(() => {
    render(req, res)
  })
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}/`)
})



