import { updateEntity, Profile } from './yext.ts';

export interface ON_URL_CHANGE {
  url: string;
  entityId: string;
  locale: string;
}

export async function setPagesUrl(event: ON_URL_CHANGE): Promise<Profile | undefined> {
  if (!event.entityId && !event.locale) return;

  const entityPayload: Profile = {
    c_pagesUrl: event.url,
    meta: {
      language: event.locale,
    },
  };

  const result = await updateEntity(event.entityId, entityPayload);

  return result;
}
