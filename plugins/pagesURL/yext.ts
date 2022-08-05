declare const API_KEY: string;
const API_BASE = 'https://api.yext.com/v2/accounts/me/';
const API_VERSION = '20210714';

export interface Profile {
  c_pagesUrl?: string;
  meta?: {
    accountId?: string;
    uid?: string;
    id?: string;
    timestamp?: string;
    folderId?: string;
    language?: string;
    countryCode?: string;
    entityType?: string;
  }
  name?: string;
}

interface APIResponse<T> {
  meta: {
    uuid: string;
    errors: {
      code: number;
      message: string;
      type: string;
    }[];
  };
  status: number;
  response: T;
}

export function buildAPIRequestURL(path: string, params: Record<string, string> = {}): string {
  const url = new URL(path, API_BASE);

  params['api_key'] = API_KEY;
  params['v'] = API_VERSION;

  for (const k in params) {
    url.searchParams.append(k, params[k]);
  }

  return url.toString();
}

export async function updateEntity<T extends Profile>(id: string, payload: Profile): Promise<T> {
  // Prepare PUT request to Yext entity
  const url = buildAPIRequestURL(`entities/${id}`);
  const request = new Request(url, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });

  const response = await fetch(request)
    .then((res) => res.json() as Promise<APIResponse<T>>);

  if (response.status < 200 || response.status >= 300) {
    throw response.meta.errors[0].message;
  }

  return response.response;
}
