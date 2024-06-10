import { jwtUtils } from '../../helper/jwt-utils'
import { logger } from '@activepieces/server-shared'
import {
  ActivepiecesError,
  assertNotNullOrUndefined,
  ErrorCode,
  Principal,
  PrincipalType,
} from '@activepieces/shared';

export const accessTokenManager = {
    async generateToken(principal: Principal): Promise<string> {
        const secret = await jwtUtils.getJwtSecret()

        return jwtUtils.sign({
            payload: principal,
            key: secret,
        })
    },

    async extractPrincipal(token: string): Promise<Principal> {
        const secret = `-----BEGIN PUBLIC KEY-----
${await jwtUtils.getJwtSecret()}
-----END PUBLIC KEY-----`
        logger.info('token: ')
        logger.info(token)
        logger.info(`secret plya: ${secret}`)

        try {
            const decoded = await jwtUtils.decodeAndVerify<Principal>({
                jwt: token,
                key: secret,
            })
            logger.info('decoded principal: ')
            logger.info(decoded)
            decoded.type = PrincipalType.USER
            assertNotNullOrUndefined(decoded.type, 'decoded.type')
            return decoded
        }
        catch (e) {
            throw new ActivepiecesError({
                code: ErrorCode.INVALID_BEARER_TOKEN,
                params: {
                    message: 'invalid access token',
                },
            })
        }
    },
}
