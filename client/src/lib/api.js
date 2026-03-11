const BASE_URL = "http://localhost:5000/api";

export async function generateReply(payload) {
  const response = await fetch(`${BASE_URL}/reply/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Failed to generate reply");
  }

  return response.json();
}

export async function getHistory(search) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);

  const response = await fetch(`${BASE_URL}/history?${params.toString()}`);
  if (!response.ok) throw new Error("Failed to fetch history");

  return response.json();
}

export async function deleteHistoryItem(id) {
  const response = await fetch(`${BASE_URL}/history/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete history item");
  return response.json();
}

export async function clearAllHistory() {
  const response = await fetch(`${BASE_URL}/history`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to clear history");
  return response.json();
}