const EXEMPLARS = [
  {
    title: "Vitamin D 其实不是一个普通的「维他命」",
    category: "Supplement",
    body: [
      { heading: "Vitamin D ≠ 普通维他命", text: "很多人以为，Vitamin D 就跟 Vitamin C、Vitamin B 一样，吃进去就是「补充维他命」。其实，Vitamin D 很特别。因为它的工作方式，更像荷尔蒙。" },
      { heading: "Vitamin D 在身体里做什么？", text: "🦴 帮助骨骼健康——促进身体吸收和利用钙、磷。\n🛡️ 参与免疫调节——免疫细胞也有 Vitamin D Receptor。\n💪 支持肌肉功能——维持身体活动和肌肉力量。\n🧬 参与细胞生长与分化。" },
      { heading: "药师小贴士 💊", text: "Vitamin D 其实更像身体里的一个调节讯号。名字叫维他命，工作起来却很像荷尔蒙。" },
    ],
  },
  {
    title: "防晒入门第一课！不是擦了就会有防晒力",
    category: "Ingredient",
    body: [
      { heading: "SPF 到底是什么？", text: "SPF 指的是防晒产品帮助皮肤延长「晒伤」所需时间的能力。SPF15 可阻挡约 93% UVB，SPF30 约 97%，SPF50 约 98%。" },
      { heading: "真正重要的不是 SPF 数字", text: "✅ 有没有擦足够量\n✅ 有没有每 2 小时补擦一次\n✅ 流汗、游泳后有没有重新补擦\n✅ 有没有搭配帽子、墨镜、阳伞" },
      { heading: "药师小贴士 💊", text: "最好的防晒，不是 SPF 最高，而是你愿意每天正确使用的那一支。" },
    ],
  },
  {
    title: "关节里到底藏着什么？",
    category: "Supplement",
    body: [
      { heading: "一个关节就像一部汽车", text: "如果只是一直补「软骨」，却忽略了其他结构，就像汽车坏的是避震器，你却一直换轮胎一样。" },
      { heading: "① 软骨 — 缓冲垫", text: "每一次走路、跑步，都是软骨在帮你吸收冲击力。Life Factor Osteoliv 主要针对软骨健康。" },
      { heading: "② 滑液 — 润滑油", text: "滑液负责润滑关节、减少摩擦。Life Factor Hyaluronic Acid Plus 透明质酸是滑液的重要组成成分。" },
      { heading: "药师小贴士 💊", text: "不是补一个地方，而是照顾整个关节系统。" },
    ],
  },
  {
    title: "你真的还会相信网路神cream吗？",
    category: "Clinical",
    body: [
      { heading: "又有网红cream爆出有类固醇", text: "百x霜事件：男童连续涂抹两个月后，体重暴增六公斤，双腿出现皮肤萎缩纹。" },
      { heading: "如何辨认有问题的“神cream”", text: "1️⃣ 全部天然成份，却立马神奇见效\n2️⃣ 一个cream可以解决完所有皮肤问题\n3️⃣ 广告极其夸张，但一停用就反弹" },
      { heading: "药师小贴士 💊", text: "网路永远都会有下个神cream出来，大家只有学会了，才不会交智商税。" },
    ],
  },
];

const TOPICS = [
  "维生素D", "关节保健", "防晒", "湿疹", "类固醇", "玻尿酸",
  "胶原蛋白", "Glucosamine", "益生菌", "抗性淀粉", "生酮饮食", "免疫力",
  "皮肤屏障", "冻干水果", "毒素安全", "肠道健康", "肌肉力量",
];

const TITLE_TEMPLATES = [
  (t) => `${t}的真相，和你想的不一样`,
  (t) => `为什么你的${t}一直没效？`,
  (t) => `${t}入门第一课`,
  (t) => `关于${t}，药师想说的三件事`,
  (t) => `${t}：你补对了吗？`,
  (t) => `别再乱买${t}产品了`,
];

