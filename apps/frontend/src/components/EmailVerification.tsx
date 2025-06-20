import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const EmailVerification: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [result, setResult] = useState<string>('Verifying...');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setResult('No token found in the URL.');
      return;
    }
    fetch('/api/auth/verify-email', {
      method: 'POST',
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ token }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (data.success) {
          setResult('Success');
          console.log('Decoded userId:', data.decoded.userId);
          console.log('User found:', data.user);
        } else {
          setResult(data.error || 'Verification failed.');
        }
      })
      .catch(() => setResult('Network error.'));
  }, [searchParams]);

  return <div>{result}</div>;
};

export default EmailVerification; 