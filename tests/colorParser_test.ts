import { assertEquals, assertThrows } from "https://deno.land/std@0.224.0/testing/asserts.ts";
import { parseColor } from "../src/shared/colorParser.ts";

deno.test("parseColor allows valid color", () => {
  assertEquals(parseColor("#fff"), "#fff");
});

deno.test("parseColor rejects invalid color", () => {
  assertThrows(() => parseColor("badcolor"));
});
