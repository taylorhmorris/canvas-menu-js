import { describe, expect, test } from "vitest";
import { Rect } from "@taylorhmorris/geometry";
import { Button } from "../src/Button.class";

describe("constructor", () => {
  test("creates a button", () => {
    const button = new Button("Click Me", new Rect(10, 10, 100, 50), () => {});
    expect(button).toBeDefined();
    expect(button.text).toBe("Click Me");
    expect(button.rect).toEqual(new Rect(10, 10, 100, 50));
    expect(button.onClick).toBeInstanceOf(Function);
  });
});
