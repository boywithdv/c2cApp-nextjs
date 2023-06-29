import { render, screen, fireEvent, RenderResult } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import Dropzone from '.'
import { theme } from '../../../themes'

/**
 * ドロップゾーンのユニットテスト
 * data-testid属性をDropzoneの子要素(DropzoneRoot)に追加する
 */
//テストスイートを作成する
describe("Dropzone",()=>{
  let renderResult:RenderResult
  //jest.MockでhandleDropを生成する
  let handleDrop:jest.Mock
  //
  beforeEach(()=>{
    handleDrop = jest.fn()
    renderResult = render(
      <ThemeProvider theme={theme}>
        {/* handleDropを引数として渡す */}
        <Dropzone onDrop={handleDrop} />
      </ThemeProvider>
    )
  })
  afterEach(()=>{
    renderResult.unmount()
  })
  //テストケースの「ファイルがドロップされたらonDropが呼ばれる」　---------- fireEvent.Dropでファイルをドロップした際、handleDropが呼ばれることを確認する
  //テストケースで使用するDropdownの子要素 ----- screen.findByTestId("dropzone") で検索し。取得
  it("ファイルがドロップされたらonDropが呼ばれる",async()=>{
    //ファイルドロップを取得
    const element = await screen.findByTestId("dropzone")
    fireEvent.drop(element, {
      dataTransfer: {
        files: [new File(["(⌐□_□)"],"chucknorris.png",{type:"image/png"})],
      },
    });
    //ファイルが入力されたか確認
    expect(handleDrop).toHaveBeenCalledTimes(1)
  })
})