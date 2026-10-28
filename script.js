const $ = (id) => document.getElementById(id);
let currentLanguage = "en";

function setLanguage(lang) {
  currentLanguage = lang;
  document.documentElement.lang = lang === "hi" ? "hi" : "en";
  document.querySelectorAll("[data-en][data-hi]").forEach((el) => {
    const value = el.dataset[lang];
    if (value !== undefined) {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") return;
      el.innerHTML = value;
    }
  });
  $("languageToggle").textContent = lang === "en" ? "हिन्दी" : "English";
  $("chatInput").placeholder = lang === "en" ? "Type a symptom or question…" : "लक्षण या सवाल लिखें…";
  document.querySelectorAll("#mainNav a").forEach(a => a.addEventListener("click", () => $("mainNav").classList.remove("open")));
}
$("languageToggle").addEventListener("click", () => setLanguage(currentLanguage === "en" ? "hi" : "en"));
$("menuToggle").addEventListener("click", () => $("mainNav").classList.toggle("open"));

$("letterCheck").addEventListener("click", () => {
  const value = $("letterResult").value;
  const messages = currentLanguage === "hi" ? {
    clear: "यह केवल एक अनौपचारिक स्क्रीनिंग है। नियमित आँखों की जाँच फिर भी ज़रूरी है।",
    difficult: "धुंधलापन कई कारणों से हो सकता है। ऑप्टोमेट्रिस्ट या नेत्र विशेषज्ञ से जाँच करवाएँ।",
    unable: "कृपया जल्द ही आँखों की पेशेवर जाँच करवाएँ। यह गतिविधि नज़र का निदान नहीं कर सकती।",
    empty: "पहले एक विकल्प चुनें।"
  } : {
    clear: "This is only an informal screening. Routine professional eye examinations are still important.",
    difficult: "Blur can have many causes. Arrange an assessment with an optometrist or eye-care professional.",
    unable: "Please arrange a professional eye examination soon. This activity cannot diagnose your vision.",
    empty: "Please choose an answer first."
  };
  $("letterOutput").textContent = messages[value] || messages.empty;
});
$("colourCheck").addEventListener("click", () => {
  const value = $("colourResult").value;
  const messages = currentLanguage === "hi" ? {
    "12": "यह स्क्रीन पर रंग पहचानने का डेमो है, मान्य रंग-दृष्टि परीक्षण नहीं। संदेह हो तो विशेषज्ञ से सलाह लें।",
    unclear: "स्क्रीन की चमक और रंग परिणाम बदल सकते हैं। रंग-दृष्टि को लेकर चिंता हो तो विशेषज्ञ से जाँच करवाएँ।",
    other: "यह डेमो रंग-दृष्टि का निदान नहीं करता। सही जाँच के लिए नेत्र विशेषज्ञ से मिलें।",
    empty: "पहले एक विकल्प चुनें।"
  } : {
    "12": "This is a colour-awareness demo, not a validated colour-vision test. Consult a professional if concerned.",
    unclear: "Screen brightness and colours can affect what you see. Seek a professional assessment if concerned.",
    other: "This demo cannot diagnose colour vision. See an eye-care professional for proper testing.",
    empty: "Please choose an answer first."
  };
  $("colourOutput").textContent = messages[value] || messages.empty;
});

