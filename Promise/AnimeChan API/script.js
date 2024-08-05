






var verifyButton = document.getElementById("verify-button");
verifyButton.addEventListener("click", async function () {
  document.getElementById("validation-result").innerHTML = "";
  document.getElementById("advice-quote").innerHTML = "";
  document.getElementById("anime-quote").innerHTML = "";

  // email validation

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  await fetch(
    `https://api.eva.pingutil.com/email?email=${
      document.getElementById("email-input").value
    }`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      
      if (result.errorCode === 1001) {

        alert(result.message);
        let validationResult = document.createElement("p");
          validationResult.innerHTML = `<p id="validation-title">Email Validation Result</p>
           Email was not entered`;
          document
            .getElementById("validation-result")
            .appendChild(validationResult);;
      } else if (result.data.valid_syntax === true) {
        //for valid email id
        if (
          result.data.deliverable === true &&
          result.data.webmail === true &&
          result.data.spam === false
        ) {
          let validationResult = document.createElement("p");
          validationResult.innerHTML = `<p id="validation-title">Email Validation Result</p><br><br>
            Email is Valid and Not Spam.\
            Email can be delivered to this mail Id`;
          document
            .getElementById("validation-result")
            .appendChild(validationResult);
        }
        //for gibberish
        else if (result.data.gibberish === true) {
          let validationResult = document.createElement("p");
          validationResult.innerHTML = `<p id="validation-title">Email Validation Result</p><br>
            Entered Data is GIBBERISH`;
          document
            .getElementById("validation-result")
            .appendChild(validationResult);
        }
        //for invalid web service
        else if (
          result.data.deliverable === false &&
          result.data.webmail === false
        ) {
          let validationResult = document.createElement("p");
          validationResult.innerHTML = ` <p id="validation-title">Email Validation Result</p><br>
            Not a Personal Email Id.<br>(Might be a email by a company/organisation).`;
          document
            .getElementById("validation-result")
            .appendChild(validationResult);
        }
        //for non-deliverable email id's
        else if (result.data.deliverable === false) {
          let validationResult = document.createElement("p");
          validationResult.innerHTML = `<p id="validation-title">Email Validation Result</p><br>
           "Mail cannot be delivered to this email id"`;
          document
            .getElementById("validation-result")
            .appendChild(validationResult);
        }
        //for spam
        else if (result.data.spam === true) {
          let validationResult = document.createElement("p");
          validationResult.innerHTML = `<p id="validation-title">Email Validation Result</p><br>
          Email is Spam`;
          document
            .getElementById("validation-result")
            .appendChild(validationResult);
        }
      }
    })
    .catch((error) => console.log(error));

  //   advice quote

  await fetch("https://api.adviceslip.com/advice")
    .then((res) => res.json())
    .then((data) => {
      console.log(data.slip);
      function passAdviceQuote() {
        let passAnime = document.createElement("p");
        passAnime.innerHTML = `<span id="advice-title">Advice for you</span><br><br>
        ${data.slip.advice}`;
        document.getElementById("advice-quote").appendChild(passAnime);
      }
      passAdviceQuote();
    })
    .catch((error) => console.log(error));

  // anime quote

  await fetch("https://animechan.vercel.app/api/random")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      function passAnimeQuote() {
        let charaQuote = document.createElement("p");
        charaQuote.innerHTML = `<span id="anime-title">Anime Title</span><br><br>
          <span id="characterQuote">${data.quote}</span><br>
           by <span id="characterName">${data.character}</span> <br>
           from <span id="animeName">${data.anime}</span>`;
        document.getElementById("anime-quote").appendChild(charaQuote);
      }
      passAnimeQuote();
    });
});
