import { createPiece, PieceAuth } from '@activepieces/pieces-framework';
import { getDarleenEntity } from './lib/actions/get-darleen-entity';
import { filterDarleenEntities } from './lib/actions/filter-darleen-entities';

export const darleenAuth = PieceAuth.SecretText({
  displayName: 'API Key',
  required: true,
  description: 'Please use **test-key** as value for API Key',
});

export const darleenEntities = createPiece({
  displayName: 'Darleen-entities',
  auth: darleenAuth,
  minimumSupportedRelease: '0.20.0',
  logoUrl: 'https://cdn.activepieces.com/pieces/darleen-entities.png',
  authors: [],
  actions: [getDarleenEntity, filterDarleenEntities],
  triggers: [],
});
