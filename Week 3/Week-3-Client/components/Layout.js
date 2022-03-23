import Head from 'next/head'
import Notification from './Notification'

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
          rel="stylesheet"
        />

        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
          integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
          crossOrigin="anonymous"
        />

        <link rel="icon" href="https://hr.bssgroup.vn/files/thumbnail/New/logo%20moi/80x80/0001.jpg"/> 

        <title>HungVP Week 3</title>
      </Head>
      <div>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root">
          {/* <Notification
            title={'success'}
            message={'congratulation'}
            type={'success'}
            duration={500000}            
          /> */}
          <div id="hamburger-button" 
            // onClick="toggleSidebar(true)"
          >
            <i className="fas fa-bars"></i>
          </div>    

          {children}

          {/* jquery */}
          <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>     
          {/* chart js library */}
          <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js"></script>

        </div>
      </div>
    </>
  )
}

export default Layout