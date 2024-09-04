let menu = document.querySelectorAll("li");

let dataDetail = document.querySelectorAll(".details");

async function fetchData() {
  try {
    let response = await fetch("../data.json");

    if (!response.ok) {
      throw new Error("HTTP error : " + response.status);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Could not get data: ${error}`);
  }
}

async function handleClick(item) {
  let element = item.target;
  let target = element.innerText.toLowerCase();
  let targetLabel =
    target == "daily" ? "Day" : target == "weekly" ? "Week" : "Month";

  let data = await fetchData();

  // Get all siblings
  const siblings = Array.from(menu).filter((child) => child != element);
  siblings.forEach((child) => {
    child.classList.remove("active");
  });

  if (data) {
    item.target.classList.toggle("active");
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

for (let item of menu) {
  item.addEventListener("click", handleClick);
}
