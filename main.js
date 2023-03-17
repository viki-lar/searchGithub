"use sctrict";

let searchButton = document.querySelector(".button");
let form = document.querySelector(".form");
let formStr = document.querySelector(".input");
let body = document.querySelector("body");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let search = formStr.value;
  body.lastChild.remove();

  //создаем обертку

  let wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");

  document.body.append(wrapper);

  //получение элементов из db.json
  const getData = () => {
    fetch(`https://api.github.com/search/repositories?q=${search}`, {})
      .then((response) => response.json())
      .then((response) => {
        if (response.items.length == 0) {
          let strEmpty = document.createElement("div");
          strEmpty.classList.add("strEmpty");
          strEmpty.textContent = "Ничего не найдено";
          wrapper.append(strEmpty);
        } else {
          createTable();

          for (key in response.items) {
            if (key < 10) {
              createBlock(response.items[key]);
            }
          }
        }
      });
  };

  getData();

  //создаем шапку таблицы
  const createTable = () => {
    let str = document.createElement("div");
    str.classList.add("str-block");
    wrapper.append(str);

    let nameTable = document.createElement("div");

    nameTable.textContent = "Репозиторий";
    str.append(nameTable);

    let languageTable = document.createElement("div");
    languageTable.textContent = "Язык";
    str.append(languageTable);

    let dateCreateTable = document.createElement("div");
    dateCreateTable.textContent = "Дата создания";
    str.append(dateCreateTable);
  };

  // //создание карточки
  const createBlock = (data) => {
    // создание элементов
    let str = document.createElement("div");
    str.classList.add("str-block");
    wrapper.append(str);

    let name = document.createElement("a");
    name.href = data.html_url;
    name.target = "_blank";
    name.textContent = data.name;
    str.append(name);

    let language = document.createElement("div");
    language.textContent = data.language;
    str.append(language);

    let dateCreate = document.createElement("div");
    dateCreate.textContent = data.created_at;
    str.append(dateCreate);
  };
});
