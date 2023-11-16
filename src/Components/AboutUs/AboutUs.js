import React from "react";
import img from "./img/team.svg"
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <>
        <section class="wrapper">
      <div class="container">
        <div class="grid-cols-2">
          <div class="grid-item-1">
            <h1 class="main-heading">
              Welcome to <span>MetaViral Bot.</span>
              <br />
              Ask anything.
            </h1>
            <p class="info-text">
              Research, Query, Look for solutions, Get answers and more as you engage these AI bot
            </p>
            <div class="btn_wrapper">
              <a href="/chatbot">
              <button class="btn btn-outline-primary">
                Chatbot
              </button>
              </a>
              <a href="/emailGenerator">
              <button class="btn btn-primary">Email Generator</button>
              </a>
            </div>
          </div>
          <div class="grid-item-2">
            <div class="team_img_wrapper">
              <img src={img} alt="team-img" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="wrapper">
      <div class="container" data-aos="fade-up" data-aos-duration="1000">
        <div class="grid-cols-3">
          <div class="grid-col-item">
            <div class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div class="featured_info">
              <span>Built for developers </span>
              <p>
                Access a wide range of artificial intelligence-powered bots that execute specific commands for marketing, customer support, sales, chats etc
              </p>
              
            </div>
          </div>
          <div class="grid-col-item">
            <div class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div class="featured_info">
              <span>Designed to be modern</span>
              <p>
                Better bots experiences with instant digital connections creating real time and low cost transactions.
              </p>
            </div>
          </div>

          <div class="grid-col-item">
            <div class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <div class="featured_info">
              <span>Documentation for everything</span>
              <p>
                Acces a wide range of information on the go. Receive ideal prompt documention on your subject
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default AboutUs;
