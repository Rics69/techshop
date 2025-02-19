import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { AuthDto } from './auth.dto'
import { faker } from '@faker-js/faker/locale/ar'
import { hash } from 'argon2'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService, private jwt: JwtService) {}

	async register(dto: AuthDto) {
		const oldUser = await this.prisma.tecnUser.findUnique({
			where: {
				email: dto.email
			}
		})

		if (oldUser) throw new BadRequestException('User already exists')

		const user = await this.prisma.tecnUser.create({
			data: {
				email: dto.email,
				name: faker.person.firstName(),
				avatarPath: faker.image.avatar(),
				phone: faker.phone.number(),
				password: await hash(dto.password)
			}
		})

		return user
	}

	private async issueTokens(userId: number) {
		const data = { id: userId }

		// const accessToken = this.jwtService.sign()
	}
}
