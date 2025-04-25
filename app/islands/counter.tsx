import { useState } from 'hono/jsx'

/**
 * カウンター機能を持つインタラクティブなコンポーネント
 * @description
 * シンプルなカウンターコンポーネント。ボタンクリックでカウントを増加させる。
 * Islands Architectureに基づいてクライアントサイドでインタラクティブに動作する。
 * 
 * @returns {JSX.Element} カウンター値とインクリメントボタンを含むUI要素
 * 
 * @example
 * ```tsx
 * <Counter />
 * ```
 * 
 * @state count - 現在のカウント値（初期値: 0）
 */
export default function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <p class="py-2 text-2xl">{count}</p>
      <button
        class="px-4 py-2 bg-orange-400 text-white rounded cursor-pointer"
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>
    </div>
  )
}