const responses = {
  en: {
    blur: "Blurred vision can have several causes, including a need for vision correction or an eye condition. Arrange an eye examination. If it started suddenly or comes with severe pain, weakness, or a curtain/shadow in your vision, seek urgent medical care now.",
    itch: "Itchy eyes can be related to allergy, dryness, or irritation. Avoid rubbing your eyes; a clean cool compress may help. Remove contact lenses if they irritate you. Seek medical advice if symptoms persist, worsen, or include pain, light sensitivity, or discharge.",
    screen: "For screen-related strain, try the 20-20-20 habit: every 20 minutes, look about 20 feet away for 20 seconds. Blink regularly, adjust glare, and take breaks. Persistent headaches or blurred vision should be checked by an eye-care professional.",
    emergency: "⚠️ Sudden vision loss, severe eye pain, a chemical splash, a serious eye injury, or sudden flashes/floaters with a shadow can be an emergency. Seek urgent medical care now; do not rely on this chatbot.",
    default: "I can share general information about blurred vision, itchy or watery eyes, and screen strain. Tell me which symptom you have and how long it has been happening. I cannot diagnose a condition. Sudden vision changes or severe pain need urgent care."
  },
  hi: {
    blur: "धुंधला दिखने के कई कारण हो सकते हैं, जैसे चश्मे की ज़रूरत या आँखों की कोई समस्या। आँखों की जाँच करवाएँ। अगर धुंधलापन अचानक शुरू हुआ है या तेज़ दर्द, कमज़ोरी, या नज़र में पर्दा/छाया महसूस हो तो तुरंत चिकित्सा सहायता लें।",
    itch: "आँखों में खुजली एलर्जी, सूखापन या जलन के कारण हो सकती है। आँखें न मलें; साफ़ ठंडी पट्टी से आराम मिल सकता है। कॉन्टैक्ट लेंस से परेशानी हो तो निकाल दें। दर्द, रोशनी से परेशानी, डिस्चार्ज या लगातार लक्षण हों तो डॉक्टर से मिलें।",
    screen: "स्क्रीन से थकान के लिए 20-20-20 आदत अपनाएँ: हर 20 मिनट में लगभग 20 फीट दूर 20 सेकंड देखें। पलकें झपकाते रहें, चमक कम करें और ब्रेक लें। लगातार सिरदर्द या धुंधलापन हो तो आँखों की जाँच करवाएँ।",
    emergency: "⚠️ अचानक नज़र कम होना, आँख में तेज़ दर्द, केमिकल गिरना, गंभीर चोट या अचानक चमक/धब्बों के साथ नज़र में छाया आना आपात स्थिति हो सकती है। तुरंत चिकित्सा सहायता लें; इस चैटबॉट पर निर्भर न रहें।",
    default: "मैं धुंधला दिखने, आँखों में खुजली/पानी आने और स्क्रीन से थकान के बारे में सामान्य जानकारी दे सकता/सकती हूँ। अपना लक्षण और कब से है, बताएँ। मैं बीमारी का निदान नहीं कर सकता/सकती। अचानक नज़र बदलने या तेज़ दर्द में तुरंत मदद लें।"
  }
};

function getResponse(text) {
  const t = text.toLowerCase();
  const lang = currentLanguage;
  const key = /sudden|severe|emergency|chemical|injury|अचानक|तेज़ दर्द|गंभीर|केमिकल|चोट|नज़र कम/.test(t) ? "emergency"
    : /blur|blurry|vision|धुंधला|दिखाई नहीं|नज़र/.test(t) ? "blur"
    : /itch|itchy|watery|red eye|खुजली|पानी|लाल आँख/.test(t) ? "itch"
    : /screen|headache|strain|computer|mobile|स्क्रीन|सिरदर्द|मोबाइल|कंप्यूटर/.test(t) ? "screen" : "default";
  return responses[lang][key];
}
function addMessage(text, type) {
  const node = document.createElement("div");
  node.className = `message ${type}-message`;
  node.textContent = text;
  $("chatMessages").appendChild(node);
  $("chatMessages").scrollTop = $("chatMessages").scrollHeight;
}
function sendChat(text) {
  const clean = text.trim();
  if (!clean) return;
  addMessage(clean, "user");
  window.setTimeout(() => addMessage(getResponse(clean), "bot"), 220);
}
$("chatForm").addEventListener("submit", (e) => {
  e.preventDefault();
  sendChat($("chatInput").value);
  $("chatInput").value = "";
});
document.querySelectorAll("[data-prompt]").forEach(btn => btn.addEventListener("click", () => {
  const prompts = {
    blur: currentLanguage === "hi" ? "मुझे धुंधला दिखता है" : "I have blurred vision",
    itch: currentLanguage === "hi" ? "मेरी आँखों में खुजली है" : "My eyes are itchy",
    screen: currentLanguage === "hi" ? "स्क्रीन देखने से आँखों में थकान होती है" : "I have screen strain",
    emergency: currentLanguage === "hi" ? "मेरी आँख में अचानक गंभीर समस्या है" : "I have sudden severe eye symptoms"
  };
  sendChat(prompts[btn.dataset.prompt]);
}));

function setMinDate(id) {
  const el = $(id);
  if (!el) return;
  const today = new Date();
  const local = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];
  el.min = local;
}
setMinDate("transportDate");
setMinDate("patientDate");

$("transportForm").addEventListener("submit", (e) => {
  e.preventDefault();
  $("transportStatus").textContent = currentLanguage === "hi"
    ? "डेमो अनुरोध तैयार है, लेकिन कहीं भेजा नहीं गया। वास्तविक बुकिंग के लिए क्लिनिक से संपर्क करें।"
    : "Demo request prepared but not sent anywhere. Contact the clinic for an actual transport booking.";
});
$("appointmentForm").addEventListener("submit", (e) => {
  e.preventDefault();
  $("appointmentStatus").textContent = currentLanguage === "hi"
    ? "डेमो अनुरोध दर्ज किया गया है, लेकिन क्लिनिक को नहीं भेजा गया। वास्तविक अपॉइंटमेंट की पुष्टि के लिए क्लिनिक से संपर्क करें।"
    : "Demo request recorded on this page, but not sent to a clinic. Contact the clinic to confirm a real appointment.";
});
setLanguage("en");
