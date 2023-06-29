//商品投稿フォームのテスト
import {render,act,screen,fireEvent,RenderResult} from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import ProductForm from '.'
import { theme } from '../../../themes'

// テストのグループを作成する
describe("ProductForm",()=>{
    // render関数の呼び出し結果を格納するためのへんす
    let renderResult:RenderResult
    // 特定の振る舞いを制御。呼び出し情報を記述するために使用される
    let handleProductSave:jest.Mock
    // グローバルなオブジェクトであるURLのcreateObjectURLメソッドをモック化している
    //createObjectURL ------ URLオブジェクトによって提供されるものであり、一時的なURLを生成する
    global.URL.createObjectURL = () => "https://test.com"
    beforeEach(()=>{
        //handleProductSave関数をモック化する --------- どのように呼び出されているか検証することができる
        handleProductSave = jest.fn()
        // renderResultに情報を格納する
        renderResult = render(
            <ThemeProvider theme={theme}>
                <ProductForm onProductSave={handleProductSave} />
            </ThemeProvider>
        )
    })
    //マウント解除
    afterEach(()=>{
        renderResult.unmount()
    })
    // 一つ目のテストケース
    // it(async) ------ 非同期の操作が発生する場所での待機が可能になる
    it("フォーム入力後、onProductSaveが呼ばれる",async()=>{
        //DOMが更新されることを保証、React Hook FormのhandleSubmitが呼ばれる
        // awaitキーワードl ...... itの第二引数が完了を待機するために使用する
        await act(async()=>{
            //商品画像入力 ----------- これが非同期操作である 
            const element = await screen.findByTestId("dropzone")
            //商品画像入力
            fireEvent.drop(element, {
              dataTransfer: {
                files: [new File(["(⌐□_□)"],"chucknorris.png",{type:"image/png"})],
              },
            });
            //商品タイトルを入力
            const inputUsernameNode = screen.getByPlaceholderText(
                /商品のタイトル/,
            ) as HTMLInputElement
            fireEvent.change(inputUsernameNode,{target:{value:"商品"}})

            //商品情報を入力
            const inputPasswordNode = screen.getByPlaceholderText(
                /最高の商品です/,
            ) as HTMLInputElement
            fireEvent.change(inputPasswordNode,{target:{value:"テキストテスト"}})

            //価格を入力
            const inputPriceNode = screen.getByPlaceholderText(
                /100/,
            ) as HTMLInputElement
            fireEvent.change(inputPriceNode,{target:{value:"100"}})
            
            //出品ボタンをクリック
            fireEvent.click(screen.getByText("出品"))
        })
        //handleProductSaveが呼ばれていることをかくにん
        expect(handleProductSave).toHaveBeenCalledTimes(1)
    })
    it("商品タイトル入力だけではバリデーションエラーでonProductSaveが呼ばれない",async()=>{
        //domが更新されることを保証
        //react Hook FormのhandleSubmit呼ばれる
        await act(async()=>{
            //商品タイトル入力
            const inputUsernameNode = screen.getByPlaceholderText(
                /商品のタイトル/
            ) as HTMLInputElement
            fireEvent.change(inputUsernameNode,{target:{value:"商品"}})
            //出品ボタンクリック
            fireEvent.click(screen.getByText("出品"))
        })
        //handleProductSaveが呼ばれていないことを確認
        expect(handleProductSave).toHaveBeenCalledTimes(0)
    })

})