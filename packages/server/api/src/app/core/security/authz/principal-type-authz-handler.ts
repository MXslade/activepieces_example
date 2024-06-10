import { FastifyRequest } from 'fastify'
import { BaseSecurityHandler } from '../security-handler'
import { logger } from '@activepieces/server-shared'
import {
    ActivepiecesError,
    ErrorCode,
    PrincipalType,
} from '@activepieces/shared'

export class PrincipalTypeAuthzHandler extends BaseSecurityHandler {
    private static readonly IGNORED_ROUTES = [
        '/favicon.ico',
        '/v1/docs',
        '/redirect',
    ]

    private static readonly DEFAULT_ALLOWED_PRINCIPAL_TYPES = [
        PrincipalType.USER,
        PrincipalType.WORKER,
        PrincipalType.SERVICE,
    ]

    protected canHandle(request: FastifyRequest): Promise<boolean> {
        const requestMatches =
      !PrincipalTypeAuthzHandler.IGNORED_ROUTES.includes(request.routerPath) &&
      !request.routerPath.startsWith('/ui')

        logger.info('principle type authz request matches: ', (requestMatches ? 'matches' : 'not matches'))
        logger.flush()

        return Promise.resolve(requestMatches)
    }

    protected doHandle(request: FastifyRequest): Promise<void> {
        const principalType = request.principal.type
        logger.info('principle type authz handler: ')
        logger.info(principalType)
        const configuredPrincipals = request.routeConfig.allowedPrincipals
        const defaultPrincipals =
      PrincipalTypeAuthzHandler.DEFAULT_ALLOWED_PRINCIPAL_TYPES
        const allowedPrincipals = configuredPrincipals ?? defaultPrincipals
        logger.info('allowed principals: ')
        logger.info(allowedPrincipals)
        const principalTypeNotAllowed = !allowedPrincipals.includes(principalType)

        if (principalTypeNotAllowed) {
            throw new ActivepiecesError({
                code: ErrorCode.AUTHORIZATION,
                params: {
                    message: 'invalid route for principal type',
                },
            })
        }

        return Promise.resolve()
    }
}
