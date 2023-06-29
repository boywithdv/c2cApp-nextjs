import {theme} from "../themes"
import type {ResponsiveProp,Responsive} from "../types"

//AppThemeという型をthemeの型として定義(color,fontSize等々)
export type AppTheme = typeof theme
//themeの異なるプロパティのキーの型を定義している
type SpaceThemeKeys = keyof typeof theme.space
type ColorThemeKeys = keyof typeof theme.colors
type FontSizeThemeKeys = keyof typeof theme.fontSizes
type LetterSpacingThemeKeys = keyof typeof theme.letterSpacings
type LineHeightThemeKeys = keyof typeof theme.lineHeights

//各テーマのキーの型
// Space型 ------ SpaceThemeKeys or 文字列型を表す
export type Space = SpaceThemeKeys | (string&{})
export type Color = ColorThemeKeys | (string&{})
export type FontSize = FontSizeThemeKeys | (string & {})
export type LetterSpacing = LetterSpacingThemeKeys | (string & {})
export type LineHeight = LineHeightThemeKeys | (string & {})

//ブレークポイント --------- ブレイクポイントの名前とその値をキーとしてもつ
const BREAKPOINTS:{[key:string]:string}={
    sm:"640px",
    md:"768px",
    lg:"1024px",
    xl:"1280px"
}
/*
    * Responsive型をCSSプロパティとその値に変換
    * @param propKey ------- CSSプロパティ
    * @param prop ---------- Responsive型
    * @param theme --------- AppTheme
    * @returns ------------- CSSプロパティとその値(ex,background-color:white)
*/
// CSSプロパティ、その値を受け取り　、 themeオブジェクトを使用して値を変換し、
// → CSSプロパティとその値の文字列を返す
// propがResponsive型の場合とそうでない場合の処理
export function toPropValue<T>(propKey:string,prop?:Responsive<T>,theme?:AppTheme){
    //Responsive型出ない場合の処理
    if(prop === undefined )return undefined
    //Responsive型の場合の処理(propがResponsive型の場合の処理)
    if(isResponsivePropType(prop)){
        const result = []
        //ResponsiveKeyを使用して反復処理
        for(const responsiveKey in prop){
            if(responsiveKey === "base"){
                //デフォルトのスタイルならば
                //result.push ---- 追加
                //toThemeValueIfNeeded ---------- テーマの値に変換された値を取得
                result.push(`${propKey}:${toThemeValueIfNeeded(propKey,prop[responsiveKey],theme
                    )};`,
                )
            }else if (responsiveKey === "sm" ||responsiveKey ==="md" || responsiveKey === "lg" || responsiveKey === "xl"){
                //メディアクエリでのスタイル
                const breakpoint = BREAKPOINTS[responsiveKey]
                const style = `${propKey}:${toThemeValueIfNeeded(propKey,prop[responsiveKey],theme)}`
                result.push(`@media screen and (min-width:${breakpoint}){${style}}`)
            }
        }
        //resultの配列を改行文字で結合して文字列に変換
        return result.join('\n')
    }
    //propがResponsive型でない場合の処理
    // ; ---- これがついていないと動作しない
    return `${propKey}:${toThemeValueIfNeeded(propKey,prop,theme)};`
}
// セットを定義 ------  テーマの各プロパティに対応するCSSプロパティのキーを格納する
const SPACE_KEYS = new Set([
  "margin",
  "margin-top",
  "margin-left",
  "margin-bottom",
  "margin-right",
  "padding",
  "padding-top",
  "padding-left",
  "padding-bottom",
  "padding-right",
]);
const COLOR_KEYS = new Set(['color','background-color'])
const FONT_SIZE_KEYS = new Set(['font-size'])
const LETTER_SPACING_KEYS = new Set(['letter-spacing'])
const LINE_HEIGHT_KEYS = new Set(['line-height'])

/*
    * Themeに指定されたCSSプロパティの値に変換
    * @param propKey ----- CSSプロパティ
    * @param value ------- CSSプロパティの値
    * @param theme ------- AppTheme
    * @returns ----------- CSSプロパティの値
*/
// toThemeValueIfNeeded関数 -------------- 指定されたCSSプロパティと値をテーマの値に変換する
// 与えられたプリパティが特定のキーに該当するかどうかをチェックし、該当する場合ばテーマの値を返す
function toThemeValueIfNeeded<T>(propKey:string,value:T,theme?:AppTheme){
    if(theme && theme.space && SPACE_KEYS.has(propKey) && isSpaceThemeKeys(value,theme)){
        return theme.space[value]
    }else if(theme && theme.colors && COLOR_KEYS.has(propKey) && isColorThemeKeys(value,theme)){
        return theme.colors[value]
    }else if(theme && theme.fontSizes && FONT_SIZE_KEYS.has(propKey) && isFontSizeThemeKeys(value,theme)){
        return theme.fontSizes[value]
    }else if(theme && theme.letterSpacings && LETTER_SPACING_KEYS.has(propKey) && isLetterSpacingThemeKeys(value,theme)){
        return theme.letterSpacings[value]
    }else if(theme && theme.lineHeights && LINE_HEIGHT_KEYS.has(propKey) && isLineHeightThemeKeys(value,theme)){
        return theme.lineHeights[value]
    }
    return value
}

// isResponsivePropType関数 ----------------- 与えられたプロパティがResponsiveProp型であるかチェック
//true　or false
function isResponsivePropType<T>(prop:any):prop is ResponsiveProp<T>{
    return(
        prop&&(
            prop.base !== undefined ||
            prop.sm !== undefined ||
            prop.md !== undefined ||
            prop.lg !== undefined ||
            prop.xl !== undefined
        )
    )
}

// is〇〇ThemeKeys関数 ------------- 各テーマのキーの型をチェックするためのヘルパー関数
// 与えられたプロパティがテーマのキーに該当するかどうかを確認する
function isSpaceThemeKeys(prop:any,theme:AppTheme):prop is SpaceThemeKeys{
    return Object.keys(theme.space).filter((key)=>key==prop).length > 0
}
function isColorThemeKeys(prop:any,theme:AppTheme):prop is ColorThemeKeys{
    return Object.keys(theme.colors).filter((key)=>key==prop).length > 0
}
function isFontSizeThemeKeys(prop:any,theme:AppTheme):prop is FontSizeThemeKeys{
    return Object.keys(theme.fontSizes).filter((key)=>key==prop).length > 0
}
function isLetterSpacingThemeKeys(prop:any,theme:AppTheme):prop is LetterSpacingThemeKeys{
    return Object.keys(theme.letterSpacings).filter((key)=>key==prop).length > 0
}
function isLineHeightThemeKeys(prop:any,theme:AppTheme):prop is LineHeightThemeKeys{
    return Object.keys(theme.lineHeights).filter((key)=>key==prop).length > 0
}