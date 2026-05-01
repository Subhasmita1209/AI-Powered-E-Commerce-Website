import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Authcontext from './context/Authcontext.jsx'
import Usercontext from './context/Usercontext.jsx'
import Shopcontext from './context/Shopcontext.jsx'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Authcontext>
    <Usercontext>
      <Shopcontext>
      <PayPalScriptProvider
  options={{
    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: "USD",
    intent: "capture"
  }}
>
         <App />
         </PayPalScriptProvider>
      </Shopcontext>
        </Usercontext>
  </Authcontext> 

  </BrowserRouter>
   

)
