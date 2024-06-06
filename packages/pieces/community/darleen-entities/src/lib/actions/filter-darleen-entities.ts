import { createAction, Property } from '@activepieces/pieces-framework';

export const filterDarleenEntities = createAction({
  // auth: check https://www.activepieces.com/docs/developers/piece-reference/authentication,
  name: 'filter-darleen-entities',
  displayName: 'filter-darleen-entities',
  description: 'filters the input of darleen entities',
  props: {
    data: Property.ShortText({
      displayName: 'choose darleen entities ',
      description: 'choose darleen entities from previous actions',
      required: true,
      defaultValue: '',
    }),
    key: Property.ShortText({
      displayName: 'entity property name',
      description: 'input entity property name',
      required: true,
      defaultValue: '',
    }),
    value: Property.ShortText({
      displayName: 'entity property filter value',
      description: 'input entity property filter value',
      required: true,
      defaultValue: '',
    }),
  },
  async run(context) {
    const key = context.propsValue.key;
    const value = context.propsValue.value;
    const data = JSON.parse(context.propsValue.data) as any[];
    console.log('filterDarleenEntities::run::data: ', data);
    // Action logic here
    return data.filter(item => item[key] === value);
  },
});
