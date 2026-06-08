/* ============ The Ick — Shared JS ============ */

/* ----- Deterministic fake data engine ----- */
const FIRST_NAMES = ["sofia","ana","maria","emma","alex","nina","ryan","marcus","lily","omar","zoe","mike","sarah","luca","ines","leo","carla","diego","raluca","andrei","isabela","matei","iulia","florin","vlad","elena","stefan","miruna","tudor","alina"];
const LAST = ["styles","official","ldn","vibes","x","rose","wild","art","studio","gram","world","daily","club","_","mood","core"];
const CITIES = ["London","Bucharest","Paris","Milan","New York","Berlin","Madrid","Lisbon","Amsterdam","Vienna"];
const BIOS = ["✨ living my best life","📍 wherever the wifi takes me","coffee · books · sunsets 🌅","just here for the vibes","DM for collabs 💌"];

function hashStr(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}
function makeRng(seed){let s=seed||1;return()=>{s=(s*1664525+1013904223)>>>0;return s/0xffffffff;};}
function pick(rng,arr){return arr[Math.floor(rng()*arr.length)];}
function makeUsername(rng){const f=pick(rng,FIRST_NAMES),l=pick(rng,LAST),sep=rng()>0.5?".":"_";return f+sep+l;}
function relTime(rng,i){if(i<3)return (Math.floor(rng()*50)+5)+"m ago";if(i<8)return (Math.floor(rng()*23)+1)+"h ago";return (Math.floor(rng()*14)+1)+"d ago";}
function avatarColor(seed){const h=seed%360;return `linear-gradient(135deg,hsl(${h} 75% 70%),hsl(${(h+40)%360} 75% 60%))`;}
function genActivity(rng,count){
  const out=[];
  for(let i=0;i<count;i++){
    const username=makeUsername(rng);
    const first=username.split(/[._]/)[0];
    out.push({
      username,
      fullName:first.charAt(0).toUpperCase()+first.slice(1),
      time:relTime(rng,i),
      verified:rng()>0.85,
      avatar:avatarColor(Math.floor(rng()*1000)),
      initial:first.charAt(0).toUpperCase()
    });
  }
  return out;
}

function generateReport(raw){
  const username=raw.replace(/^@/,"").toLowerCase();
  const seed=hashStr(username);
  const rng=makeRng(seed);
  const followers=Math.floor(rng()*50000)+800;
  const following=Math.floor(rng()*1500)+200;
  const male=Math.floor(rng()*60)+20;
  const female=100-male-3;
  return {
    username,
    displayName:username.split(/[._]/).map(p=>p.charAt(0).toUpperCase()+p.slice(1)).join(" "),
    bio:pick(rng,BIOS),
    avatar:avatarColor(seed%1000),
    initial:username.charAt(0).toUpperCase(),
    followers,following,
    posts:Math.floor(rng()*800)+30,
    newFollows:Math.floor(rng()*18)+3,
    newFollowers:Math.floor(rng()*120)+12,
    profileViews:Math.floor(rng()*800)+80,
    recentLikes:Math.floor(rng()*240)+30,
    growth:Math.round((rng()*18-2)*10)/10,
    engagement:Math.round((rng()*8+2)*10)/10,
    recentFollows:genActivity(rng,10),
    recentFollowers:genActivity(rng,10),
    profileViewers:genActivity(rng,8),
    recentLikers:genActivity(rng,8),
    genderBreakdown:{male,female,other:3},
    topLocations:CITIES.slice(0,5).map((city,i)=>({city,pct:Math.max(5,Math.floor(rng()*35)-i*4)})).sort((a,b)=>b.pct-a.pct),
    hourlyActivity:Array.from({length:24},()=>Math.floor(rng()*100))
  };
}

function fmtNum(n){
  if(n>=1_000_000)return (n/1_000_000).toFixed(1)+"M";
  if(n>=1_000)return (n/1_000).toFixed(1)+"K";
  return String(n);
}

/* ----- URL helpers ----- */
function getQueryUser(){
  const p=new URLSearchParams(location.search);
  return (p.get("u")||"").trim();
}
function goAnalyze(username){
  const u=username.replace(/^@/,"").trim();
  if(!u){return false;}
  location.href="analyzing.html?u="+encodeURIComponent(u);
  return true;
}

/* ----- LANDING ----- */
function initLanding(){
  const form=document.getElementById("search-form");
  if(form){
    form.addEventListener("submit",e=>{
      e.preventDefault();
      const input=document.getElementById("search-input");
      const err=document.getElementById("search-error");
      const v=input.value.trim();
      if(!v){err.textContent="Enter a username.";return;}
      if(v.length<2){err.textContent="Username is too short.";return;}
      err.textContent="";
      goAnalyze(v);
    });
  }
  // FAQ toggles
  document.querySelectorAll(".faq-q").forEach(q=>{
    q.addEventListener("click",()=>q.parentElement.classList.toggle("open"));
  });
  // Live counter
  const live=document.getElementById("live-count");
  if(live){
    let n=180+Math.floor(Math.random()*40);
    live.textContent=n;
    setInterval(()=>{n+=Math.floor(Math.random()*3);live.textContent=n;},2200);
  }
}

