import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, CheckCheck, RefreshCw } from "lucide-react";

export function OutputPanel({ content, onContentChange, onReset }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Copy failed. Please copy manually.");
    }
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;

  return (
    <Card className="flex flex-col h-full overflow-hidden border-border/50 shadow-xl bg-card/50">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
        <h3 className="font-semibold text-sm">Generated Reply</h3>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={onReset}>
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
            Reset
          </Button>
          <Button size="sm" onClick={handleCopy} disabled={!content}>
            {copied ? (
              <><CheckCheck className="w-3.5 h-3.5 mr-1.5" />Copied!</>
            ) : (
              <><Copy className="w-3.5 h-3.5 mr-1.5" />📋 Copy & Send</>
            )}
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1">
        <textarea
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          className="w-full h-full resize-none border-0 focus:outline-none p-6 text-base bg-transparent"
          placeholder="Generated reply will appear here..."
        />
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t bg-muted/20 flex justify-between text-xs text-muted-foreground">
        <span>Edit text before copying.</span>
        <div className="flex gap-4 font-medium">
          <span>{wordCount} words</span>
          <span>{charCount} characters</span>
        </div>
      </div>

    </Card>
  );
}