import {useState, useCallback, useEffect} from 'react'
import Notification from './Notification';
// import Script from 'next/script'
// import useScript from '../hooks/useScript';

const LogsCom = ({props}) => {
  // useScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js')
  // useScript('https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js')

  const [logs, setLogs] = useState(props.logs)
  const [page, setPage] = useState(1)
  const [rowPerPage, setRowPerPage] = useState(5)
  const [totalPage, setTotalPage] = useState(0);
  const [totalPageArr, setTotalPageArr] = useState(Array.apply(null, Array(totalPage)).map(function (v, i) { return i+1; }))
  const [searchRsltLen, setSearchRsltLen] = useState(0);
  const [searchRslt, setSearchRslt] = useState([]);  
  const [isSearching, setIsSearching] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState('info');
  const [duration, setDuration] = useState(5000); 


  const loadTableLogs = useCallback(() => {
    // loadPagination(isSearching)
    const tBody = $("#logs-table-body");
    const totalHTML = $("#logs-table-total");
    let total = 0;
  
    let data = isSearching ? searchRslt : logs;

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
  }, [page, logs, rowPerPage, isSearching, searchRslt])


  const changePageHandle = (page) =>{
    setPage(page)
  }


  const setRowsPerPage = () => {
    const rowPerPageInput = $('#setRowsPerPage')
    const maxRow = isSearching ? searchRsltLen : logs.length;
  
    // if inputted row number > 0 and <= maximum row
    // reload table and pagination by new row-per-page value
    if(rowPerPageInput.val() > 0 && rowPerPageInput.val() <= maxRow ){
      setRowPerPage(rowPerPageInput.val())
  

      setTotalPage(
        isSearching 
        ? Math.ceil(searchRslt.length / rowPerPageInput.val()) 
        : Math.ceil(logs.length / rowPerPageInput.val())
      )
  
  
      changePageHandle(1)

      rowPerPageInput.attr("placeholder", rowPerPageInput.val());
      rowPerPageInput.val('')
      
    } else {
      setTitle( "Set rows per page failed!")
      setMessage("Rows in data table must be between 1 and "+maxRow)
      setType("info")
      setDuration(5000)

      const timeout = setTimeout(() =>{
        setTitle( "")
        setMessage("")
        setType("info")
        setDuration(5000)

        window.clearTimeout(timeout)
      }, 5000)

      rowPerPageInput.focus();
    }
    return;    
  }


  const search = () => {
    const searchInput = $("#search");
    const searchTxt = $.trim(searchInput.val()).replace(/ +/g, " ").toLowerCase();
  
    // if user don't insert anything in search input, reload table with logsData 
    if(searchTxt === ""){

      setTitle( "Empty inputted value!")
      setMessage("Please insert somethings into search box!<br>"
        +"Logs data table is reloaded",)
      setType("warning")
      setDuration(5000)

      const timeout = setTimeout(() =>{
        setTitle( "")
        setMessage("")
        setType("info")
        setDuration(5000)

        window.clearTimeout(timeout)
      }, 5000)      
  
      setRowPerPage(5);
      setPage(1);
      setTotalPage(Math.ceil(logs.length / 5));
      setIsSearching(false)

      return;
    }
  
    // search results are devices with device name contain search input text
    const searchResult = logs.filter((value) => {
      let text = value.name.replace(/\s+/g, " ").toLowerCase();
      return text.indexOf(searchTxt) >= 0;
    });
  
    // if exist search results , reload table and pagination
    if(searchResult.length > 0){
      setSearchRsltLen(searchResult.length);
      setSearchRslt([...searchResult]);
  
      setRowPerPage(5);
      setPage(1);
      setTotalPage(Math.ceil(searchResult.length / 5));
      setIsSearching(true)
  
      $('#setRowsPerPage').attr('placeholder', 5);
  
    } 
    // if search result is empty, show notification for user and return previous table and pagination results
    else {
      setTitle( "None result for your searching")
      setMessage("Please insert another device name!")
      setType("info")
      setDuration(5000)

      const timeout = setTimeout(() =>{
        setTitle( "")
        setMessage("")
        setType("info")
        setDuration(5000)

        window.clearTimeout(timeout)
      }, 5000)      
  
      searchInput.val('')
      setIsSearching(true)
  
      setTotalPage(Math.ceil(searchRslt.length / rowPerPage));
      
    }
    return;
  };


  useEffect(() => {
    setLogs(props.logs)

    !isSearching && setTotalPage(Math.ceil(logs.length / rowPerPage))

    loadTableLogs()

    setTotalPageArr(Array.apply(null, Array(totalPage)).map(function (v, i) { return i+1; }))
  }, [loadTableLogs, logs, rowPerPage, totalPage, props, isSearching])
  
  return (
    <div className="logs-container">
      {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
        strategy='beforeInteractive'
      ></Script>      */}
      {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js"
        strategy='beforeInteractive'
      ></Script>       */} 
      {title !== '' && message !== '' &&(
        <Notification
          title={title}
          message={message}
          type={type}
          duration={duration}            
        />
      )}        
      <div className="top">
        <div className="left">
          <h2>Action Logs</h2>
        </div>

        <div className="right">
          <input type="text" id="search" name="search" placeholder="Name" />
          <button onClick={search} type="button">
            Search
          </button>
        </div>
      </div>

      <div className="center">
        <table className="data-table">
          <thead>
            <tr>
              <th>Device ID #</th>
              <th>Name</th>
              <th>Action</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody id="logs-table-body"></tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td colSpan="2"></td>
              <td id="logs-table-total"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="bottom" id="pagination">
        {
          totalPage > 0 && page > 1
            && (
              <button className={"btn-pagination"} 
                onClick={()=> changePageHandle(page-1)}
              >
                <i className={"fas fa-angle-left"}></i>
              </button> 
            )
        }
        {    
          totalPage > 0 && totalPageArr.map((v, i)=>(
            <button key={i} className={v === page ? 'btn-pagination btn-currentPage' : 'btn-pagination'}
              onClick={()=> changePageHandle(v)}
            >
            {v}
            </button>          
          ))
        }
        {
          totalPage > 0 && page < totalPage 
            && (
              <button className="btn-pagination" 
                onClick={()=> changePageHandle(page+1)}
              >
              <i className="fas fa-angle-right"></i>
              </button> 
            )
        }
      </div>

      <div className="select-rows-table">
        <label htmlFor="setRowsPerPage">Rows per page: </label>
        <input
          type="number"
          id="setRowsPerPage"
          name="setRowsPerPage"
          placeholder="Rows number"
        />
        <button id="setRowsBtn" onClick={setRowsPerPage} type="button">
          Set
        </button>
      </div>
    </div>
  );
};

export default LogsCom;
