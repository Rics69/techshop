import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { TecnUser } from '@prisma/client'

export const CurrentUser = createParamDecorator(
	(data: keyof TecnUser, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest()
		const user = request.user

		return data ? user[data] : user
	}
)
