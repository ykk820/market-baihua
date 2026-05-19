const levelContent = {
  beginner: {
    title: "先約好未來價格",
    body:
      "想像你跟早餐店老闆說：下個月雞蛋不管漲到多少，我都用今天講好的價格買。如果雞蛋大漲，你省到；如果雞蛋變便宜，你就買貴了。",
    bullets: ["重點：期貨是未來交易的約定。", "風險：價格走反，虧損會很快放大。"],
  },
  intermediate: {
    title: "保證金讓小錢控制大部位",
    body:
      "期貨不用先付出合約全部價值，而是先放一筆保證金。這讓資金效率變高，也讓虧損速度變快。",
    bullets: ["重點：槓桿來自保證金制度。", "風險：保證金不足時，可能被追繳或強制平倉。"],
  },
  advanced: {
    title: "它可以投機，也可以避險",
    body:
      "生產者、進口商與基金經理人常用期貨鎖住價格或調整曝險。高手看的不是方向而已，還包含基差、轉倉成本與波動度。",
    bullets: ["重點：期貨價格會受現貨、利率、倉儲與市場預期影響。", "風險：流動性、跳空與模型假設都會讓避險失準。"],
  },
};

const terms = [
  {
    term: "股票",
    category: "stock",
    label: "股票",
    plain: "買下一間公司的一小塊所有權。",
    detail: "你賺的是公司變好、盈餘增加，或市場願意用更高價格買這小塊所有權。",
    earn: "公司獲利成長、配息、估值提高。",
    lose: "獲利衰退、估值下修、產業逆風。",
    pitfall: "股價上漲不等於公司一定變好，有時只是市場情緒變熱。",
    sentence: "股票不是彩券，是你用價格買一間公司的未來。",
  },
  {
    term: "ETF",
    category: "stock",
    label: "股票",
    plain: "一籃股票或債券打包成一個商品。",
    detail: "你不用自己買很多檔標的，透過 ETF 就能一次取得一組市場曝險。",
    earn: "標的資產上漲、配息、長期分散。",
    lose: "市場整體下跌、追高熱門主題、折溢價或追蹤誤差。",
    pitfall: "ETF 分散的是單一公司風險，不代表完全沒有市場風險。",
    sentence: "ETF 像便當，不用自己煮每一道菜，但仍要知道裡面裝什麼。",
  },
  {
    term: "本益比",
    category: "stock",
    label: "股票",
    plain: "市場願意花幾年的獲利買這家公司。",
    detail: "本益比高不一定貴，但代表市場對未來期待高，失望時也容易跌得重。",
    earn: "公司成長比市場預期更好，本益比或盈餘一起上升。",
    lose: "盈餘下修或市場不願再給高估值。",
    pitfall: "只看本益比低就買，可能買到正在衰退的公司。",
    sentence: "本益比是在問：你付的價格，值不值得等這家公司慢慢賺回來。",
  },
  {
    term: "股息殖利率",
    category: "stock",
    label: "股票",
    plain: "用股息除以股價，估一年大概領多少現金回來。",
    detail: "它看起來像利息，但股息不是保證，股價也會波動。",
    earn: "公司穩定配息，加上股價沒有大幅下跌。",
    lose: "公司砍息，或高股息其實來自股價大跌。",
    pitfall: "殖利率高不一定是好事，可能是市場先聞到壞消息。",
    sentence: "高股息要問兩件事：配得出來嗎？配完公司還能長大嗎？",
  },
  {
    term: "自由現金流",
    category: "stock",
    label: "股票",
    plain: "公司付完必要開銷後，真正剩下能自由運用的錢。",
    detail: "有獲利不代表有現金，自由現金流能看公司賺錢品質。",
    earn: "現金流穩定，能還債、配息、買回股票或再投資。",
    lose: "帳面獲利漂亮，但應收帳款高、資本支出大，現金留不住。",
    pitfall: "只看 EPS 可能忽略公司其實很缺現金。",
    sentence: "獲利像成績單，現金流像口袋裡真的有沒有錢。",
  },
  {
    term: "期貨",
    category: "futures",
    label: "期貨",
    plain: "今天先約好未來某天用某個價格交易。",
    detail: "它常被用來避險，也常被拿來槓桿交易，所以風險管理比猜方向更重要。",
    earn: "方向判斷正確，或用來鎖住未來價格降低不確定性。",
    lose: "價格反向、保證金不足、流動性不足或跳空。",
    pitfall: "期貨不是小資版股票，它的虧損速度完全不同。",
    sentence: "期貨先問保證金和停損，再問方向。",
  },
  {
    term: "保證金",
    category: "futures",
    label: "期貨",
    plain: "你先放在桌上的押金，證明你有能力履約。",
    detail: "價格不利時押金會被吃掉，不夠就要補錢，這就是追繳保證金。",
    earn: "用較少本金取得較大曝險，提高資金效率。",
    lose: "市場短期劇烈波動時，被迫補錢或平倉。",
    pitfall: "保證金不是最大虧損，它只是入場門票。",
    sentence: "看到保證金，腦中要自動翻譯成槓桿。",
  },
  {
    term: "選擇權",
    category: "futures",
    label: "期貨",
    plain: "買一張未來可以選擇要不要交易的權利。",
    detail: "買方付權利金，賣方收權利金但承擔履約風險。",
    earn: "方向、時間和波動率判斷對，或用來保護部位。",
    lose: "時間價值流失、波動率下降，或賣方遇到大行情。",
    pitfall: "買方虧損有限不代表容易賺；賣方勝率高不代表安全。",
    sentence: "選擇權不是只猜漲跌，還要猜時間和波動。",
  },
  {
    term: "權利金",
    category: "futures",
    label: "期貨",
    plain: "買選擇權這張權利要付的價格。",
    detail: "權利金會受標的價格、履約價、到期時間和波動率影響。",
    earn: "買方希望權利金變貴，賣方希望權利金慢慢歸零。",
    lose: "買方最怕時間耗損，賣方最怕行情大幅穿越履約價。",
    pitfall: "便宜的權利金常常代表機率也低。",
    sentence: "權利金像保費，便宜不一定划算，貴也不一定浪費。",
  },
  {
    term: "債券",
    category: "bond",
    label: "債券",
    plain: "你當銀行，把錢借給政府或公司，對方付你利息。",
    detail: "債券不是完全不會跌；利率、信用狀況和到期時間都會影響價格。",
    earn: "收利息、利率下降帶來價格上漲、信用狀況改善。",
    lose: "利率上升、發行人違約、信用利差擴大。",
    pitfall: "債券穩的是現金流邏輯，不是每天價格都不動。",
    sentence: "買債券前先問：借給誰？借多久？利率夠補風險嗎？",
  },
  {
    term: "殖利率",
    category: "bond",
    label: "債券",
    plain: "你買這張債券，換算成年化後大概能拿多少報酬。",
    detail: "殖利率上升可能是利息更香，也可能是價格下跌或信用風險升高。",
    earn: "利息收入高於承擔的風險。",
    lose: "看似高殖利率其實是市場在反映違約疑慮。",
    pitfall: "不要把高殖利率自動翻譯成高安全。",
    sentence: "殖利率是報酬，也是市場要求你承擔風險的價碼。",
  },
  {
    term: "久期",
    category: "bond",
    label: "債券",
    plain: "債券對利率變動有多敏感的體質。",
    detail: "久期越長，利率一變，債券價格通常晃得越大。",
    earn: "利率下降時，長久期債券價格通常上漲較多。",
    lose: "利率上升時，長久期債券跌幅通常較明顯。",
    pitfall: "長天期不等於比較安全，它對利率更敏感。",
    sentence: "久期像翹翹板長度，越長越容易被利率撬動。",
  },
  {
    term: "信用利差",
    category: "bond",
    label: "債券",
    plain: "市場要求公司債比公債多付多少利息。",
    detail: "利差變大，代表市場覺得風險變高；利差變小，代表風險胃納改善。",
    earn: "信用狀況改善，利差縮小，債券價格上漲。",
    lose: "景氣轉弱或公司財務惡化，利差擴大。",
    pitfall: "公司債殖利率高，常常是因為市場要求風險補償。",
    sentence: "信用利差是市場對借款人信任程度的溫度計。",
  },
  {
    term: "通膨",
    category: "macro",
    label: "總經",
    plain: "同樣的錢，能買到的東西變少了。",
    detail: "通膨太高時，央行可能升息壓需求，市場估值和借錢成本都會受影響。",
    earn: "持有能調價或受惠商品價格上漲的資產。",
    lose: "現金購買力下降，長天期債券和高估值股票承壓。",
    pitfall: "通膨下降不等於物價變便宜，只是漲得比較慢。",
    sentence: "通膨不是新聞數字，是你錢包的購買力變薄。",
  },
  {
    term: "升息",
    category: "macro",
    label: "總經",
    plain: "央行把借錢成本調高。",
    detail: "升息通常是為了壓通膨或讓經濟降溫，但會影響股債匯房各種資產。",
    earn: "短天期利率商品收益變高，金融股可能受惠利差。",
    lose: "高負債公司、長久期債券、高估值股票壓力上升。",
    pitfall: "升息不一定股市立刻跌，市場常提前反應。",
    sentence: "升息是在提醒市場：錢不再那麼便宜。",
  },
  {
    term: "殖利率曲線",
    category: "macro",
    label: "總經",
    plain: "不同借錢期限各自要付多少利息的一條線。",
    detail: "曲線形狀會反映市場對景氣、通膨和央行政策的期待。",
    earn: "看懂短長利率差，有助判斷景氣與債券配置。",
    lose: "只看單一利率，忽略市場對未來的整體定價。",
    pitfall: "倒掛不是衰退保證書，但它是市場的警訊。",
    sentence: "殖利率曲線像市場對未來景氣的心電圖。",
  },
  {
    term: "匯率",
    category: "macro",
    label: "總經",
    plain: "一種貨幣換另一種貨幣的價格。",
    detail: "匯率受利差、資金流、貿易、風險情緒和央行政策影響。",
    earn: "持有升值貨幣或受惠匯率的公司。",
    lose: "海外投資換回本幣時匯損，或公司成本被匯率吃掉。",
    pitfall: "海外資產上漲，不代表換回台幣後一定賺。",
    sentence: "匯率是跨國投資的第二個價格。",
  },
  {
    term: "槓桿",
    category: "macro",
    label: "總經",
    plain: "用比較小的本金，控制比較大的部位。",
    detail: "它會同時放大獲利和虧損。方向看對但波動太大，也可能先出局。",
    earn: "在可控風險下放大有效策略的資金效率。",
    lose: "反向波動、保證金追繳、流動性消失。",
    pitfall: "槓桿不是聰明，它只是放大。",
    sentence: "沒有停損和部位控管，槓桿就是加速器。",
  },
  {
    term: "流動性",
    category: "macro",
    label: "總經",
    plain: "你想買賣時，市場有沒有足夠的人接手。",
    detail: "流動性好時買賣容易，流動性差時價格可能跳很大。",
    earn: "能在合理價格進出，降低交易成本。",
    lose: "急著賣時沒人接，只能用很差價格成交。",
    pitfall: "平常有成交量，不代表危機時也有流動性。",
    sentence: "流動性是市場的氧氣，平常不覺得，缺了才知道可怕。",
  },
  {
    term: "波動率",
    category: "macro",
    label: "總經",
    plain: "價格上下晃動的程度。",
    detail: "波動率高代表不確定性高，也會影響選擇權價格與風險控管。",
    earn: "懂得用部位大小、避險或選擇權管理波動。",
    lose: "被短期劇烈波動洗出場，或在波動率太貴時買保險。",
    pitfall: "波動不是風險的全部，但它會影響你能不能撐到判斷實現。",
    sentence: "波動率不是敵人，沒準備才是。",
  },
];

