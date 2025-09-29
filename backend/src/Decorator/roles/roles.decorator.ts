import { SetMetadata } from '@nestjs/common'; // <- ta clé définie plus haut
import { ROLES_KEY } from 'src/Constants/constants';

export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);