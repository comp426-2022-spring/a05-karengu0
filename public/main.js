const { response } = require("express")

// Focus div based on nav button click

// Flip one coin and show coin image to match result when button clicked
const coin = document.getElementById("coin")
async function flipCoin() {
    const endpoint = "app/flip/"
    const url = document.baseURI+endpoint
    await fetch(url)
        .then(function(response) {
        return response.json();
    })
    .then(function(result) {
        console.log(result);
        document.getElementById("result").innerHTML = result.flip;
        document.getElementById("quarter").setAttribute("src", "assets/img/"+result.flip+".png");
    });
};
coin.addEventListener("click", flipCoin)
// Flip multiple coins and show coin images in table as well as summary results
const coins = document.getElementById("coins")
async function flipCoins(event) {
    event.preventDefault();
    const endpoint = "app/flip/coins/"
    const url = document.baseURI+endpoint
    const formEvent = event.currentTarget
    try {
        const formData = new FormData(formEvent);
        const flips = await sendFlips({url,formData});
        console.log(flips);
        document.getElementById("heads").innerHTML = "Heads: "+flips.summary.heads;
        document.getElementById("tails").innerHTML = "Tails: "+flips.summary.tails;
        document.getElementById("coinlist").innerHTML = coinList(flips.raw);
    } catch (error) {
        console.log(error);
    }
}
coins.addEventListener("submit", flipCoins)

// Enter number and press button to activate coin flip series
const select = document.getElementById("call")
async function flipCall(event) {
    event.preventDefault();
    const endpoint = "app/flip/call/"
    const url = document.baseURI+endpoint
    const formEvent = event.currentTarget
    try {
        const formData= new FormData(formEvent);
        const results = await sendFlips({url,formData});
        console.log(results);
        document.getElementById("choice").innerHTML = "Guess: "+results.call;
        document.getElementById("actual").innerHTML = "Actual: "+results.flip;
        document.getElementById("results").innerHTML = "Result: "+results.result;
        document.getElementById("coingame").innerHTML = '<li><img src="assets/img/'+results.call+'.png" class="bigcoin" id="callcoin"></li><li><img src="assets/img/'+results.flip+'.png" class="bigcoin"></li><li><img src="assets/img/'+results.result+'.png" class="bigcoin"></li>';
    } catch (error) {
        console.log(error);
    }
}
select.addEventListener("submit", flipCall)

async function sendFlips({url, formData}) {
    const plain = Object.fromEntries(formData.entries());
    const formJson = JSON.stringify(plain);
    console.log(formJson);
    const req = {
        method: "POST",
        headers: {
            "Content-Type": "aplication/json",
            Accept: "application/json"
        },
        body: formJson
    };
    const res = await fetch(url,req);
    return res.json()
}

// Guess a flip by clicking either heads or tails button
function homeNav() {
    document.getElementById("homenav").className = "active";
    document.getElementById("home").className = "active";
    document.getElementById("singlenav").className = "";
    document.getElementById("single").className = "inactive";
    document.getElementById("multinav").className = "";
    document.getElementById("multi").className = "inactive";
    document.getElementById("guessnav").className = "";
    document.getElementById("guesscoin").className = "inactive";
  }
  function singleNav() {
    document.getElementById("homenav").className = "";
    document.getElementById("home").className = "inactive";
    document.getElementById("singlenav").className = "active";
    document.getElementById("single").className = "active";
    document.getElementById("multinav").className = "";
    document.getElementById("multi").className = "inactive";
    document.getElementById("guessnav").className = "";
    document.getElementById("guesscoin").className = "inactive";
  }
  function multiNav() {
    document.getElementById("homenav").className = "";
    document.getElementById("home").className = "inactive";
    document.getElementById("singlenav").className = "";
    document.getElementById("single").className = "inactive";
    document.getElementById("multinav").className = "active";
    document.getElementById("multi").className = "active";
    document.getElementById("guessnav").className = "";
    document.getElementById("guesscoin").className = "inactive";
  }
  function guessNav() {
    document.getElementById("homenav").className = "";
    document.getElementById("home").className = "inactive";
    document.getElementById("singlenav").className = "";
    document.getElementById("single").className = "inactive";
    document.getElementById("multinav").className = "";
    document.getElementById("multi").className = "inactive";
    document.getElementById("guessnav").className = "active";
    document.getElementById("guesscoin").className = "active";
  } 

  function coinList(array) {
      let text = "";
      let arrayLength = array.arrayLength
      for (let i = 0; i < arrayLength; i++) {
          text+= '<li><img src="assets/img/'+array[i]+'.png" class="bigcoin"></li>';
      }
      return text
  }