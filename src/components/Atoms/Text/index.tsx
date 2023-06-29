import styled from "styled-components";
import type { Responsive } from "../../../types/styles";
import { toPropValue,Space,Color,FontSize,LetterSpacing,LineHeight } from "../../../utils/styles";

//テキストバリアント
export type TextVariant = | "extraSmall" | "small" | "medium" | "mediumLarge" | "large" | "large" | "extraLarge"
export type TextProps = {
  variant?: TextVariant;
  fontSize?: Responsive<FontSize>;
  fontWeight?: Responsive<string>;
  letterSpacing?: Responsive<LetterSpacing>;
  lineHeight?: Responsive<LineHeight>;
  textAlign?: Responsive<string>;
  color?: Responsive<Color>;
  backgroundColor?: Responsive<Color>;
  width?: Responsive<string>;
  height?: Responsive<string>;
  minWidth?: Responsive<string>;
  minHeight?: Responsive<string>;
  display?: Responsive<string>;
  border?: Responsive<string>;
  overflow?: Responsive<string>;
  margin?: Responsive<Space>;
  marginTop?: Responsive<Space>;
  marginRight?: Responsive<Space>;
  marginBottom?: Responsive<Space>;
  marginLeft?: Responsive<Space>;
  padding?: Responsive<Space>;
  paddingTop?: Responsive<Space>;
  paddingRight?: Responsive<Space>;
  paddingBottom?: Responsive<Space>;
  paddingLeft?: Responsive<Space>;
};

//variantsでTextのスタイルをextraSmall ~ extraLargeにする
const variants = {
    extraSmall:{
        fontSize:"extraSmall",
        letterSpacing:0,
        lineHeight:0
    },
    small:{
        fontSize:"small",
        letterSpacing:1,
        lineHeight:1
    },
    medium:{
        fontSize:"medium",
        letterSpacing:3,
        lineHeight:3
    },
    mediumLarge:{
        fontSize:"mediumLarge",
        letterSpacing:4,
        lineHeight:4
    },
    large:{
        fontSize:"large",
        letterSpacing:5,
        lineHeight:5,
    },
    extraLarge:{
        fontSize:"extraLarge",
        letterSpacing:6,
        lineHeight:6,
    }

}
/**
 * テキスト
 * バリアント、いろ、タイポグラフィ、レイアウト、スペース関連のPropsを追加
 */
const Text = styled.span<TextProps>`
  ${({ variant, fontSize, letterSpacing, lineHeight, theme }) => {
    //バリアントのスタイルの適用
    if (variant && variants[variant]) {
      const styles = [];
      !fontSize &&
        styles.push(
          toPropValue("font-size", variants[variant].fontSize, theme)
        );
      !letterSpacing &&
        styles.push(
          toPropValue("letter-spacing", variants[variant].letterSpacing, theme)
        );
      !lineHeight &&
        styles.push(
          toPropValue("line-height", variants[variant].lineHeight, theme)
        );
      return styles.join("\n");
    }
  }}
  // toPropValue関数を使用してfont-sizeというCSSプロパティを適用するためのスタイル生成
    // toPropValue関数 ---------- 与えられたプロパティをもとにスタイルを生成するユーティリティ関数
    // toPropValue(第一引数、第二引数、第三引数)
    // 第一引数 --- CSSプロパティ名
    // 第二引数 --- 値
    // 第三引数 --- テーマオブジェクト(props.theme)
    ${(props) => toPropValue("font-size", props.fontSize, props.theme)}
    ${(props) => toPropValue("letter-spacing", props.letterSpacing, props.theme)}
    ${(props) => toPropValue("line-height", props.lineHeight, props.theme)}
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

Text.defaultProps = {
    variant:"medium",
    color:"text"
}
export default Text