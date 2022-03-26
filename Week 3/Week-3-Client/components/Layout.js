import Notification from './Notification'
import { useContext } from 'react';
import { MainContext } from '../pages/_app';
// import Script from 'next/script'

const Layout = ({ children }) => {

  const { title, message, type, duration } = useContext(MainContext); 

  return (
    <>
      {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
        strategy='beforeInteractive'
      ></Script>      */}
      {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js"
        strategy='beforeInteractive'
      ></Script>       */}
      
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root">
        {title && message  && (
          <Notification
            title={title}
            message={message}
            type={type}
            duration={duration}            
          />
        )}

        {children}

      </div>
    </>
  )
}

export default Layout