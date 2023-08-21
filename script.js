//fetch api from url
let url = "https://kontests.net/api/v1/all";
let promise = fetch(url);
promise
  .then((v) => {
    return v.json();
  })
  .then((contest) => {
    ihtml = "";
    for (const key in contest) {
      console.log(contest[key]);
      ihtml += `
      <div class="card mt-2 ml-4 mr-2" style="width: 20rem;">
                    <img src="https://blog.ndepend.com/wp-content/uploads/Is-AI-Assisted-Coding-the-Next-Developer-Productivity-Silver-Bullet.png" class="card-img-top" alt="...">
                    <div class="card-body ">
                      <h5 class="card-title">${contest[key].name}</h5>
                      <p class="card-text"><b>Starts at: </b>${contest[key].start_time} </p>
                      <p class="card-text"><b>Ends at: </b> ${contest[key].end_time} </p>
                      <p class="card-text"><b>Duration: </b> ${contest[key].duration} </p>
                      <a href="${contest[key].url}" class="btn btn-primary">Enter</a>
                    </div>
                  </div>
      `;
    }
    cardContainer.innerHTML = ihtml;
  });

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const resultsList = document.getElementById("cardContainer");

searchForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  const searchTerm = searchInput.value.trim();

  // Fetch data from API
  fetch("https://kontests.net/api/v1/all")
    .then((response) => response.json())
    .then((data) => {
      // Apply filter to find  information based on search
      let filteredData = data.filter((item) => item.name.includes(searchTerm));

      var filteredDataArray = [];
      filteredDataArray.unshift(...filteredData);
      console.log(filteredDataArray);

      // Display filtered results
      filteredData.forEach((item) => {
        cardContainer.innerHTML = "";
        // console.log(item.name);
        let ihtml = `
      <div class="card mt-2 ml-4 mr-2" style="width: 20rem;">
                    <img src="https://blog.ndepend.com/wp-content/uploads/Is-AI-Assisted-Coding-the-Next-Developer-Productivity-Silver-Bullet.png" class="card-img-top" alt="...">
                    <div class="card-body ">
                      <h5 class="card-title">${item.name}</h5>
                      <p class="card-text"><b>Starts at: </b>${item.start_time} </p>
                      <p class="card-text"><b>Ends at: </b> ${item.end_time} </p>
                      <p class="card-text"><b>Duration: </b> ${item.duration} </p>
                      <a href="${item.url}" class="btn btn-primary">Enter</a>
                    </div>
                  </div>
      `;
        cardContainer.innerHTML = ihtml;

        //fetch data from filtered Array

        filteredDataArray.forEach((item) => {
          let ihtml = `
          <div class="card mt-2 ml-4 mr-2" style="width: 20rem;">
                        <img src="https://blog.ndepend.com/wp-content/uploads/Is-AI-Assisted-Coding-the-Next-Developer-Productivity-Silver-Bullet.png" class="card-img-top" alt="...">
                        <div class="card-body ">
                          <h5 class="card-title">${item.name}</h5>
                          <p class="card-text"><b>Starts at: </b>${item.start_time} </p>
                          <p class="card-text"><b>Ends at: </b> ${item.end_time} </p>
                          <p class="card-text"><b>Duration: </b> ${item.duration} </p>
                          <a href="${item.url}" class="btn btn-primary">Enter</a>
                        </div>
                      </div>
          `;

          historycards.innerHTML += ihtml;
        });

        //
      });
    })
    .catch((error) => {
      console.log("Error:", error);
    });
});
