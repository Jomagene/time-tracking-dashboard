let menu = document.querySelectorAll("li");

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

async function handleClick() {
  let data = await fetchData();

  if (data) {
    console.log(data);
  }
}

for (let item of menu) {
  item.addEventListener("click", handleClick);
}
