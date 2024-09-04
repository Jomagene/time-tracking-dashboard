let menu = document.querySelector("ul");
let dataDetail = document.querySelectorAll(".details");

let data;

async function fetchData() {
  try {
    let response = await fetch("./../data.json");

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
    target == "daily"
      ? "Yesterday"
      : target == "weekly"
      ? "Last Week"
      : "Last Month";

  menu.querySelectorAll("li").forEach((child) => {
    child.classList.remove("active");
  });

  if (data) {
    activeElement.classList.add("active");
    dataDetail.forEach((detail, i) => {
      const { current, previous } = data[i].timeframes[target];
      detail.firstElementChild.innerText = `${current}hrs`;
      detail.lastElementChild.innerText = `${targetLabel} - ${previous}hrs`;
    });
  }
}

menu.addEventListener("click", handleClick);
fetchData();
