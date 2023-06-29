//SigninFormに対してユーザ名・パスワード入力情報から認証APIをコールし
//結果 => onSigninイベントハンドラに返される
import SigninForm from '../components/organisms/SigninForm'
import { useAuthContext } from '../contexts/AuthContext'
import { useGlobalSpinnerActionsContext } from '../contexts/GlobalSpinnerContext'

interface SigninFormContainerProps {
  /**
   * サインインした時に呼ばれるイベントハンドラ
   */
  //onSigninプロパティを受け取るために使用される
  //サインインが成功した際に呼び出されるコールバック関数
  onSignin: (error?: Error) => void
}

/**
 * サインインフォームコンテナ
 */
const SigninFormContainer = ({ onSignin }: SigninFormContainerProps) => {
  //useAuthCOntexxtのsignin関数を受け取る
  const { signin } = useAuthContext()
  const setGlobalSpinner = useGlobalSpinnerActionsContext()
  // サインインボタンを押された時のイベントハンドラ
  const handleSignin = async (username: string, password: string) => {
    try {
      // ローディングスピナーを表示する
      setGlobalSpinner(true)
      //api認証コール
      await signin(username, password)
      //onSigninがundefined,nullでない場合のみ関数が実行される
      // onSignin関数が定義されている場合、onSignin()を呼び出す
      //Signin後の処理を実行する
      onSignin && onSignin()
      console.log("username : ",username,"password : ",password)
    } catch (err: unknown) {
      if (err instanceof Error) {
        // エラーの内容を表示
        window.alert(err.message)
        onSignin && onSignin(err)
      }
    } finally {
      //ローディングスピナーを非表示にする
      setGlobalSpinner(false)
    }
  }
  //signinFormをレンダリングし、handleSignin関数をonSigninプロパティとして渡す
  return <SigninForm onSignin={handleSignin} />
}

export default SigninFormContainer
