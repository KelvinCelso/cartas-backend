// src/useCases/authenticateUser/AuthenticateUserUseCase.ts
import { client } from '../../prisma/client';
import { sign } from 'jsonwebtoken';
import { BaseError, HttpStatusCode } from '../../providers/errorProvider';
import { addDays } from 'date-fns'; // npm install date-fns
import { compare } from 'bcryptjs';

interface IRequest {
  email: string;
  password: string;
}

export class AuthenticateUserUseCase {
  async execute({ email, password }: IRequest) {
    const userAlreadyExists = await client.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!userAlreadyExists) {
      throw new BaseError(
        "FORBIDDEN",
        HttpStatusCode.UNAUTORIZED,
        false,
        "Email ou a senha incorreta."
      );
    }

    const passwordMatch = await compare(password, userAlreadyExists.password); // await the comparison

    if (!passwordMatch) {
      throw new BaseError(
        'FORBIDDEN',
        HttpStatusCode.UNAUTORIZED,
        false,
        "Senha incorreta."
      );
    }

    const token = sign({}, process.env.JWT_SECRET, {
      expiresIn: '15m', // Set a short expiration time for the access token
      subject: userAlreadyExists.id,
    });

    // Generate a refresh token
    const refreshToken = sign({}, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '7d', // Set a longer expiration time for the refresh token
      subject: userAlreadyExists.id,
    });

    // Store the refresh token in the database
    await client.refreshToken.create({
      data: {
        token: refreshToken,
        userId: userAlreadyExists.id,
        expiresAt: addDays(new Date(), 7), // The refresh token will expire in 7 days
      },
    });

    delete userAlreadyExists.password;

    return {
      user: userAlreadyExists,
      token: token,
      refreshToken: refreshToken,
    };
  }
}