const translations = {
  rates: {
    title: "高利率維持更久",
    original: "央行暗示政策利率可能在高檔停留更長時間。",
    plain: "借錢成本不會太快下降，企業和房貸族都會感到壓力。",
    impact: "股票估值容易被壓縮，短天期債券利息較有吸引力，美元可能偏強。",
  },
  inflation: {
    title: "物價降溫但還沒結束",
    original: "核心通膨年增率放緩，但服務價格仍具黏性。",
    plain: "有些東西漲慢了，但房租、薪資和服務費還不容易降回去。",
    impact: "市場可能期待降息，但央行會更謹慎；債券價格容易跟數據一起波動。",
  },
  earnings: {
    title: "營收成長但毛利下滑",
    original: "公司營收優於預期，但毛利率受到成本與折扣壓力影響。",
    plain: "東西賣得更多，但每賣一件賺到的錢變少。",
    impact: "股價反應要看市場重視成長還是獲利品質，不能只看營收數字漂亮。",
  },
};

const localDailyFallback = {
  source: "前端備援題庫",
  apiMode: "local_fallback",
  dailyTerm: {
    term: "風險溢酬",
    category: "市場",
    plain: "你願意承擔不確定性，所以要求多拿一點報酬。",
    analogy: "像走比較遠、比較難的路，你會希望終點的獎勵更好。",
    risk: "報酬看起來高，可能只是市場在補償更大的不確定性。",
  },
  dailyQuiz: {
    question: "殖利率上升，一定代表投資變安全嗎？",
    options: ["一定", "不一定，可能是價格下跌或風險升高", "跟價格完全無關"],
    answerIndex: 1,
    explanation: "殖利率變高可能是利息吸引人，也可能是市場要求更高補償。",
  },
  marketNote: "今天先挑一個你常看到的市場詞，把它翻成一句生活語言。",
};

function getTaipeiDateKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function getDateSeed(dateKey) {
  return dateKey.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
}

function getLocalDailyPayload() {
  const todayKey = getTaipeiDateKey();
  const seed = getDateSeed(todayKey);
  const term = terms[seed % terms.length] || terms[0];
  const distractorOne = terms[(seed + 5) % terms.length] || terms[1];
  const distractorTwo = terms[(seed + 11) % terms.length] || terms[2];

  if (!term) return localDailyFallback;

  return {
    source: "內建每日輪替題庫",
    apiMode: "local_rotating",
    dailyTerm: {
      term: term.term,
      category: term.label,
      plain: term.plain,
      analogy: term.detail,
      risk: term.pitfall,
    },
    dailyQuiz: {
      question: `關於「${term.term}」，哪一句比較接近市場白話文的理解？`,
      options: [term.plain, distractorOne.plain, distractorTwo.plain],
      answerIndex: 0,
      explanation: term.sentence,
    },
    marketNote: `今天的詞由本機題庫依日期輪替：${todayKey}。`,
  };
}

const learnerRecommendations = {
  beginner: "今天先讀每日術語，再收藏 2 個白話字典詞。目標不是背名詞，而是能用自己的話說一次。",
  intermediate: "今天看一則新聞翻譯，再用情境翻譯器想一次：這件事會先影響誰的成本或收入？",
  advanced: "今天從風險開始讀：找出一個看似有利的市場變化，列出它可能失效的條件。",
};

