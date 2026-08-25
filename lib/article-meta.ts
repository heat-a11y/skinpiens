export interface ArticleMeta {
  tags: string[];
  summaryEn: string;
  summaryBm: string;
}

const M: Record<string, ArticleMeta> = {
  "why-brightening-shouldnt-hurt": {
    tags: ["Illumys", "美白", "皮肤屏障"],
    summaryEn:
      "Brightening through barrier-safe tyrosinase modulation beats harsh acids — luminosity without irritation, proven over 12 weeks.",
    summaryBm:
      "Pemutihan mesra penghalang kulit lebih selamat daripada asid keras — cerah tanpa kerengsaan, terbukti selama 12 minggu.",
  },
  "epsilon-eczema-science": {
    tags: ["湿疹", "Epsilon", "神经酰胺"],
    summaryEn:
      "Eczema is a barrier disease. Epsilon rebuilds it with a 3:1:1 ceramide ratio plus postbiotics, calming flares in about 3 days.",
    summaryBm:
      "Ekzema ialah penyakit penghalang kulit. Epsilon membina semula dengan nisbah seramid 3:1:1 dan postbiotik, menenangkan flare dalam ~3 hari.",
  },
  "illumys-ginger-root-barrier-safe-glow": {
    tags: ["Illumys", "美白", "成分"],
    summaryEn:
      "Illumys is a standardized ginger-root extract that modulates tyrosinase gently — the engine behind Fortress+ with zero stinging.",
    summaryBm:
      "Illumys ialah ekstrak halia terpiawaikan yang modulasi tirosinase dengan lembut — tenaga di sebalik Fortress+ tanpa pedih.",
  },
  "ceramides-3-1-1-rebuilding-lipid-matrix": {
    tags: ["神经酰胺", "湿疹", "皮肤屏障"],
    summaryEn:
      "Ceramides are the mortar between skin cells; the correct NP/AP/EOP 3:1:1 ratio cut TEWL 27% in 8 weeks.",
    summaryBm:
      "Seramid ialah 'simen' antara sel kulit; nisbah NP/AP/EOP 3:1:1 yang betul mengurangkan TEWL sebanyak 27% dalam 8 minggu.",
  },
  "nuca-gut-skin-axis": {
    tags: ["肠道", "益生菌", "NUCA"],
    summaryEn:
      "Skin is downstream of the gut — NUCA's 5-in-1 synbiotic supports the digestion and microbiome balance your barrier relies on.",
    summaryBm:
      "Kulit berkait rapat dengan usus — sinbiotik 5-dalam-1 NUCA menyokong pencernaan dan keseimbangan mikrobiom untuk penghalang kulit.",
  },
  "s-aureus-eczema-microbiome": {
    tags: ["湿疹", "细菌", "Epsilon"],
    summaryEn:
      "S. aureus overgrowth drives eczema flares; Epsilon Mist targets it directly while cooling itch at the source.",
    summaryBm:
      "Lebihan S. aureus mencetuskan ekzema; Epsilon Mist menyasarnya secara langsung sambil menyejukkan gatal pada punca.",
  },
  "vitamin-d-prohormone": {
    tags: ["维生素D", "荷尔蒙", "免疫力"],
    summaryEn:
      "Vitamin D behaves like a prohormone — converted by liver and kidney, signalling cells via VDR to regulate immunity, bone and muscle.",
    summaryBm:
      "Vitamin D bertindak seperti prohormon — diaktifkan oleh hati dan buah pinggang, mengawal imuniti, tulang dan otot melalui VDR.",
  },
  "kids-vitamin-d-gap": {
    tags: ["维生素D", "儿童", "免疫力"],
    summaryEn:
      "Nearly half of Malaysian children are low in vitamin D despite the sun; daily recommended intake matters more than endless immunity supplements.",
    summaryBm:
      "Hampir separuh kanak-kanak Malaysia kurang vitamin D walaupun cuaca panas; dos harian yang mencukupi lebih penting daripada pelbagai suplemen imun.",
  },
  "methanol-sanitizer": {
    tags: ["甲醇", "消毒液", "安全"],
    summaryEn:
      "Methanol contamination in sanitizers comes from poor-quality industrial alcohol — toxic even in small amounts, especially for babies.",
    summaryBm:
      "Pencemaran metanol dalam pensanit datang dari alkohol industri berkualiti rendah — toksik walaupun sedikit, terutama untuk bayi.",
  },
  "glucosamine-caution": {
    tags: ["Glucosamine", "关节", "用药安全"],
    summaryEn:
      "Diabetics, shellfish-allergic and warfarin users should check with a professional first — and know the joint-support alternatives.",
    summaryBm:
      "Pesakit kencing manis, alergi kepiting dan pengguna warfarin perlu rujuk profesional dahulu — kenali alternatif sokongan sendi lain.",
  },
  "oral-hyaluronic": {
    tags: ["玻尿酸", "保湿", "关节"],
    summaryEn:
      "Oral hyaluronic acid hydrates skin from within and feeds joint synovial fluid — one ingredient, two jobs.",
    summaryBm:
      "Asid hialuronik oral melembapkan kulit dari dalam dan menambah cecair sendi — satu bahan, dua fungsi.",
  },
  "joints-move-to-lubricate": {
    tags: ["关节", "滑液", "运动"],
    summaryEn:
      "Joint oil comes with movement — gentle activity plus the right nutrients keeps cartilage fed and joints sliding smoothly.",
    summaryBm:
      "'Minyak' sendi datang daripada pergerakan — aktiviti lembut serta nutrien yang tepat memastikan tulang rawan terbekal dan sendi licin.",
  },
  "osteoliv-four-ways": {
    tags: ["OsteoLiv", "关节", "食谱"],
    summaryEn:
      "Four easy ways to drink OsteoLiv — water, milk, protein shakes or smoothies — just never with hot water.",
    summaryBm:
      "Empat cara mudah minum OsteoLiv — air, susu, protein shake atau smoothie — jangan guna air panas.",
  },
  "fortress-brighter-side": {
    tags: ["Fortress+", "美白", "用户反馈"],
    summaryEn:
      "A user's 'complaint': skin got so bright her dark circles stood out — proof the three-in-one base serum works.",
    summaryBm:
      "'Aduan' pengguna: kulit jadi cerah sehingga mata panda terserlah — bukti serum asas tiga-dalam-satu berfungsi.",
  },
  "kids-immunity-vitamin-d": {
    tags: ["维生素D", "儿童", "免疫力"],
    summaryEn:
      "SEANUTS found 47.5% of Malaysian kids short on vitamin D — sunlight, diet and sensible supplementation close the gap.",
    summaryBm:
      "SEANUTS mendapati 47.5% kanak-kanak Malaysia kurang vitamin D — cahaya matahari, diet dan suplemen munasabah menutup jurang itu.",
  },
  "freeze-dried-fruit-trap": {
    tags: ["冻干水果", "果糖", "零食"],
    summaryEn:
      "Freeze-dried fruit concentrates fructose and kills satiety — it is processed food, not unlimited health snack.",
    summaryBm:
      "Buah kering beku memekatkan fruktosa dan hilang rasa kenyang — ia makanan diproses, bukan snek kesihatan tanpa had.",
  },
  "npra-17-cosmetics-alert": {
    tags: ["NPRA", "汞", "类固醇"],
    summaryEn:
      "17 cosmetics were pulled for mercury, hydroquinone, tretinoin or steroids — no legit product fixes everything overnight.",
    summaryBm:
      "17 produk kosmetik ditarik kerana mengandungi merkuri, hidrokuinon, tretinoin atau steroid — tiada produk sah yang berkesan segala-galanya sekelip mata.",
  },
  "fortress-review-gratitude": {
    tags: ["Fortress+", "益生菌", "抗痘"],
    summaryEn:
      "Why an honest review meant everything — and how a local probiotic strain kills >80% of acne bacteria inside Fortress+.",
    summaryBm:
      "Kenapa ulasan jujur sangat bermakna — dan bagaimana strain probiotik tempatan membunuh >80% bakteria jerawat dalam Fortress+.",
  },
  "sunscreen-spf-101": {
    tags: ["防晒", "SPF", "UVA"],
    summaryEn:
      "SPF50 blocks only ~1% more UVB than SPF30 — quantity, reapplication and broad-spectrum matter far more than the number.",
    summaryBm:
      "SPF50 hanya menyekat ~1% UVB lagi berbanding SPF30 — kuantiti, sapuan semula dan spektro luas jauh lebih penting daripada angka.",
  },
  "formulated-in-japan": {
    tags: ["配方", "标签", "监管"],
    summaryEn:
      "'Formulated in Japan' is unregulated marketing — quality depends on the factory and sourcing, not the country printed on the box.",
    summaryBm:
      "'Formulated in Japan' hanyalah pemasaran — kualiti bergantung pada kilang dan sumber bahan, bukan negara pada label.",
  },
  "pharmacy-shelf-safety": {
    tags: ["药房", "监管", "安全"],
    summaryEn:
      "Pharmacy shelves add a layer of vetting but are not a guarantee — ask for research data behind any hyped product.",
    summaryBm:
      "Rak farmasi menambah lapisan semakan tetapi bukan jaminan — minta data kajian di sebalik produk yang banyak diborongkan.",
  },
  "sudan-red-cost": {
    tags: ["苏丹红", "质检", "供应链"],
    summaryEn:
      "The Sudan Red cream recall shows why traceable ingredients and batch testing beat pretty packaging every time.",
    summaryBm:
      "Tarikan balik krim Sudan Red menunjukkan kenapa bahan yang boleh dijejak dan ujian kelompok lebih penting daripada pembungkusan cantik.",
  },
  "resistant-starch-ranking": {
    tags: ["抗性淀粉", "血糖", "肠道"],
    summaryEn:
      "Cooled potatoes top the resistant-starch league; breads and cakes barely budge — cooling helps, calories still count.",
    summaryBm:
      "Kentang sejuk mendahului senarai kanji resistan; roti dan kek hampir tiuba — penyejukan membantu, kalori tetap dikira.",
  },
  "keto-long-term": {
    tags: ["生酮", "皮质醇", "碳水"],
    summaryEn:
      "Keto works best as a short-term tool — chronic very-low-carb may raise cortisol; reintroduce quality carbs strategically.",
    summaryBm:
      "Keto paling sesuai sebagai alat jangka pendek — karbohidrat sangat rendah jangka panjang boleh naikkan kortisol; kembali kepada karbohidrat berkualiti secara strategik.",
  },
  "farmachecker-myubat": {
    tags: ["FarmaChecker", "MyUBAT", "防伪"],
    summaryEn:
      "Orange hologram → FarmaChecker or MyUBAT; yellow → MyUBAT. Downloading the right app settles authenticity in seconds.",
    summaryBm:
      "Hologram oren → FarmaChecker atau MyUBAT; kuning → MyUBAT. Muat turun aplikasi yang betul untuk sahkan ketulenan dalam beberapa saat.",
  },
  "sgs-report-limits": {
    tags: ["SGS", "检测报告", "批次"],
    summaryEn:
      "An SGS report proves only the tested sample — not future batches. Seller behaviour tells you more than certificates.",
    summaryBm:
      "Laporan SGS hanya membuktikan sampel yang diuji — bukan kelompok akan datang. Perilaku penjual lebih bermakna daripada sijil.",
  },
  "joint-anatomy-101": {
    tags: ["关节", "软骨", "滑液"],
    summaryEn:
      "Joints are a team — cartilage cushion, synovial oil, tendons and bone each need different nutrients to stay young.",
    summaryBm:
      "Sendi adalah satu pasukan — tuduhan rawan, minyak sendi, tendon dan tulang masing-masing perlukan nutrien berbeza untuk kekal muda.",
  },
  "aging-legs-strength": {
    tags: ["肌少症", "蛋白质", "阻力训练"],
    summaryEn:
      "Leg weakness isn't 'just age' — protein at 1.0–1.2g/kg, resistance training and vitamin D rebuild strength at any decade.",
    summaryBm:
      "Lemah kaki bukan 'semata umur' — protein 1.0–1.2g/kg, latihan rintangan dan vitamin D membina semula kekuatan pada semua usia.",
  },
  "knee-pain-by-stage": {
    tags: ["膝盖", "关节炎", "分期"],
    summaryEn:
      "Match the supplement to the stage — foundation nutrition first, then anti-inflammatory botanicals, then immunomodulating collagen II.",
    summaryBm:
      "Padankan suplemen dengan peringkat — nutrien asas dahulu, kemudian botani anti-radang, kemudian kolagen II pengubah imun.",
  },
  "miracle-cream-redflags": {
    tags: ["类固醇", "神cream", "湿疹"],
    summaryEn:
      "'All-natural miracle creams' that fix everything usually hide steroids — three red flags to spot before a child pays the price.",
    summaryBm:
      "'Krim ajaib sepenuhnya semula jadi' yang boleh segalanya biasanya sorok steroid — tiga amaran sebelum kanak-kanak menjadi mangsa.",
  },
  "pharmacist-made-skincare": {
    tags: ["药师", "配方师", "品牌"],
    summaryEn:
      "Every skincare product is built by cosmetic chemists — what actually makes a pharmacist brand different is case experience.",
    summaryBm:
      "Setiap produk skincare dibina oleh ahli kimia kosmetik — yang membezakan jenama farmasis ialah pengalaman kes sebenar.",
  },
  "chia-seed-right-way": {
    tags: ["Chia Seed", "纤维", "泡水"],
    summaryEn:
      "Never eat chia seeds dry — soak 10–20 minutes with plenty of water or risk blockage; gel formed means good to go.",
    summaryBm:
      "Jangan makan chia seed secara kering — rendam 10–20 minit dengan air secukupnya atau risiko penyumbatan; jelly siap, barulah selamat.",
  },
};

export function getArticleMeta(slug: string): ArticleMeta {
  return (
    M[slug] ?? {
      tags: [],
      summaryEn: "",
      summaryBm: "",
    }
  );
}
