import { useState, KeyboardEvent } from "react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

interface ChatWidgetProps {
  shopId: string;
}

export default function ChatWidget({ shopId }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hi! I'm your assistant. Ask me anything." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shopId,
          userId: "demo-user", // could later make dynamic per client
          message: newMessage.text,
        }),
      });
      const data = await res.json();

      // Voiceflow returns an array of trace objects, pick out text responses
      const responses = data.filter((t: any) => t.type === "text");
      responses.forEach((r: any) => {
        setMessages((prev) => [...prev, { sender: "bot", text: r.payload.message }]);
      });
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Error: can't reach server." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col max-w-md mx-auto h-screen bg-gray-900 text-white p-4">
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded-xl max-w-[80%] ${
              m.sender === "user"
                ? "ml-auto bg-blue-600"
                : "mr-auto bg-gray-700"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="flex items-center mt-2">
        <input
          className="flex-1 p-2 rounded-xl bg-gray-800 border border-gray-600"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        <button
          className="ml-2 px-4 py-2 rounded-xl bg-blue-600 disabled:opacity-50"
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
