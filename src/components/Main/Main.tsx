import { HeaderResponsive } from './Layout/Header/Header';

export default function Main({ children }: any) {
  return (
    <HeaderResponsive
      links={[
        { link: '/dashboard', label: 'Dashboard' },
        { link: '/commands', label: 'Commands' },
      ]}
    >
      {children}
    </HeaderResponsive>
  );
}
