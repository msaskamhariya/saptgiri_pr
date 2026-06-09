import StatusBadge from './StatusBadge';

export default function ReferralTable({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="glass-panel" style={styles.empty}>
        <p>No referrals found.</p>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={styles.container}>
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Patient Name</th>
              <th style={styles.th}>Clinic</th>
              <th style={styles.th}>Department</th>
              <th style={styles.th}>Agent</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Priority</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>Comm. Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={row.id} style={i !== data.length - 1 ? styles.trBorder : {}}>
                <td style={{...styles.td, color: 'var(--text-secondary)'}}>{row.id}</td>
                <td style={{...styles.td, fontWeight: '500'}}>{row.patientName}</td>
                <td style={{...styles.td, color: 'var(--accent-teal)'}}>{row.clinicName}</td>
                <td style={styles.td}>{row.department}</td>
                <td style={{...styles.td, color: 'var(--text-secondary)'}}>{row.agentName}</td>
                <td style={styles.td}>{row.date}</td>
                <td style={styles.td}>
                  <span style={{
                    color: row.priority === 'Urgent' ? 'var(--accent-red)' : 'var(--text-secondary)',
                    fontWeight: row.priority === 'Urgent' ? '600' : '400'
                  }}>
                    {row.priority}
                  </span>
                </td>
                <td style={styles.td}>
                  <StatusBadge status={row.status} />
                </td>
                <td style={{...styles.td, fontWeight: '600', color: 'var(--accent-amber)'}}>
                  {row.commissionAmount ? `₹${row.commissionAmount}` : '-'}
                </td>
                <td style={styles.td}>
                  <StatusBadge status={row.commissionStatus} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '0',
    overflow: 'hidden',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  th: {
    padding: '16px 24px',
    backgroundColor: 'rgba(0,0,0,0.2)',
    color: 'var(--text-secondary)',
    fontWeight: '600',
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  td: {
    padding: '16px 24px',
    fontSize: '0.95rem',
  },
  trBorder: {
    borderBottom: '1px solid var(--panel-border)',
  },
  empty: {
    padding: '40px',
    textAlign: 'center',
    color: 'var(--text-secondary)',
  }
};
