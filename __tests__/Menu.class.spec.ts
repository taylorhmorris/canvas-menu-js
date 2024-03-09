import { describe, expect, test } from "vitest";
import { mock } from "vitest-mock-extended";
import { Menu } from "../src/Menu.class";
import { Rect } from "@taylorhmorris/geometry";

describe("constructor", () => {
  test("adds click listener to canvas", () => {
    const canvas = mock<HTMLCanvasElement>();
    const menuRect = new Rect(0, 0, 100, 100);
    const buttons = [];
    const menu = new Menu(canvas, menuRect, buttons);
    expect(menu).toBeDefined();
    expect(canvas.addEventListener).toHaveBeenCalledWith(
      "click",
      expect.any(Function),
    );
  });
});
