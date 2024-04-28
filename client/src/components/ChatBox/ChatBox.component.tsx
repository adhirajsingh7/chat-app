import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { users } from "../../data/users.json";
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { io } from "socket.io-client";

const ChatBoxComponent = () => {
  const socket = useMemo(() => io("http://localhost:8080"), []);

  const [username, setUsername] = useState("");
  const [socketId, setSocketId] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState<string>("");
  const params = useParams();

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    socket.emit("message", {
      message,
      room,
      senderId: socketId,
      date: new Date(),
    });
    setMessage("");
  };

  const handleJoinRoom = () => {
    socket.emit("join-room", room);
  };

  const handleTyping = () => socket.emit("typing", `User is typing`);

  const [typingStatus, setTypingStatus] = useState("");
  useEffect(() => {
    socket.on("typingResponse", (data) => setTypingStatus(data));
  }, [socket]);

  // console.log(typingStatus);

  // connection sockets
  useEffect(() => {
    socket.on("connect", () => {
      console.log("User joined ", socket.id);
      setSocketId(socket.id || "");
    });

    socket.on("receive-message", (data: any) => {
      console.log("Message received", data);
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [params]);

  console.log(messages);

  // Setting username
  useEffect(() => {
    const user = users.find((user) => user.id === params.user_id);

    setUsername(user?.name || "");
    setRoom(user?.name || "");
  }, [params]);

  return (
    <Box
      sx={{
        height: "calc(100vh - 64px - 32px)",
        width: "calc(100% - 400px - 32px)",
        bgcolor: "white",
        p: 3,
        m: 2,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ border: 1, px: 1 }}
      >
        <Typography variant="body1">{username}</Typography>
        <Typography variant="body1">{room}</Typography>
        <Typography variant="body1">{socketId}</Typography>
      </Stack>
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        <Box sx={{ height: 1, width: 1 }}>
          <Typography variant="h4" textAlign="center">
            Messages
          </Typography>
          <Button onClick={handleJoinRoom} size="small">
            Join room
          </Button>

          {messages.map((message, key) => {
            return (
              <React.Fragment key={key}>
                <Stack direction="column" gap={2}>
                  <Box
                    sx={{
                      display: "flex",
                      direction: "row",
                      justifyContent: `${
                        message.senderId === socketId
                          ? "flex-end"
                          : "flex-start"
                      }`,
                      width: 1,
                      px: 2,
                    }}
                  >
                    <MessageBox {...message} socketId={socketId} />
                  </Box>
                </Stack>
              </React.Fragment>
            );
          })}
        </Box>
        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: 1, py: 2 }}
            gap={2}
          >
            <TextField
              fullWidth
              placeholder="Write a message"
              value={message}
              name="message"
              onChange={handleChange}
              onKeyDown={handleTyping}
            />
            <Box>
              <IconButton
                size="large"
                sx={{
                  borderRadius: 1,
                  bgcolor: "primary.main",
                  color: "white",
                  "&:hover": { bgcolor: "primary.main" },
                }}
                type="submit"
              >
                <SendIcon sx={{ transform: "rotate(-30deg)" }} />
              </IconButton>
            </Box>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};

interface MessageBoxPropTypes {
  senderId: string;
  socketId: string;
  message: string;
  date: Date;
}

export const MessageBox = (props: MessageBoxPropTypes) => {
  const { senderId, socketId, message, date } = props;
  console.log("props", props);
  const messageTime = new Date(date).toLocaleTimeString();
  // console.log(messageTime)
  return (
    <Box
      sx={{
        justifyContent: `${senderId === socketId ? "flex-start" : "flex-end"}`,
      }}
    >
      <Stack direction="column">
        <Typography variant="caption" textAlign="right">
          {senderId === socketId && "You"}
        </Typography>
        <Box
          sx={{
            maxWidth: 300,
            bgcolor: `${senderId === socketId ? "primary.main" : "grey"}`,
            wordWrap: "break-word",
            p: 1,
            // borderRadius: 2,
            borderRadius: `${
              senderId === socketId
                ? "15px 15px 0px 15px"
                : "15px 15px 15px 0px"
            }`,
            color: "white",
          }}
        >
          {message}
        </Box>
        <Typography variant="caption" textAlign="right">
          {messageTime}
        </Typography>
      </Stack>
    </Box>
  );
};

export default ChatBoxComponent;
