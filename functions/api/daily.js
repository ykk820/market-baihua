const DAILY_TERMS = [
  {
    term: "殖利率",
    category: "債券",
    plain: "你把錢借出去，換算成年化後大概拿到多少利息。",
    analogy: "像租房子的投報率：房租除以房價，就是這間房子一年大概幫你生多少現金流。",
    risk: "殖利率變高可能是利息變香，也可能是價格下跌或信用風險升高。",
  },
  {
    term: "槓桿",
    category: "風險",
    plain: "用比較小的本金，控制比較大的部位。",
    analogy: "像用千斤頂抬車，很省力，但角度錯了會壓得更重。",
    risk: "槓桿會同時放大獲利和虧損，方向看對也可能因波動太大先被迫出場。",
  },
  {
    term: "保證金",
    category: "期貨",
    plain: "你先放在交易所的押金，證明你有能力履約。",
    analogy: "像租場地先付押金，弄壞或違約時會先從押金扣。",
    risk: "價格不利時押金會被吃掉，不夠就要補，這就是追繳保證金。",
  },
  {
    term: "本益比",
    category: "股票",
    plain: "市場願意用幾年的獲利，買這間公司的股權。",
    analogy: "像買早餐店：你付出的價格，是這間店一年獲利的幾倍。",
    risk: "本益比高不一定貴，但代表期待高；期待落空時，修正也會比較痛。",
  },
  {
    term: "久期",
    category: "債券",
    plain: "債券對利率變動有多敏感的體質。",
    analogy: "像翹翹板的長度，越長，利率一動，價格晃得越大。",
    risk: "長天期債券利息看起來穩，但利率上升時價格波動可能很明顯。",
  },
  {
    term: "通膨",
    category: "總經",
    plain: "同樣的錢，能買到的東西變少了。",
    analogy: "以前一百元能買兩個便當，現在只能買一個半，錢的購買力被稀釋。",
    risk: "通膨太高會逼央行升息，影響企業成本、股價估值和債券價格。",
  },
  {
    term: "流動性",
    category: "市場",
    plain: "你想買賣時，市場有沒有足夠的人接手。",
    analogy: "像夜市熱門攤位，想買想賣都有人；冷門巷子裡可能喊半天沒人理。",
    risk: "流動性差時，價格可能跳很大，停損也不一定能停在你想要的位置。",
  },
];

const DAILY_QUIZZES = [
  {
    question: "央行升息時，舊的低利率債券價格通常會怎樣？",
    options: ["上漲", "下跌", "完全不變"],
    answerIndex: 1,
    explanation: "新債券利率更高，舊債券比較不香，通常要降價才有人買。",
  },
  {
    question: "槓桿最大的問題是什麼？",
    options: ["只會放大獲利", "同時放大獲利與虧損", "可以保證不被追繳"],
    answerIndex: 1,
    explanation: "槓桿不會分辨方向，它只是把結果放大。",
  },
  {
    question: "本益比高一定代表股票很爛嗎？",
    options: ["一定", "不一定，要看成長與風險", "完全不用看"],
    answerIndex: 1,
    explanation: "高本益比可能反映高期待，但也代表市場給錯空間變小。",
  },
];

const RATE_LIMIT = 30;
const WINDOW_SECONDS = 60;
const CACHE_SECONDS = 60 * 60 * 6;

export async function onRequestGet(context) {
  const { request, env, waitUntil } = context;
  const limit = await checkRateLimit(request, env);

  if (!limit.allowed) {
    return jsonResponse(
      {
        error: "rate_limited",
        message: "請稍後再試。這個 API 有訪問限制，用來保護第三方資料額度。",
      },
      429,
      {
        "Retry-After": String(limit.retryAfter),
        "X-RateLimit-Limit": String(RATE_LIMIT),
        "X-RateLimit-Remaining": "0",
      }
    );
  }

  const url = new URL(request.url);
  const today = new Date().toISOString().slice(0, 10);
  const cacheKey = new Request(`${url.origin}/api-cache/daily/${today}`, {
    method: "GET",
  });

  const cached = await caches.default.match(cacheKey);
  if (cached) {
    const payload = await cached.json();
    return jsonResponse(payload, 200, {
      "Cache-Control": "private, no-store",
      "X-API-Cache": "HIT",
      "X-RateLimit-Limit": String(RATE_LIMIT),
      "X-RateLimit-Remaining": String(limit.remaining),
    });
  }

  const payload = await buildDailyPayload(today, env);
  const cacheResponse = jsonResponse(payload, 200, {
    "Cache-Control": `public, max-age=${CACHE_SECONDS}`,
  });

  waitUntil(caches.default.put(cacheKey, cacheResponse));

  return jsonResponse(payload, 200, {
    "Cache-Control": "private, no-store",
    "X-API-Cache": "MISS",
    "X-RateLimit-Limit": String(RATE_LIMIT),
    "X-RateLimit-Remaining": String(limit.remaining),
  });
}