const scenarioExplanations = {
  "rate-hike": {
    plain: "借錢變貴了。",
    impact: "企業融資成本上升，股票估值容易受壓；新債券利率較香，舊債券價格可能下跌。",
  },
  "rate-cut": {
    plain: "借錢變便宜了。",
    impact: "市場可能期待資金回流風險資產，但如果降息是因為景氣變差，股票不一定會立刻上漲。",
  },
  "oil-up": {
    plain: "運輸、製造和能源成本變高。",
    impact: "航空、物流、化工等成本壓力增加；能源相關公司可能受惠，但通膨壓力也會升高。",
  },
  "usd-strong": {
    plain: "美元變貴，其他貨幣相對變弱。",
    impact: "進口美元計價商品的人壓力增加；出口商可能受惠，美元債務高的公司要小心。",
  },
};

const goalPlans = {
  zero: {
    title: "完全新手：先建立市場語言",
    summary: "不要先追熱門商品，先把報酬、風險、利率、股票、債券的關係聽懂。",
    steps: [
      ["第 1 站", "股票、債券、ETF", "知道你買的是所有權、借款契約，還是一籃資產。"],
      ["第 2 站", "報酬與風險", "先理解賺錢來源，也理解最大誤會在哪裡。"],
      ["第 3 站", "利率與通膨", "看懂為什麼央行一句話會影響股債匯。"],
      ["第 4 站", "小部位練習", "用測驗和情境推演練習，不急著交易。"],
    ],
  },
  news: {
    title: "看懂新聞：把市場黑話拆成因果",
    summary: "每則新聞都問三件事：誰的成本變了？誰的收入變了？市場之前期待什麼？",
    steps: [
      ["第 1 站", "升息、降息、通膨", "先把總經新聞翻成借錢成本與購買力。"],
      ["第 2 站", "殖利率曲線、匯率", "看懂資金為什麼換地方跑。"],
      ["第 3 站", "財報語言", "分辨營收、毛利、現金流和估值。"],
      ["第 4 站", "市場反應", "練習判斷新聞是新資訊，還是早被價格反映。"],
    ],
  },
  portfolio: {
    title: "建立投資組合：不要只問哪個會漲",
    summary: "投資組合是在管理不同資產一起工作的方式，而不是把很多熱門商品堆在一起。",
    steps: [
      ["第 1 站", "股票與 ETF", "理解成長來源和分散效果。"],
      ["第 2 站", "債券與久期", "把穩定現金流和利率風險放進配置。"],
      ["第 3 站", "匯率與流動性", "海外配置要看第二層風險。"],
      ["第 4 站", "再平衡", "用規則處理情緒，不靠每天猜高低點。"],
    ],
  },
  derivatives: {
    title: "期貨與選擇權：先學活下來",
    summary: "衍生性商品最重要的不是刺激，而是保證金、時間、波動與最壞情境。",
    steps: [
      ["第 1 站", "期貨與保證金", "知道槓桿從哪裡來，也知道為什麼會追繳。"],
      ["第 2 站", "選擇權與權利金", "理解保費、時間價值和波動率。"],
      ["第 3 站", "避險 vs 投機", "同一個工具可以保護，也可以放大風險。"],
      ["第 4 站", "部位控管", "先設最大損失，再決定要不要進場。"],
    ],
  },
};

