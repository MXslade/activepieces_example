import { FastifyRequest } from 'fastify'
import { accessTokenManager } from '../../../authentication/lib/access-token-manager'
import { BaseSecurityHandler } from '../security-handler'
import { logger } from '@activepieces/server-shared'
import { ActivepiecesError, ErrorCode, isNil } from '@activepieces/shared'

export class AccessTokenAuthnHandler extends BaseSecurityHandler {
    private static readonly HEADER_NAME = 'authorization'
    private static readonly HEADER_PREFIX = 'Bearer '

    protected canHandle(request: FastifyRequest): Promise<boolean> {
        logger.info('Running Access Token Authn Handler can handle')
        logger.info("request headers: ")
        logger.info(request.headers)
        const header = request.headers[AccessTokenAuthnHandler.HEADER_NAME]
        logger.info('can handle::header:')
        logger.info(header)
        logger.info(typeof header)
        const prefix = AccessTokenAuthnHandler.HEADER_PREFIX
        logger.info('can handle::prefix:')
        logger.info(prefix)
        const routeMatches = header?.startsWith(prefix) ?? false
        logger.info('can handle::routeMatches:')
        logger.info(routeMatches ? "route matches" : "route doest match")
        const skipAuth = request.routeConfig.skipAuth
        logger.info('can handle::skipAuth:')
        logger.info(skipAuth? "skip auth" : "dont skip auth")
        return Promise.resolve(routeMatches && !skipAuth)
    }

    protected async doHandle(request: FastifyRequest): Promise<void> {
        logger.info('Running Access Token Authn Handler do handle')
        const accessToken = this.extractAccessTokenOrThrow(request)
        const principal = await accessTokenManager.extractPrincipal(accessToken)
        request.principal = principal
    }

    private extractAccessTokenOrThrow(request: FastifyRequest): string {
        logger.info('Running Access Token Authn Handler extract Acess Token or Throw')
        const header = request.headers[AccessTokenAuthnHandler.HEADER_NAME]
        const prefix = AccessTokenAuthnHandler.HEADER_PREFIX
        const accessToken = header?.substring(prefix.length)
        logger.info('extractAccessTokenOrThrow::accessToken:')
        logger.info(accessToken)

        if (isNil(accessToken)) {
            throw new ActivepiecesError({
                code: ErrorCode.AUTHENTICATION,
                params: {
                    message: 'missing access token',
                },
            })
        }

        return accessToken
    }
}
