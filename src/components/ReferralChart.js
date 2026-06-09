'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function ReferralChart({ data }) {
  // Aggregate data by department
  const aggregatedData = data.reduce((acc, curr) => {
    const dept = curr.department || 'Unknown';
    if (!acc[dept]) {
      acc[dept] = { department: dept, count: 0 };
    }
    acc[dept].count += 1;
    return acc;
  }, {});

  const chartData = Object.values(aggregatedData).sort((a, b) => b.count - a.count);

  if (!chartData || chartData.length === 0) {
    return (
      <div className="glass-panel" style={styles.empty}>
        <p>No data available for chart.</p>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={styles.container}>
      <h3 style={styles.title}>Referrals by Department</h3>
      <div style={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
            <XAxis dataKey="department" stroke="var(--text-secondary)" tick={{fill: 'var(--text-secondary)'}} />
            <YAxis stroke="var(--text-secondary)" tick={{fill: 'var(--text-secondary)'}} allowDecimals={false} />
            <Tooltip 
              cursor={{fill: 'rgba(255,255,255,0.05)'}}
              contentStyle={{ backgroundColor: 'var(--bg-dark)', borderColor: 'var(--panel-border)', borderRadius: '8px' }}
              itemStyle={{ color: 'var(--accent-teal)' }}
            />
            <Bar dataKey="count" fill="var(--accent-teal)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '24px',
    marginBottom: '40px',
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '24px',
  },
  chartWrapper: {
    width: '100%',
  },
  empty: {
    padding: '40px',
    textAlign: 'center',
    color: 'var(--text-secondary)',
    marginBottom: '40px',
  }
};
