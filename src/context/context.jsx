import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  // state var's
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [previousPrompts, setPreviousPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((previous) => previous + nextWord);
    }, 75 * index);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);
    setPreviousPrompts((previous) => [...previous, input]);
    const response = await run(input);
    let res = response.split("**");
    let newResOne;
    for (let i = 0; i < res.length; i++) {
      if (i == 0 || i % 2 !== 1) {
        newResOne += res[i];
      } else {
        newResOne += "<b>" + res[i] + "</b>";
      }
    }
    let newResTwo = newResOne.split("*").join("</br>");
    let newResArr = newResTwo.split(" "); // every new word (after a space)
    for (let i = 0; i < newResArr.length; i++) {
      const nextWord = newResArr[i];
      delayPara(i, nextWord + " ");
    }
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    previousPrompts,
    setPreviousPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
