// ヘッダーコンポーネントの子要素(ShapeImage、BadgeWrapper) ---- data-testid属性を追加している
import { render, screen, RenderResult } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import Header from '.'
import { AuthContextProvider } from '../../../contexts/AuthContext'
import { theme } from '../../../themes'
import type { User, Product } from '../../../types'

//ShoppingCartContextのモックを作成する
jest.mock("../../../contexts/ShoppingCartContext")
import { useShoppingCartContext } from '../../../contexts/ShoppingCartContext'

//オリジナルのShoppingCartContextProviderを取得
const {ShoppingCartContextProvider} = jest.requireActual(
  "../../../contexts/ShoppingCartContext"
)

//ダミーユーザーを作成
const authUser:User = {
  id:1,
  username:"dummy",
  displayName:"Jukiya Tsukuda",
  email:"test@example.com",
  profileImageUrl:"/images/sample/1.jpg",
  description:""
}
//ダミー商品作成
const product:Product = {
  id: 1,
  category: 'book',
  title: 'Product',
  description: '',
  imageUrl: '/images/sample/1.jpg',
  blurDataUrl: '',
  price: 1000,
  condition: 'used',
  owner:authUser
}

describe("Header",()=>{
  let renderResult:RenderResult
  const useShoppingCartContextMock =
    useShoppingCartContext as jest.MockedFunction<typeof useShoppingCartContext>
  // テストケース ------ カートに商品があるときにバッジが表示されているかを確認
  it("カートに商品が存在する",async()=>{
    // mockReturnValue() ----- ShoppingCartContextの初期状態を操作し、カートに商品が一つ存在するようにする
    useShoppingCartContextMock.mockReturnValue({
      //一つ商品があるようにする
      cart: [product],
      // useShoppingCartContextカスタムフックから返されるオブジェクト内のaddProductToCart関数のモック
      // カートに商品を追加するための機能をシミュレートする
      addProductToCart: () => {},
      removeProductFromCart: () => {},
    });
    // render関数でHeaderコンポーネントをコンテキストとともにレンダリング。
    renderResult = render(
      <ThemeProvider theme={theme}>
        <ShoppingCartContextProvider>
          <AuthContextProvider
            authUser={authUser}
            context={{ apiRootUrl: "https://dummy" }}
          />
          <Header />
        </ShoppingCartContextProvider>
      </ThemeProvider>
    );
    // screen.getAllByTestId("badge-wrapper")を使ってバッジの要素が存在することを確認する
    expect(screen.getAllByTestId("badge-wrapper").length).toBeGreaterThan(0);
    //結果の解除をする
    renderResult.unmount();
    //リセットをする
    useShoppingCartContextMock.mockReset();
  })
  //サインインしていない場合のテストケース
  it("未サインイン",async()=>{
    // 再度初期状態を操作する
    useShoppingCartContextMock.mockReturnValue({
      cart: [],
      addProductToCart: () => {},
      removeProductFromCart: () => {},
    });
    //結果を格納する
    renderResult = render(
      <ThemeProvider theme={theme}>
        <ShoppingCartContextProvider>
          <AuthContextProvider context={{ apiRootUrl: "https://dummy" }}>
            <Header />
          </AuthContextProvider>
        </ShoppingCartContextProvider>
      </ThemeProvider>
    );
    //サインインしていない
    // screen.getAllByTestId("profile-shape-image")が存在しないことを確認
    expect(screen.queryByTestId("profile-shape-image")).toBeNull();
    //カートが空であることを確認
    expect(screen.queryByTestId("badge-wrapper")).toBeNull();
    renderResult.unmount();
    useShoppingCartContextMock.mockReset();
  })
})