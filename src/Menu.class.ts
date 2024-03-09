import { PointArray, Rect } from "@taylorhmorris/geometry";
import { Button } from "./index";

export class Menu {
  _name = "Menu";
  rect: Rect;
  buttons: Button[];
  canvas: HTMLCanvasElement;
  closed: boolean = false;
  listenerCallback: (event: MouseEvent) => void;

  constructor(
    canvas: HTMLCanvasElement,
    rect: Rect,
    buttons: Button[] = [],
    startOpen: boolean = true,
  ) {
    this.canvas = canvas;
    this.listenerCallback = this.handleClickEvent.bind(this);
    this.rect = rect;
    this.buttons = buttons;
    if (startOpen) this.open();
    else this.close();
  }

  handleClickEvent(event: MouseEvent) {
    if (this.closed) return;
    const clickPoint: PointArray = [event.offsetX, event.offsetY];
    if (this.rect.collidePoint(clickPoint)) {
      const relativeClickPoint: PointArray = [
        clickPoint[0] - this.rect.left,
        clickPoint[1] - this.rect.top,
      ];
      this.handleClickPoint(relativeClickPoint);
    }
  }

  /**
   * Checks if a point is within a button's rect and calls the button's onClick
   * function if it is.
   * @param point the point to check
   * @returns true if the point is within a button's rect, false otherwise
   */
  handleClickPoint(point: PointArray): boolean {
    if (this.closed) return false;
    for (const button of this.buttons) {
      if (button.rect.collidePoint(point)) {
        button.onClick();
        return true;
      }
    }
    return false;
  }

  open() {
    this.closed = false;
    this.canvas.addEventListener("click", this.listenerCallback);
  }

  close() {
    this.closed = true;
    this.canvas.removeEventListener("click", this.listenerCallback);
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.closed) return;
    ctx.fillStyle = "white";
    const x = this.rect.left;
    const y = this.rect.top;
    ctx.fillRect(x, y, this.rect.width, this.rect.height);
    for (const button of this.buttons) {
      button.draw(ctx, [x, y]);
    }
  }
}