async function buildDailyPayload(today, env) {
  const dayNumber = Math.floor(Date.parse(`${today}T00:00:00Z`) / 86400000);
  const term = DAILY_TERMS[dayNumber % DAILY_TERMS.length];
  const quiz = DAILY_QUIZZES[dayNumber % DAILY_QUIZZES.length];
  const upstream = await fetchOptionalMarketNote(env);

  return {
    date: today,
    source: upstream?.source || "市場白話文內建題庫",
    apiMode: upstream ? "external_cached" : "local_curated",
    dailyTerm: term,
    dailyQuiz: quiz,
    marketNote:
      upstream?.note ||
      "今天先不要急著找答案。先選一個你最常看到、但其實說不清楚的詞，把它翻成一句生活語言。",
    guardrails: {
      perIpLimit: `${RATE_LIMIT} requests / ${WINDOW_SECONDS} seconds`,
      cacheTtlSeconds: CACHE_SECONDS,
      keyExposure: "第三方 API key 僅允許放在 Cloudflare 環境變數，不放前端。",
    },
  };
}

async function fetchOptionalMarketNote(env) {
  if (!env.MARKET_NEWS_API_URL) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2500);

  try {
    const headers = new Headers({ Accept: "application/json" });
    if (env.MARKET_NEWS_API_KEY) {
      headers.set("Authorization", `Bearer ${env.MARKET_NEWS_API_KEY}`);
    }

    const response = await fetch(env.MARKET_NEWS_API_URL, {
      headers,
      signal: controller.signal,
    });

    if (!response.ok) return null;
    const data = await response.json();
    const note = normalizeExternalNote(data);
    if (!note) return null;

    return {
      source: "外部市場資料 API",
      note,
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function normalizeExternalNote(data) {
  if (typeof data?.note === "string") return data.note.slice(0, 180);
  if (typeof data?.title === "string") return `今天市場焦點：${data.title.slice(0, 160)}`;
  if (Array.isArray(data?.articles) && typeof data.articles[0]?.title === "string") {
    return `今天市場焦點：${data.articles[0].title.slice(0, 160)}`;
  }
  if (Array.isArray(data?.data) && typeof data.data[0]?.title === "string") {
    return `今天市場焦點：${data.data[0].title.slice(0, 160)}`;
  }
  return null;
}

async function checkRateLimit(request, env) {
  const ip = request.headers.get("CF-Connecting-IP") || "local";
  const bucket = Math.floor(Date.now() / (WINDOW_SECONDS * 1000));
  const key = `daily:${ip}:${bucket}`;

  if (env.RATE_LIMIT_KV) {
    const current = Number((await env.RATE_LIMIT_KV.get(key)) || "0");
    if (current >= RATE_LIMIT) {
      return { allowed: false, remaining: 0, retryAfter: secondsUntilNextWindow() };
    }
    await env.RATE_LIMIT_KV.put(key, String(current + 1), {
      expirationTtl: WINDOW_SECONDS + 10,
    });
    return {
      allowed: true,
      remaining: Math.max(RATE_LIMIT - current - 1, 0),
      retryAfter: 0,
    };
  }

  globalThis.__marketBaihuaRateLimit ||= new Map();
  const store = globalThis.__marketBaihuaRateLimit;
  const current = store.get(key) || 0;
  if (current >= RATE_LIMIT) {
    return { allowed: false, remaining: 0, retryAfter: secondsUntilNextWindow() };
  }
  store.set(key, current + 1);
  return {
    allowed: true,
    remaining: Math.max(RATE_LIMIT - current - 1, 0),
    retryAfter: 0,
  };
}

function secondsUntilNextWindow() {
  return WINDOW_SECONDS - (Math.floor(Date.now() / 1000) % WINDOW_SECONDS);
}

function jsonResponse(payload, status = 200, headers = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "https://market-baihua.pages.dev",
      "Vary": "Origin",
      ...headers,
    },
  });
}
