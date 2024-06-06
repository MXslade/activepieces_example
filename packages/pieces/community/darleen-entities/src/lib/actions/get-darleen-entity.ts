import { createAction, Property } from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';

export const getDarleenEntity = createAction({
  // auth: check https://www.activepieces.com/docs/developers/piece-reference/authentication,
  name: 'getDarleenEntity',
  displayName: 'get darleen entity',
  description: 'fetched predefined darleen entity from darleen erp system',
  props: {
    authToken: Property.LongText({
      displayName: 'auth token',
      description: 'enter auth token from darleen',
      required: true,
      defaultValue: '',
    }),
    workspaceId: Property.ShortText({
      displayName: 'workspace id',
      description: 'enter workspace id',
      required: true,
      defaultValue: '',
    }),
    workspaceToken: Property.LongText({
      displayName: 'workspace token',
      description: 'enter workspace token',
      required: true,
      defaultValue: '',
    }),
    entityName: Property.ShortText({
      displayName: 'entity name',
      description: 'enter entity name',
      required: true,
      defaultValue: '',
    }),
  },
  async run(context): Promise<any[]> {
    const authToken = context.propsValue.authToken.trim();
    const workspaceId = context.propsValue.workspaceId.trim();
    const workspaceToken = context.propsValue.workspaceToken.trim();
    const entityName = context.propsValue.entityName.trim();
    if (entityName === 'users') {
      const url = `https://dms.dar-dev.zone/api/v1/hcms/main-api/structure/${workspaceId}/employees?status=ACTIVE`;
      const headers = {
        'Content-Type': 'application/json',
        'Workspace-Authorization': workspaceToken,
        Authorization: `Bearer ${authToken}`,
      };
      const response = await httpClient.sendRequest<any[]>({
        method: HttpMethod.GET,
        url,
        headers,
      });
      return response.body;
    }
    return [];
  },
});
