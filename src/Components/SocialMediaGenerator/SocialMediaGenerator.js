import "./SocialMediaGenerator.css";
import twitter from "../../Assets/Image/twitter.png";
import linkedin from "../../Assets/Image/linkedin.png";
import { useRef, useState } from "react";

function SocialMediaGenerator() {
  console.log(process.env.REACT_APP_OPEN_AI_KEY);

  const inputTitle = useRef();
  const inputHashtag = useRef();
  const inputEmoji = useRef();
  const inputWords = useRef();

  const inputTitle1 = useRef();
  const inputHashtag1 = useRef();
  const inputEmoji1 = useRef();
  const inputWords1 = useRef();

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  //
  const [inputValue, setInputValue] = useState("");

  function handleInputChange(event) {
    const { value } = event.target;
    // if (value.length < 270) {
    setInputValue(value);
    // }
  }

  const inputStyle = {
    border: inputValue.length > 270 ? "1px solid red" : "1px solid lightgrey",
  };
  //

  async function handleSend() {
    const title = inputTitle.current.value;
    console.log(title);
    const hashtag = inputHashtag.current.value;
    const emoji = inputEmoji.current.value;
    const words = inputWords.current.value;
    setLoading(true);

    if (title == "") {
      alert("Please input title");
      setLoading(false);
    }

    if (words == "") {
      alert("Please input words");
      setLoading(false);
    }

    if (title != "" && words != "") {
      // workout plan
      var prompt = `
      Generate me a social media post for the information below.\n
      Post title: ${title}\n
      Include hashtag: ${hashtag}\n
      Include emoji: ${emoji}\n
      Number of words: ${words}
      `;
      const DEFAULT_PARAMS = {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are ChatGPT, a large language model trained by OpenAI.",
          },
          { role: "user", content: prompt },
        ],
      };

      const params = { ...DEFAULT_PARAMS };
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(process.env.REACT_APP_OPENAI_API_KEY),
        },
        body: JSON.stringify(params),
      };
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        requestOptions
      );
      const data = await response.json();
      var result = data.choices[0].message.content;
      document.getElementById("result").value = result;
      console.log(result);
      setLoading(false);
    }
  }

  async function handleSend1() {
    const title = inputTitle1.current.value;
    const hashtag = inputHashtag1.current.value;
    const emoji = inputEmoji1.current.value;
    const words = inputWords1.current.value;
    setLoading1(true);

    if (title == "") {
      alert("Please input title");
      setLoading1(false);
    }

    if (words == "") {
      alert("Please input words");
      setLoading1(false);
    }

    if (title != "" && words != "") {
      // workout plan
      var prompt = `
      Generate me a social media post for the information below.\n
      Post title: ${title}\n
      Include hashtag: ${hashtag}\n
      Include emoji: ${emoji}\n
      Number of words: ${words}
      `;
      const DEFAULT_PARAMS = {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are ChatGPT, a large language model trained by OpenAI.",
          },
          { role: "user", content: prompt },
        ],
      };

      const params = { ...DEFAULT_PARAMS };
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(process.env.REACT_APP_OPENAI_API_KEY),
        },
        body: JSON.stringify(params),
      };
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        requestOptions
      );
      const data = await response.json();
      var result = data.choices[0].message.content;
      document.getElementById("result1").value = result;
      console.log(result);
      setLoading1(false);
    }
  }

  async function handleTwitter() {
    const twitterPost = document.getElementById("result").value;
  
    if (!twitterPost) {
      alert("Twitter post is empty");
    } else {
      // Assuming you have the URL for Twitter share
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterPost)}`;
      window.open(twitterUrl, "_blank");
    }
  }
  
  async function handleLinkedIn() {
    const linkedinPost = document.getElementById("result1").value;
  
    // Assuming you have the URL for LinkedIn share
    const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent("Your LinkedIn Post Title")}&summary=${encodeURIComponent(linkedinPost)}`;
    
    window.open(linkedinUrl, "_blank");
  }
  

  return (
    <>
      <div class="container">
        <ul class="d-flex nav-pills mb-3" id="pills-tab" role="tablist">
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active"
              id="pills-twitter-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-twitter"
              type="button"
              role="tab"
              aria-controls="pills-twitter"
              aria-selected="true"
            >
              Twitter
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="pills-linkedin-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-linkedin"
              type="button"
              role="tab"
              aria-controls="pills-linkedin"
              aria-selected="false"
            >
              LinkedIn
            </button>
          </li>
        </ul>
        <div class="tab-content" id="pills-tabContent">
          <div
            class="tab-pane fade show active"
            id="pills-twitter"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <div class="mb-2">
              <div class="row">
                <div class="col-12 mx-auto">
                  <h3 id="intro" style={{ textAlign: "center" }}>
                    Generate Twitter Post
                  </h3>
                </div>
              </div>
            </div>

            <div class="mt-4">
              <div class="row">
                <div class="col-md-6 col-lg-6 col-xl-6 col-12">
                  <div class="form-group mx-auto">
                    <label>Post title*</label>
                    <input
                      type="text"
                      ref={inputTitle}
                      class="form-control col"
                      placeholder="Enter post title"
                      required
                    />
                  </div>

                  <div class="form-group mx-auto">
                    <label>Include hashtag</label>
                    <select
                      class="form-control"
                      name="hashtag"
                      id="hashtag"
                      ref={inputHashtag}
                      required
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  <div class="form-group mx-auto">
                    <label>Include emoji</label>
                    <select
                      class="form-control"
                      name="emoji"
                      id="emoji"
                      ref={inputEmoji}
                      required
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  <div class="form-group mx-auto">
                    <label>Estimated no of words*</label>
                    <input
                      type="number"
                      min="5"
                      max="200"
                      ref={inputWords}
                      class="form-control col"
                      placeholder="Enter number of words"
                      required
                    />
                  </div>

                  <div class="row mt-4">
                    <div class="col-12 text-center mx-auto">
                      <button
                        disabled={loading}
                        class="btn btn-primary"
                        onClick={handleSend}
                      >
                        {loading ? "Generating..." : "Generate"}
                      </button>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 col-lg-6 col-xl-6 col-12">
                  <div class="col-lg-12 mx-auto" id="">
                    <div class="form-group mx-auto">
                      <label for="" class="text-muted">
                        View and Edit description below
                      </label>
                      <textarea
                        class="form-control"
                        placeholder=""
                        rows="7"
                        id="result"
                      ></textarea>
                      <br></br>     
                    </div>
                  </div>
                  <div class="row mt-1">
                    <div class="col-12 text-center mx-auto">
                      <button
                        disabled={loading}
                        class="btn twitter-btn"
                        onClick={handleTwitter}
                      >
                        Share on Twitter
                        <img src={twitter} class="img-logo" alt="" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="pills-linkedin"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <div class="container-fluid mb-2">
              <div class="row">
                <div class="col-12 mx-auto">
                  <h3 id="intro" style={{ textAlign: "center" }}>
                    Generate LinkedIn Post
                  </h3>
                </div>
              </div>
            </div>

            <div class="container-fluid mt-4">
              <div class="row">
                <div class="col-md-6 col-lg-6 col-xl-6 col-12">
                  <div class="form-group mx-auto">
                    <label>Post title*</label>
                    <input
                      type="text"
                      ref={inputTitle1}
                      class="form-control col"
                      placeholder="Enter post title"
                      required
                    />
                  </div>

                  <div class="form-group mx-auto">
                    <label>Include hashtag</label>
                    <select
                      class="form-control"
                      name="hashtag"
                      id="hashtag"
                      ref={inputHashtag1}
                      required
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  <div class="form-group mx-auto">
                    <label>Include emoji</label>
                    <select
                      class="form-control"
                      name="emoji"
                      id="emoji"
                      ref={inputEmoji1}
                      required
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  <div class="form-group mx-auto">
                    <label>Estimated no of words*</label>
                    <input
                      type="number"
                      min="5"
                      max="200"
                      ref={inputWords1}
                      class="form-control col"
                      placeholder="Enter number of words"
                      required
                    />
                  </div>

                  <div class="row mt-4">
                    <div class="col-12 text-center mx-auto">
                      <button
                        disabled={loading1}
                        class="btn btn-primary"
                        onClick={handleSend1}
                      >
                        Generate
                        {loading1 ? "Generating..." : "Generate"}
                      </button>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 col-lg-6 col-xl-6 col-12">
                  <div class="col-lg-12 mx-auto" id="">
                    <div class="form-group mx-auto">
                      <label for="" class="text-muted">
                        View and Edit description below
                      </label>
                      <textarea
                        class="form-control"
                        placeholder=""
                        rows="12"
                        id="result1"
                      ></textarea>
                    </div>
                  </div>
                  <div class="row mt-1">
                    <div class="col-12 text-center mx-auto">
                      <button
                        disabled={loading}
                        class="btn twitter-btn"
                        onClick={handleLinkedIn}
                      >
                        Share on LinkedIn
                        <img src={linkedin} class="img-logo" alt="" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SocialMediaGenerator;
