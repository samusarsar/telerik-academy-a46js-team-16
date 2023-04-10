export const toHomeView = () => `
<div id="home">
  <h1>Mov(e)ster</h1>
  <div class="content">
    <p>Simple movie database app. You can:</p>
    <ul>
      <li>Browse categories</li>
      <li>Browse movies</li>
      <li>Add and remove movies from favorites</li>
      <li>Search for movies by title</li>
    </ul>
    <div class="main-bann" id="main-bann">
       
       <div class="imgban" id="imgban3">
       
       </div>
       <div class="imgban" id="imgban2">
       
       </div>
       <div class="imgban" id="imgban1">
       
       </div>
    </div>
   
  </div>
</div>
`;
let bannStatus = 1;
let bannTimer = 4000;

window.onload = function(){
  bannLoop();
}

let starsBannLoop = setInterval(function(){
  bannLoop();
}, bannTimer);
document
function bannLoop() {
  if (bannStatus === 1) {
    document.getElementById("imgban2").style.opacity = "0";
    setTimeout(function () {
      document.getElementById("imgban1").style.right = "0px";
      document.getElementById("imgban1").style.zIndex = "1000";
      document.getElementById("imgban2").style.right = "-480px";
      document.getElementById("imgban2").style.zIndex = "1500";
      document.getElementById("imgban3").style.right = "480px";
      document.getElementById("imgban3").style.zIndex = "500";
    }, 500);
    setTimeout(function () {
      document.getElementById("imgban2").style.opacity = "1";
    }, 1000);
    bannStatus = 2;
  } else if (bannStatus === 2) {
    document.getElementById("imgban3").style.opacity = "0";
    setTimeout(function () {
      document.getElementById("imgban2").style.right = "0px";
      document.getElementById("imgban2").style.zIndex = "1000";
      document.getElementById("imgban3").style.right = "-480px";
      document.getElementById("imgban3").style.zIndex = "1500";
      document.getElementById("imgban1").style.right = "480px";
      document.getElementById("imgban1").style.zIndex = "500";
    }, 500);
    setTimeout(function () {
      document.getElementById("imgban3").style.opacity = "1";
    }, 1000);
    bannStatus = 3;
  } else if (bannStatus === 3) {
    document.getElementById("imgban1").style.opacity = "0";
    setTimeout(function () {
      document.getElementById("imgban3").style.right = "0px";
      document.getElementById("imgban3").style.zIndex = "1000";
      document.getElementById("imgban1").style.right = "-480px";
      document.getElementById("imgban1").style.zIndex = "1500";
      document.getElementById("imgban2").style.right = "480px";
      document.getElementById("imgban2").style.zIndex = "500";
    }, 500);
    setTimeout(function () {
      document.getElementById("imgban1").style.opacity = "1";
    }, 1000);
    bannStatus = 1;
  }
}