const productProfiles = [
  {
    id: "stock",
    name: "股票",
    use: "參與公司成長",
    risk: "單一公司與估值風險",
    bestFor: "願意研究公司、能承受價格波動的人。",
    notFor: "需要短期固定現金流或不能承受大幅波動的人。",
    analogy: "像買下一間店的一小塊，店變好你受惠，店變差你也一起承擔。",
  },
  {
    id: "etf",
    name: "ETF",
    use: "快速取得一籃資產",
    risk: "市場整體風險與追蹤誤差",
    bestFor: "想分散、想建立長期配置的人。",
    notFor: "以為買 ETF 就不會跌的人。",
    analogy: "像買便當，一次有主菜配菜，但你仍要看菜色和熱量。",
  },
  {
    id: "bond",
    name: "債券",
    use: "收利息、管理現金流",
    risk: "利率、信用、久期風險",
    bestFor: "想降低組合波動、重視現金流的人。",
    notFor: "以為債券每天價格都固定的人。",
    analogy: "像你當銀行，把錢借給別人，重點是對方還不還得出來。",
  },
  {
    id: "future",
    name: "期貨",
    use: "避險或高效率曝險",
    risk: "槓桿、追繳保證金、跳空",
    bestFor: "知道最壞情境、能嚴格控管部位的人。",
    notFor: "只想用小錢快速翻倍的人。",
    analogy: "像先約好未來價格，省的是不確定性，換來的是履約壓力。",
  },
  {
    id: "option",
    name: "選擇權",
    use: "保護部位或交易波動",
    risk: "時間價值、波動率、賣方尾部風險",
    bestFor: "能理解機率、時間和波動的人。",
    notFor: "只想猜漲跌、不懂權利金的人。",
    analogy: "像保險，買方付保費，賣方收保費但要承擔事故。",
  },
];

const navButton = document.querySelector(".menu-button");
const nav = document.querySelector(".site-nav");
const dailyCard = document.querySelector("#daily-card");
const learnerLevel = document.querySelector("#learner-level");
const habitResult = document.querySelector("#habit-result");
const markDailyRead = document.querySelector("#mark-daily-read");
const goalButtons = document.querySelectorAll(".goal-button");
const roadmapPanel = document.querySelector("#roadmap-panel");
const productList = document.querySelector("#product-list");
const productPanel = document.querySelector("#product-panel");
const levelTabs = document.querySelectorAll(".level-tab");
const levelPanel = document.querySelector("#level-panel");
const termGrid = document.querySelector("#term-grid");
const searchInput = document.querySelector("#term-search");
const filterButtons = document.querySelectorAll(".filter-button");
const savedCount = document.querySelector("#saved-count");
const dictionaryStats = document.querySelector("#dictionary-stats");
const newsButtons = document.querySelectorAll(".news-item");
const translationPanel = document.querySelector("#translation-panel");
const leverageRange = document.querySelector("#leverage-range");
const leverageValue = document.querySelector("#leverage-value");
const leverageResult = document.querySelector("#leverage-result");
const scenarioSelect = document.querySelector("#scenario-select");
const scenarioResult = document.querySelector("#scenario-result");
const quizButtons = document.querySelectorAll(".quiz-options button");
const quizFeedback = document.querySelector("#quiz-feedback");

