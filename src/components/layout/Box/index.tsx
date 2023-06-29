import styled from "styled-components";
//styles.d.tsからResponsiveを持ってくる
import type { Responsive } from "../../../types/styles";
import { toPropValue, Color, Space } from "../../../utils/styles";

//Boxコンポーネントに適用できるプロパティの型定義
//BoxProps ---------- プロパティの型情報を提供するためのもの
export type BoxProps = {
  //色
  color?: Responsive<Color>;
  backgroundColor?: Responsive<Color>;
  //縦横
  width?: Responsive<string>;
  height?: Responsive<string>;
  minWidth?: Responsive<string>;
  minHeight?: Responsive<string>;
  display?: Responsive<string>;
  border?: Responsive<string>;
  overflow?: Responsive<string>;
  //margin
  margin?: Responsive<Space>;
  marginTop?: Responsive<Space>;
  marginRight?: Responsive<Space>;
  marginBottom?: Responsive<Space>;
  marginLeft?: Responsive<Space>;
  //padding
  padding?: Responsive<Space>;
  paddingTop?: Responsive<Space>;
  paddingRight?: Responsive<Space>;
  paddingBottom?: Responsive<Space>;
  paddingLeft?: Responsive<Space>;
};

/**
 * Boxコンポーネント
 * レイアウトの調整に利用する
 */
// ${(props) => toPropValue ------------------ 与えられたpropsでマッチするものがあればCSSプロパティと値の文字列を返す
// マッチする場合 ----- CSSプロパティと値の文字列を返す
//　マッチしない場合 ---- 空文字列をかえす
const Box = styled.div<BoxProps>`
  ${(props) => toPropValue("color", props.color, props.theme)}
  ${(props) => toPropValue("background-color", props.backgroundColor, props.theme)}
  ${(props) => toPropValue("width", props.width, props.theme)}
  ${(props) => toPropValue("height", props.height, props.theme)}
  ${(props) => toPropValue("min-width", props.minWidth, props.theme)}
  ${(props) => toPropValue("min-height", props.minHeight, props.theme)}
  ${(props) => toPropValue("display", props.display, props.theme)}
  ${(props) => toPropValue("border", props.border, props.theme)}
  ${(props) => toPropValue("overflow", props.overflow, props.theme)}
  ${(props) => toPropValue("margin", props.margin, props.theme)}
  ${(props) => toPropValue("margin-top", props.marginTop, props.theme)}
  ${(props) => toPropValue("margin-left", props.marginLeft, props.theme)}
  ${(props) => toPropValue("margin-bottom", props.marginBottom, props.theme)}
  ${(props) => toPropValue("margin-right", props.marginRight, props.theme)}
  ${(props) => toPropValue("padding", props.padding, props.theme)}
  ${(props) => toPropValue("padding-top", props.paddingTop, props.theme)}
  ${(props) => toPropValue("padding-left", props.paddingLeft, props.theme)}
  ${(props) => toPropValue("padding-bottom", props.paddingBottom, props.theme)}
  ${(props) => toPropValue("padding-right", props.paddingRight, props.theme)}
`;

export default Box;
