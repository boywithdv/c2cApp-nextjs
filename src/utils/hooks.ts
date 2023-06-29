import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuthContext } from '../contexts/AuthContext'

//認証のガードを行う
/**
 * 特定のページやコンポーネントが認証されているか確認
 * 未認証の場合、適切な処理を実行する
 * 
 */
export const useAuthGuard = (): void => {
  const router = useRouter()
  const { authUser, isLoading } = useAuthContext()

  useEffect(() => {
    // ユーザーが取得できない場合はサインインページにリダイレクト
    if (!authUser && !isLoading) {
      const currentPath = router.pathname
      router.push({
        pathname: '/signin',
        query: {
          //query
          redirect_to: currentPath,
        },
      })
    }
  }, [router, authUser, isLoading])
}
