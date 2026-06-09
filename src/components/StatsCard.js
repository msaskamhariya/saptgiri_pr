export default function StatsCard({ title, value, icon, color }) {
  return (
    <div className="glass-panel" style={{...styles.card, borderTop: `4px solid ${color}`}}>
      <div style={styles.content}>
        <div>
          <p style={styles.title}>{title}</p>
          <h3 style={styles.value}>{value}</h3>
        </div>
        <div style={{...styles.iconWrapper, color}}>
          {icon}
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    padding: '24px',
    transition: 'transform 0.2s',
    cursor: 'default',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
    fontWeight: '500',
    marginBottom: '8px',
  },
  value: {
    color: 'var(--text-primary)',
    fontSize: '2rem',
    fontWeight: '700',
  },
  iconWrapper: {
    fontSize: '2.5rem',
    opacity: 0.8,
  }
};
