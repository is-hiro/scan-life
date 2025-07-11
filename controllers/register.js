import ScannerRouter from './scanner/routes.js'
import ContentRouter from './content/routes.js'
const ROOT_PATH = '/scan-life/api'

const routes = [
  ScannerRouter,
  ContentRouter
]

export const RegisterRoutes = (app) => {
  routes.map(route => {
    app.use(ROOT_PATH, route)
  })
}