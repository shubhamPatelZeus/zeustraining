var list = JSON.parse(localStorage.getItem("list")) || [];
      console.log(list);
      let text = "";
      for (item in list) {
        text += `<li>${list[item].data}<span class="${list[item].data} close">&#10005;</span></li>`;
      }
      document.querySelector("ul").innerHTML = text;
      const addBtn = document.querySelector(".addBtn");

      addBtn.addEventListener(
        "click",
        function (e) {
          let data = document.querySelector("input").value;
          list.push({ data });
          localStorage.setItem("list", JSON.stringify(list));
          document.querySelector(
            "ul"
          ).innerHTML += `<li>${data}<span class="${data} close">&#10005;</span></li>`;
        },
        false
      );

      const ul = document.querySelector("ul");
      ul.addEventListener(
        "click",
        function (e) {
          if (e.target.tagName === "SPAN") {
            const newList = list.filter(function (ele) {
              return e.target.classList[0] != ele.data;
            });
            localStorage.setItem("list", JSON.stringify(newList));
            let text = "";
            for (item in newList) {
              text += `<li>${newList[item].data}<span class="${newList[item].data} close">&#10005;</span></li>`;
            }
            document.querySelector("ul").innerHTML = text;
          }
        },
        false
      );