const poems=[
{title:"A Language of Love",image:"images/pic1.jpg",poem:`If I could explain
you,
I’d need a language
made of dawn,
unfinished letters,
and all the things
I never knew how to say.
So I say your name,
and my heart
learns it by heart.`,quote:"You are not just a feeling. You are the quiet place my heart keeps returning to."},
{title:"Something About You",image:"images/pic2.png",poem:`There is something about you
that stays with me.
Maybe it is your smile,
or the way your eyes
soften the air around me.
Maybe it is the quiet way
you make my heart
feel safe.
Whatever it is.
I keep thinking about you.`,quote:"Some people are not just loved in parts. They are loved in every detail, every glance, every breath."},
{title:"A Voice Like Home",image:"images/pic3.jpg",poem:`When you speak,
my heart slows down.
Even silence seems to listen.
There is comfort in your voice,
a peace I cannot name,
like home arriving
without warning.` ,quote:"Some voices don’t just speak. They change the atmosphere around the heart."},
{title:"Your Name",image:"images/pic4.jpg",poem:`Your name is my favorite word.
Your voice is my favorite sound.
Your eyes are my favorite light.
Even silence feels beautiful
when it carries your presence.` ,quote:"The heart learns to worship the smallest things in the one it loves."},
{title:"What We Were",image:"images/pic5.jpg",poem:`What we were
was never easy to explain.
Not strangers,
not fully together,
but something warm,
quiet,
and deeply felt.
It lived between words,
in the pauses,
in the soft places
where love was trying to bloom.` ,quote:"Some feelings are too real to be named, yet too deep to be ignored."},
{title:"Only You",image:"images/pic6.jpg",poem:`There are a thousand faces.
But my heart still finds you.
Not because I am lost.
But because some hearts
know home before they know its name.
And yours is the one
I keep returning to.` ,quote:"In a crowded world, love is not about many options. It is about the one soul your heart keeps finding."},
{title:"Midnight Love",image:"images/pic7.jpg",poem:`I was your 2am.
Never your 2pm.
Your secret.
Never your story.
Your comfort.
Never your choice.
Still, I learned
that love can be quiet,
private,
and real.` ,quote:"Some loves are born in the quiet hours and remain true even when the world never witnesses them."},
{title:"If You Could Read My Mind",image:"images/pic8.jpg",poem:`If you could read my mind,
you would find
all my unfinished thoughts,
all the words I never said,
and every version of us
that existed only in silence.
Even now,
I am still learning
how to love you quietly.` ,quote:"Some love stories live in the heart as unfinished chapters, safe in silence and longing."},
{title:"Unfinished Without You",image:"images/pic9.jpg",poem:`Every place feels unfinished without you.
My heart keeps searching
through the noise,
through the crowd,
through the empty corners
where your name should be.
Even now,
I still feel the ache
of wanting you here.` ,quote:"Longing is not always loud. Sometimes it is the quiet ache of wanting the world to bring one person back."},
{title:"When the World Is Heavy",image:"images/pic10.jpg",poem:`When the world grows heavy,
when the night feels long,
look beside you.
If hope hides,
if your heart feels tired,
I will still be there.
Quiet, steady,
like a promise
that love can be
a place to rest.` ,quote:"Sometimes love is not a grand promise. It is simply being the person who stands beside someone when the world grows too loud."}
];

let spread=-1,busy=false;
const coverScreen=document.getElementById("coverScreen"),bookScreen=document.getElementById("bookScreen"),backScreen=document.getElementById("backScreen");
const leftPage=document.getElementById("leftPage"),rightPage=document.getElementById("rightPage"),turnSheet=document.getElementById("turnSheet");
const turnFront=document.getElementById("turnFront"),turnBack=document.getElementById("turnBack");
const progressText=document.getElementById("progressText"),progressBar=document.getElementById("progressBar"),readingStatus=document.getElementById("readingStatus");
const pageAudio=document.getElementById("pageAudio"),songToggle=document.getElementById("songToggle");
const pageSongs=["songs/jaudio1.mp3","songs/jaudio2.mp3","songs/jaudio3.mp3","songs/jaudio4.webm","songs/jaudio5.mp3"];
let activeSongSpread=-1;

