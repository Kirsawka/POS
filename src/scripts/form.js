import calendar from "./calendar";

const getData = async () => {
  const response = await fetch("./assets/data.json");
  return await response.json();
};

const cars = getData();

const form = () => {
  const mark = document.getElementById("mark-select");
  const model = document.getElementById("model-select");
  const year = document.getElementById("year-select");

  const createOptions = (arr, prop) => {
    document.getElementById(`${prop}-select`).innerHTML = "";
    const option = document.createElement("option");
    option.textContent = "---";
    document.getElementById(`${prop}-select`).appendChild(option);

    return arr.map((elem) => {
      const option = document.createElement("option");
      option.value = elem[prop];
      option.textContent = elem[prop];
      document.getElementById(`${prop}-select`).appendChild(option);
    });
  };

  const getUniqueValues = (arr, prop) => {
    const set = new Set();
    return arr.filter((obj) => !set.has(obj[prop]) && set.add(obj[prop]));
  };

  const filterCars = (prop, value) => {
    return cars.filter((elem) => elem[prop] === value);
  };

  const createOptionsHandler = (e, currentProp, nextProp, lastProp) => {
    const value = e.target.value;
    if (value !== "---") {
      const arr = filterCars(currentProp, value);
      createOptions(getUniqueValues(arr, nextProp), nextProp);
      document.getElementById(`${nextProp}-select`).disabled = false;
    } else {
      document.getElementById(`${nextProp}-select`).disabled = true;
      document.getElementById(`${lastProp}-select`).disabled = true;
      document.getElementById(`${lastProp}-select`).value = "---";
      document.getElementById(`${nextProp}-select`).value = "---";
    }
    openCalendar();
  };

  const openCalendar = () => {
    const input = document.getElementById("input");
    if (mark.value !== "---" && model.value !== "---" && year.value !== "---") {
      input.style.display = "block";
      const deliveryRange = getDate();
      const dates = getDatesRange(deliveryRange);
      calendar(mark.value, model.value, year.value, dates);
    } else {
      input.style.display = "none";
    }
  };

  const getDatesRange = (str) => {
    return str.split("-").map((elem) => elem.split(".").reverse().join("-"));
  };

  createOptions(getUniqueValues(cars, "mark"), "mark");
  mark.addEventListener("change", (e) =>
    createOptionsHandler(e, "mark", "model", "year")
  );
  model.addEventListener("change", (e) =>
    createOptionsHandler(e, "model", "year", "year")
  );
  year.addEventListener("change", openCalendar);

  const getDate = () => {
    let deliveryRange = "";
    cars.filter((car) => {
      if (
        car.mark === mark.value &&
        car.model === model.value &&
        car.year === year.value
      ) {
        deliveryRange = car.delivery;
      }
    });
    return deliveryRange;
  };
};

export default form;
