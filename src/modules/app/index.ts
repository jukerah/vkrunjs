import * as http from 'http'
import { VkrunRouter, Router } from '../router'
import { customResponse } from '../router/helpers/custom-response'
import * as type from '../types'
import { loggerSanitizeInterval } from '../logger'
import { RouterHandler } from '../router/helpers/router-handler'

class VkrunApp implements type.VkrunApp {
  private instance: 'server' | '_reqWithoutServer' | 'closed' | undefined
  private readonly router: type.VkrunRouter
  private routes: type.Route[] = []
  private readonly routerHandler: RouterHandler
  private readonly middlewares: any[]
  private createdServer: any
  private timers: any[]

  constructor () {
    this.instance = undefined
    this.router = Router()
    this.routerHandler = new RouterHandler()
    this.middlewares = []
    this.timers = []
  }

  // Timeout management

  public setTimer (callback: () => void, ms: number): NodeJS.Timeout {
    const timeout = setTimeout(callback, ms)
    this.timers.push(timeout)
    return timeout
  }

  public clearTimers (): void {
    this.timers.forEach((timerId: NodeJS.Timeout) => clearTimeout(timerId))
    this.timers = []
    if (loggerSanitizeInterval) clearInterval(loggerSanitizeInterval)
  }

  // Server Nodejs

  public server (): type.CreateServer {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.createdServer = http.createServer(async (request, response) => {
      this.instance = 'server'
      const _request = request as type.Request
      _request.setTimer = this.setTimer.bind(this)
      const _response = customResponse(response)
      await this.routerHandler.handleRequest(
        _request,
        _response,
        this.routes,
        this.middlewares
      )
    })

    return this.createdServer
  }

  public close (): void {
    if (this.instance === 'server') this.createdServer.close()
    this.createdServer = null
    this.clearTimers()
    this.instance = 'closed'
  }

  // Method to simulate a request with superRequest

  public async _reqWithoutServer (request: type.Request, response: type.Response): Promise<type.Response> {
    this.instance = '_reqWithoutServer'
    const _request = request
    _request.setTimer = this.setTimer.bind(this)
    this.createdServer = customResponse(response)
    // await this.router.handleRequest(
    //   request, this.createdServer, this.middlewares)
    await this.routerHandler.handleRequest(
      _request,
      this.createdServer,
      this.routes,
      this.middlewares
    )
    return this.createdServer
  }

  // Middleware management

  public use (middleware: Record<string, any>): void {
    if (middleware instanceof VkrunRouter) {
      this.routes = [...this.routes, ...middleware._routes()]
    } else {
      this.middlewares.push(middleware)
    }
  }

  // Routing

  public get (path: string, ...handlers: any): void {
    this.router.get(path, ...handlers)
  }

  public post (path: string, ...handlers: any): void {
    this.router.post(path, ...handlers)
  }

  public put (path: string, ...handlers: any): void {
    this.router.put(path, ...handlers)
  }

  public patch (path: string, ...handlers: any): void {
    this.router.patch(path, ...handlers)
  }

  public delete (path: string, ...handlers: any): void {
    this.router.delete(path, ...handlers)
  }

  public options (path: string, ...handlers: any): void {
    this.router.options(path, ...handlers)
  }
}

export const App = (): type.VkrunApp => {
  return new VkrunApp()
}
