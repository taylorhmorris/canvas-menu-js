import { Rect } from "@taylorhmorris/geometry";

export interface ButtonInterface {
  text: string;
  rect: Rect;
  onClick: () => void;
}
