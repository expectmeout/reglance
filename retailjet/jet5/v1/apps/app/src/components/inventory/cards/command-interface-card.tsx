"use client";

import { useState } from "react";
import { format } from "date-fns"; // Add this import
import { Terminal, Play, AlertCircle, CheckCircle2, XCircle, RefreshCw, Command } from "lucide-react";
import { Card, CardContent } from "@/components/card";
import { Button } from "@/components/button";
import { Badge } from "@/components/badge";
import { ScrollArea } from "@/components/scroll-area";
import { Input } from "@/components/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/alert";

interface CommandLog {
  id: string;
  timestamp: string;
  type: "info" | "success" | "error";
  message: string;
  details?: string;
}

interface CommandAction {
  id: string;
  name: string;
  description: string;
  status: "ready" | "running" | "completed" | "failed";
  lastRun?: string;
}

// Mock data unchanged
const commandActions: CommandAction[] = [
  // ... (unchanged)
];

const initialLogs: CommandLog[] = [
  // ... (unchanged)
];

const getStatusIcon = (status: CommandAction["status"]) => {
  switch (status) {
    case "running":
      return <RefreshCw className="h-4 w-4 animate-spin" />;
    case "completed":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case "failed":
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return <Command className="h-4 w-4" />;
  }
};

const getLogIcon = (type: CommandLog["type"]) => {
  switch (type) {
    case "success":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case "error":
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return <AlertCircle className="h-4 w-4 text-blue-500" />;
  }
};

export const CommandInterfaceCard = () => {
  const [logs, setLogs] = useState<CommandLog[]>(initialLogs);
  const [actions, setActions] = useState<CommandAction[]>(commandActions);
  const [command, setCommand] = useState("");

  // Date formatting function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMM d, yyyy 'at' h:mm:ss a"); // e.g., "Mar 7, 2024 at 12:30:00 PM"
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "h:mm:ss a"); // e.g., "12:30:00 PM"
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    const newLog: CommandLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: "info",
      message: `Executing command: ${command}`,
      details: "Processing..."
    };
    setLogs(prev => [newLog, ...prev]);
    setCommand("");
  };

  const handleActionClick = (action: CommandAction) => {
    if (action.status === "running") return;

    setActions(prev => prev.map(a => 
      a.id === action.id ? { ...a, status: "running", lastRun: new Date().toISOString() } : a
    ));

    const newLog: CommandLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: "info",
      message: `Started: ${action.name}`,
      details: action.description
    };
    setLogs(prev => [newLog, ...prev]);

    setTimeout(() => {
      setActions(prev => prev.map(a => 
        a.id === action.id ? { ...a, status: "completed" } : a
      ));

      const completionLog: CommandLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: "success",
        message: `Completed: ${action.name}`,
        details: `Successfully executed ${action.name.toLowerCase()}`
      };
      setLogs(prev => [completionLog, ...prev]);
    }, 3000);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-full">
            <Terminal className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-semibold">Command & Control</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {actions.map((action) => (
          <Button
            key={action.id}
            variant="outline"
            className="h-auto p-4 flex items-start gap-3"
            onClick={() => handleActionClick(action)}
            disabled={action.status === "running"}
          >
            {getStatusIcon(action.status)}
            <div className="flex-1 text-left">
              <div className="font-medium">{action.name}</div>
              <div className="text-sm text-muted-foreground">{action.description}</div>
              {action.lastRun && (
                <div className="text-xs text-muted-foreground mt-1">
                  Last run: {formatDate(action.lastRun)}
                </div>
              )}
            </div>
          </Button>
        ))}
      </div>

      <form onSubmit={handleCommandSubmit} className="flex gap-2 mb-4">
        <Input
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Enter command..."
          className="flex-1"
        />
        <Button type="submit" disabled={!command.trim()}>
          <Play className="h-4 w-4" />
        </Button>
      </form>

      <div className="flex-1 min-h-0">
        <ScrollArea className="h-[300px]">
          <div className="space-y-2 p-1">
            {logs.map((log) => (
              <Alert key={log.id} variant={log.type === "error" ? "destructive" : "default"}>
                <div className="flex items-start gap-2">
                  {getLogIcon(log.type)}
                  <div className="flex-1">
                    <AlertTitle className="flex items-center justify-between">
                      <span>{log.message}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(log.timestamp)}
                      </span>
                    </AlertTitle>
                    {log.details && (
                      <AlertDescription className="mt-1 text-sm">
                        {log.details}
                      </AlertDescription>
                    )}
                  </div>
                </div>
              </Alert>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default CommandInterfaceCard;