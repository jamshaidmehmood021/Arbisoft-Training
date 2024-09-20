'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const currentTab = pathname === '/signIn' ? 0 : 1;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0) {
      router.push('/signIn');
    } else {
      router.push('/signUp');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper elevation={6} sx={{ padding: 4, width: '100%', textAlign: 'center' }}>
        <Box sx={{ mb: 2 }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            centered
            aria-label="auth tabs"
          >
            <Tab label="Sign In" />
            <Tab label="Sign Up" />
          </Tabs>
        </Box>
        {children}
      </Paper>
    </Container>
  );
}
