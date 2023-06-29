import {render,act,screen,fireEvent,RenderResult} from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import SigninForm from '.'
import { theme } from '../../../themes'


//テストスイート作成
describe("SigninForm",()=>{
    let renderResult:RenderResult
    let handleSignin:jest.Mock
    beforeEach(()=>{
        //ダミー関数
        //jest.fn()を使用してhandleSigninを生成する
        handleSignin = jest.fn()
        //SigninFormの引数にhandleSigninを代入する
        renderResult = render(
            <ThemeProvider theme={theme}>
                <SigninForm onSignin={handleSignin} />
            </ThemeProvider>
        )
    })
    afterEach(()=>{
        renderResult.unmount()
    })
    //一つ目のテストケース
    it("ユーザ名とPW入力後、onSignin呼ばれる",async()=>{
      //DoMが更新されることを保証
      //React Hook FormのhandleSubmitが呼ばれるまで待つ
    await act(async () => {
        //ユーザー名入力(getByPlaceholderText ----- input要素を取得)
        const inputUsernameNode = screen.getByPlaceholderText(
            /ユーザー名/
        ) as HTMLInputElement;
        fireEvent.change(inputUsernameNode, { target: { value: "user" } });
        //パスワード入力(getByPlaceholderText ----- input要素を取得)
        const inputPasswordNode = screen.getByPlaceholderText(
            /パスワード/
        ) as HTMLInputElement;
        fireEvent.change(inputPasswordNode, {target: { value: "password" },});
        //サインインボタンのクリック
        fireEvent.click(screen.getByText("サインイン"));
    });
    //handleSigninが呼ばれたことの確認
    expect(handleSignin).toHaveBeenCalledTimes(1);
    })
    //　二つ目のテストケース ...... パスワードを入力しない
    it("ユーザ名入力だけでは、バリデーションエラーでonSigninが呼ばれない",async()=>{
        //DOM更新保証
        //React Hook FormのhandleSubmitが呼ばれるまで待つ
        await act(async()=>{
            //ユーザ名を入力
            const inputUsernameNode = screen.getByPlaceholderText(
                /ユーザー名/,
            ) as HTMLInputElement
            fireEvent.change(inputUsernameNode,{target:{value:"user"}})
            // サインインボタンをクリック
            fireEvent.click(screen.getByText("サインイン"))
        })
        // handleSigninが呼ばれてないことを確認
        expect(handleSignin).toHaveBeenCalledTimes(0)
    })
})