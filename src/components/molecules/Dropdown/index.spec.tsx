import {render,screen,act,fireEvent,RenderResult} from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import Dropdown from '.'
import { theme } from '../../../themes'

/*
    ドロップダウンのユニットテストをする
    data-testid属性 ---------- ドロップダウンコンポーネントの子要素に追加する
    → 指定の要素を取得してテストコードからコンポーネント操作ができる
    DropdownControlにdropdown-control
    DropdownOptionにdropdown-optionのdata-testid属性を追加
*/
//テストスイート(dropdown)を作成する
describe("Dropdown",()=>{
  //後で使用する変数
  let renderResult:RenderResult
  let handleChange:jest.Mock
  //各テストケースの前に実行される共通の事前準備を行う
  beforeEach(()=>{
    //モック関数が代入される
    handleChange = jest.fn()
    //renderでテスト対象のドロップダウンコンポーネントをレンダリング
    renderResult = render(
      <ThemeProvider theme={theme}>
        <Dropdown options={[
          {value:"used",label:"中古"},
          {value:"new",label:"新品"}
        ]}
        onChange={handleChange}
        />
      </ThemeProvider>
    )
  })
  afterEach(()=>{
    renderResult.unmount()
  })
  // 個々のテストコースを作成(ファイルがドロップされたらonDropが呼ばれる)
  it("ファイルがドロップされたらonDropが呼ばれる", async()=>{
    //act関数で囲むことでプルダウンを開いているようにDOMが更新されたことを保証する
    //act関数の中で非同期の操作をラップしている ------ マウスダウンイベントをシミュレートしてドロップダウンを開く操作が行われる
    await act(async () => {
      //クリックして、ドロップダウンの選択肢のビュー表示
      //dropdown-controlというdata-testid属性を持つ要素を探している
      const element = await screen.findByTestId("dropdown-control");
      //fireEvent.mouseDown ------ マウスダウンイベントを発生させている ----- optionのプルダウンを開く
      element && fireEvent.mouseDown(element);
    });
    //dropdown-optionというdata-testid属性を持つ要素を探している
    const elements = await screen.getAllByTestId("dropdown-option");
    //fireEvent.click ------ 取得した要素の最初の要素に対してクリックイベントを発生
    elements && fireEvent.click(elements[0]);
    //handleChange関数が1回呼び出されたことを確認している
    expect(handleChange).toHaveBeenCalledTimes(1);
  })
})