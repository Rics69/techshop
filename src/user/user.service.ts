import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { tr } from '@faker-js/faker'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async byId(id: number) {
		const user = await this.prisma.tecnUser.findUnique({
			where: { id },
			select: {
				id: true,
				email: true,
				name: true,
				avatarPath: true,
				password: false,
				phone: true
			}
		})
	}
}
