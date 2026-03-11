import { Router } from "express";
import { v4 as uuidv4 } from "uuid";

export const historyRouter = Router();

let historyStore = [];
const MAX_HISTORY = 100;

export function addToHistory(data) {
  const historyItem = {
    id: uuidv4(),
    timestamp: new Date().toISOString(),
    situation: data.situation || "Unknown",
    tone: data.tone || "Professional",
    yourService: data.yourService || "",
    price: data.price || "",
    highTicketMode: data.highTicketMode || false,
    clientMessage: data.clientMessage,
    generatedReply: data.generatedReply,
  };

  historyStore.unshift(historyItem);

  if (historyStore.length > MAX_HISTORY) {
    historyStore = historyStore.slice(0, MAX_HISTORY);
  }

  return historyItem;
}

historyRouter.get("/", (req, res) => {
  const { search, situation } = req.query;
  let results = [...historyStore];

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (item) =>
        item.clientMessage.toLowerCase().includes(q) ||
        item.generatedReply.toLowerCase().includes(q) ||
        item.situation.toLowerCase().includes(q)
    );
  }

  if (situation) {
    results = results.filter((item) => item.situation === situation);
  }

  res.json({ success: true, history: results, total: results.length });
});

historyRouter.get("/:id", (req, res) => {
  const item = historyStore.find((h) => h.id === req.params.id);
  if (!item) {
    return res.status(404).json({ error: "History item not found." });
  }
  res.json({ success: true, item });
});

historyRouter.delete("/:id", (req, res) => {
  const index = historyStore.findIndex((h) => h.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "History item not found." });
  }
  historyStore.splice(index, 1);
  res.json({ success: true, message: "History item deleted." });
});

historyRouter.delete("/", (req, res) => {
  historyStore = [];
  res.json({ success: true, message: "All history cleared." });
});