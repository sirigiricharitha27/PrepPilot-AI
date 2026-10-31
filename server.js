const http=require('http');
const crypto=require('crypto');
const fs=require('fs');
const path=require('path');
const {C,M,Q,A}=require('./data');
const {buildBank}=require('./content-bank');
const PORT=process.env.PORT||3000;
const pub=path.join(__dirname,'public');
const dataDir=path.join(__dirname,'user-data');
const usersFile=path.join(dataDir,'users.json');
fs.mkdirSync(dataDir,{recursive:true});
let users={}; try{users=JSON.parse(fs.readFileSync(usersFile,'utf8'))}catch{}
const sessions=new Map();
const persistUsers=()=>fs.writeFileSync(usersFile,JSON.stringify(users,null,2));
const getSession=req=>{const m=(req.headers.cookie||'').match(/(?:^|; )pp_session=([^;]+)/);return m?sessions.get(decodeURIComponent(m[1])):null};
const safeUser=u=>({id:u.id,email:u.email,name:u.name,profile:u.profile,records:u.records,learning:u.learning});
const hashPassword=(password,salt)=>crypto.scryptSync(password,salt,64).toString('hex');
const timingSafeEqualHex=(a,b)=>{try{const x=Buffer.from(a,'hex'),y=Buffer.from(b,'hex');return x.length===y.length&&crypto.timingSafeEqual(x,y)}catch{return false}};
const conceptNames=Object.fromEntries(C.map(c=>[c.id,c.name]));
const explanations={
 q0:'Electric charge is conserved in a series circuit. The same current flows through every component because there is only one path.',
 q1:'Current is charge flowing per second: I = Q ÷ t = 12 C ÷ 4 s = 3 A.',
 q2:'Potential difference is the energy transferred per unit charge between two points. It is measured in volts.',
 q3:'For the same material and cross-sectional area, resistance increases with wire length. Doubling the length doubles the resistance.',
 q4:'At constant temperature, resistance is a property of the resistor. Increasing current does not by itself change its resistance.',
 q5:'Ohm’s law gives I = V ÷ R = 12 ÷ 4 = 3 A.',
 q6:'The total series resistance is 6 + 6 = 12 ohms. Current = V ÷ R = 12 ÷ 12 = 1 A. (Check the options: this question’s correct option is being reviewed.)',
 q7:'For two equal 6-ohm resistors in parallel, the equivalent resistance is half of one resistor: 3 ohms.',
 q8:'In parallel, each branch is connected across the same two battery terminals, so each bulb has the full 6 V across it.',
 q9:'For a fixed voltage, P = V²/R. A smaller resistance dissipates more power, so the 10-ohm resistor dissipates more.',
 q10:'The angle to the normal is 90° − 30° = 60°. The angle of reflection equals the angle of incidence, measured from the normal.',
 q11:'A plane mirror forms an image the same size as the object and the same distance behind the mirror as the object is in front.',
 q12:'When light travels from air into glass, it slows down and bends towards the normal (unless it enters along the normal).',
 q13:'For an object beyond 2F of a convex lens, the image is real, inverted and smaller, formed between F and 2F.',
 q14:'Using 1/v − 1/u = 1/f, with u = −30 cm and f = +10 cm: 1/v + 1/30 = 1/10, so 1/v = 1/15 and v = +15 cm.'
};
const hints={
 q0:'Think about whether charge disappears inside a bulb or continues around the circuit.',
 q1:'Use the relationship current = charge ÷ time.',
 q2:'Think about how much energy each coulomb of charge transfers.',
 q3:'Recall how resistance depends on the length of a wire.',
 q4:'For an ohmic resistor at constant temperature, what does the ratio V/I represent?',
 q5:'Rearrange Ohm’s law to make current the subject.',
 q6:'Add the resistances first, then use current = voltage ÷ total resistance.',
 q7:'Two equal resistors in parallel have an equivalent resistance smaller than either resistor.',
 q8:'Each parallel branch connects to both battery terminals.',
 q9:'For a fixed voltage, compare P = V²/R.',
 q10:'Angles of incidence and reflection are measured from the normal, not from the mirror surface.',
 q11:'A plane mirror image distance equals the object distance.',
 q12:'Glass is optically denser than air. Remember what happens to light speed.',
 q13:'Recall the image properties for an object beyond 2F of a convex lens.',
 q14:'Substitute the signed object distance and focal length into the given formula.'
};
const simple={
 q1:'Current tells us how much charge passes each second. 12 coulombs in 4 seconds means 12 divided by 4, which is 3 amperes.',
 q5:'Ohm’s law says voltage = current × resistance. So current = 12 ÷ 4 = 3 amperes.',
 q10:'The normal is an imaginary line at 90 degrees to the mirror. If the ray is 30 degrees from the mirror, it is 60 degrees from the normal.'
};
function question(q){
 return {id:q.id,c:q.c,cn:conceptNames[q.c]||'Electricity & Light',d:q.d,t:q.t,o:q.o,ans:q.ans,
 explanation:explanations[q.id]||`The correct answer is ${q.o[q.ans]}. Review the key concept and connect the information given in the question to the relevant rule or formula.`,
 simple:simple[q.id]||explanations[q.id]||`Start by identifying what the question tells you. Recall the key idea, then work through one step at a time.`,
 hint:hints[q.id]||'Identify the main concept being tested and recall the related rule or formula.'};
}
const J=(res,status,obj)=>{res.writeHead(status,{'content-type':'application/json; charset=utf-8','access-control-allow-origin':'*'});res.end(JSON.stringify(obj))};
function fallbackAnswer(question,subject,grade,image){
 if(image)return 'I received your image, but image understanding is not configured on this local version yet. To let me read photos of questions, add a supported AI API key on the server. You can type the question here in the meantime, and I’ll help explain it.';
 const q=(question||'').trim(),l=q.toLowerCase();
 if(!q)return 'Tell me what you are studying and what part is confusing. I can explain a concept, walk through a problem, or create a practice question.';
 if(/current.*(charge|time)|charge.*time|ohm.?s law|electric current/.test(l))return 'Let’s break it down. Electric current is the amount of electric charge passing a point each second. The formula is I = Q/t, where I is current in amperes, Q is charge in coulombs, and t is time in seconds. For example, 12 C passing in 4 s gives I = 12/4 = 3 A. Want to try a similar question?';
 if(/fraction/.test(l))return 'A fraction represents part of a whole. The bottom number (denominator) tells how many equal parts the whole is split into; the top number (numerator) tells how many parts we have. For example, 3/4 means 3 out of 4 equal parts. What part of fractions are you working on?';
 if(/photosynthesis/.test(l))return 'Photosynthesis is how green plants make food. They use light energy, water and carbon dioxide to make glucose, releasing oxygen. A simple summary is: carbon dioxide + water + light → glucose + oxygen. Chlorophyll in leaves captures light energy.';
 if(/explain.*simple|simpler|class 5/.test(l))return `Of course! I’ll keep it simple. ${q.replace(/[?]+$/,'')} means we should focus on one idea at a time. Tell me the exact topic or paste the question, and I’ll use a simple example.`;
 if(/quiz|practice question|test me/.test(l))return 'Quick practice: A charge of 10 coulombs passes a point in 2 seconds. What is the current? A) 5 A  B) 12 A  C) 20 A. Reply with A, B, or C and I’ll explain it.';
 if(/why/.test(l))return `Good question! The key is to connect the rule to what is happening, not just memorise the answer. For “${q}”, first identify the concept, then list what is known and what needs to be found. If you share the exact textbook question or the answer you tried, I can walk through it more precisely.`;
 return `Let’s work through this together. For ${subject||'this topic'} (Class ${grade||'—'}), start by identifying the key concept and the information the question gives you. I can help more precisely if you share the full question, any answer choices, or the step where you got stuck. This local demo is using a lightweight built-in response; configure an AI API key for more flexible, context-aware tutoring.`;
}
async function assistant(b){
 const key=process.env.BHARATCODE_API_KEY;
 if(!key)return {answer:fallbackAnswer(b.question,b.subject,b.grade,b.image),mode:'built-in demo',imageSupported:false,needsApiKey:true};
 try{
  const content=[];
  const prompt=`You are PrepPilot AI, a warm, careful school study tutor. Student is in Class ${b.grade||'not specified'}, subject ${b.subject||'not specified'}. Explain at their age level, step by step, and encourage understanding rather than simply giving answers. For schoolwork, show the method and a concise final answer. If the student asks a follow-up, answer it directly. Be honest if a photo is blurry or the question is ambiguous. Student question: ${b.question||'Please read the attached image and explain the question.'}`;
  if(b.image&&typeof b.image==='string'){
   if(!/^data:image\/(?:png|jpeg|webp|gif);base64,/.test(b.image))return {answer:'I could not read that image format. Please upload a PNG, JPG, or WEBP image.',mode:'AI'};
   content.push({type:'text',text:prompt});
   content.push({type:'image_url',image_url:{url:b.image}});
  }
  const messageContent=content.length?content:prompt;
  const resp=await fetch(process.env.BHARATCODE_API_URL||'https://bharatcode.ai/api/model/v1/chat/completions',{
   method:'POST',
   headers:{'content-type':'application/json','authorization':`Bearer ${key}`},
   body:JSON.stringify({model:process.env.BHARATCODE_MODEL||'qwen-3.8-27b',messages:[{role:'user',content:messageContent}],max_tokens:900,temperature:0.4})
  });
  const j=await resp.json().catch(()=>({}));
  if(!resp.ok)throw new Error(j.error?.message||j.message||`BharatCode request failed (${resp.status})`);
  const answer=j.choices?.[0]?.message?.content;
  if(typeof answer!=='string'||!answer.trim())throw new Error('The AI service returned an empty response. Please try again.');
  return {answer:answer.trim(),mode:'BharatCode AI',imageSupported:true};
 }catch(e){
  const msg=String(e.message||'Unknown error').replace(/[\r\n]+/g,' ').slice(0,240);
  return {answer:`The AI service could not respond right now: ${msg}. Check your BharatCode API access and try again.`,mode:'AI unavailable'};
 }
}
async function route(req,res,url,body){
 if(req.method==='OPTIONS'){res.writeHead(204,{'access-control-allow-origin':'*','access-control-allow-methods':'GET,POST,OPTIONS','access-control-allow-headers':'content-type'});return res.end()}
 if(url.pathname==='/api/auth/signup'&&req.method==='POST'){
  const email=String(body?.email||'').trim().toLowerCase(),password=String(body?.password||''),name=String(body?.name||'').trim().slice(0,80);
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return J(res,400,{error:'Enter a valid email address.'});
  if(password.length<8)return J(res,400,{error:'Password must be at least 8 characters.'});
  if(!name)return J(res,400,{error:'Enter your name.'});
  if(users[email])return J(res,409,{error:'An account with this email already exists. Please sign in.'});
  const salt=crypto.randomBytes(16).toString('hex'),u={id:crypto.randomUUID(),email,name,salt,passwordHash:hashPassword(password,salt),profile:{name,grade:'10',curriculum:'CBSE',subject:'Science',difficulty:'Medium'},records:[],learning:{answered:0,correct:0,concepts:{},reports:[],reviews:[]}};
  users[email]=u;persistUsers();const token=crypto.randomBytes(32).toString('hex');sessions.set(token,email);res.setHeader('Set-Cookie',`pp_session=${token}; HttpOnly; SameSite=Lax; Path=/`);return J(res,201,{user:safeUser(u)});
 }
 if(url.pathname==='/api/auth/login'&&req.method==='POST'){
  const email=String(body?.email||'').trim().toLowerCase(),password=String(body?.password||''),u=users[email];
  if(!u||!timingSafeEqualHex(hashPassword(password,u.salt),u.passwordHash))return J(res,401,{error:'Email or password is incorrect.'});
  const token=crypto.randomBytes(32).toString('hex');sessions.set(token,email);res.setHeader('Set-Cookie',`pp_session=${token}; HttpOnly; SameSite=Lax; Path=/`);return J(res,200,{user:safeUser(u)});
 }
 if(url.pathname==='/api/auth/logout'&&req.method==='POST'){
  const m=(req.headers.cookie||'').match(/(?:^|; )pp_session=([^;]+)/);if(m)sessions.delete(decodeURIComponent(m[1]));res.setHeader('Set-Cookie','pp_session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0');return J(res,200,{ok:true});
 }
 if(url.pathname==='/api/auth/me'&&req.method==='GET'){
  const email=getSession(req),u=email&&users[email];return J(res,200,{user:u?safeUser(u):null});
 }
 if(url.pathname==='/api/progress'&&req.method==='GET'){
  const email=getSession(req),u=email&&users[email];if(!u)return J(res,401,{error:'Please sign in.'});return J(res,200,{profile:u.profile,records:u.records,learning:u.learning});
 }
 if(url.pathname==='/api/progress'&&req.method==='POST'){
  const email=getSession(req),u=email&&users[email];if(!u)return J(res,401,{error:'Please sign in.'});
  const b=body||{};if(b.profile&&typeof b.profile==='object')u.profile={...u.profile,name:String(b.profile.name||u.name).slice(0,80),grade:String(b.profile.grade||'10'),curriculum:String(b.profile.curriculum||'CBSE'),subject:String(b.profile.subject||'Science'),difficulty:String(b.profile.difficulty||'Medium')};
  if(Array.isArray(b.records))u.records=b.records.slice(-500);if(b.learning&&typeof b.learning==='object')u.learning=b.learning;u.name=u.profile.name||u.name;persistUsers();return J(res,200,{ok:true});
 }

 if(url.pathname==='/api/questions'&&req.method==='POST'){
  const b=body||{},subject=String(b.subject||'Science'),grade=String(b.grade||'5');
  let qs=buildBank(grade,subject);
  const d={Easy:1,Medium:2,Hard:3}[b.difficulty]||2;
  // All questions are selected from the age-band bank for the chosen grade/subject.
  // Difficulty selection controls the learning framing and prioritises matching items;
  // test mode keeps the assessment set coherent and hides all feedback until submission.
  qs=qs.map((q,i)=>({...q,difficulty:b.difficulty||'Medium',d:Math.abs(q.d-d)<=1?q.d:d}));
  if(b.test){
   const count=Math.max(1,Math.min(qs.length,Number(b.count)||6));
   let pool=[...qs].sort((a,b)=>Math.abs(a.d-d)-Math.abs(b.d-d));
   const out=pool.slice(0,count);
   return J(res,200,{questions:out,bankSize:qs.length,notice:`Starter practice bank: Class ${grade} · ${subject}`});
  }
  const seen=new Set(b.seen||[]);let pool=qs.filter(q=>!seen.has(q.id));if(!pool.length)pool=qs;
  pool.sort((a,b)=>Math.abs(a.d-d)-Math.abs(b.d-d));
  return J(res,200,{questions:pool,bankSize:qs.length,notice:`Starter practice bank: Class ${grade} · ${subject}`});
 }
 if(url.pathname==='/api/explain'&&req.method==='POST'){
  const b=body||{},text=String(b.text||'').toLowerCase(),concept=String(b.concept||'Electric current');
  const keys={
   'Electric current':['charge','flow','ampere','second','current'],
   'Potential difference':['energy','charge','volt','voltage'],
   'Resistance':['resistance','opposes','current','voltage'],
   "Ohm's law":['voltage','current','resistance','v=i','ohm'],
   'Series circuits':['series','same current','path','add'],
   'Parallel circuits':['parallel','same voltage','branch'],
   'Reflection':['normal','angle','incidence','reflection'],
   'Refraction':['light','speed','normal','bend'],
   'Lenses':['convex','concave','focus','image']
  };
  const terms=keys[concept]||['concept','example','because'];const hit=terms.filter(k=>text.includes(k));const missing=terms.filter(k=>!hit.includes(k));const score=Math.min(10,Math.round((hit.length/terms.length)*8+Math.min(2,text.split(/\\s+/).length/35)*1));
  return J(res,200,{score,hit,missing,feedback:score>=8?'Great job explaining the key ideas. Add a real-world example to make it even clearer.':score>=5?'You have some of the idea. Try including the missing key terms and explain how they connect.':'Good start. Try defining the concept first, then explain how it works and give a simple example.',mode:'keyword rubric demo'});
 }
 if(url.pathname==='/api/assistant'&&req.method==='POST')return J(res,200,await assistant(body||{}));
 if(url.pathname==='/api/health')return J(res,200,{ok:true,aiConfigured:!!process.env.BHARATCODE_API_KEY,questionBank:'Classes 1–10; Mathematics, Science, Physics, Chemistry, Biology, Social Studies, English; six starter questions per grade/subject selection'});
 if(req.method==='GET'){
  const pathname=decodeURIComponent(url.pathname==='/ '?'/':url.pathname);
  const f=path.resolve(pub,pathname==='/'?'index.html':'.'+pathname);
  if(f.startsWith(path.resolve(pub)+path.sep)||f===path.join(pub,'index.html')){
   if(fs.existsSync(f)&&fs.statSync(f).isFile()){
    const ext=path.extname(f);const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml'};
    res.writeHead(200,{'content-type':types[ext]||'application/octet-stream'});return fs.createReadStream(f).pipe(res);
   }
  }
 }
 return J(res,404,{error:'Not found'});
}
http.createServer((req,res)=>{
 let raw='';req.on('data',chunk=>{raw+=chunk;if(raw.length>9*1024*1024){raw='';res.writeHead(413);res.end('Request too large');req.destroy()}});req.on('end',async()=>{try{let body=raw?JSON.parse(raw):{};await route(req,res,new URL(req.url,'http://localhost'),body)}catch(e){J(res,500,{error:'Server error',detail:e.message})}});
}).listen(PORT,()=>console.log(`PrepPilot AI running at http://localhost:${PORT}`));