let activeFilter = "all";
let savedTerms = readJsonStorage("marketBaihua.savedTerms", []);
let dailyPayload = getLocalDailyPayload();

navButton?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("open");
  navButton.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("open");
    navButton?.setAttribute("aria-expanded", "false");
  }
});

levelTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const level = tab.dataset.level || "beginner";
    const content = levelContent[level];
    levelTabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    levelPanel.innerHTML = `
      <h3>${content.title}</h3>
      <p>${content.body}</p>
      <ul>${content.bullets.map((item) => `<li>${item}</li>`).join("")}</ul>
    `;
  });
});

function renderTerms() {
  if (!termGrid) return;
  const keyword = searchInput?.value.trim().toLowerCase() || "";
  const visibleTerms = terms.filter((item) => {
    const matchesFilter =
      activeFilter === "all" ||
      item.category === activeFilter ||
      (activeFilter === "saved" && savedTerms.includes(item.term));
    const matchesSearch =
      item.term.toLowerCase().includes(keyword) ||
      item.plain.toLowerCase().includes(keyword) ||
      item.detail.toLowerCase().includes(keyword) ||
      item.earn.toLowerCase().includes(keyword) ||
      item.lose.toLowerCase().includes(keyword) ||
      item.pitfall.toLowerCase().includes(keyword);
    return matchesFilter && matchesSearch;
  });

  termGrid.innerHTML = visibleTerms
    .map(
      (item) => `
        <article class="term-card">
          <div class="term-card-top">
            <small>${item.label}</small>
            <button
              class="save-term ${savedTerms.includes(item.term) ? "saved" : ""}"
              type="button"
              data-term="${escapeHtml(item.term)}"
              aria-label="${savedTerms.includes(item.term) ? "取消收藏" : "收藏"}${escapeHtml(item.term)}"
            >
              ${savedTerms.includes(item.term) ? "已收藏" : "收藏"}
            </button>
          </div>
          <h3>${escapeHtml(item.term)}</h3>
          <strong>${escapeHtml(item.plain)}</strong>
          <p>${escapeHtml(item.detail)}</p>
          <div class="term-actions">
            <button class="deep-read" type="button" data-term="${escapeHtml(item.term)}">
              展開深讀
            </button>
          </div>
        </article>
      `
    )
    .join("");

  if (!visibleTerms.length) {
    termGrid.innerHTML = `<article class="term-card"><h3>找不到這個詞</h3><p>可以先換個關鍵字，例如利率、債券、槓桿。</p></article>`;
  }

  updateSavedCount();
  if (dictionaryStats) {
    dictionaryStats.textContent = `目前收錄 ${terms.length} 個核心觀念，正在顯示 ${visibleTerms.length} 個。`;
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter || "all";
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderTerms();
  });
});

searchInput?.addEventListener("input", renderTerms);

termGrid?.addEventListener("click", (event) => {
  const button = event.target.closest(".save-term");
  const deepButton = event.target.closest(".deep-read");

  if (button instanceof HTMLButtonElement) {
    const term = button.dataset.term;
    if (!term) return;

    savedTerms = savedTerms.includes(term)
      ? savedTerms.filter((item) => item !== term)
      : [...savedTerms, term];

    writeJsonStorage("marketBaihua.savedTerms", savedTerms);
    renderTerms();
    return;
  }

  if (deepButton instanceof HTMLButtonElement) {
    const termName = deepButton.dataset.term;
    const item = terms.find((term) => term.term === termName);
    const card = deepButton.closest(".term-card");
    if (!item || !card) return;
    const existing = card.querySelector(".deep-panel");
    if (existing) {
      existing.remove();
      deepButton.textContent = "展開深讀";
      return;
    }
    deepButton.textContent = "收起深讀";
    card.insertAdjacentHTML(
      "beforeend",
      `
        <div class="deep-panel">
          <dl>
            <div><dt>可能怎麼賺</dt><dd>${escapeHtml(item.earn)}</dd></div>
            <div><dt>可能怎麼賠</dt><dd>${escapeHtml(item.lose)}</dd></div>
            <div><dt>常見誤會</dt><dd>${escapeHtml(item.pitfall)}</dd></div>
            <div><dt>一句話記住</dt><dd>${escapeHtml(item.sentence)}</dd></div>
          </dl>
        </div>
      `
    );
  }
});

newsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = translations[button.dataset.news || "rates"];
    if (!translationPanel) return;
    newsButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    translationPanel.innerHTML = `
      <h3>${selected.title}</h3>
      <dl>
        <div><dt>原文</dt><dd>${selected.original}</dd></div>
        <div><dt>白話</dt><dd>${selected.plain}</dd></div>
        <div><dt>可能影響</dt><dd>${selected.impact}</dd></div>
      </dl>
    `;
  });
});

function updateLeverage() {
  if (!leverageRange || !leverageValue || !leverageResult) return;
  const leverage = Number(leverageRange?.value || 3);
  const loss = 100000 * 0.05 * leverage;
  leverageValue.textContent = String(leverage);
  leverageResult.textContent = `市場反向 5%，帳面約虧 ${loss.toLocaleString("zh-TW")} 元。`;
}

leverageRange?.addEventListener("input", updateLeverage);

function renderScenario() {
  if (!scenarioResult) return;
  const selected = scenarioExplanations[scenarioSelect?.value || "rate-hike"];
  scenarioResult.innerHTML = `
    <strong>白話：${escapeHtml(selected.plain)}</strong>
    <p>${escapeHtml(selected.impact)}</p>
  `;
}

scenarioSelect?.addEventListener("change", renderScenario);

function renderRoadmap(goal = "zero") {
  const plan = goalPlans[goal] || goalPlans.zero;
  if (!roadmapPanel) return;

  roadmapPanel.innerHTML = `
    <div class="roadmap-head">
      <h3>${escapeHtml(plan.title)}</h3>
      <p>${escapeHtml(plan.summary)}</p>
    </div>
    <ol class="roadmap-steps">
      ${plan.steps
        .map(
          ([step, title, body]) => `
            <li>
              <span>${escapeHtml(step)}</span>
              <strong>${escapeHtml(title)}</strong>
              <p>${escapeHtml(body)}</p>
            </li>
          `
        )
        .join("")}
    </ol>
  `;
}

goalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    goalButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderRoadmap(button.dataset.goal || "zero");
  });
});

function renderProductLab(activeId = "stock") {
  const active = productProfiles.find((item) => item.id === activeId) || productProfiles[0];
  if (productList) {
    productList.innerHTML = productProfiles
      .map(
        (item) => `
          <button class="product-button ${item.id === active.id ? "active" : ""}" type="button" data-product="${item.id}">
            <span>${escapeHtml(item.name)}</span>
            <small>${escapeHtml(item.use)}</small>
          </button>
        `
      )
      .join("");
  }

  if (productPanel) {
    productPanel.innerHTML = `
      <h3>${escapeHtml(active.name)}</h3>
      <p class="product-analogy">${escapeHtml(active.analogy)}</p>
      <dl>
        <div><dt>主要用途</dt><dd>${escapeHtml(active.use)}</dd></div>
        <div><dt>核心風險</dt><dd>${escapeHtml(active.risk)}</dd></div>
        <div><dt>比較適合</dt><dd>${escapeHtml(active.bestFor)}</dd></div>
        <div><dt>不太適合</dt><dd>${escapeHtml(active.notFor)}</dd></div>
      </dl>
    `;
  }
}

productList?.addEventListener("click", (event) => {
  const button = event.target.closest(".product-button");
  if (!(button instanceof HTMLButtonElement)) return;
  renderProductLab(button.dataset.product || "stock");
});

quizButtons.forEach((button) => {
  button.addEventListener("click", () => {
    quizButtons.forEach((item) => item.classList.remove("correct", "wrong"));
    const isCorrect = button.dataset.correct === "true";
    button.classList.add(isCorrect ? "correct" : "wrong");
    if (quizFeedback) {
      quizFeedback.textContent = isCorrect
        ? "答對了。新債券利率更高，舊債券比較不香，價格通常會下跌。"
        : "再想一次：新的債券利息變高時，舊的低利率債券通常要降價才有人買。";
    }
  });
});

