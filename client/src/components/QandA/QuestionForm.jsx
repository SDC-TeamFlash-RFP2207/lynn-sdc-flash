import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import config from "../../../../env/config.js";
import questList from "./qAndA.js";

const QuestionForm = ({ product, setShowQForm }) => {
  // variable
  let emailValid = false;

  // state
  const [emailWarn, setEmailWarn] = useState(false);

  // methods
  const chkEmailFormat = (event) => {
    emailValid = /\S+@\S+\.\S+/.test(event.target.value);
  };

  const postQuestion = (event) => {
    event.preventDefault();
    setEmailWarn(!emailValid);
    if (emailValid) {
      const data = {
        body: event.target.elements.question.value,
        name: event.target.elements.nickname.value,
        email: event.target.elements.email.value,
        product_id: product.id,
      };
      axios
        .post("/qa/questions", data, config)
        .then(() =>
          axios.get(`/qa/questions?product_id=${product.id}&count=100`, config)
        )
        .then((response) => {
          response.data.results.sort(
            (a, b) => b.question_helpfulness - a.question_helpfulness
          );
          // tracker
          response.data.results.forEach((q) => {
            let exists = questList.find(
              (quest) => quest.question_id === q.question_id
            );
            if (!exists) {
              q.helpf_click = false;
              for (const id in q.answers) {
                q.answers[id].helpf_click = false;
              }
              questList.push(q);
            }
          });
          setShowQForm(false);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="modalOverlay">
      <div className="modal">
        <form className="modalForm" onSubmit={postQuestion}>
          <QFHeader>Ask Your Question</QFHeader>
          <small>About the {product.name}</small>
          <br />
          <label>Your Question*</label>
          <br />
          <textarea
            name="question"
            maxLength="1000"
            rows="4"
            cols="50"
            required
          />
          <br />
          <label>What is your nickname*</label>
          <br />
          <QFInput
            type="text"
            name="nickname"
            placeholder="Example: jackson11!"
            maxLength="60"
            required
          />
          <br />
          <small>
            For privacy reasons, do not use your full name or email address
          </small>
          <br />
          <label>Your email* </label>
          {emailWarn ? <EmailWarn>{" email address invalid"}</EmailWarn> : null}
          <br />
          <QFInput
            type="email"
            name="email"
            placeholder="Why did you like the product or not?"
            maxLength="60"
            onChange={chkEmailFormat}
            required
          />
          <br />
          <small>For authentication reasons, you will not be emailed</small>
          <br />
          <input type="submit" value="Submit Question" />
        </form>
        <div className="modalFormClose" onClick={() => setShowQForm(false)}>
          X
        </div>
      </div>
    </div>
  );
};

export default QuestionForm;

const QFHeader = styled.h3`
  margin-top: 0px;
  margin-bottom: 0px;
`;

const QFInput = styled.input`
  width: 400px;
`;

const EmailWarn = styled.small`
  color: red;
`;
