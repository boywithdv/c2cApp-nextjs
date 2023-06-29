//　非同期関数のfetcherをエクスポートする
// 外部リソースに対してHTTPリクエストを行い、レスポンスを取得する

//非同期関数として利用するため, asyncを利用する
export const fetcher = async(
    // resourceパラメータ　： リクエスト対象のリソースを指定するための引数
    // RequestInfo ---------- URLの文字列、Requestオブジェクトを受け入れる
    resource:RequestInfo,
    // initパラメータ : リクエストの設定を指定するための引数
    init?:RequestInit,
    // Promise<any> =>{} : Promiseオブジェクトを返すことが宣言されている
    // 返される値 => any型
    // レスポンスのJSONデータを表すであろうデータ型が利用される
):Promise<any> =>{
    // fetch() --------- 指定されたリソースに対して非同期でHTTPリクエストを送信 .... レスポンス取得
    // fetch() ...... Promiseを返す ---- waitキーワードを利用して非同期の処理を待機する
    // const res <= レスポンスが代入されdる
    const res = await fetch(resource,init)
    // okプロパティがfalseの場合の処理
    if(!res.ok){
        //レスポンスが失敗が失敗した時に例外を投げる
        const errorRes = await res.json()
        const error = new Error(errorRes.message ?? "APIリクエスト中にエラーが発生しました。")
        throw error
    }
    //レスポンスのJSONデータを非同期で取得 ------ その結果を返す
    return res.json()
}