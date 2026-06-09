"use client";

import { useEffect, useState } from "react";
import { getReferrals } from "@/utils/api";

export default function DashboardPage() {
  const [referrals, setReferrals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const data = await getReferrals();
        setReferrals(data);
      } catch (error) {
        console.error("Failed to load referrals", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReferrals();
  }, []);

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'admitted': return 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800';
      case 'discharged': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800';
      default: return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <header>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of your referred patients</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="panel flex items-center justify-between border-t-4 border-t-primary">
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Referrals</p>
            <p className="text-3xl font-bold mt-1">{referrals.length}</p>
          </div>
          <div className="text-4xl opacity-50">👥</div>
        </div>
        <div className="panel flex items-center justify-between border-t-4 border-t-amber-500">
          <div>
            <p className="text-gray-500 text-sm font-medium">Pending</p>
            <p className="text-3xl font-bold mt-1">{referrals.filter(r => r.status === 'Pending').length}</p>
          </div>
          <div className="text-4xl opacity-50">⏳</div>
        </div>
        <div className="panel flex items-center justify-between border-t-4 border-t-emerald-500">
          <div>
            <p className="text-gray-500 text-sm font-medium">Admitted</p>
            <p className="text-3xl font-bold mt-1">{referrals.filter(r => r.status === 'Admitted').length}</p>
          </div>
          <div className="text-4xl opacity-50">🏥</div>
        </div>
      </div>

      <div className="panel p-0 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-bold">Recent Referrals</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th className="p-4 text-sm font-semibold text-gray-500">ID</th>
                <th className="p-4 text-sm font-semibold text-gray-500">Patient Name</th>
                <th className="p-4 text-sm font-semibold text-gray-500">Department</th>
                <th className="p-4 text-sm font-semibold text-gray-500">Date</th>
                <th className="p-4 text-sm font-semibold text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">Loading referrals...</td>
                </tr>
              ) : referrals.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">No referrals found.</td>
                </tr>
              ) : referrals.map(r => (
                <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="p-4 text-sm text-gray-500">{r.referenceNumber}</td>
                  <td className="p-4 font-medium">{r.patientName}</td>
                  <td className="p-4 text-sm">{r.department}</td>
                  <td className="p-4 text-sm text-gray-500">{new Date(r.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(r.status)}`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
