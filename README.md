# 市場白話文

一個用白話解釋股票、ETF、期貨、選擇權、債券與總經新聞的金融學習網站。

## 本機預覽

```bash
npm run build
npm run preview
```

## Cloudflare Pages

```bash
npm run deploy
```

## Render Static Site

Render 設定已放在 `render.yaml`。

- Build command: `npm run build`
- Publish directory: `dist`
- Runtime: Static Site

Render 官方部署時，將此 repo 連到 Render，選擇 Blueprint 或 Static Site 即可。

## API 設計

`/api/daily` 目前使用 Cloudflare Pages Functions，包含：

- 每日術語輪替
- 每 IP 訪問限制
- 內部快取保護
- 第三方 API key 僅預留在環境變數使用，不寫入前端
