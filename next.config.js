/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: (() => {
    let compilerConfig = {
      // styledComponentsの有効化
      styledComponents: true,
    };

    if (process.env.NODE_ENV === "production") {
      compilerConfig = {
        ...compilerConfig,
        // 本番環境ではReact Testing Libraryで使用するdata-testid属性を削除
        reactRemoveProperties: { properties: ["^data-testid$"] },
      };
    }

    return compilerConfig;
  })(),
  //NextjsのRewrites機能を使用する旨の記述（　非同期関数として定義 )
  //エンドポイントにリクエスト → json-serverのエンドポイント変換 → リクエスト送信
  async rewrites() {
    //return [配列] ...... rewriteのルールをオブジェクト形式で記述する
    return [
      {
        //二つのプロパティ
        //process.env ------------------------実際の値で環境変数に依存する
        // source ---------- リクエストのマッチングパスを指定
        // 例 : /api/proxy にマッチするリクエストがある場合、destinationで指定された先のパスにリクエスト転送
        source: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/:match*`,
        // destination ---------- リクエストを転送する先のパスを指定
        destination: `http://localhost:8000/:match*`,
      },
    ];
  },
};

module.exports = nextConfig;
