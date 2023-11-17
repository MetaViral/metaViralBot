import React, { useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import app from "../../firebase.init";
const Email = () => {
  const inputSubjectRef = useRef();
  const inputDescriptionRef = useRef();

  const [loading, setLoading] = useState(false);
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  const handleSend = () => {
    const subject = inputSubjectRef.current.value;
    const description = inputDescriptionRef.current.value;
    setLoading(true);

    if (subject == "") {
      alert("Please input subject");
      setLoading(false);
    }

    if (description == "") {
      alert("Please input description");
      setLoading(false);
    }

    if (subject != "" && description != "") {
      const prompt = `Generate an email: 
      Email subject: ${subject}
      Email description: ${description}`;

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
          document.getElementById("myTextarea").value = data.choices[0].message.content;
        })
        .catch((error) => {
          setLoading(false);
          console.error("API request error:", error);
        });
    }
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
    <main class="container mt-4 mb-4">
      <h2>MetaViral Email Generator</h2>
      <div class="chat-input">
        <input
          type="text"
          ref={inputSubjectRef}
          class="form-control col mt-2 mb-2"
          placeholder="Email Subject"
          required
        />

        <input
          type="text"
          ref={inputDescriptionRef}
          class="form-control col mt-2 mb-2"
          placeholder="Email Description"
          required
        />

        <button disabled={loading} class="btn btn-success mt-2 mb-2" onClick={handleSend}>
          {/* <button class="btn" onClick={handleSend}> */}
          Generate
        </button>
      </div>

      <div>
        <pre>
          <textarea
            id="myTextarea"
            columns="50"
            rows="15"
            style={{ padding: "1rem" }}
            class="form-control mt-2"
          >
            {/* {ans} */}
          </textarea>
        </pre>
      </div>
    </main>
  );
};

export default Email;