/* ----- ANALYZING ----- */
function initAnalyzing(){
  const username=getQueryUser();
  if(!username){location.href="index.html";return;}
  const data=generateReport(username);
  document.getElementById("a-handle").textContent="@"+data.username;
  const av=document.getElementById("a-avatar");
  av.style.background=data.avatar;
  av.textContent=data.initial;

  const steps=Array.from(document.querySelectorAll(".step"));
  const fill=document.getElementById("progress-fill");
  const pct=document.getElementById("progress-pct");
  const status=document.getElementById("a-status");
  const messages=[
    "Connecting to profile…",
    "Scanning recent followers…",
    "Analyzing profile views…",
    "Processing likes and activity…",
    "Compiling detailed report…"
  ];
  let i=0;
  const total=steps.length;
  function tick(){
    if(i<total){
      if(i>0)steps[i-1].classList.replace("active","done");
      steps[i].classList.add("active");
      status.textContent=messages[i];
      const p=Math.round(((i+1)/total)*100);
      fill.style.width=p+"%";
      pct.textContent=p+"%";
      i++;
      setTimeout(tick,900+Math.random()*500);
    }else{
      steps[total-1].classList.replace("active","done");
      status.textContent="Report ready — redirecting…";
      setTimeout(()=>{location.href="report.html?u="+encodeURIComponent(username);},500);
    }
  }
  setTimeout(tick,400);
}

/* ----- REPORT ----- */
function initReport(){
  const username=getQueryUser();
  if(!username){location.href="index.html";return;}
  const d=generateReport(username);

  document.title="@"+d.username+" — Report — The Ick";
  document.getElementById("r-handle").textContent="@"+d.username;
  document.getElementById("r-display").textContent=d.displayName;
  document.getElementById("r-bio").textContent=d.bio;
  const av=document.getElementById("r-avatar");
  av.style.background=d.avatar;
  av.textContent=d.initial;
  document.getElementById("r-posts").textContent=fmtNum(d.posts);
  document.getElementById("r-followers").textContent=fmtNum(d.followers);
  document.getElementById("r-following").textContent=fmtNum(d.following);

  document.getElementById("k-newfollows").textContent=fmtNum(d.newFollows);
  document.getElementById("k-newfollows-d").textContent="+"+d.newFollows+" săptămâna asta";
  document.getElementById("k-newfollowers").textContent=fmtNum(d.newFollowers);
  document.getElementById("k-newfollowers-d").textContent="+"+d.growth+"% creștere";
  document.getElementById("k-views").textContent=fmtNum(d.profileViews);
  document.getElementById("k-likes").textContent=fmtNum(d.recentLikes);

  renderActivity("list-follows",d.recentFollows,"a urmărit");
  renderActivity("list-followers",d.recentFollowers,"l-a urmărit");
  renderActivity("list-viewers",d.profileViewers,"a vizualizat profilul");
  renderActivity("list-likers",d.recentLikers,"a dat like");

  // Gender bars
  setBar("g-female",d.genderBreakdown.female,"#e91e63");
  setBar("g-male",d.genderBreakdown.male,"#1a1625");
  setBar("g-other",d.genderBreakdown.other,"#6b6577");
  document.getElementById("g-female-v").textContent=d.genderBreakdown.female+"%";
  document.getElementById("g-male-v").textContent=d.genderBreakdown.male+"%";
  document.getElementById("g-other-v").textContent=d.genderBreakdown.other+"%";

  // Engagement
  document.getElementById("eng-val").textContent=d.engagement+"%";
  document.getElementById("eng-delta").textContent="+"+d.growth+"%";
  const hourly=document.getElementById("hourly");
  hourly.innerHTML=d.hourlyActivity.map(v=>`<div class="bar" style="height:${v}%"></div>`).join("");

  // Locations
  const loc=document.getElementById("locations");
  loc.innerHTML=d.topLocations.map(l=>`
    <div class="bar-row">
      <div class="lbl"><span>${l.city}</span><span style="color:var(--muted)">${l.pct}%</span></div>
      <div class="bar-track"><div class="bar-fill" style="width:${Math.max(5,l.pct*2.5)}%;background:var(--gradient-pill)"></div></div>
    </div>`).join("");

  document.getElementById("disclaimer-handle").textContent="@"+d.username;
}

function setBar(id,value,color){
  const el=document.getElementById(id);
  if(el){el.style.width=value+"%";el.style.background=color;}
}

function renderActivity(id,items,verb){
  const el=document.getElementById(id);
  if(!el)return;
  el.innerHTML=items.map(it=>`
    <li class="activity-item">
      <div class="activity-avatar" style="background:${it.avatar}">${it.initial}</div>
      <div class="activity-meta">
        <div class="activity-line1">
          <span class="activity-handle">@${it.username}</span>
          ${it.verified?'<span class="activity-verified">✓</span>':''}
        </div>
        <div class="activity-line2">${it.fullName} · ${verb}</div>
      </div>
      <span class="activity-time">${it.time}</span>
    </li>`).join("");
}

/* ----- Auto-init based on data attribute ----- */
document.addEventListener("DOMContentLoaded",()=>{
  const page=document.body.dataset.page;
  if(page==="landing")initLanding();
  else if(page==="analyzing")initAnalyzing();
  else if(page==="report")initReport();
});
