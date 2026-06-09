'use client';
import { createContext, useState, useEffect } from 'react';

export const ReferralContext = createContext();

const mapReferral = (r) => ({
  id: r.referenceNumber,
  patientName: r.patientName,
  age: r.age,
  gender: r.gender,
  phone: r.phone,
  department: r.department,
  date: new Date(r.createdAt).toISOString().split('T')[0],
  status: r.status,
  priority: r.priority,
  notes: r.notes,
  commissionAmount: r.commissionAmount,
  commissionStatus: r.commissionStatus || 'Pending',
  clinicName: r.clinicName || 'N/A',
  agentName: r.agentName || 'N/A'
});

export function ReferralProvider({ children }) {
  const [referrals, setReferrals] = useState([]);
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const storedUser = localStorage.getItem('pr_user');
        const agentId = storedUser ? JSON.parse(storedUser).id : 1;
        const res = await fetch(`http://localhost:5000/api/referrals?agentId=${agentId}`);
        if (res.ok) {
          const data = await res.json();
          setReferrals(data.map(mapReferral));
        }
      } catch (error) {
        console.error("Failed to fetch referrals", error);
      }
    };

    const fetchClinics = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/clinics`);
        if (res.ok) {
          const data = await res.json();
          setClinics(data);
        }
      } catch (error) {
        console.error("Failed to fetch clinics", error);
      }
    };

    fetchReferrals();
    fetchClinics();
  }, []);

  const addReferral = async (referralData) => {
    try {
      const storedUser = localStorage.getItem('pr_user');
      const agentId = storedUser ? JSON.parse(storedUser).id : 1;
      const payload = {
        ...referralData,
        age: parseInt(referralData.age, 10),
        agentId
      };

      const res = await fetch('http://localhost:5000/api/referrals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        const data = await res.json();
        const mapped = mapReferral(data);
        setReferrals(prev => [mapped, ...prev]);
        return mapped;
      }
      throw new Error('Failed to create referral');
    } catch (error) {
      console.error("Add referral error:", error);
      throw error;
    }
  };

  const getStats = () => {
    return {
      total: referrals.length,
      admitted: referrals.filter(r => r.status === 'Admitted').length,
      pending: referrals.filter(r => r.status === 'Pending').length,
      discharged: referrals.filter(r => r.status === 'Discharged').length,
    };
  };

  return (
    <ReferralContext.Provider value={{ referrals, clinics, addReferral, getStats }}>
      {children}
    </ReferralContext.Provider>
  );
}
