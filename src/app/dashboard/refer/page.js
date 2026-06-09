'use client';
import { useState, useContext } from 'react';
import { ReferralContext } from '@/context/ReferralContext';
import { useRouter } from 'next/navigation';

export default function ReferPatientPage() {
  const { addReferral, clinics } = useContext(ReferralContext);
  const router = useRouter();

  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    gender: 'Male',
    phone: '',
    department: 'Cardiology',
    priority: 'Normal',
    notes: '',
    clinicName: ''
  });

  const [success, setSuccess] = useState(false);

  const departments = ['Cardiology', 'Orthopedics', 'Neurology', 'Gynecology', 'Pediatrics', 'Oncology', 'General Medicine'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addReferral(formData);
    setSuccess(true);
    
    // Reset form and redirect after 2s
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
  };

  if (success) {
    return (
      <div style={styles.successContainer} className="animate-fade-in">
        <div style={styles.successIcon}>🎉</div>
        <h2>Referral Submitted Successfully!</h2>
        <p style={{color: 'var(--text-secondary)', marginTop: '8px'}}>Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Refer New Patient</h1>
        <p style={styles.subtitle}>Enter patient details to initiate the referral process.</p>
      </div>

      <div className="glass-panel" style={styles.formCard}>
        <form onSubmit={handleSubmit} className="form-grid-responsive" style={styles.formGrid}>
          
          <div className="form-group" style={styles.fullWidth}>
            <label className="form-label">Patient Name *</label>
            <input 
              type="text" 
              name="patientName"
              className="form-control" 
              required
              value={formData.patientName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Age *</label>
            <input 
              type="number" 
              name="age"
              className="form-control" 
              required
              min="1"
              max="120"
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Gender *</label>
            <select 
              name="gender"
              className="form-control" 
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Contact Number *</label>
            <input 
              type="tel" 
              name="phone"
              className="form-control" 
              required
              pattern="[0-9]{10}"
              placeholder="10 digit number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Clinic Name *</label>
            <select 
              name="clinicName"
              className="form-control" 
              required
              value={formData.clinicName}
              onChange={handleChange}
            >
              <option value="" disabled>Select Clinic</option>
              {clinics.map(c => <option key={c.clinicId} value={c.clinicName}>{c.clinicName}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Department *</label>
            <select 
              name="department"
              className="form-control" 
              value={formData.department}
              onChange={handleChange}
            >
              {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
            </select>
          </div>

          <div className="form-group" style={styles.fullWidth}>
            <label className="form-label">Priority</label>
            <div className="radio-group-responsive" style={styles.radioGroup}>
              <label style={styles.radioLabel}>
                <input 
                  type="radio" 
                  name="priority" 
                  value="Normal" 
                  checked={formData.priority === 'Normal'}
                  onChange={handleChange}
                /> Normal
              </label>
              <label style={styles.radioLabel}>
                <input 
                  type="radio" 
                  name="priority" 
                  value="Urgent" 
                  checked={formData.priority === 'Urgent'}
                  onChange={handleChange}
                /> Urgent
              </label>
            </div>
          </div>

          <div className="form-group" style={styles.fullWidth}>
            <label className="form-label">Referral Notes / Reason</label>
            <textarea 
              name="notes"
              className="form-control" 
              rows="4"
              value={formData.notes}
              onChange={handleChange}
            ></textarea>
          </div>

          <div style={{...styles.fullWidth, marginTop: '16px'}}>
            <button type="submit" className="btn-primary" style={{width: '100%'}}>
              Submit Referral
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
  },
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
  formCard: {
    padding: '32px',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0 24px',
  },
  fullWidth: {
    gridColumn: '1 / -1',
  },
  radioGroup: {
    display: 'flex',
    gap: '24px',
    padding: '12px 0',
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
  },
  successContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    textAlign: 'center',
  },
  successIcon: {
    fontSize: '64px',
    marginBottom: '24px',
  }
};
