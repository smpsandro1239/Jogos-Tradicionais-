import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { UserRole } from '../../utilizadores/utilizador.entity';

@Injectable()
export class AldeiaGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Super admin can access anything
    if (user?.role === UserRole.SUPER_ADMIN) {
      return true;
    }

    const aldeiaIdParam = request.params.aldeiaId || request.body.aldeiaId;

    if (user?.role === UserRole.ALDEIA_ADMIN) {
      if (user.aldeiaId !== aldeiaIdParam) {
        throw new ForbiddenException('You do not have access to this village');
      }
      return true;
    }

    // Default to false for regular users if they try to access admin routes
    return false;
  }
}
