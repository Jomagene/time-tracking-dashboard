let menu = document.querySelector("ul");
let dataDetail = document.querySelectorAll(".details");

let data;

async function fetchData() {
  try {
    let response = await fetch("../data.json");

    if (!response.ok) {
      throw new Error("HTTP error : " + response.status);
    }

    data = await response.json();
  } catch (error) {
    console.error(`Could not get data: ${error}`);
  }
}

function handleClick(item) {
  let activeElement = item.target;

  if (activeElement.tagName !== "LI") return;

  let target = activeElement.innerText.toLowerCase();
  let targetLabel =
    target == "daily" ? "Day" : target == "weekly" ? "Week" : "Month";

  menu.querySelectorAll("li").forEach((child) => {
    child.classList.remove("active");
  });

  if (data) {
    activeElement.classList.add("active");
    for (let i = 0; i < data.length; i++) {
      dataDetail[
        i
      ].firstElementChild.innerText = `${data[i].timeframes[target].current}hrs`;
      dataDetail[
        i
      ].lastElementChild.innerText = `Last ${targetLabel} - ${data[i].timeframes[target].previous}hrs`;
    }
  }
}

menu.addEventListener("click", handleClick);
fetchData();
