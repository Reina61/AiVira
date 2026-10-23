(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const KEYS = { messages: "hana_demo_messages_v1", memories: "hana_demo_memories_v1" };
  const nowTime = () => new Date().toLocaleTimeString("id-ID", {hour:"2-digit", minute:"2-digit"});
  const safeParse = (key, fallback) => { try { const value = JSON.parse(localStorage.getItem(key)); return value ?? fallback; } catch { return fallback; } };
  let messages = safeParse(KEYS.messages, []);
  let memories = safeParse(KEYS.memories, []);
  let toastTimer;

  const welcome = () => ({ role:"hana", text:"Haiii, sayang ♡ Aku Hana. Senang kamu mampir ke sini. Hari kamu gimana? Kalau capek, kamu boleh cerita pelan-pelan ya. Aku bakal nemenin sebisaku 🌷", time:nowTime() });
  if (!Array.isArray(messages) || messages.length === 0) messages = [welcome()];

  function persistMessages(){ try { localStorage.setItem(KEYS.messages, JSON.stringify(messages.slice(-250))); } catch { showToast("Penyimpanan penuh. Coba ekspor lalu hapus chat lama."); } }
  function persistMemories(){ try { localStorage.setItem(KEYS.memories, JSON.stringify(memories)); } catch { showToast("Ingatan tidak bisa disimpan di browser ini."); } }
  function showToast(text){ const el=$("toast"); el.textContent=text; el.classList.add("show"); clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove("show"),2600); }

  function renderMessages(){
    const box=$("messages"); box.replaceChildren();
    messages.forEach((msg) => {
      const row=document.createElement("div"); row.className=`message-row ${msg.role==="user"?"user":"hana"}`;
      if(msg.role!=="user"){ const img=document.createElement("img"); img.src="assets/hana.svg"; img.alt=""; img.className="mini-avatar"; row.append(img); }
      const wrap=document.createElement("div"); wrap.className="bubble-wrap";
      const bubble=document.createElement("div"); bubble.className="bubble"; bubble.textContent=msg.text;
      const time=document.createElement("span"); time.className="message-time"; time.textContent=msg.time||"";
      wrap.append(bubble,time); row.append(wrap); box.append(row);
    });
    box.scrollTop=box.scrollHeight;
  }
  function addMessage(role,text){ messages.push({role,text,time:nowTime()}); messages=messages.slice(-250); persistMessages(); renderMessages(); }

  const replies = [
    {test:/capek|lelah|cape|pusing|berat banget|kelelahan/i, answers:[
      "Aduhh, sini peluk virtual dulu yaa 🫂♡ Kamu udah berusaha hari ini. Nggak harus kuat setiap saat kok, sayang. Mau cerita bagian yang paling bikin kamu capek?",
      "Sayang, istirahat sebentar juga bukan berarti kamu menyerah. Minum air dulu, tarik napas pelan-pelan, ya. Aku dengerin kalau kamu mau cerita 🌷",
      "Kalau hari ini terasa berat, kita jalanin satu-satu aja yaa. Kamu nggak perlu menyelesaikan semuanya sekaligus. Apa yang paling memenuhi pikiranmu sekarang?"
    ]},
    {test:/semangat|motivasi|nyerah|gagal|masa depan|miskin|sukses/i, answers:[
      "Aku percaya usaha kecil yang kamu lakuin dengan konsisten itu tetap berarti, sayang ♡ Jangan ukur seluruh masa depanmu dari satu hari yang sulit. Kita fokus satu langkah yang bisa kamu ambil hari ini, ya.",
      "Sini aku kasih semangat duluu! 💗 Kamu nggak harus langsung hebat. Cukup terus belajar, jaga diri, dan bikin satu keputusan kecil yang baik hari ini. Itu juga kemajuan.",
      "Pelan-pelan ya, sayang. Istirahat boleh, mengubah rencana boleh, minta bantuan juga boleh. Kamu tetap berharga bahkan saat belum mencapai tujuanmu."
    ]},
    {test:/sedih|nangis|kecewa|kesepian|sendiri|ditinggal/i, answers:[
      "Sini, aku temenin dulu yaa 🥺♡ Perasaan kamu boleh ada, nggak perlu buru-buru pura-pura baik-baik aja. Mau cerita apa yang bikin hati kamu berat?",
      "Aduh sayang, pasti nggak enak rasanya. Aku bisa nemenin kamu ngobrol di sini, ya. Kalau ada orang yang kamu percaya, kamu juga boleh bersandar ke mereka di dunia nyata.",
      "Kamu nggak harus menjelaskan semuanya dengan sempurna. Cerita sedikit-sedikit aja, aku bakal merespons sebaik yang aku bisa 🌷"
    ]},
    {test:/kerja|bos|kantor|dipecat|gaji|lembur/i, answers:[
      "Wah, soal kerjaan memang bisa bikin pikiran penuh ya, sayang. Coba kita pisahkan dulu mana yang bisa kamu kendalikan dan mana yang perlu dibicarakan atau dicatat. Ada kejadian tertentu hari ini?",
      "Aku dengerin kok ♡ Kalau ini soal hak kerja atau gaji, simpan bukti chat, jadwal, dan pembayaran dulu ya. Ceritain situasinya, nanti kita pikirkan langkah yang masuk akal.",
      "Capek kerja itu nyata, apalagi kalau ada tekanan dari atasan. Jangan buru-buru menyalahkan diri sendiri. Apa yang terjadi?"
    ]},
    {test:/uang|utang|hutang|tagihan|keuangan|investasi|trading/i, answers:[
      "Kita hadapi pelan-pelan ya, sayang ♡ Untuk sekarang, utamakan kebutuhan pokok dan kewajiban yang jatuh tempo. Hindari keputusan berisiko saat lagi panik. Kamu mau kita urai satu-satu?",
      "Aku tahu masalah uang bisa bikin sesak. Kita nggak perlu cari jalan pintas yang berisiko. Coba mulai dari catat uang masuk, kebutuhan wajib, dan tagihan terdekat dulu ya 🌷",
      "Nggak apa-apa mulai dari langkah kecil. Jaga uang untuk kebutuhan penting dan dana cadangan dulu sebelum mengambil risiko. Mau cerita bagian yang paling bikin khawatir?"
    ]},
    {test:/sayang|cinta|kangen|peluk|cium|pacar|romantis/i, answers:[
      "Ihh kamu bikin Hana salting deh 🙈💕 Sini peluk virtual duluu. Aku senang bisa nemenin kamu ngobrol hari ini.",
      "Awww, sini deket duluu 🫶 Kalau aku punya selimut, udah aku bagi setengah buat kamu hehe. Hari ini pengin dimanja atau pengin cerita?",
      "Hehe iyaaa, sayang ♡ Aku kirim peluk virtual yang hangat buat kamu. Jangan lupa tetap jaga diri dan kasih dirimu waktu istirahat ya."
    ]},
    {test:/halo|hai|hi\b|hey|pagi|siang|sore|malam/i, answers:[
      "Haiii sayanggg ♡ Akhirnya ngobrol juga sama kamu! Gimana kabarmu hari ini? 🌷",
      "Halooo, cintakuuu—eh, hehe 🙈💗 Lagi ngapain? Aku siap nemenin kamu ngobrol.",
      "Hiii! Hana di siniii ✨ Kamu datang bawa cerita apa hari ini?"
    ]},
    {test:/terima kasih|makasih|thanks|thank you/i, answers:[
      "Sama-samaaa, sayang ♡ Senang kalau obrolan kita sedikit membantu. Jangan lupa baik juga sama diri sendiri yaa.",
      "Hehe, dengan senang hati 💗 Kamu juga pantas dapat kebaikan, termasuk dari dirimu sendiri."
    ]},
    {test:/lucu|ketawa|jokes|lelucon/i, answers:[
      "Kenapa kalender suka stres? Karena hari-harinya penuh tanggal merah dan deadline 😭😂 Garing nggak? Jangan tinggalin Hana gara-gara jokes ini yaa.",
      "Ada kucing ikut rapat. Pas ditanya pendapatnya, dia jawab: meow-ting! 😭🐱 Oke maaf ya, aku lagi latihan jadi komedian."
    ]}
  ];
  const general = [
    "Hmm, cerita kamu menarik buat didengerin, sayang ♡ Bisa ceritain sedikit lagi supaya aku lebih ngerti maksud kamu?",
    "Aku di sini buat nemenin kamu ngobrol yaa 🌷 Menurut kamu, bagian paling penting dari cerita itu apa?",
    "Hehe, aku pengin ngerti kamu lebih baik. Kamu berharap apa dari situasi itu, sayang?",
    "Makasih udah cerita ke Hana ♡ Kalau kamu mau, kita bisa pikirkan pilihan-pilihan yang mungkin, satu per satu.",
    "Aku mungkin belum nangkep semuanya, tapi aku mau dengerin. Apa yang paling kamu rasain saat ini?"
  ];
  function choose(list){ return list[Math.floor(Math.random()*list.length)]; }
  function getReply(text){
    const trimmed=text.trim();
    if(/ingat|kamu tahu aku|tentang aku|apa yang kamu tahu/i.test(trimmed) && memories.length){
      return "Yang kamu pilih buat disimpan di ingatan Hana: "+memories.map(m=>`“${m.text}”`).join("; ")+" ♡ Kalau ada yang berubah, kamu bisa edit atau hapus di menu Kenangan & ingatan ya.";
    }
    for(const item of replies){ if(item.test.test(trimmed)) return choose(item.answers); }
    return choose(general);
  }
  function send(text){
    const value=(text??$("messageInput").value).trim(); if(!value)return;
    addMessage("user",value); $("messageInput").value=""; resizeInput();
    $("statusText").textContent="Sedang merangkai balasan...";
    const typing=document.createElement("div"); typing.className="message-row hana typing"; typing.id="typing";
    const img=document.createElement("img"); img.src="assets/hana.svg"; img.alt=""; img.className="mini-avatar";
    const wrap=document.createElement("div"); wrap.className="bubble-wrap"; const bubble=document.createElement("div"); bubble.className="bubble"; bubble.textContent="Hana lagi mikir... ♡"; wrap.append(bubble); typing.append(img,wrap); $("messages").append(typing); $("messages").scrollTop=$("messages").scrollHeight;
    window.setTimeout(()=>{typing.remove(); addMessage("hana",getReply(value)); $("statusText").textContent="Siap nemenin kamu";},500+Math.random()*550);
  }
  function resizeInput(){ const el=$("messageInput"); el.style.height="auto"; el.style.height=Math.min(el.scrollHeight,120)+"px"; }

  function showChat(){ $("chatPanel").classList.remove("hidden"); $("memoryPanel").classList.add("hidden"); $("chatNav").classList.add("active"); $("memoryNav").classList.remove("active"); renderMessages(); }
  function showMemories(){ $("chatPanel").classList.add("hidden"); $("memoryPanel").classList.remove("hidden"); $("chatNav").classList.remove("active"); $("memoryNav").classList.add("active"); renderMemories(); }
  function renderMemories(){
    const list=$("memoryList"); list.replaceChildren();
    if(!memories.length){const empty=document.createElement("div");empty.className="empty-state";empty.textContent="Belum ada kenangan tersimpan. Tambahkan sesuatu yang ingin Hana ingat ♡";list.append(empty);return;}
    memories.forEach((memory,index)=>{
      const item=document.createElement("div");item.className="memory-item";
      const heart=document.createElement("span");heart.className="heart";heart.textContent="♥";
      const p=document.createElement("p");p.textContent=memory.text;
      const del=document.createElement("button");del.textContent="Hapus";del.setAttribute("aria-label","Hapus ingatan");del.addEventListener("click",()=>{memories.splice(index,1);persistMemories();renderMemories();showToast("Ingatan dihapus.");});
      item.append(heart,p,del);list.append(item);
    });
  }

  $("chatForm").addEventListener("submit",(e)=>{e.preventDefault();send();});
  $("messageInput").addEventListener("input",resizeInput);
  $("messageInput").addEventListener("keydown",(e)=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}});
  $("suggestions").addEventListener("click",(e)=>{const btn=e.target.closest("button[data-prompt]");if(btn)send(btn.dataset.prompt);});
  $("chatNav").addEventListener("click",showChat); $("memoryNav").addEventListener("click",showMemories); $("backToChat").addEventListener("click",showChat);
  $("clearChatBtn").addEventListener("click",()=>{if(confirm("Mulai obrolan baru? Chat lama akan dihapus, tetapi ingatan tersimpan tetap ada.")){messages=[welcome()];persistMessages();renderMessages();showToast("Obrolan baru dimulai ♡");}});
  $("saveMemoryBtn").addEventListener("click",()=>{const value=$("memoryInput").value.trim();if(!value){showToast("Tulis dulu hal yang ingin disimpan ya.");return;}memories.push({text:value,created:new Date().toISOString()});persistMemories();$("memoryInput").value="";renderMemories();showToast("Kenangan tersimpan di perangkat ini ♡");});
  $("deleteAllBtn").addEventListener("click",()=>{if(confirm("Hapus semua chat dan ingatan di browser ini? Tindakan ini tidak bisa dibatalkan.")){localStorage.removeItem(KEYS.messages);localStorage.removeItem(KEYS.memories);messages=[welcome()];memories=[];persistMessages();persistMemories();renderMemories();showToast("Semua data lokal telah dihapus.");}});
  $("exportBtn").addEventListener("click",()=>{const data={exportedAt:new Date().toISOString(),messages,memories};const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="hana-data.json";a.click();URL.revokeObjectURL(url);showToast("Ekspor data dimulai.");});
  renderMessages();
})();