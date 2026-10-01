const poems=[
{title:"The Beginning",image:"images/page1.svg",poem:`Every journey starts with a single light,
A quiet dream in the middle of night.
The road may wander, the stars may fade,
But hope is the path that our hearts have made.`},
{title:"A Quiet Morning",image:"images/page2.svg",poem:`Morning arrives with a whisper so light,
Painting the sky in colors so bright.
The world wakes slowly, peaceful and new,
And every little dream feels possible too.`},
{title:"The Memory",image:"images/page3.svg",poem:`Some memories live where the heart keeps them safe,
Like songs that time can never erase.
A moment may pass, a season may fly,
Yet memories remain when years wander by.`},
{title:"Dreams",image:"images/page4.svg",poem:`Dreams are the wings of a hopeful soul,
They make broken pieces feel somehow whole.
Reach for the stars, even when they seem far,
For every bright future begins with a star.`},
{title:"The Rain",image:"images/page5.svg",poem:`Rain falls softly upon the earth,
Washing the silence with gentle rebirth.
Every drop carries a story unknown,
And every storm makes a garden its own.`},
{title:"Friendship",image:"images/page6.svg",poem:`A friend is a light on a difficult road,
A hand that helps carry a heavy load.
No matter how distant the seasons may be,
True friendship lives quietly.`},
{title:"The Journey",image:"images/page7.svg",poem:`Walk through the valleys,
Climb every hill,
Follow your heart,
And believe in it still.
The journey itself is a beautiful song,
Even when the road feels difficult and long.`},
{title:"Hope",image:"images/page8.svg",poem:`When darkness arrives and the night feels long,
Hope is the whisper that says, "Carry on."
A tiny flame can brighten the night,
A little hope can become a light.`},
{title:"The Heart",image:"images/page9.svg",poem:`The heart knows things the eyes cannot see,
It holds every dream of who we can be.
Listen closely when silence appears,
For the heart speaks softly beyond all our fears.`},
{title:"Forever",image:"images/page10.svg",poem:`Some stories end, but feelings remain,
Like flowers returning after the rain.
A final page is not goodbye,
It is another beginning beneath the sky.`}
];

let spread=-1,busy=false;
const coverScreen=document.getElementById("coverScreen"),bookScreen=document.getElementById("bookScreen"),backScreen=document.getElementById("backScreen");
const leftPage=document.getElementById("leftPage"),rightPage=document.getElementById("rightPage"),turnSheet=document.getElementById("turnSheet");
const turnFront=document.getElementById("turnFront"),turnBack=document.getElementById("turnBack"),prevBtn=document.getElementById("prevBtn"),nextBtn=document.getElementById("nextBtn");
const progressText=document.getElementById("progressText"),progressBar=document.getElementById("progressBar"),readingStatus=document.getElementById("readingStatus"),music=document.getElementById("bgMusic"),musicBtn=document.getElementById("musicBtn");

function openBook(){coverScreen.classList.add("hidden");backScreen.classList.add("hidden");bookScreen.classList.remove("hidden");spread=-1;renderSpread()}
function readAgain(){backScreen.classList.add("hidden");coverScreen.classList.remove("hidden");spread=-1}
function shell(content,num=""){return `<div class="page-content">${content}${num?`<div class="page-num">${num}</div>`:""}<div class="gutter-shade"></div></div>`}
function introHTML(){return shell(`<div class="intro"><div class="intro-inner"><div class="mini-ornament">✦</div><h2>Welcome</h2><p>Welcome to a small collection of thoughts, memories, dreams and feelings.</p><p>Turn the pages slowly and let each poem take you somewhere special.</p><p class="quote">“Every page is a doorway, and every poem is a journey.”</p></div></div>`)}
function poemHTML(item,num){return shell(`<div class="poetry"><div class="photo-frame"><img class="photo" src="${item.image}" alt="${item.title}"></div><div class="poem-copy"><div class="page-label">PAGE ${num} OF 10</div><h2>${item.title}</h2><div class="poem">${item.poem}</div></div></div>`,num)}
function thanksHTML(){return shell(`<div class="thanks"><div class="thanks-inner"><div class="medallion" style="margin:0 auto 20px"><img src="images/heart-pulse.svg" alt="Pulsing red heart with an ECG line"></div><h2>Thanks for Reading</h2><p>Thank you for spending these moments with this little collection of poems.</p><p>May you always find a beautiful story waiting on the next page of life.</p></div></div>`)}
function blankHTML(){return shell("")}

function renderSpread(){
  if(spread===-1){leftPage.innerHTML=introHTML();rightPage.innerHTML=blankHTML();progressText.textContent="Introduction";readingStatus.textContent="Introduction";progressBar.style.width="0%"}
  else if(spread<=4){
    const a=poems[spread*2],b=poems[spread*2+1];
    leftPage.innerHTML=poemHTML(a,spread*2+1);rightPage.innerHTML=b?poemHTML(b,spread*2+2):blankHTML();
    const first=spread*2+1,last=Math.min(spread*2+2,10);progressText.textContent=`Pages ${first}–${last}`;readingStatus.textContent=`Pages ${first}–${last}`;progressBar.style.width=`${last*10}%`
  }else{leftPage.innerHTML=thanksHTML();rightPage.innerHTML=blankHTML();progressText.textContent="Thanks for Reading";readingStatus.textContent="The End";progressBar.style.width="100%"}
  updateButtons()
}
function updateButtons(){prevBtn.disabled=false;nextBtn.textContent=spread===5?"Close Book":"Next ›";nextBtn.onclick=spread===5?closeBook:nextSpread}
function makeTurnContent(direction){
  if(direction==="forward"){
    turnFront.innerHTML=rightPage.innerHTML;
    const n=spread+1;
    turnBack.innerHTML=n===0?poemHTML(poems[0],1):n<=4?poemHTML(poems[n*2],n*2+1):n===5?thanksHTML():blankHTML();
    turnSheet.className="turn-sheet turn-forward"
  }else{
    turnFront.innerHTML=leftPage.innerHTML;
    const n=spread-1;
    turnBack.innerHTML=n===-1?introHTML():poemHTML(poems[n*2],n*2+1);
    turnSheet.className="turn-sheet turn-back"
  }
}
function animateTo(n,direction){
  if(busy)return;busy=true;makeTurnContent(direction);
  setTimeout(()=>{spread=n;renderSpread()},450);
  setTimeout(()=>{turnSheet.className="turn-sheet hidden";busy=false},1050)
}
function nextSpread(){if(spread<5)animateTo(spread+1,"forward")}
function previousSpread(){if(spread===-1){bookScreen.classList.add("hidden");coverScreen.classList.remove("hidden");return}if(spread>-1)animateTo(spread-1,"back")}
function closeBook(){bookScreen.classList.add("hidden");backScreen.classList.remove("hidden")}
async function toggleMusic(){
  if(music.paused){try{await music.play();musicBtn.textContent="♫ Music On"}catch(e){musicBtn.textContent="♫ Add music.mp3"}}else{music.pause();musicBtn.textContent="♫ Music Off"}
}
document.addEventListener("keydown",e=>{if(bookScreen.classList.contains("hidden")||busy)return;if(e.key==="ArrowRight")nextSpread();if(e.key==="ArrowLeft")previousSpread();if(e.key==="Escape")closeBook()});
coverScreen.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" ")openBook()});
renderSpread();
