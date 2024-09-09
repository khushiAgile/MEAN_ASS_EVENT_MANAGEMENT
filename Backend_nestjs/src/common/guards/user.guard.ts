import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Role } from "../constants/enum.constant";

export class UserGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (!request.user) {
      return false;
    }

    return request.user.role === Role.USER;
  }
}
