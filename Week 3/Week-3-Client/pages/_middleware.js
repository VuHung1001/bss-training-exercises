import { NextResponse, NextRequest } from "next/server";
import {useState, useEffect} from 'react'

export async function middleware(req) {
  const url = req.nextUrl.clone();
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  console.log(isLoggedIn);

  if (url.pathname === "/" && !isLoggedIn) {
    url.pathname = "/login";
    return NextResponse.rewrite(url);
  }
  if (url.pathname === "/" && isLoggedIn){
    url.pathname = "/dashboard";
    return NextResponse.rewrite(url);
  }

  useEffect(() => {
    if (window) { 
      setIsLoggedIn(window.sessionStorage.getItem("isLoggedIn")); 
    }
}, []);

  return NextResponse.next();
}
