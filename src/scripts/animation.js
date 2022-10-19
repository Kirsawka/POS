import form from "./form";

const animation = () => {
  document.body.innerHTML = `
    <div class="wrap" id="wrap">
      <div class="square" id="square-1"></div>
      <div class="square" id="square-2"></div>
      <div class="square" id="square-3"></div>
      <div class="square" id="square-4"></div>
    </div>`;

  const wrap = document.getElementById("wrap");

  const getCoords = (elem) => {
    const square = elem.getBoundingClientRect();
    return {
      top: square.top + pageYOffset,
      left: square.left + pageXOffset,
      right: square.left + pageXOffset + 125,
      bottom: square.top + pageYOffset + 125,
    };
  };

  const animateFirstSquare = () => {
    const firstSquare = document.getElementById("square-1");
    const { right, bottom } = getCoords(firstSquare);
    firstSquare.style.transform = `translate(${-right}px, ${-bottom}px)`;
  };

  const animateSecondSquare = () => {
    const secondSquare = document.getElementById("square-2");
    const { left, bottom } = getCoords(secondSquare);
    secondSquare.style.transform = `translate(${left}px, ${-bottom}px)`;
  };

  const animateThirdSquare = () => {
    const thirdSquare = document.getElementById("square-3");
    const { top, right } = getCoords(thirdSquare);
    thirdSquare.style.transform = `translate(${-right}px, ${top}px)`;
  };

  const animateFourthSquare = () => {
    const fourthSquare = document.getElementById("square-4");
    const { top, left } = getCoords(fourthSquare);
    fourthSquare.style.transform = `translate(${left}px, ${top}px)`;
  };

  animateFirstSquare();
  animateSecondSquare();
  animateThirdSquare();
  animateFourthSquare();

  wrap.addEventListener("transitionend", () => {
    showCircle();
    setTimeout(() => {
      wrap.style.cursor = "pointer";
      showSelectForm();
    }, 2000);
  });

  const showCircle = () => {
    wrap.innerHTML = "";
    wrap.classList.remove("wrap");
    wrap.classList.add("circle");
    wrap.textContent = "НАЖАТЬ";
  };

  const showSelectForm = () => {
    wrap.addEventListener("click", () => {
      document.body.innerHTML = `
        <div class="select-wrap" id="select-wrap">
          <label for="mark-select">Марка автомобиля</label>
          <select class="select" id="mark-select">
            <option>---</option>
          </select>

          <label for="model-select">Модель автомобиля</label>
          <select class="select" disabled id="model-select">
            <option>---</option>
          </select>

          <label for="year-select">Год выпуска</label>
            <select class="select" disabled id="year-select">
              <option>---</option>
            </select>
            
          <input class="input" id="input" placeholder="Доставить" style="display: none">
        </div>`;
      form();
    });
  };
};

export default animation;
