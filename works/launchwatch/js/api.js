// Event Listener
document.getElementById('loadAPIs').addEventListener('click', loadAPIs);

let rocket = '';

function loadAPIs() {

  // Wikipedia API Using Variable Rocket Name From Space X API
  function wikiContent() {
    $.getJSON("https://en.wikipedia.org/w/api.php?format=json&callback=?&action=query&prop=extracts&exintro=&explaintext=&titles=" + rocket,
      function (data) {
        let wikipedia = data.query.pages;
        let wikiCont = '';
        $.each(wikipedia, (index, wiki) => {
          wikiCont += `${wiki.extract}`;
        });
        document.getElementById('wikiCont').textContent = wikiCont;
      });
  }

  // Calculate Time
  function launchTimer(nextLaunchTime) {

    // Set Reach Date
    let countDownDate = new Date(nextLaunchTime).getTime();

    // Update Each Second
    let x = setInterval(function () {

      let now = new Date().getTime();
      let distance = countDownDate - now;
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("countdown").textContent = `${days}D ${hours}H ${minutes}M ${seconds}S`;

      // If Finished
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").textContent = "Launched";
      }
    }, 1000);
  }
  $.getJSON("https://api.spacexdata.com/v2/launches/latest")
    .then((data) => {

      // Set Status
      if (data.launch_success) {
        var launchSuccess = "Success";
      } else {
        var launchSuccess = "Failure";
      }

      let rocketName = `${data.rocket.rocket_name}`;
      let success = `${launchSuccess}`;
      let rocketDetails = `${data.details}`;
      let lastSite = `${data.launch_site.site_name_long}`;

      // Display
      document.getElementById('rocketName').textContent = rocketName;
      document.getElementById('success').textContent = success;
      document.getElementById('rocketDetails').textContent = rocketDetails;
      document.getElementById('lastSite').textContent = lastSite;

      // Rocket Variable For Wikipedia Query
      rocket = data.rocket.rocket_name;

    })
    .then(() => {
      $.getJSON("https://en.wikipedia.org/w/api.php?action=query&formatversion=2&prop=pageimages%7Cpageterms|revisions&rvprop=content&rvsection=0&titles=" + rocket + "&format=json&callback=?")
        .then((data) => {
          let wikipedia = data.query.pages;
          let wikiBlurb = '';
          $.each(wikipedia, (index, wiki) => {
            wikiBlurb += `${wiki.terms.description[0]}`;
          });
          document.getElementById('wikiBlurb').textContent = wikiBlurb;
        });

      wikiContent();
    })
    .then(() => {
      $.getJSON("https://launchlibrary.net/1.3/rocket?name=" + rocket)
        .then((data) => {
          let apiImage = `${data.rockets[0].imageURL}`;
          let apiLink = `${data.rockets[0].infoURLs[0]}`;
          let image = encodeURI(apiImage);
          let link = encodeURI(apiLink);
          // Display
          document.getElementById('theimg').src = image;
          document.getElementById('spacex').href = link;

        });
    })
    .then(() => {
      $.getJSON("https://api.spacexdata.com/v2/launches/upcoming")
        .then((data) => {
          let nextLaunchTime = data[0].launch_date_utc;
          let nextTextName = `${data[0].rocket.rocket_name}`;
          let nextTextLocation = `${data[0].launch_site.site_name_long}`;

          // Display
          document.getElementById('nextTextName').textContent = nextTextName;
          document.getElementById('nextTextLocation').textContent = nextTextLocation;

          launchTimer(nextLaunchTime);

          $('.tog').fadeIn(2000);
        })
    })
}