const GROQ_KEY = process.env.GROQ_API_KEY;
const GEMINI_KEY = process.env.GEMINI_API_KEY;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function fewShotBlock() {
  const chosen = [...EXEMPLARS].sort(() => Math.random() - 0.5).slice(0, 2);
  return chosen
    .map((e) => {
      const body = e.body.map((b) => (b.heading ? `【${b.heading}】${b.text ? " " + b.text.slice(0, 80) : ""}` : b.text?.slice(0, 80))).join("\n");
      return `Title: ${e.title}\nCategory: ${e.category}\nBody:\n${body}`;
    })
    .join("\n\n---\n\n");
}

function buildPrompt(topic) {
  return [
    {
      role: "system",
      content: `You are Kris, a Malaysian Chinese pharmacist writing engaging health and skincare journal notes for Skinpiens. Write in warm, conversational Chinese (simplified). Output ONLY valid JSON (no markdown, no code fences).\nFormat:\n{"title":"...","body":[{"heading":"...","text":"..."}]}\nRules:\n- 5-7 body blocks, each with a short punchy heading (ending with ? or emoji) and 1-3 short paragraphs.\n- Use \\n for line breaks in text.\n- Start with a relatable hook question.\n- End with a tip block (heading: "药师小贴士 💊").\n- Tone: friendly pharmacist, not academic. Use emojis sparingly.`,
    },
    {
      role: "user",
      content: `Write a journal article about "${topic}". Here are examples of my style:\n\n${fewShotBlock()}`,
    },
  ];
}

function parseJSON(text) {
  const cleaned = text.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    const obj = JSON.parse(match[0]);
    if (!obj.title || !Array.isArray(obj.body) || obj.body.length < 3) return null;
    return {
      title: obj.title,
      kicker: "AI draft · trained on Kris notes",
      category: pick(["Supplement", "Clinical", "Ingredient"]),
      body: obj.body.map((b) => ({
        heading: typeof b.heading === "string" ? b.heading : undefined,
        text: typeof b.text === "string" ? b.text : "",
      })),
    };
  } catch {
    return null;
  }
}

async function callGroq(messages) {
  if (!GROQ_KEY) return null;
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${GROQ_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "llama-3.1-8b-instant", messages, temperature: 0.85, max_tokens: 1000 }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? null;
}

async function callGemini(messages) {
  if (!GEMINI_KEY) return null;
  const contents = messages
    .filter((m) => m.role !== "system")
    .map((m) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] }));
  const sys = messages.find((m) => m.role === "system");
  const body = { contents };
  if (sys) body.systemInstruction = { parts: [{ text: sys.content }] };
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") return res.status(204).json(CORS);
  if (req.method !== "POST") return res.status(405).setHeaders(CORS).json({ error: "POST only" });

  try {
    const body = req.body || {};
    const topic = typeof body.topic === "string" && body.topic.length <= 30 ? body.topic : pick(TOPICS);
    const messages = buildPrompt(topic);

    let text = await callGroq(messages);
    const source = text ? "groq" : "gemini";
    if (!text) text = await callGemini(messages);

    if (!text) {
      return res.status(200).setHeaders(CORS).json({
        title: pick(TITLE_TEMPLATES)(topic),
        kicker: "Local fallback · on-device style model",
        category: pick(["Supplement", "Clinical", "Ingredient"]),
        body: [
          { heading: "由本地生成器撰写", text: "No LLM API key configured yet — this draft was assembled by the on-device style model.\n\nTopic: " + topic + "\n\nTo enable AI generation, add a GROQ_API_KEY (free at groq.com) to your Vercel project's environment variables." },
          { heading: "药师小贴士 💊", text: "This is a generated draft for inspiration only, not medical advice. Consult a professional for health concerns." },
        ],
        source: "local",
      });
    }

    const parsed = parseJSON(text);
    if (!parsed) {
      return res.status(200).setHeaders(CORS).json({
        title: pick(TITLE_TEMPLATES)(topic),
        kicker: "AI draft (fallback)",
        category: "Supplement",
        body: [{ text: text.slice(0, 2000) }],
        source,
      });
    }

    return res.status(200).setHeaders(CORS).json({ ...parsed, source, topic });
  } catch (err) {
    return res.status(500).setHeaders(CORS).json({ error: err.message || "Internal error" });
  }
}

export const config = {
  runtime: "nodejs",
  maxDuration: 15,
};
