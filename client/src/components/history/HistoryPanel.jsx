import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Search, Trash2, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HistoryPanel({ history, onLoadRequest, onDelete, onClearAll }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHistory = history.filter(
    (item) =>
      item.situation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.clientMessage?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
        <Clock className="w-12 h-12 mb-4 opacity-20" />
        <p className="font-medium">No generation history yet.</p>
        <p className="text-sm">Replies you generate will be saved here automatically.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[500px]">

      {/* Search + Clear */}
      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            placeholder="Search history..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={onClearAll}
          title="Clear history"
        >
          <Trash2 className="w-4 h-4 text-destructive" />
        </Button>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3">
        {filteredHistory.map((item) => (
          <Card
            key={item.id}
            className="p-4 hover:border-primary/50 transition group"
          >
            {/* Top row */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex gap-2 items-center flex-wrap">
                <Badge variant="secondary">{item.situation}</Badge>
                <Badge variant="outline">{item.tone}</Badge>
                {item.highTicketMode && (
                  <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">
                    High Ticket
                  </Badge>
                )}
              </div>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
              </span>
            </div>

            {/* Message preview */}
            <p className="text-sm text-muted-foreground italic border-l-2 border-muted pl-2 mb-4 line-clamp-2">
              "{item.clientMessage}"
            </p>

            {/* Actions */}
            <div className="flex justify-between opacity-0 group-hover:opacity-100 transition">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onLoadRequest(item)}
              >
                Load
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDelete(item.id)}
                className="text-destructive"
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

    </div>
  );
}