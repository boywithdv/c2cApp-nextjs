//Flexコンポーネント ---------- Boxコンポーネントを継承し、Flexboxに関する設定を簡単に行う
import styled from "styled-components";
import Box, { BoxProps } from "../Box";
import type {
  Responsive,
  CSSPropertyAlignContent,
  CSSPropertyAlignItems,
  CSSPropertyJustifyContent,
  CSSPropertyJustifyItems,
  CSSPropertyFlexDirection,
  CSSPropertyJustifySelf,
  CSSPropertyFlexWrap,
  CSSPropertyAlignSelf
} from "../../../types/styles";
import { toPropValue } from "../../../utils/styles";



//FlexProps ----------------- Flexコンポーネントに適用できるプロパティの型定義を提供している
//BoxPropsを継承している
type FlexProps = BoxProps & {
  alignItems?: Responsive<CSSPropertyAlignItems>;
  alignContent?: Responsive<CSSPropertyAlignContent>;
  justifyContent?: Responsive<CSSPropertyJustifyContent>;
  justifyItems?: Responsive<CSSPropertyJustifyItems>;
  flexWrap?: Responsive<CSSPropertyFlexWrap>;
  flexBasis?: Responsive<string>;
  flexDirection?: Responsive<CSSPropertyFlexDirection>;
  flexGrow?: Responsive<string>;
  flexShrink?: Responsive<string>;
  justifySelf?: Responsive<CSSPropertyJustifySelf>;
  alignSelf?: Responsive<CSSPropertyAlignSelf>;
  order?: Responsive<string>;
};

/**
 * Flexコンポーネント
 * flexboxの実現に利用する
 */
// Flexコンポーネントのスタイル -------------- toPropvalue関数を使用する
// 与えられたプロパティの値に応じて対応するCSSプロパティと値の文字列が生成される
// (例) alignItemsプロパティに対して　------------ align-itemsというCSSプロパティと値の文字列が生成
// Flexコンポーネント ....... styled(box)関数にFlexPropsを型引数としてわたす
// → スタイルが適用されたBoxコンポーネントとして定義される
const Flex = styled(Box)<FlexProps>`
  ${(props) => toPropValue("align-items", props.alignItems, props.theme)}
  ${(props) => toPropValue("align-content", props.alignContent, props.theme)}
  ${(props) => toPropValue("justify-content", props.justifyContent, props.theme)}
  ${(props) => toPropValue("justify-items", props.justifyItems, props.theme)}
  ${(props) => toPropValue("flex-wrap", props.flexWrap, props.theme)}
  ${(props) => toPropValue("flex-basis", props.flexBasis, props.theme)}
  ${(props) => toPropValue("flex-direction", props.flexDirection, props.theme)}
  ${(props) => toPropValue("flex-grow", props.flexGrow, props.theme)}
  ${(props) => toPropValue("flex-shrink", props.flexShrink, props.theme)}
  ${(props) => toPropValue("justify-self", props.justifySelf, props.theme)}
  ${(props) => toPropValue("align-self", props.alignSelf, props.theme)}
  ${(props) => toPropValue("order", props.order, props.theme)}
`;

//displayプロパティをデフォルトとして定義する1
Flex.defaultProps = {
  display: "flex",
};

export default Flex;
