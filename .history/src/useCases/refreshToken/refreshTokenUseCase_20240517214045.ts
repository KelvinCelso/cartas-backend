// src/useCases/refreshToken/refreshTokenUseCase.ts
import { client } from '../../prisma/client';
import { sign, verify } from 'jsonwebtoken';
import { BaseError, HttpStatusCode } from '../../providers/errorProvider';
import { addDays } from 'date-fns';

interface IRequest {
  refreshToken: string;
}

export class RefreshTokenUseCase {
  async execute({ refreshToken }: IRequest) {
    try {
      // Verify the refresh token
      const decoded = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

      // Find the refresh token in the database
      const storedRefreshToken = await client.refreshToken.findFirst({
        where: {
          token: refreshToken,
        },
        include: {
          user: true,
        },
      });

      if (!storedRefreshToken) {
        throw new BaseError(
          'UNAUTHORIZED',
          HttpStatusCode.UNAUTORIZED,
          false,
          'Invalid refresh token'
        );
      }

      // Check if the refresh token has expired
      if (storedRefreshToken.expiresAt < new Date()) {
        throw new BaseError(
          'UNAUTHORIZED',
          HttpStatusCode.UNAUTORIZED,
          false,
          'Refresh token has expired'
        );
      }

      // Generate a new access token
      const newAccessToken = sign({}, process.env.JWT_SECRET, {
        expiresIn: '15m',
        subject: storedRefreshToken.user.id,
      });

      // Generate a new refresh token
      const newRefreshToken = sign({}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d',
        subject: storedRefreshToken.user.id,
      });

      // Update the refresh token in the database
      await client.refreshToken.update({
        where: {
          id: storedRefreshToken.id,
        },
        data: {
          token: newRefreshToken,
          expiresAt: addDays(new Date(), 7),
        },
      });

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (err) {
      throw new BaseError(
        'UNAUTHORIZED',
        HttpStatusCode.UNAUTORIZED,
        true,
        'Failed to refresh token'
      );
    }
  }
}