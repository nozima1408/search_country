const modeBtn = document.getElementById("modeBtn");
const srchInp = document.getElementById("srchInp");
const divBox = document.getElementById("divBox");

modeBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});

let countries = [];

// Fetch countries
async function getData() {
  try {
    let res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags",
    );
    countries = await res.json();

    renderCountries(countries); // show all countries first
  } catch (e) {
    console.log(e);
  }
}

getData();

// Render countries
function renderCountries(data) {
  divBox.innerHTML = "";

  if (data.length === 0) {
    let p = document.createElement("p");
    p.textContent = "No matching countries";
    p.className = "text-2xl text-[#2B3844] dark:text-white font-semibold mt-16";
    divBox.appendChild(p);
    return;
  }

  data.forEach((countryInfo) => {
    divBox.innerHTML += `
      <div class="bg-white dark:bg-[#2B3844] shadow-md hover:shadow-xl transition-all duration-300 border border-[#E5E7EB] dark:border-0 w-[300px] text-center pb-5 rounded-md">
        <img src=${countryInfo.flags.png} class="w-[300px] h-[200px] object-cover pb-5" />
        <p class="text-[#1F2937] dark:text-white text-[18px] font-semibold">
          ${countryInfo.name.common}
        </p>
      </div>
    `;
  });
}

// Search while typing
srchInp.addEventListener("input", () => {
  let inpValue = srchInp.value.trim().toLowerCase();

  let results = countries.filter((country) =>
    country.name.common.toLowerCase().includes(inpValue),
  );

  renderCountries(results);
});
