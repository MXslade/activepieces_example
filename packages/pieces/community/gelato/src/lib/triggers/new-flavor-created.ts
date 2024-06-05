import { gelatoAuth } from '../../';
import {
    createTrigger,
    PiecePropValueSchema,
    TriggerStrategy,
} from '@activepieces/pieces-framework';
import { DedupeStrategy, Polling, pollingHelper } from '@activepieces/pieces-common';
import dayjs from 'dayjs';

// replace auth with piece auth variable
const polling: Polling<
    PiecePropValueSchema<typeof gelatoAuth>,
    Record<string, never>
> = {
    strategy: DedupeStrategy.TIMEBASED,
    items: async ({ auth, propsValue, lastFetchEpochMS }) => {
        const response = await fetch(
            'https://cloud.activepieces.com/api/v1/webhooks/aHlEaNLc6vcF1nY2XJ2ed/sync',
            {
                method: 'get',
                headers: { authorization: auth },
            }
        );
        const res = await response.json();
        return res.flavors.map((flavor: string) => ({
            epochMilliSeconds: dayjs().valueOf(),
            data: flavor,
        }));
    },
};

export const newFlavorCreated = createTrigger({
    // auth: check https://www.activepieces.com/docs/developers/piece-reference/authentication,
    auth: gelatoAuth,
    name: 'newFlavorCreated',
    displayName: 'new flavor created',
    description: 'triggers when a new icecream flavor is created',
    props: {},
    sampleData: {},
    type: TriggerStrategy.POLLING,
    async test(context) {
        const { store, auth, propsValue } = context;
        return await pollingHelper.test(polling, { store, auth, propsValue });
    },
    async onEnable(context) {
        const { store, auth, propsValue } = context;
        await pollingHelper.onEnable(polling, { store, auth, propsValue });
    },

    async onDisable(context) {
        const { store, auth, propsValue } = context;
        await pollingHelper.onDisable(polling, { store, auth, propsValue });
    },

    async run(context) {
        const { store, auth, propsValue } = context;
        return await pollingHelper.poll(polling, { store, auth, propsValue });
    },
});