function openBook(){stopPageSong(true);coverScreen.classList.add("hidden");backScreen.classList.add("hidden");bookScreen.classList.remove("hidden");spread=-1;renderSpread()}
function readAgain(){stopPageSong(true);backScreen.classList.add("hidden");coverScreen.classList.remove("hidden");spread=-1}
function shell(content,num=""){return `<div class="page-content">${content}${num?`<div class="page-num">${num}</div>`:""}<div class="gutter-shade"></div></div>`}
function introHTML(){return shell(`<div class="intro"><div class="intro-inner"><div class="mini-ornament">✦</div><h2>Welcome</h2><p>Welcome to a small collection of thoughts, memories, dreams and feelings.</p><p>Turn the pages slowly and let each poem take you somewhere special.</p><p class="quote">"Every page is a doorway, and every poem is a journey."</p></div></div>`) }
function poemHTML(item,num){const quote=item.quote?`<blockquote class="story-quote">"${item.quote}"</blockquote>`:"";return shell(`<div class="poetry"><div class="photo-frame"><img class="photo" src="${item.image}" alt="${item.title}"></div><div class="poem-copy"><h2>${item.title}</h2><div class="poem">${item.poem}</div>${quote}</div></div>`,num)}
function thanksHTML(){return shell(`<div class="thanks"><div class="thanks-inner"><div class="medallion" style="margin:0 auto 20px"><img src="images/heart-pulse.svg" alt="Pulsing red heart with an ECG line"></div><h2>Thanks for Reading</h2><p>Thank you for spending these moments with this little collection of poems.</p><p>May you always find a beautiful story waiting on the next page of life.</p></div></div>`)}
function blankHTML(){return shell("")}

function updateSongButton(){
  const playing=!pageAudio.paused;
  songToggle.setAttribute("aria-pressed",String(playing));
  songToggle.disabled=activeSongSpread<0;
  songToggle.classList.toggle("hidden",activeSongSpread<0);
  const label=activeSongSpread<0?"No song on this page":playing?"Stop song":"Play song";
  songToggle.setAttribute("aria-label",label);
  songToggle.title=label
}
function stopPageSong(clearTrack=false){
  pageAudio.pause();
  pageAudio.currentTime=0;
  if(clearTrack){pageAudio.removeAttribute("src");pageAudio.load();activeSongSpread=-1}
  updateSongButton()
}
function playSongForSpread(targetSpread){
  const song=pageSongs[targetSpread];
  if(!song){stopPageSong(true);return}
  pageAudio.pause();
  pageAudio.src=song;
  activeSongSpread=targetSpread;
  updateSongButton();
  pageAudio.play().then(updateSongButton).catch(updateSongButton)
}
songToggle.addEventListener("click",event=>{
  event.stopPropagation();
  if(activeSongSpread<0)return;
  if(pageAudio.paused)pageAudio.play().then(updateSongButton).catch(updateSongButton);
  else stopPageSong()
});
pageAudio.addEventListener("ended",updateSongButton);

function renderSpread(){
  if(spread===-1){leftPage.innerHTML=introHTML();rightPage.innerHTML=blankHTML();progressText.textContent="Introduction";readingStatus.textContent="Introduction";progressBar.style.width="0%"}
  else if(spread<=4){
    const a=poems[spread*2],b=poems[spread*2+1];
    leftPage.innerHTML=poemHTML(a,spread*2+1);rightPage.innerHTML=b?poemHTML(b,spread*2+2):blankHTML();
    const first=spread*2+1,last=Math.min(spread*2+2,10);progressText.textContent=`Pages ${first}–${last}`;readingStatus.textContent=`Pages ${first}–${last}`;progressBar.style.width=`${last*10}%`
  }else{leftPage.innerHTML=thanksHTML();rightPage.innerHTML=blankHTML();progressText.textContent="Thanks for Reading";readingStatus.textContent="The End";progressBar.style.width="100%"}
}
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
  if(busy)return;busy=true;playSongForSpread(n);makeTurnContent(direction);
  setTimeout(()=>{spread=n;renderSpread()},450);
  setTimeout(()=>{turnSheet.className="turn-sheet hidden";busy=false},1050)
}
function nextSpread(){if(busy)return;if(spread<5)animateTo(spread+1,"forward");else closeBook()}
function previousSpread(){if(busy)return;if(spread===-1){bookScreen.classList.add("hidden");coverScreen.classList.remove("hidden");return}if(spread>-1)animateTo(spread-1,"back")}
function closeBook(){stopPageSong(true);bookScreen.classList.add("hidden");backScreen.classList.remove("hidden")}
leftPage.addEventListener("click",event=>{
  if(window.matchMedia("(max-width: 760px)").matches){
    const bounds=leftPage.getBoundingClientRect();
    if(event.clientX-bounds.left<bounds.width*.25)previousSpread();
    else nextSpread();
    return
  }
  previousSpread()
});
rightPage.addEventListener("click",nextSpread);
backScreen.addEventListener("keydown",event=>{
  if(event.key==="Enter"||event.key===" "){event.preventDefault();readAgain()}
});
document.addEventListener("keydown",e=>{if(bookScreen.classList.contains("hidden")||busy)return;if(e.key==="ArrowRight")nextSpread();if(e.key==="ArrowLeft")previousSpread();if(e.key==="Escape")closeBook()});
coverScreen.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" ")openBook()});
renderSpread();
