import { Rect } from "@taylorhmorris/geometry";

export interface ButtonInterface {
  rect: Rect;
  onClick: () => void;
  draw: (
    ctx: CanvasRenderingContext2D,
    offset?: [number, number],
    color?: string,
  ) => void;
}
