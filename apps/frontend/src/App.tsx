import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmailVerification from './components/EmailVerification';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/verify-email" element={<EmailVerification />} />
        {/* You can add more routes here if needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
