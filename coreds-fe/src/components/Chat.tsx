import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  Stack,
  AppBar,
  Toolbar,
  Slide,
  Fade
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "👋 Hi! I’m CoreDS. Ask me anything about data science fundamentals."
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: input }
    ]);
    setInput("");
    // TODO: Call backend and add bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "(This is a placeholder response. Backend integration coming soon!)"
        }
      ]);
    }, 600);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4f6fa",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <AppBar position="static" color="primary" elevation={2}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            CoreDS: Data Science Fundamentals Assistant
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: "100%",
            maxWidth: 500,
            minHeight: 500,
            display: "flex",
            flexDirection: "column",
            p: 0,
            position: "relative",
            bgcolor: "white"
          }}
        >
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              px: 2,
              pt: 2,
              pb: 8,
              display: "flex",
              flexDirection: "column"
            }}
          >
            <Stack spacing={2}>
              {messages.map((msg, idx) => (
                <Slide
                  key={idx}
                  direction={msg.sender === "user" ? "left" : "right"}
                  in={true}
                  mountOnEnter
                  unmountOnExit={false}
                  appear
                >
                  <Box
                    alignSelf={msg.sender === "user" ? "flex-end" : "flex-start"}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: msg.sender === "user" ? "flex-end" : "flex-start"
                    }}
                  >
                    <Fade in={true} timeout={600}>
                      <Box
                        sx={{
                          bgcolor:
                            msg.sender === "user"
                              ? "primary.main"
                              : "grey.100",
                          color:
                            msg.sender === "user"
                              ? "primary.contrastText"
                              : "text.primary",
                          borderRadius: 3,
                          px: 2,
                          py: 1.2,
                          boxShadow: 1,
                          maxWidth: 340,
                          wordBreak: "break-word",
                          fontSize: 16
                        }}
                      >
                        {msg.text}
                      </Box>
                    </Fade>
                  </Box>
                </Slide>
              ))}
              <div ref={messagesEndRef} />
            </Stack>
          </Box>
          {/* Sticky input area */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              bgcolor: "white",
              borderTop: "1px solid #eee",
              p: 2,
              display: "flex"
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your question..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              multiline
              maxRows={3}
              sx={{ mr: 1 }}
            />
            <IconButton
              color="primary"
              onClick={handleSend}
              disabled={!input.trim()}
              size="large"
              sx={{ alignSelf: "flex-end" }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Chat; 