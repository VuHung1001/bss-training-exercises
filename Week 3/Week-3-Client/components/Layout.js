import Notification from './Notification'
import { useContext } from 'react';
import { MainContext } from '../pages/_app';

const Layout = ({ children }) => {

  const { title, message, type, duration } = useContext(MainContext); 

  return (
    <>

      <div>
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
      </div>
    </>
  )
}

export default Layout