import { buildAPIRequestURL } from "./yext.ts";
import { assertEquals } from "https://deno.land/std@0.114.0/testing/asserts.ts";

// const event: ON_URL_CHANGE = {
//   entityId: '1234',
//   url: 'https://yext.com/va/arlington/1101-wilson-blvd',
//   locale: 'en',
// };

Deno.test("Test buildAPIRequestURL() with params", () => {
  const url = buildAPIRequestURL('entities/1234', { test: 'success' });
  // TODO (ttimblin): add api_key value
  const expected = `https://api.yext.com/v2/accounts/me/?test=success&v=20210714&api_key=`;

  assertEquals(url, expected);
});
