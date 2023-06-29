import React, { useEffect, useState, useRef, useCallback } from 'react'
import styled from 'styled-components'
import Text from '../../Atoms/Text'
import Flex from "../../layout/Flex";

const DropdownRoot = styled.div`
  position: relative;
  height: 38px;
`

// ドロップダウン外観
const DropdownControl = styled.div<{ hasError?: boolean }>`
  position: relative;
  overflow: hidden;
  background-color: #ffffff;
  border: ${({ theme, hasError }) =>
    hasError
    //trueの場合
      ? `1px solid ${theme.colors.danger}`
      //falseの場合
      : `1px solid ${theme.colors.border}`};
  border-radius: 5px;
  box-sizing: border-box;
  cursor: default;
  outline: none;
  padding: 8px 52px 8px 12px;
`

const DropdownValue = styled.div`
  color: ${({ theme }) => theme.colors.text};
`

// ドロップダウンプレースホルダー
const DropdownPlaceholder = styled.div`
  color: #757575;
  font-size: ${({ theme }) => theme.fontSizes[1]};
  min-height: 20px;
  line-height: 20px;
`

// ドロップダウンの矢印の外観
const DropdownArrow = styled.div<{ isOpen?: boolean }>`
  border-color: ${({ isOpen }) =>
    isOpen
        //trueの場合
      ? 'transparent transparent #222222;'
        // falseの場合
      : '#222222 transparent transparent'};
  border-width: ${({ isOpen }) => (isOpen ? '0 5px 5px' : '5px 5px 0;')};
  border-style: solid;
  content: ' ';
  display: block;
  height: 0;
  margin-top: -ceil(2.5);
  position: absolute;
  right: 10px;
  top: 16px;
  width: 0;
`

const DropdownMenu = styled.div`
  background-color: #ffffff;
  border: ${({ theme }) => theme.colors.border};
  box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
    0px 8px 10px 1px rgb(0 0 0 / 10%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
  box-sizing: border-box;
  border-radius: 5px;
  margin-top: -1px;
  max-height: 200px;
  overflow-y: auto;
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 1000;
`

const DropdownOption = styled.div`
  padding: 8px 12px 8px 12px;
  &:hover {
    background-color: #f9f9f9;
  }
`

interface DropdownItemProps {
  item: DropdownItem
}

const DropdownItem = (props: DropdownItemProps) => {
  const { item } = props

  return (
    <Flex alignItems="center">
      <Text margin={0} variant="small">
        {item.label ?? item.value}
      </Text>
    </Flex>
  )
}

export interface DropdownItem {
  value: string | number | null |undefined
  label?: string
}

interface DropdownProps {
  /**
   * ドロップダウンの選択肢
   */
  options: DropdownItem[]
  /**
   * ドロップダウンの値
   */
  value?: string | number
  /**
   * <input />のname属性
   */
  name?: string
  /**
   * プレースホルダー
   */
  placeholder?: string
  /**
   * バリデーションエラーフラグ
   */
  hasError?: boolean
  /**
   * 値が変化した時のイベントハンドラ
   */
  onChange?: (selected?: DropdownItem) => void
}

/**
 * ドロップダウン
 */
const Dropdown = (props: DropdownProps) => {
  //dropdownProps型のプロパティを受け取る
  const { onChange, name, value, options, hasError } = props
  // options配列から valueプロパティがvalueと一致する最初の要素を見つける
  const initialItem = options.find((i) => i.value === value)
  // 状態変数
  const [isOpen, setIsOpenValue] = useState(false)
  // 初期値はvalueと一致する最初の要素
  const [selectedItem, setSelectedItem] = useState(initialItem)
  // 参照オブジェクト作成 
  const dropdownRef = useRef<HTMLDivElement>(null)
  // コールバック関数
  const handleDocumentClick = useCallback(
    //マウス操作かタッチ操作がなされた場合の処理
    (e: MouseEvent | TouchEvent) => {
      // 自分自身をクリックした場合は何もしない
      if (dropdownRef.current) {
        //クリックイベントのターゲットがdropdownRef.current内の要素であるか確認
        const elems = dropdownRef.current.querySelectorAll('*')
        for (let i = 0; i < elems.length; i++) {
          if (elems[i] == e.target) {
            return
          }
        }
      }
      //ターゲットがdropdownRef.current内の要素でない場合、isOpenの状態をfalseに設定
      setIsOpenValue(false)
    },
    [dropdownRef],
  )
  
  // マウスのダウンイベントが発生した場合に呼び出される
  const handleMouseDown = (e: React.SyntheticEvent) => 
  {
    //isOpenを反転させる
    setIsOpenValue((isOpen) => !isOpen)
    //イベントバブリング停止
    e.stopPropagation()
  }

  // 値の選択が行われたときに呼び出される
  const handleSelectValue = (e: React.FormEvent<HTMLDivElement>,item: DropdownItem,) => 
  {
    //イベントバブリング停止
    e.stopPropagation()
    //選択されたアイテムを設定する
    setSelectedItem(item)
    //isOpenの状態をfalseにする
    setIsOpenValue(false)
    // onChangeが存在する場合、選択されたアイテムを引数として呼び出す
    onChange && onChange(item)
  }
  //コンポーネントマウント時、初回レンダリングに実行
  useEffect(() => {
    // 画面外のクリックとタッチをイベントを設定
    document.addEventListener('click', handleDocumentClick, false)
    document.addEventListener('touchend', handleDocumentClick, false)
    // クリーンアップ関数 ------ コンポーネントがアンマウントされるときに登録したイベントリスナーを削除する関数
    return function cleanup() {
      document.removeEventListener('click', handleDocumentClick, false)
      document.removeEventListener('touchend', handleDocumentClick, false)
    }
  }, [])
  return (
    //DropdownRootコンポーネントにdropdownRefを参照して渡してレンダリング
    <DropdownRoot ref={dropdownRef}>
      <DropdownControl
        hasError={hasError}
        onMouseDown={handleMouseDown}
        onTouchEnd={handleMouseDown}
        data-testid="dropdown-control"
      >
        {/* selectedItemが存在する場合 */}
        {selectedItem && (
          <DropdownValue>
            <DropdownItem item={selectedItem} />
          </DropdownValue>
        )}
        {/* 何も選択されてない時はプレースホルダーを表示 */}
        {!selectedItem && (
          <DropdownPlaceholder>{props?.placeholder}</DropdownPlaceholder>
        )}
        {/* ダミーinput */}
        <input
          type="hidden"
          name={name}
          value={selectedItem?.value ?? ''}
          onChange={() => onChange && onChange(selectedItem)}
        />
        <DropdownArrow isOpen={isOpen} />
      </DropdownControl>
      {/* ドロップダウンを表示 */}
      {isOpen && (
        <DropdownMenu>
          {props.options.map((item, idx) => (
            <DropdownOption
              key={idx}
              onMouseDown={(e) => handleSelectValue(e, item)}
              onClick={(e) => handleSelectValue(e, item)}
              data-testid="dropdown-option"
            >
              <DropdownItem item={item} />
            </DropdownOption>
          ))}
        </DropdownMenu>
      )}
    </DropdownRoot>
  )
}

export default Dropdown
