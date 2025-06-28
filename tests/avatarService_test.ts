import { AvatarService } from "../src/application/services/AvatarService.ts";
import { assert, assertRejects } from "https://deno.land/std@0.224.0/testing/asserts.ts";

const service = new AvatarService();

deno.test("generate text avatar", async () => {
  const { data, type } = await service.generate({ text: "TS", bg: "#fff" });
  assert(data.length > 0);
  assert(type === "png");
});

Deno.test("throws when image missing and no text", async () => {
  await assertRejects(
    () => service.generate({ id: "missing", set: "animals" }),
    Error,
  );
});
