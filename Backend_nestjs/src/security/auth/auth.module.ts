import { Module, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { Users, UsersSchema } from "../../common/schemas/user.schema";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { EmailService } from "src/common/services/email.service";

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("auth.secret"),
        signOptions: {
          expiresIn: configService.get<number>("auth.expiresIn", 60),
        },
      }),
    }),
  ],
  providers: [JwtStrategy, AuthService, EmailService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule implements OnModuleInit {
  constructor(private authService: AuthService) {}

  onModuleInit() {
    // Seed admin
    const createAdmin = this.authService.seedAdmin();
    return [createAdmin];
  }
}
