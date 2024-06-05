import { createAction } from '@activepieces/pieces-framework';
import { gelatoAuth } from '../../index';

export const getIcecreamFlavor = createAction({
  // auth: check https://www.activepieces.com/docs/developers/piece-reference/authentication,
  name: 'getIcecreamFlavor',
  auth: gelatoAuth,
  displayName: 'get icecream flavor',
  description: 'fetches random icecream flavor',
  props: {},
  async run(context) {
    const res = await fetch('https://cloud.activepieces.com/api/v1/webhooks/RGjv57ex3RAHOgs0YK6Ja/sync', {
      method: 'GET',
      headers: {
        Authorization: context.auth
      }
    });
    return await res.json();
  }
});
