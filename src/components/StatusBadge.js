export default function StatusBadge({ status }) {
  const getStatusStyles = () => {
    switch (status) {
      case 'Pending':
        return { bg: 'rgba(255, 181, 71, 0.15)', color: 'var(--accent-amber)', border: '1px solid rgba(255, 181, 71, 0.3)' };
      case 'Admitted':
        return { bg: 'rgba(0, 201, 167, 0.15)', color: 'var(--accent-teal)', border: '1px solid rgba(0, 201, 167, 0.3)' };
      case 'Discharged':
        return { bg: 'rgba(77, 168, 255, 0.15)', color: 'var(--accent-blue)', border: '1px solid rgba(77, 168, 255, 0.3)' };
      case 'Rejected':
        return { bg: 'rgba(255, 90, 90, 0.15)', color: 'var(--accent-red)', border: '1px solid rgba(255, 90, 90, 0.3)' };
      default:
        return { bg: 'rgba(255, 255, 255, 0.1)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.2)' };
    }
  };

  const styles = getStatusStyles();

  return (
    <span style={{
      ...badgeStyle,
      backgroundColor: styles.bg,
      color: styles.color,
      border: styles.border
    }}>
      {status}
    </span>
  );
}

const badgeStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '4px 12px',
  borderRadius: '20px',
  fontSize: '0.85rem',
  fontWeight: '600',
  whiteSpace: 'nowrap',
};
