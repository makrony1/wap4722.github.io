window.onload = function () {
  loadData();

  document.getElementById("btnFormUpdate").onclick = (e) => {
    const id = document.getElementById("txt-bookId").value;
    fetch("http://localhost:3000/book/" + id, {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        title: document.getElementById("txt-title").value,
        author: document.getElementById("txt-author").value,
        publishedDate: document.getElementById("txt-publishedDate").value,
        isbn: document.getElementById("txt-isbn").value,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        document.getElementById("bookForm").reset();
        document.getElementById('btnFormUpdate').style.display = "none";
        document.getElementById("btnFormAdd").style.display = "inline";

        loadData();
      });
  };

  document.getElementById("bookForm").addEventListener("submit", function (e) {
    e.preventDefault();
    fetch("http://localhost:3000/book", {
      method: "POST",
      body: JSON.stringify({
        id: document.getElementById("txt-bookId").value,
        title: document.getElementById("txt-title").value,
        author: document.getElementById("txt-author").value,
        publishedDate: document.getElementById("txt-publishedDate").value,
        isbn: document.getElementById("txt-isbn").value,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        document.getElementById("bookForm").reset();
        loadData();
      });
  });

  document.getElementById("getAll").addEventListener("click", loadData);

  document.getElementById("addNew").addEventListener("click", function () {
    document.getElementById("bookForm").reset();
    document.getElementById("txt-bookId").value = 0;
    document.getElementById("btnFormUpdate").style.display = "none";
    document.getElementById("btnFormAdd").style.display = "inline";
  });

  function loadData(event) {
    fetch("http://localhost:3000/book")
      .then((res) => res.json())
      .then((res) => {
        showDataInTable(res);
        refreshEvent();
      });
  }

  const showDataInTable = function (data) {
    let htmlString = "";
    data.forEach((x) => {
      htmlString += " <tr>";
      htmlString += `<td>${x.id}</td>`;
      htmlString += `<td>${x.title}</td>`;
      htmlString += `<td>${x.author}</td>`;
      htmlString += `<td>${x.publishedDate}</td>`;
      htmlString += `<td>${x.isbn}</td>`;
      htmlString += `<td><button class="updateButton" name="updateButton" tag=${x.id}>update</button> |
      <button class="deleteButton" name="deleteButton" tag=${x.id}>Delete</button></td>`;
      htmlString += "</tr>";
    });

    document.getElementById("tableBody").innerHTML = htmlString;
  };

  function refreshEvent() {
    let btns = document.getElementsByClassName("updateButton");
    Array.prototype.forEach.call(btns, function addClickListener(btn) {
      btn.addEventListener("click", function (event) {
        getById(this.getAttribute("tag"));
      });
    });

    let removeBtns = document.getElementsByClassName("deleteButton");
    Array.prototype.forEach.call(removeBtns, function addClickListener(btn) {
      btn.addEventListener("click", function (event) {
        deleteById(this.getAttribute("tag"));
      });
    });
  }

  const getById = function (bookId) {
    fetch("http://localhost:3000/book/" + bookId)
      .then((res) => res.json())
      .then((res) => {
        document.getElementById("txt-bookId").value = res.id;
        document.getElementById("txt-title").value = res.title;
        document.getElementById("txt-author").value = res.author;
        document.getElementById("txt-publishedDate").value = res.publishedDate;
        document.getElementById("txt-isbn").value = res.isbn;
        document.getElementById("btnFormUpdate").style.display = "inline";
        document.getElementById("btnFormAdd").style.display = "none";
      });
  };

  const deleteById = function (id) {
    fetch("http://localhost:3000/book/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        alert("Record has been successfully delete.");
        showDataInTable(res);
        refreshEvent();
      });
  };
};
