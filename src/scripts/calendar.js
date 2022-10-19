import flatpickr from "flatpickr";
import animation from "./animation";

function calendar(mark, model, year, dates) {
  const minDate = new Date(dates[0]);
  const maxDate = new Date(dates[1]);

  const flatpickrCalendar = flatpickr("#input", {
    disableMobile: "true",
    minDate,
    maxDate,
    onClose() {
      const data = this.selectedDates[0];
      console.log(data.toLocaleDateString());
      showData(data.toLocaleDateString());
      restart();
    }
  });

  const showData = (data) => {
    document.body.innerHTML = `
    <div class="info-wrapper"><p class="info-text">Вы выбрали автомобиль марки: ${mark}, модель: ${model}, год выпуска: ${year}, доставка: ${data} г.</p>
      <button class="restart-button">Начать заново</button>
    </div>`;
  };

  const restart = () => {
    const restartButton = document.querySelector('.restart-button');
    restartButton.addEventListener('click', () => {
      document.body.innerHTML = '';
      animation();
    });
  };
  return flatpickrCalendar;
}

export default calendar;
