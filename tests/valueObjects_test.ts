import { assertEquals, assertThrows } from "https://deno.land/std@0.224.0/testing/asserts.ts";
import { Size } from "../src/domain/value-objects/Size.ts";
import { Format } from "../src/domain/value-objects/Format.ts";
import { Shape } from "../src/domain/value-objects/Shape.ts";
import { Color } from "../src/domain/value-objects/Color.ts";

// Size
Deno.test("Size.create validates and parses", () => {
  assertEquals(Size.create("64").value, 64);
});

Deno.test("Size.create throws on invalid", () => {
  assertThrows(() => Size.create("0"));
});

// Format
Deno.test("Format.create works", () => {
  assertEquals(Format.create("webp").value, "webp");
});

Deno.test("Format.create throws", () => {
  assertThrows(() => Format.create("bmp"));
});

// Shape
Deno.test("Shape.create works", () => {
  assertEquals(Shape.create("circle").value, "circle");
});

Deno.test("Shape.create throws", () => {
  assertThrows(() => Shape.create("triangle"));
});

// Color
Deno.test("Color.create allows colors", () => {
  assertEquals(Color.create("#000").value, "#000");
});

Deno.test("Color.create throws", () => {
  assertThrows(() => Color.create("notAColor"));
});