function renderDailyCard(payload) {
  if (!dailyCard) return;
  const fallback = getLocalDailyPayload();
  const term = payload.dailyTerm || fallback.dailyTerm;
  const quiz = payload.dailyQuiz || fallback.dailyQuiz;
  const todayKey = getTaipeiDateKey();
  const isRead = localStorage.getItem("marketBaihua.dailyRead") === todayKey;
  const modeLabel =
    payload.apiMode === "external_cached"
      ? "外部 API + 邊緣快取"
      : payload.apiMode === "local_rotating"
        ? "內建每日輪替"
        : "內建備援題庫";

  dailyCard.innerHTML = `
    <div class="daily-card-top">
      <span>${escapeHtml(term.category)}｜每日術語</span>
      <small>${escapeHtml(payload.source || "市場白話文")}</small>
    </div>
    <h3>${escapeHtml(term.term)}</h3>
    <strong>${escapeHtml(term.plain)}</strong>
    <p>${escapeHtml(term.analogy)}</p>
    <div class="daily-risk">
      <span>先看風險</span>
      <p>${escapeHtml(term.risk)}</p>
    </div>
    <div class="daily-note">${escapeHtml(payload.marketNote || "")}</div>
    <div class="daily-quiz" data-answer="${Number(quiz.answerIndex) || 0}">
      <h4>今日一題</h4>
      <p>${escapeHtml(quiz.question)}</p>
      <div class="daily-quiz-options">
        ${(quiz.options || [])
          .map(
            (option, index) =>
              `<button type="button" data-index="${index}">${escapeHtml(option)}</button>`
          )
          .join("")}
      </div>
      <p class="daily-quiz-feedback" aria-live="polite"></p>
    </div>
    <div class="api-footnote">
      <span>模式：${modeLabel}</span>
      <span>${isRead ? "今日已讀" : "尚未標記"}</span>
    </div>
  `;

  if (markDailyRead) markDailyRead.textContent = isRead ? "今日已讀" : "標記今日已讀";
}

dailyCard?.addEventListener("click", (event) => {
  const optionButton = event.target.closest(".daily-quiz-options button");
  if (!(optionButton instanceof HTMLButtonElement)) return;

  const quizBox = optionButton.closest(".daily-quiz");
  const answer = Number(quizBox?.dataset.answer || 0);
  const selected = Number(optionButton.dataset.index || 0);
  const feedback = quizBox?.querySelector(".daily-quiz-feedback");
  const explanation = dailyPayload.dailyQuiz?.explanation || getLocalDailyPayload().dailyQuiz.explanation;

  quizBox?.querySelectorAll("button").forEach((button) => {
    button.classList.remove("correct", "wrong");
  });
  optionButton.classList.add(selected === answer ? "correct" : "wrong");
  if (feedback) {
    feedback.textContent = selected === answer ? `答對了。${explanation}` : `再想一次。${explanation}`;
  }
});

async function loadDailyBrief() {
  try {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 2600);
    const response = await fetch("/api/daily", {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    window.clearTimeout(timeout);

    if (response.status === 429) {
      const retryAfter = response.headers.get("Retry-After") || "60";
      dailyPayload = {
        ...getLocalDailyPayload(),
        marketNote: `API 目前達到訪問限制，約 ${retryAfter} 秒後可以再試。先用本機備援題庫繼續學。`,
      };
    } else if (response.ok) {
      dailyPayload = await response.json();
    }
  } catch {
    dailyPayload = getLocalDailyPayload();
  }

  renderDailyCard(dailyPayload);
}

function renderLearnerPlan() {
  const level = learnerLevel?.value || "beginner";
  if (habitResult) habitResult.textContent = learnerRecommendations[level];
  localStorage.setItem("marketBaihua.learnerLevel", level);
}

learnerLevel?.addEventListener("change", renderLearnerPlan);

markDailyRead?.addEventListener("click", () => {
  const todayKey = getTaipeiDateKey();
  localStorage.setItem("marketBaihua.dailyRead", todayKey);
  renderDailyCard(dailyPayload);
});

function updateSavedCount() {
  if (savedCount) savedCount.textContent = String(savedTerms.length);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function readJsonStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

function writeJsonStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

if (learnerLevel) {
  learnerLevel.value = localStorage.getItem("marketBaihua.learnerLevel") || "beginner";
}

renderTerms();
updateLeverage();
renderScenario();
renderRoadmap();
renderProductLab();
renderLearnerPlan();
loadDailyBrief();
