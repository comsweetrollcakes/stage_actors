import { createRoute } from 'honox/factory'

/**
 * インデックスページのルートハンドラー
 * @description
 * トップページの表示を行うルートハンドラー。
 * 
 * @param {Context} c - Honoのコンテキストオブジェクト
 * @returns {Promise<Response>} レンダリングされたHTMLレスポンス
 */
export default createRoute((c) => {
  return c.render(
    <div className="container">
      <header>
        <h1>注目の役者と舞台</h1>
      </header>

      <main>
        <section className="info-card actor-info">
          <div className="actor-image">
            <img src="https://via.placeholder.com/150" alt="役者の写真" />
          </div>
          <div className="actor-details">
            <h2>山田 太郎</h2>
            <p className="role">主演俳優</p>
            <p className="profile">
              東京都出身。数々の映画やドラマで活躍し、その確かな演技力で多くの観客を魅了している。近年は舞台にも積極的に挑戦し、新たな一面を見せている。
            </p>
            <div className="social-links">
              <a href="#" target="_blank" title="公式サイト">公式サイト</a>
              <a href="#" target="_blank" title="X (旧Twitter)">X</a>
            </div>
          </div>
        </section>

        <section className="info-card stage-info">
          <div className="stage-details">
            <h3>舞台『夢幻の彼方へ』</h3>
            <p className="schedule"><strong>公演期間:</strong> 2025年5月10日 - 5月25日</p>
            <p className="venue"><strong>劇場:</strong> 東京芸術劇場 シアターイースト</p>
            <h4>あらすじ</h4>
            <p>
              時空を超えた愛と冒険の物語。主人公は失われた記憶を求め、幻想的な世界へと旅立つ。そこで待ち受ける運命とは...。山田太郎が演じる主人公の葛藤と成長を描く。
            </p>
            <a href="#" className="ticket-link" target="_blank">チケット情報はこちら</a>
          </div>
          <div className="stage-visual">
            <img src="https://via.placeholder.com/300x200" alt="舞台のビジュアル" />
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2025 舞台制作委員会</p>
      </footer>
    </div>
  )
})
