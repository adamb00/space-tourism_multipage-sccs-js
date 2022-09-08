const btnMenu = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");
const buttons = document.querySelectorAll(".btn");
const btnPag = document.querySelectorAll(".pagination");
const launchPag = document.querySelectorAll(".launchPag");
const text = document.querySelector(".text");
const decription = document.querySelector(".decription");
const description = document.querySelector(".description");
const imgPlanet = document.querySelector(".imgPlanet");
const imgPeople = document.querySelector(".imgPeople");
const imgRocket = document.querySelector(".imgRocket");
const windowSize = window.matchMedia("(max-width: 900px)");
let menuOpen = false;
console.log(buttons, btnPag, launchPag);
btnMenu.addEventListener("click", ()=>{
    if (!menuOpen) {
        btnMenu.classList.add("open");
        menuOpen = true;
        nav.style.display = "flex";
    } else {
        btnMenu.classList.remove("open");
        menuOpen = false;
        nav.style.display = "none";
    }
});
let myRequest = new Request("../data.json");
fetch(myRequest).then((res)=>res.json()).then((data)=>{
    destination(data);
    crew(data);
    technology(data);
});
destination = (data)=>{
    data.destinations.forEach((planet)=>{
        buttons.forEach((button)=>{
            button.addEventListener("click", (e)=>{
                e.preventDefault();
                if (e.target.id === planet.name) {
                    let active = document.querySelector(".planet__active");
                    if (active) active.classList.remove("planet__active");
                    e.target.classList.add("planet__active");
                    imgPlanet.style.backgroundImage = `url('../${planet.images.png}')`;
                    text.innerHTML = `
            <h1>${planet.name}</h1>
            <p class="planetDesc">
              ${planet.description}
            </p>
            <hr />
            <div class="distance">
              <div class="avg">
                <div class="title">AVG. DISTANCE</div>
                  <div class="value">${planet.distance}</div>
              </div>
              <div class="time">
                <div class="title">EST. TRAVEL TIME</div>
                <div class="value">${planet.travel}</div>
              </div>
            </div>
            `;
                }
            });
        });
    });
};
crew = (data)=>{
    const crew1 = Object.values(data.crew);
    crew1.forEach((cr)=>{
        btnPag.forEach((button)=>{
            button.addEventListener("click", (e)=>{
                e.preventDefault();
                if (e.target.id == cr.name.toLowerCase().split(" ", 1)) {
                    let active = document.querySelector(".active--pag");
                    if (active) active.classList.remove("active--pag");
                    e.target.classList.add("active--pag");
                    imgPeople.style.backgroundImage = `url('../${cr.images.png}')`;
                    decription.innerHTML = `
          <h3><span class="two"> 02 </span> Meet your crew</h3>
          <h2>${cr.role}</h2>
          <h1>${cr.name}</h1>
          <h4>
            ${cr.bio}
          </h4>
          `;
                }
            });
        });
    });
};
technology = (data)=>{
    const technology1 = Object.values(data.technology);
    technology1.forEach((tech)=>{
        console.log(tech);
        launchPag.forEach((button)=>{
            button.addEventListener("click", (e)=>{
                e.preventDefault();
                if (e.target.id == tech.name.split(" ", 1)) {
                    let active = document.querySelector(".active__pag");
                    if (active) active.classList.remove("active__pag");
                    e.target.classList.add("active__pag");
                    if (windowSize.matches) imgRocket.style.backgroundImage = `url('../${tech.images.landscape}')`;
                    else imgRocket.style.backgroundImage = `url('../${tech.images.portrait}')`;
                    description.innerHTML = `
          <h4>The terminology...</h4>
          <h1>${tech.name}</h1>
          <p>
            ${tech.description}
          </p>
          `;
                }
            });
        });
    });
};

//# sourceMappingURL=Technology.816e7b21.js.map
