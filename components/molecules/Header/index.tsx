import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { DesktopHeader, MobileHeader } from './components';
import Container from '../../organisms/Container';
import { useAuthenticatedUser } from '../../../hooks/useAuthenticatedUser';

export function Header({
  onMenuOpening: handleMenuOpening,
}: {
  onMenuOpening: () => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();

  const user = useAuthenticatedUser();

  const items = [
    { href: '/sobre-nosotros', children: 'Sobre Sie Waka' },
    { href: '/noticias', children: 'Noticias' },
    { href: '/preguntas-frecuentes', children: 'Preguntas frecuentes' },
  ];

  if (!!user) {
    items.push({ href: '/admin/sampling-points', children: 'Admin' });
  }

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    handleMenuOpening();
  };

  const handleLogin = async () => {
    await router.push({ pathname: '/ingresar' });
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  if (!!user && router.asPath.includes('admin')) {
    return null;
  }

  return (
    <header>
      <Container size="lg">
        <DesktopHeader
          items={items}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
        <MobileHeader
          onLogin={handleLogin}
          onLogout={handleLogout}
          isMenuOpen={isMenuOpen}
          onToggle={handleToggle}
          items={items}
        />
      </Container>
    </header>
  );
}
