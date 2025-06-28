import { get } from "../src/api/avatar.ts";
import { assertEquals } from "https://deno.land/std@0.224.0/testing/asserts.ts";

async function run() {
  const res = await get({ request: new Request("http://localhost/api/avatar?text=A") } as any);
  assertEquals(res.status, 200);
}

deno.test("avatar endpoint", async () => {
  await run();
});
