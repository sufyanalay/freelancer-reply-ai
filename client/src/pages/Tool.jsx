import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReplyForm } from "../components/generator/ReplyForm";
import { OutputPanel } from "../components/generator/OutputPanel";
import { GeneratingAnimation } from "../components/generator/GeneratingAnimation";
import { HistoryPanel } from "../components/history/HistoryPanel";
import { generateReply } from "../lib/api";
import { Card } from "@/components/ui/card";
import { Sparkles, MessageSquare, History } from "lucide-react";

export default function Tool() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReply, setGeneratedReply] = useState("");
  const [loadedRequest, setLoadedRequest] = useState(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("reply-history");
    return saved ? JSON.parse(saved) : [];
  });

  const saveHistory = (data) => {
    setHistory(data);
    localStorage.setItem("reply-history", JSON.stringify(data));
  };

  const handleSubmit = async (data) => {
    setIsGenerating(true);
    setGeneratedReply("");
    setError("");

    try {
      const result = await generateReply({
        clientMessage: data.clientMessage,
        situation: data.situation,
        tone: data.tone,
        yourService: data.serviceType,
        price: data.price || "",
        highTicketMode: data.highTicketMode,
      });

      setGeneratedReply(result.reply);

      const newItem = {
        id: crypto.randomUUID(),
        clientMessage: data.clientMessage,
        situation: data.situation,
        tone: data.tone,
        serviceType: data.serviceType,
        price: data.price || "",
        highTicketMode: data.highTicketMode,
        reply: result.reply,
        createdAt: new Date().toISOString(),
      };

      saveHistory([newItem, ...history]);

    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDelete = (id) => {
    saveHistory(history.filter((item) => item.id !== id));
  };

  const handleClearAll = () => {
    saveHistory([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 container max-w-7xl mx-auto px-4 py-12 md:py-20 flex flex-col gap-12">

        {/* Header */}
        <motion.section
          className="text-center max-w-3xl mx-auto space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            AI Reply Engine
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Reply <span className="text-primary">Generator</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Transform any client message into a professional response.
          </p>
        </motion.section>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left — Form */}
          <div className="lg:col-span-5">
            <Card className="p-6 shadow-xl">
              <ReplyForm
                onSubmit={handleSubmit}
                isGenerating={isGenerating}
                loadedRequest={loadedRequest}
              />
            </Card>
          </div>

          {/* Right — Output + History */}
          <div className="lg:col-span-7 flex flex-col gap-8">

            {/* Error */}
            {error && (
              <div className="bg-destructive/10 text-destructive border border-destructive/20 rounded-xl px-4 py-3 text-sm">
                {error}
              </div>
            )}

            {/* Output Panel */}
            <div className="min-h-[350px] flex flex-col">
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div
                    key="generating"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Card className="flex items-center justify-center p-6 min-h-[350px]">
                      <GeneratingAnimation />
                    </Card>
                  </motion.div>
                ) : generatedReply ? (
                  <motion.div
                    key="output"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex-1"
                  >
                    <OutputPanel
                      content={generatedReply}
                      onContentChange={setGeneratedReply}
                      onReset={() => setGeneratedReply("")}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Card className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground min-h-[350px]">
                      <MessageSquare size={40} className="mb-4 opacity-20" />
                      <h3 className="text-xl font-bold mt-2">Generate your reply</h3>
                      <p className="text-sm mt-1">Enter your client's message and click Generate.</p>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* History */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <History className="w-4 h-4 text-muted-foreground" />
                <h2 className="font-semibold">History</h2>
              </div>
              <HistoryPanel
                history={history}
                onLoadRequest={(item) => setLoadedRequest(item)}
                onDelete={handleDelete}
                onClearAll={handleClearAll}
              />
            </Card>

          </div>
        </div>
      </main>
    </div>
  );
}