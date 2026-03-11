import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const SITUATION_TYPES = [
  "Collaboration Request",
  "Sponsorship Inquiry",
  "Fan Question",
  "Negative Comment",
  "Media Interview Request",
  "Content Repost Request",
  "Pricing Question",
  "Follow Up",
  "Custom Situation",
];

const TONES = [
  "Friendly",
  "Professional",
  "Confident",
  "Persuasive",
  "Apologetic",
  "Firm",
];

export function ReplyForm({ onSubmit, isGenerating, loadedRequest }) {
  const [clientMessage, setClientMessage] = useState("");
  const [situation, setSituation] = useState("Collaboration Request");
  const [customSituation, setCustomSituation] = useState("");
  const [tone, setTone] = useState("Professional");
  const [serviceType, setServiceType] = useState("");
  const [price, setPrice] = useState("");
  const [highTicketMode, setHighTicketMode] = useState(false);

  useEffect(() => {
    if (loadedRequest) {
      setClientMessage(loadedRequest.clientMessage || "");
      setSituation(loadedRequest.situation || "Collaboration Request");
      setTone(loadedRequest.tone || "Professional");
      setServiceType(loadedRequest.serviceType || "");
      setPrice(loadedRequest.price || "");
      setHighTicketMode(loadedRequest.highTicketMode || false);
    }
  }, [loadedRequest]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      clientMessage,
      situation: situation === "Custom Situation" ? customSituation : situation,
      tone,
      serviceType,
      price,
      highTicketMode,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Client Message */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Client's Message</label>
        <textarea
          value={clientMessage}
          onChange={(e) => setClientMessage(e.target.value)}
          placeholder="Paste what the client said..."
          rows={5}
          required
          className="w-full border border-input rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-ring bg-background"
        />
      </div>

      {/* Situation + Tone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Situation</label>
          <select
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            className="w-full border border-input rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring bg-background"
          >
            {SITUATION_TYPES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Tone</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full border border-input rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring bg-background"
          >
            {TONES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Custom Situation */}
      {situation === "Custom Situation" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="space-y-2">
            <label className="text-sm font-medium">Describe Situation</label>
            <input
              type="text"
              value={customSituation}
              onChange={(e) => setCustomSituation(e.target.value)}
              placeholder="Explain your scenario..."
              className="w-full border border-input rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring bg-background"
            />
          </div>
        </motion.div>
      )}

      {/* Service + Price */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Your Niche/Service</label>
          <input
            type="text"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            placeholder="Fashion, Fitness, Travel..."
            className="w-full border border-input rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring bg-background"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Rate/Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="$1000"
            className="w-full border border-input rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring bg-background"
          />
        </div>
      </div>

      {/* High Ticket Mode */}
      <div className="flex justify-between items-center border border-input p-4 rounded-xl">
        <div>
          <p className="text-sm font-medium">High Ticket Mode</p>
          <p className="text-xs text-muted-foreground">
            More premium professional language
          </p>
        </div>
        <button
          type="button"
          onClick={() => setHighTicketMode(!highTicketMode)}
          className={`w-12 h-6 rounded-full transition-colors relative ${
            highTicketMode ? "bg-primary" : "bg-muted"
          }`}
        >
          <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform absolute top-0.5 ${
            highTicketMode ? "translate-x-6" : "translate-x-0.5"
          }`} />
        </button>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isGenerating}
        className="w-full h-14 text-lg"
      >
        {isGenerating ? "Generating..." : (
          <>
            <Sparkles className="w-5 h-5 mr-2" />
            Generate Reply
          </>
        )}
      </Button>

    </form>
  );
}