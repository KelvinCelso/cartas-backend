import { client } from '../../prisma/client';
import { BaseError, HttpStatusCode } from '../../providers/errorProvider';

interface IRequest {
  id: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  birth_date?: Date;
  
}

export class UpdateUserUseCase {
  async execute({ id, firstName, lastName, bio, birth_date}: IRequest) {
    // Find the user by ID
    const user = await client.user.findUnique({
      where: {
        id,
      },
    });

    // Check if the user exists
    if (!user) {
      throw new BaseError(
        'NOT FOUND',
        HttpStatusCode.NOT_FOUND,
        false,
        'User not found'
      );
    }

    // Update the user's details
    const updatedUser = await client.user.update({
      where: {
        id,
      },
      data: {
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        bio: bio || user.bio,
        
        birth_date: birth_date ? new Date(birth_date) : user.birth_date,
      },
    });

    return updatedUser;
  }
}