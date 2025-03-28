import type { Request, Response } from 'express'
import type { Controller, HttpRequest } from '../../presentation/contracts'


export const adaptRoute = (controller: Controller) =>
  async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
