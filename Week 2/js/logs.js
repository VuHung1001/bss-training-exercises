// variables for pagination
let rowPerPage = 3;
let totalPage = Math.ceil(logsData.length / rowPerPage);
let currentPage = 0;
let searchRsltLen = 0;
let searchRslt = [];


// append data into table
const loadTableLogs = (page = 1, isSearching = false, data = logsData) => {
  currentPage = page;
  loadPagination(isSearching)

  const tBody = $("#logs-table-body");
  const totalHTML = $("#logs-table-total");
  let total = 0;

  data = isSearching ? searchRslt : logsData;

  if (data.length > 0) {
    tBody.empty();

    // append data in table by pagination
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


// create pagination buttons
const loadPagination = (isSearching = false) => {
  const pagination = $("#pagination");

  if (totalPage > 0) {
    pagination.empty();

    // prev page button
    currentPage > 1
      && pagination.append(`
        <button class="btn-pagination" onclick="${
          isSearching ? 'loadTableLogs('+(currentPage - 1)+', true)' : 'loadTableLogs('+(currentPage - 1)+')'
        }"><i class="fas fa-angle-left"></i></button> 
      `)

    // page number
    for (let i = 1; i <= totalPage; i++) {
      pagination.append(`
        <button class="${i === currentPage ? 'btn-pagination btn-currentPage' : 'btn-pagination'}" onclick="${
          isSearching ? 'loadTableLogs('+i+', true)' : 'loadTableLogs('+i+')'
        }">${i}</button>          
      `);
    }

    // next page button
    currentPage < totalPage
      && pagination.append(`
        <button class="btn-pagination" onclick="${
          isSearching ? 'loadTableLogs('+(currentPage + 1)+', true)' : 'loadTableLogs('+(currentPage + 1)+')'
        }"><i class="fas fa-angle-right"></i></button> 
      `)
  }
};


// search devices have names include string in search input
const search = (page=1) => {
  window.event.preventDefault();
  currentPage = page;

  const searchInput = $("#search");
  const searchTxt = $.trim(searchInput.val()).replace(/ +/g, " ").toLowerCase();

  // if user don't insert anything in search input, reload table with logsData 
  if(searchTxt === ""){
    notification(
      "Empty inputted value",
      "Please insert device name into search box!<br>"
      +"Logs data table is reloaded",
      "warning",
      10000,
    );

    rowPerPage = 3;
    totalPage = Math.ceil(logsData.length / rowPerPage);

    loadTableLogs();
    loadPagination();
    return;
  }

  // search results are devices with device name contain search input text
  const searchResult = logsData.filter((value) => {
    let text = value.name.replace(/\s+/g, " ").toLowerCase();
    return text.indexOf(searchTxt) >= 0;
  });

  // if exist search results , reload table and pagination
  if(searchResult.length > 0){
    searchRsltLen = searchResult.length;
    searchRslt = [...searchResult];

    rowPerPage = 3;
    totalPage = Math.ceil(searchRsltLen / rowPerPage);

    loadTableLogs(1, true, searchResult);
    loadPagination(true);

    $('#setRowsPerPage').attr('placeholder', rowPerPage);
    $('#setRowsBtn').attr('onclick', 'setRowsPerPage(true)');

  } 
  // if search result is empty, show notification for user and return previous table and pagination results
  else {
    notification(
      "None result for your searching",
      "Please insert another device name!",
      "info",
      10000,
    );

    searchInput.val('')

    totalPage = Math.ceil(searchRslt.length / rowPerPage);

    loadTableLogs(1, true, searchRslt);
    loadPagination(true);   
    
  }
  return;
};


// set rows data in table 
const setRowsPerPage = (isSearching = false)=>{
  window.event.preventDefault();
  const rowPerPageInput = $('#setRowsPerPage')
  const maxRow = isSearching ? searchRsltLen : logsData.length;

  // if inputted row number > 0 and <= maximum row
  // reload table and pagination by new row-per-page value
  if(rowPerPageInput.val() > 0 && rowPerPageInput.val() <= maxRow ){
    rowPerPage = rowPerPageInput.val();

    totalPage = isSearching 
      ? Math.ceil(searchRslt.length / rowPerPageInput.val()) 
      : Math.ceil(logsData.length / rowPerPageInput.val());

    loadTableLogs(1, isSearching)
    loadPagination(isSearching);

    rowPerPageInput.val('')
    rowPerPageInput.attr("placeholder", rowPerPage);
    
  } else {
    notification(
      "Rows in data table must be between 1 and "+maxRow,
      "Please insert again!",
      "info",
      10000,
    );

    rowPerPageInput.focus();
  }
  return;
}
