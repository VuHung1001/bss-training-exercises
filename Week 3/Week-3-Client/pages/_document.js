import { Html, Head, Main, NextScript } from 'next/document'


export default function Document() {
  return (
    <Html>
      <Head>

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

      </Head>  
      <body>
        <Main />
        <NextScript />   
      </body>
    </Html>
  )
}