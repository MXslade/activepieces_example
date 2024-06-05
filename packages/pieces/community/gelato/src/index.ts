import { createPiece, PieceAuth } from '@activepieces/pieces-framework';
import { getIcecreamFlavor } from './lib/actions/get-icecream-flavor';
import { newFlavorCreated } from './lib/triggers/new-flavor-created';

export const gelatoAuth = PieceAuth.SecretText({
  displayName: 'API Key',
  required: true,
  description: 'Please use **test-key** as value for API Key'
});

export const gelato = createPiece({
  displayName: 'Gelato',
  auth: gelatoAuth,
  minimumSupportedRelease: '0.20.0',
  logoUrl: 'https://cdn.activepieces.com/pieces/gelato.png',
  authors: [],
  actions: [getIcecreamFlavor],
  triggers: [newFlavorCreated]
});
