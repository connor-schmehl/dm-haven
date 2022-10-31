import logo from './logo.svg';
import './App.css';
import Initiative from './components/Initiative';
import Dice from './components/Dice';
import { useEffect } from 'react';
function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  });

  return (
    <div>
      <div id="g_id_onload"
         data-client_id="329578885504-fdhgbm69bgqcj3seolbuu8jjlt8na89j.apps.googleusercontent.com"
         data-login_uri="https://dmhaven.net"
         data-auto_prompt="false">
      </div>
      <div className="g_id_signin"
         data-type="standard"
         data-size="large"
         data-theme="outline"
         data-text="sign_in_with"
         data-shape="rectangular"
         data-logo_alignment="left">
      </div>
      <Initiative/>
      <Dice/>
    </div>
  );
}

export default App;
