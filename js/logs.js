const logsData = [
  {
    deviceId: 101,
    name: "TV",
    action: "Turn On",
    date: "131238",
  },
  {
    deviceId: 102,
    name: "Washing Machine",
    action: "Turn Off",
    date: "123789",
  },
  {
    deviceId: 103,
    name: "Refrigerator",
    action: "Sleep",
    date: "543890",
  },
  {
    deviceId: 104,
    name: "Fan",
    action: "Broken",
    date: "123456",
  },
  {
    deviceId: 105,
    name: "Laptop",
    action: "Turn On",
    date: "456789",
  },
  {
    deviceId: 106,
    name: "PC",
    action: "Turn Off",
    date: "453786",
  },
  {
    deviceId: 107,
    name: "Microwave",
    action: "Broken",
    date: "456732",
  },
  {
    deviceId: 108,
    name: "TV",
    action: "Turn On",
    date: "456789",
  },
  {
    deviceId: 109,
    name: "Laptop",
    action: "Turn Off",
    date: "315789",
  },
  {
    deviceId: 110,
    name: "Refrigerator",
    action: "Broken",
    date: "126889",
  },
  {
    deviceId: 111,
    name: "Washing Machine",
    action: "Turn On",
    date: "123454",
  },
  {
    deviceId: 112,
    name: "PC",
    action: "Turn Off",
    date: "657123",
  },
  {
    deviceId: 113,
    name: "Fan",
    action: "Sleep",
    date: "126789",
  },
  {
    deviceId: 114,
    name: "TV",
    action: "Sleep",
    date: "126783",
  },
  {
    deviceId: 115,
    name: "PC",
    action: "Turn On",
    date: "459456",
  },
];

// variables for pagination
let rowPerPage = 3;
let totalPage = logsData.length / rowPerPage;

const loadTableLogs = (page = 1, data = logsData) => {
  const tBody = $("#logs-table-body");
  const totalHTML = $("#logs-table-total");
  let total = 0;

  if (data.length > 0) {
    tBody.empty();

    data
      .slice((page - 1) * rowPerPage, page * rowPerPage)
      .map((value, index) => {
        tBody.append(`
        <tr>
          <td>${value.deviceId}</td>
          <td>${value.name}</td>
          <td>${value.action}</td>
          <td>${value.date}</td>
        </tr>            
      `);

        total += value.date * 1;
      });

    totalHTML.text(total);
  }
};

const loadPagination = (isSearch = false) => {
  const pagination = $("#pagination");

  if (totalPage > 0) {
    pagination.empty();

    for (let i = 1; i <= totalPage; i++) {
      pagination.append(`
        <button class="btn-pagination" onclick="${
          isSearch ? 'search('+i+')' : 'loadTableLogs('+i+')'
        }">${i}</button>          
      `);
    }
  }
};

const search = (page=1) => {
  const searchInput = $("#search");

  const searchTxt = $.trim(searchInput.val()).replace(/ +/g, " ").toLowerCase();

  if(searchTxt === ""){
    notification(
      "Empty inputted value",
      "Please insert device name into search box!",
      "warning",
      10000,
    );

    loadTableLogs();
    loadPagination();
    return;
  }

  const searchResult = logsData.filter((value) => {
    let text = value.name.replace(/\s+/g, " ").toLowerCase();
    return text.indexOf(searchTxt) >= 0;
  });

  rowPerPage = 3
  totalPage = searchResult.length / rowPerPage;
  loadTableLogs(page, searchResult);
  loadPagination(true);
  rowPerPage = 3;
  totalPage = logsData.length / rowPerPage;
};
