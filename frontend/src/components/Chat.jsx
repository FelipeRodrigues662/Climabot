import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async (msg) => {
    setMessages((prev) => [...prev, { from: "user", text: msg }]);

    try {
      const res = await axios.post("http://localhost:3001/chat", {
        sessionId,
        message: msg,
      });

      if (!sessionId) setSessionId(res.data.sessionId);

      setMessages((prev) => [...prev, { from: "bot", text: res.data.nextMessage }]);
    } catch (err) {
      setMessages((prev) => [...prev, { from: "bot", text: "❌ Erro ao se comunicar com o servidor." }]);
    }
  };

  useEffect(() => {
    sendMessage("");
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const msg = input;
    setInput("");
    sendMessage(msg);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <h2>Chatbot do Clima</h2>
      </div>
      <div style={styles.chatBox}>
        <div style={styles.messages}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{ ...styles.message, justifyContent: msg.from === "user" ? "flex-end" : "flex-start" }}>
              <div style={{ ...styles.bubble, backgroundColor: msg.from === "user" ? "#dcf8c6" : "#fff" }}>
                <strong>{msg.from === "user" ? "🙋" : "🤖"}</strong>: {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <form onSubmit={handleSubmit} style={styles.inputArea}>
          <input
            style={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
          />
          <button style={styles.button} type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
} 

const styles = {
  wrapper: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f4f4",
  },
  header: {
    width: "100%",
    padding: "1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    textAlign: "center",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  },
  chatBox: {
    width: "100%",
    maxWidth: "500px",
    height: "600px",
    backgroundColor: "#ededed",
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  messages: {
    flex: 1,
    padding: "1rem",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  message: {
    display: "flex",
  },
  bubble: {
    padding: "0.5rem 1rem",
    borderRadius: "15px",
    maxWidth: "80%",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
  },
  inputArea: {
    display: "flex",
    borderTop: "1px solid #ccc",
    padding: "0.5rem",
    backgroundColor: "#fafafa",
  },
  input: {
    flex: 1,
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    borderRadius: "20px",
    border: "1px solid #ccc",
    outline: "none",
    marginRight: "0.5rem",
  },
  button: {
    padding: "0.5rem 1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
  },
};
