import { describe, expect, test } from "vitest";
import { mock } from "vitest-mock-extended";
import { Menu } from "../src/Menu.class";
import { Rect } from "@taylorhmorris/geometry";
import { Button } from "../src/Button.class";

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

  test("doesn't adds click listener to canvas when closed", () => {
    const canvas = mock<HTMLCanvasElement>();
    const menuRect = new Rect(0, 0, 100, 100);
    const buttons = [];
    const menu = new Menu(canvas, menuRect, buttons, false);
    expect(menu).toBeDefined();
    expect(canvas.addEventListener).not.toHaveBeenCalledWith(
      "click",
      expect.any(Function),
    );
  });

  test("has a rect and buttons", () => {
    const canvas = mock<HTMLCanvasElement>();
    const rect = new Rect(0, 0, 1, 1);
    const button: Button = new Button("test", new Rect(0, 0, 1, 1), () => {});
    const menu = new Menu(canvas, rect, [button]);

    expect(menu._name).toBe("Menu");
    expect(menu.rect).toBe(rect);
    expect(menu.buttons[0]).toBe(button);
  });
});

test("Menu.handleClickPoint", () => {
  const canvas = mock<HTMLCanvasElement>();
  let checkValue = 0;
  const rect = new Rect(0, 0, 1, 1);
  const buttonRect = new Rect(0.5, 0.5, 1, 1);
  const button: Button = new Button("test", buttonRect, () => checkValue++);
  const menu = new Menu(canvas, rect, [button]);

  expect(checkValue).toBe(0);
  expect(menu.handleClickPoint([0.5, 0.5])).toBe(true);
  expect(checkValue).toBe(1);
  expect(menu.handleClickPoint([1.5, 1.5])).toBe(false);
  expect(checkValue).toBe(1);
  expect(menu.handleClickPoint([0.9, 0.5])).toBe(true);
  expect(checkValue).toBe(2);
});
