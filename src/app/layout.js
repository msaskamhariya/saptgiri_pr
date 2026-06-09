import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { ReferralProvider } from '@/context/ReferralContext';

export const metadata = {
  title: 'Saptgiri Hospital | PR Agent Dashboard',
  description: 'Referral management and tracking for PR agents.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ReferralProvider>
            {children}
          </ReferralProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
