'use client';
import { useContext, useState, useMemo } from 'react';
import { ReferralContext } from '@/context/ReferralContext';
import StatsCard from '@/components/StatsCard';
import ReferralTable from '@/components/ReferralTable';
import ReferralChart from '@/components/ReferralChart';

export default function DashboardPage() {
  const { referrals } = useContext(ReferralContext);

  // Filter States
  const [filterName, setFilterName] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [filterDate, setFilterDate] = useState('');

  // Extract unique departments for the dropdown
  const departments = useMemo(() => {
    const depts = new Set(referrals.map(r => r.department).filter(Boolean));
    return Array.from(depts).sort();
  }, [referrals]);

  // Derived filtered referrals
  const filteredReferrals = useMemo(() => {
    return referrals.filter(r => {
      const matchName = r.patientName.toLowerCase().includes(filterName.toLowerCase());
      const matchDept = filterDept ? r.department === filterDept : true;
      const matchDate = filterDate ? r.date === filterDate : true;
      return matchName && matchDept && matchDate;
    });
  }, [referrals, filterName, filterDept, filterDate]);

  // Calculate stats based on FILTERED referrals
  const stats = useMemo(() => {
    return {
      total: filteredReferrals.length,
      admitted: filteredReferrals.filter(r => r.status === 'Admitted').length,
      pending: filteredReferrals.filter(r => r.status === 'Pending').length,
      discharged: filteredReferrals.filter(r => r.status === 'Discharged').length,
    };
  }, [filteredReferrals]);

  return (
    <div>
      <div style={styles.header}>
        <h1 style={styles.title}>Dashboard Overview</h1>
        <p style={styles.subtitle}>Track and manage your referred patients.</p>
      </div>

      {/* Filter Section */}
      <div className="glass-panel" style={styles.filterSection}>
        <div style={styles.filterGrid}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontSize: '0.8rem' }}>Patient Name</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search name..."
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              style={styles.filterInput}
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontSize: '0.8rem' }}>Clinic / Department</label>
            <select 
              className="form-control" 
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              style={styles.filterInput}
            >
              <option value="">All Departments</option>
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontSize: '0.8rem' }}>Date</label>
            <input 
              type="date" 
              className="form-control" 
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              style={styles.filterInput}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button 
              className="btn-primary" 
              style={{ padding: '10px 16px', background: 'transparent', border: '1px solid var(--panel-border)', width: '100%' }}
              onClick={() => { setFilterName(''); setFilterDept(''); setFilterDate(''); }}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      <div style={styles.statsGrid}>
        <StatsCard title="Total Referrals" value={stats.total} icon="📋" color="var(--text-primary)" />
        <StatsCard title="Pending" value={stats.pending} icon="⏳" color="var(--accent-amber)" />
        <StatsCard title="Admitted" value={stats.admitted} icon="🏥" color="var(--accent-teal)" />
        <StatsCard title="Discharged" value={stats.discharged} icon="✅" color="var(--accent-blue)" />
      </div>

      <ReferralChart data={filteredReferrals} />

      <div style={styles.tableSection}>
        <div style={styles.tableHeader}>
          <h2 style={styles.sectionTitle}>Recent Referrals</h2>
        </div>
        <ReferralTable data={filteredReferrals} />
      </div>
    </div>
  );
}

const styles = {
  header: {
    marginBottom: '32px',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: '700',
    marginBottom: '8px',
  },
  subtitle: {
    color: 'var(--text-secondary)',
  },
  filterSection: {
    padding: '16px 24px',
    marginBottom: '32px',
  },
  filterGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  },
  filterInput: {
    padding: '10px 14px',
    fontSize: '0.9rem'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '24px',
    marginBottom: '40px',
  },
  tableSection: {
    marginBottom: '40px',
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  sectionTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
  }
};
