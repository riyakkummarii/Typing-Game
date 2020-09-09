import React, { useState } from "react";
import generate from "./Words";
import useKeyPress from "./KeyPressed";
import currentTime from "./Time";
import Box from '@material-ui/core/Box';

const defaultProps = {
  
  borderColor: 'text.primary',
  m: 1,
  border: 1,
  style: { width: '50rem', height: '15rem' },
  
};

const initialWords = generate();

function App() {
  const [leftPadding, setLeftPadding] = useState(
    new Array(20).fill(" ").join("")
  );
  const [outgoingChars, setOutgoingChars] = useState("");
  const [currentChar, setCurrentChar] = useState(initialWords.charAt(0));
  const [incomingChars, setIncomingChars] = useState(initialWords.substr(1));
  const [startTime, setStartTime] = useState();
  const [wordCount, setWordCount] = useState(0);
  const [keyCount, setKeyCount] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [kpm, setKpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [typedChars, setTypedChars] = useState("");

  useKeyPress((key) => {
    if (!startTime) {
      setStartTime(currentTime());
    }
    //CPM
    setKeyCount(keyCount + 1);
    const keyDurationInMinutes = (currentTime() - startTime) / 60000.0;

    setKpm(((keyCount + 1) / keyDurationInMinutes).toFixed(2));

    let updatedOutgoingChars = outgoingChars;
    let updatedIncomingChars = incomingChars;
    const updatedTypedChars = typedChars + key;
    setTypedChars(updatedTypedChars);

    setAccuracy(
      ((updatedOutgoingChars.length * 100) / updatedTypedChars.length).toFixed(
        2
      )
    );

    if (key === currentChar) {
      if (leftPadding.length > 0) {
        setLeftPadding(leftPadding.substring(1));
      }

      updatedOutgoingChars += currentChar;
      setOutgoingChars(updatedOutgoingChars);

      setCurrentChar(incomingChars.charAt(0));

      updatedIncomingChars = incomingChars.substring(1);
      if (updatedIncomingChars.split(" ").length < 10) {
        updatedIncomingChars += " " + generate();
      }
      setIncomingChars(updatedIncomingChars);

      //WPM
      if (incomingChars.charAt(0) === " ") {
        setWordCount(wordCount + 1);

        const durationInMinutes = (currentTime() - startTime) / 60000.0;

        setWpm(((wordCount + 1) / durationInMinutes).toFixed(2));
      }
    }
  });

  return (
    <Box  display="flex" justifyContent="center"> <Box bgcolor="#322f3d" borderRadius={16} {...defaultProps}><div className="App">
      <p className="Character">
        <span className="Character-out charStyle">
          {(leftPadding + outgoingChars).slice(-20)}
        </span>
        <span className="Character-current charStyle">{currentChar}</span>
        <span className="charStyle">{incomingChars.substr(0, 20)}</span>
      </p>
      <h3>
        WPM: {wpm} | ACC: {accuracy} % | KPM: {kpm}
      </h3>
    </div>
    </Box>
    </Box>
  );
}
export default App;
