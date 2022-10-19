import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import animation from "./animation";

const calendar = (mark, model, year, dates) => {
  const minDate = new Date(dates[0]);
  const maxDate = new Date(dates[1]);

  new AirDatepicker("#input", {
    isMobile: true,
    autoClose: true,
    minDate,
    maxDate,
    onSelect({ formattedDate }) {
      showData(formattedDate);
      restart();
    },
  });

  const showData = (data) => {
    document.body.innerHTML = `
    <div class="info-wrapper"><p class="info-text">Вы выбрали автомобиль марки: ${mark}, модель: ${model}, год выпуска: ${year}, доставка: ${data} г.</p>
      <button class="restart-button">Начать заново</button>
    </div>`;
  };

  const restart = () => {
    const restartButton = document.querySelector(".restart-button");
    restartButton.addEventListener("click", () => {
      document.body.innerHTML = "";
      animation();
    });
  };
};

export default calendar;
