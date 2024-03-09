import { Rect } from "@taylorhmorris/geometry";
import { ButtonInterface } from ".";

export class Button implements ButtonInterface {
  text: string;
  rect: Rect;
  onClick: () => void;

  constructor(text: string, rect: Rect, onClick: () => void) {
    this.text = text;
    this.rect = rect;
    this.onClick = onClick;
  }

  draw(
    ctx: CanvasRenderingContext2D,
    offset: [number, number] = [0, 0],
    color: string = "gray",
  ) {
    ctx.fillStyle = "black";
    ctx.fillRect(
      offset[0] + this.rect.left,
      offset[1] + this.rect.top,
      this.rect.width,
      this.rect.height,
    );
    ctx.fillStyle = color;
    const borderSize = 2;
    ctx.fillRect(
      offset[0] + this.rect.left + borderSize,
      offset[1] + this.rect.top + borderSize,
      this.rect.width - 2 * borderSize,
      this.rect.height - 2 * borderSize,
    );
    // Draw button text
    ctx.fillStyle = "black";
    ctx.font = "15px Arial";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    const measurements = ctx.measureText(this.text);
    ctx.fillText(
      this.text,
      offset[0] + this.rect.x - measurements.width / 2,
      offset[1] + this.rect.y,
    );
  }
}
