import React, { useRef, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import {CheckBoxOutlineBlankIcon,CheckBoxIcon} from "../../Atoms/IconButton";
import Text from "../../Atoms/Text";
import Flex from "../../layout/Flex";

const CheckBoxElement = styled.input`display: none;`;
const Label = styled.label`
  cursor: pointer;
  margin-left: 4px;
  user-select: none;
`;

export interface CheckBoxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "defaultValue"> {
  label?: string;
}

//checkBox
const CheckBox = (props: CheckBoxProps) => {
  //id = チェックボックス要素のID属性
  //label = チェックボックスのラベルテキスト
  // onchange = チェックボックスの値が変更された時に呼び出されdるコールバック関数
  // checked = チェックボックスの初期状態を表すブール値
  // rest = 上記のプロパティ以外のプロパティ。
  const { id, label, onChange, checked, ...rest } = props;
  //checkBoxの状態を管理する
  const [isChecked, setIsChecked] = useState(checked);
  //HTMLinputElement型の参照作成
  const ref = useRef<HTMLInputElement>(null);
  //コールバック関数
  const onClick = useCallback(
    // マウスクリックが発生した時に実行される
    (e: React.MouseEvent) => {
      // イベントのデフォルト動作をキャンセルする // クリックイベントのページ遷移を防ぐ
      e.preventDefault();
      // チェックボックスを強制的にクリック ---- 現在参照している要素(checkBox)に対してclickメソッド呼び出し
      ref.current?.click();
      //現在の値を反転させる
      setIsChecked((isChecked) => !isChecked);
    },
    // refとsetIsCheckedが変更されたら実行する
    [ref, setIsChecked]
  );
  //checkedが変更された時に呼び出される
  useEffect(() => {
    // パラメータからの変更を受け付ける
    setIsChecked(checked ?? false);
  }, [checked]);
  
  return (
    <>
      {/*  
          CheckBoxElement ------ 実際のチェックボックス要素をレンダリングしている
          {...rest} ------ 他のプロパティをそのままcheckBoxElementに渡す
          ref = {ref} ------ チェックボックス要素にアクセスできるようにしている
          type = "checkBox" ------ チェックボックスタイプ指定
          readOnly={!onchange} ------ onchangeプロパティがない場合にチェックボックスを読み取り専用に
          
      */}
      <CheckBoxElement
        {...rest}
        ref={ref}
        type="checkbox"
        checked={isChecked}
        readOnly={!onChange}
        onChange={onChange}
      />
      <Flex alignItems="center">
        {/* チェックボックスのON/OFFの描画
            checkedがnull,undefindでない場合 ------ checkboxの値に応じてアイコン描画
            それ以外の場合 ...... isCheckedの値に応じてアイコン描画
        */}
        {checked ?? isChecked ? (
            //checkONの場合
            <CheckBoxIcon size={20} onClick={onClick} />
            ) : (
            //checkOFFの場合
            <CheckBoxOutlineBlankIcon size={20} onClick={onClick} />
        )}
        {/* チェックボックスのラベル
            ラベルが存在し、かつ長さが0より大きい場合
            ラベルを描画する
        */}
        {label && label.length > 0 && (
          <Label htmlFor={id} onClick={onClick}>
            <Text>{label}</Text>
          </Label>
        )}
      </Flex>
    </>
  );
};

export default CheckBox;
