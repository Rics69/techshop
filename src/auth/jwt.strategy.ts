import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from '../prisma.service'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { TecnUser } from '@prisma/client'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private configService: ConfigService,
		private prisma: PrismaService
	) {
		const jwtSecret = configService.get<string>('JWT_SECRET')
		if (!jwtSecret) {
			throw new Error('JWT_SECRET is not defined!')
		}
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: jwtSecret
		})
	}

	async validate({ id }: Pick<TecnUser, 'id'>) {
		return this.prisma.tecnUser.findUnique({
			where: { id: +id }
		})
	}
}
