document.addEventListener("DOMContentLoaded", function() {
    const loader = document.getElementById("loader");
    const itemsContainer = document.getElementById("items");
  
    loader.classList.add("loader_active");
  
    fetch("https://students.netoservices.ru/nestjs-backend/slow-get-courses")
      .then(response => response.json())
      .then(data => {
        loader.classList.remove("loader_active");
  
        const valuteData = data.response.Valute;
  
        for (const valuteKey in valuteData) {
          const currency = valuteData[valuteKey];
  
          const item = document.createElement("div");
          item.classList.add("item");
  
          const code = document.createElement("div");
          code.classList.add("item__code");
          code.textContent = currency.CharCode;
          item.appendChild(code);
  
          const value = document.createElement("div");
          value.classList.add("item__value");
          value.textContent = currency.Value;
          item.appendChild(value);
  
          const currencyText = document.createElement("div");
          currencyText.classList.add("item__currency");
          currencyText.textContent = `руб.`;
          item.appendChild(currencyText);
  
          itemsContainer.appendChild(item);
        }
      })
      .catch(error => {
        console.error("Произошла ошибка при загрузке данных:", error);
      });
  });