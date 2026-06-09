'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useContext(AuthContext);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Refer Patient', path: '/dashboard/refer', icon: '🏥' },
  ];

  return (
    <div className="glass-panel sidebar-container" style={styles.sidebar}>
      <div className="sidebar-logo-area" style={styles.logoArea}>
        <div style={styles.logo}>🏥</div>
        <h2 style={styles.brandName}>Saptgiri PR</h2>
      </div>

      <div className="sidebar-user-info" style={styles.userInfo}>
        <div style={styles.avatar}>{user?.name?.charAt(0) || 'U'}</div>
        <div>
          <p style={styles.userName}>{user?.name || 'Agent'}</p>
          <p style={styles.userRole}>PR Representative</p>
        </div>
      </div>

      <nav className="sidebar-nav" style={styles.nav}>
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link key={item.path} href={item.path} className="sidebar-nav-link" style={{
              ...styles.navLink,
              ...(isActive ? styles.activeLink : {})
            }}>
              <span className="sidebar-nav-icon" style={styles.navIcon}>{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer" style={styles.footer}>
        <button onClick={logout} style={styles.logoutBtn}>
          <span className="sidebar-nav-icon" style={styles.navIcon}>🚪</span>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    width: '280px',
    height: 'calc(100vh - 40px)',
    position: 'sticky',
    top: '20px',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 0',
  },
  logoArea: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 24px 24px',
    borderBottom: '1px solid var(--panel-border)',
    marginBottom: '24px',
  },
  logo: {
    fontSize: '28px',
    marginRight: '12px',
  },
  brandName: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#fff',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 24px',
    marginBottom: '32px',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'var(--accent-teal)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '1.2rem',
    marginRight: '12px',
  },
  userName: {
    fontWeight: '600',
    color: 'var(--text-primary)',
    fontSize: '0.95rem',
  },
  userRole: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
  },
  nav: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '0 16px',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    borderRadius: '8px',
    color: 'var(--text-secondary)',
    fontWeight: '500',
    transition: 'all 0.2s',
  },
  activeLink: {
    backgroundColor: 'rgba(0, 201, 167, 0.1)',
    color: 'var(--accent-teal)',
  },
  navIcon: {
    marginRight: '12px',
    fontSize: '1.2rem',
  },
  footer: {
    padding: '0 16px',
    marginTop: 'auto',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    color: 'var(--accent-red)',
    fontWeight: '500',
    transition: 'background 0.2s',
    textAlign: 'left',
  }
};
