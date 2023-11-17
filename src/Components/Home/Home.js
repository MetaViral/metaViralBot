import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import chatLogo from "./assets/chat.png";
import userLogo from "./assets/user.png";

import app from "../../firebase.init";
import "./Home.css";
const Home = () => {
  const YOU = "you";
  const AI = "ai";
  const inputRef = useRef();
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  const [qna, setQna] = useState([
    // { from: YOU, value: "FROM ME" },
    // { from: AI, value: ["1 MESSG FROM AI", "2 MESSG FROM AI"] },
  ]);
  const [loading, setLoading] = useState(false);
  const updateQna = (from, value) => {
    setQna((qna) => [...qna, { from, value }]);
  };
  const handleSend = () => {
    const question = inputRef.current.value;
    updateQna(YOU, question);
    if (question) {
      setLoading(true);
      const prompt = `${question}`;

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo-1106",
          messages: [
            {
              role: "system",
              content:
                "You are ChatGPT, a large language model trained by OpenAI. Answer in detail.",
            },
            { role: "user", content: prompt },
          ],
        }),
      };

      setLoading(true);
      fetch("https://api.openai.com/v1/chat/completions", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          updateQna(AI, data.choices[0].message.content);
          inputRef.current.value=""
        })
        .catch((error) => {
          setLoading(false);
          console.error("API request error:", error);
        });
    }
  };

  const renderContent = (qna) => {
    const value = qna.value;
    if (Array.isArray(value)) {
      return value.map((v) => <p className="message-text">{v}</p>);
    }
    return <p className="message-text">{value}</p>;
  };

  const navigate = useNavigate();
  const auth = getAuth(app);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/login");
      }
    });
  }, []);
  return (
    <main class="container main-chatbot-container">
      <div class="chatbot-container">
        <div>
          <h2>MetaViral ChatBot</h2>

          <div class="chats">
            {qna.map((qna) => {
              if (qna.from == YOU) {
                return (
                  <div class="send chat">
                    <img src={userLogo} alt="" class="avtar" />
                    <p>{renderContent(qna)}</p>
                  </div>
                );
              }
              return (
                <div class="recieve chat">
                  <img src={chatLogo} alt="" class="avtar" />
                  <pre>
                    <p>{renderContent(qna)}</p>
                  </pre>
                </div>
              );
            })}

            {loading && (
              <div class="recieve chat">
                <img src={chatLogo} alt="" class="avtar" />
                <p>Typing...</p>
              </div>
            )}
          </div>
        </div>

        <div class="chat-input">
          <input
            type="text"
            ref={inputRef}
            class="form-control col"
            placeholder="Type Something"
          />
          <button
            disabled={loading}
            class="btn btn-primary"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
