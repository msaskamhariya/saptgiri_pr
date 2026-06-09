const API_BASE_URL = "https://localhost:5010/api"; // Default ASP.NET Core port

export const login = async (username: string, password: string) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "Login failed");
  }
  
  return res.json();
};

export const getReferrals = async (agentId: number = 1) => {
  const res = await fetch(`${API_BASE_URL}/referrals?agentId=${agentId}`);
  if (!res.ok) throw new Error("Failed to fetch referrals");
  return res.json();
};

export const createReferral = async (data: any) => {
  const res = await fetch(`${API_BASE_URL}/referrals`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create referral");
  return res.json();
};
