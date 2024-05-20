import { NextFunction, Request, Response } from 'express';
import { RefreshTokenUseCase } from './refreshTokenUseCase';

export class RefreshTokenController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { refreshToken } = request.body;

      const refreshTokenUseCase = new RefreshTokenUseCase();
      const { accessToken, refreshToken: newRefreshToken } =
        await refreshTokenUseCase.execute({
          refreshToken,
        });

      return response.status(200).json({ accessToken, refreshToken: newRefreshToken });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}