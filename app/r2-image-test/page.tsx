export const metadata = {
  title: "R2 Image Test | My Report",
  description: "Cloudflare R2 に置いた画像を Workers 上の Next.js サイトから参照するテスト。",
};

const fallbackImageUrl = "https://pub-73843ad401a7411895fd9806330dcb70.r2.dev/R2_test_image.png";
const imageUrl = process.env.NEXT_PUBLIC_R2_TEST_IMAGE_URL ?? fallbackImageUrl;
const objectKey = "R2_test_image.png";

export default function R2ImageTestPage() {
  return (
    <main className="px-5 py-14 md:px-12 md:py-20 lg:px-24">
      <div className="mb-9 max-w-3xl">
        <p className="mb-3 text-xs font-black uppercase tracking-normal text-amber-700">
          Cloudflare R2 demo
        </p>
        <h1 className="text-4xl font-black tracking-normal text-slate-950 md:text-6xl">
          R2 に置いた画像をサイトから参照するテスト
        </h1>
        <p className="mt-5 text-lg leading-9 text-slate-600">
          Cloudflare R2 にアップロードした <code className="font-bold">{objectKey}</code> を、
          Workers 上で公開している Next.js サイトから読み込む確認ページです。
        </p>
      </div>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          {imageUrl ? (
            <img
              alt="Cloudflare R2 にアップロードしたテスト画像"
              className="h-auto w-full bg-slate-100"
              src={imageUrl}
            />
          ) : (
            <div className="grid min-h-80 place-items-center bg-slate-100 p-8 text-center">
              <div>
                <p className="text-lg font-black text-slate-950">画像 URL が未設定です</p>
                <p className="mt-3 max-w-xl leading-8 text-slate-600">
                  <code className="font-bold">NEXT_PUBLIC_R2_TEST_IMAGE_URL</code> に R2 の公開 URL を設定して
                  ビルドすると、この場所に画像が表示されます。
                </p>
              </div>
            </div>
          )}
        </div>

        <aside className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black tracking-normal text-slate-950">報告メモ</h2>
          <dl className="mt-5 grid gap-5 text-sm leading-7">
            <div>
              <dt className="font-black text-slate-950">確認したこと</dt>
              <dd className="mt-1 text-slate-600">
                R2 に保存した画像を、公開済みの Workers サイトから参照できる構成を用意した。
              </dd>
            </div>
            <div>
              <dt className="font-black text-slate-950">オブジェクト名</dt>
              <dd className="mt-1 text-slate-600">{objectKey}</dd>
            </div>
            <div>
              <dt className="font-black text-slate-950">参照 URL</dt>
              <dd className="mt-1 break-all text-slate-600">
                {imageUrl ?? "NEXT_PUBLIC_R2_TEST_IMAGE_URL is not set"}
              </dd>
            </div>
            <div>
              <dt className="font-black text-slate-950">次に確認すること</dt>
              <dd className="mt-1 text-slate-600">
                独自ドメイン、キャッシュ、非公開バケットから Workers 経由で配信する構成を比較する。
              </dd>
            </div>
          </dl>
        </aside>
      </section>
    </main>
  );
}
