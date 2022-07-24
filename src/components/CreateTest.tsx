import { useStarknetInvoke } from "@starknet-react/core";
import { useState } from "react";
import { useTestContract } from "../hooks/useTestContract";
import stringToHex from "../utils/stringToHex";

const CreateTest = () => {
  const { contract: test } = useTestContract();
  const { data, loading, error, reset, invoke } = useStarknetInvoke({
    contract: test,
    method: "create_test_and_add_questions",
  });

  const [description, setDescription] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [optionCorrect, setOptionCorrect] = useState<number | null>(null);

  const handleRadioChange = (event: any) => {
    const value = event.target.value;
    setOptionCorrect(+value);
  }

  const handleClick = (event: any) => {
    event.preventDefault();
    const payload = {
      args: [
        1,
        [
          {
            description,
            optionA,
            optionB,
            optionC,
            optionD,
            optionCorrect,
          },
          /*           {
            description: 2,
            optionA: 2,
            optionB: 2,
            optionC: 2,
            optionD: 2,
            optionCorrect: 2,
          }, */
        ],
        0,
      ],
    };
    console.log('payload', payload)
    invoke(payload)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  const handleInputChange = (event: any, setFunction: any) => {
    const value = event.target.value;
    setFunction(stringToHex(value));
  }

  return (
    <>
      <form onSubmit={handleClick}>
        <br />
        <label>Description: </label>
        <input type="text" onChange={event => handleInputChange(event, setDescription)}/> <br />
        <label>Option A: </label>
        <input type="text" onChange={event => handleInputChange(event, setOptionA)} /> <br />
        <label>Option B: </label>
        <input type="text" onChange={event => handleInputChange(event, setOptionB)} /> <br />
        <label>Option C: </label>
        <input type="text" onChange={event => handleInputChange(event, setOptionC)} /> <br />
        <label>Option D: </label>
        <input type="text" onChange={event => handleInputChange(event, setOptionD)} /> <br /> <br />
        <label>Correct Option:</label> <br />
        <input
          type="radio"
          value="0"
          name="correctOption"
          onChange={handleRadioChange}
        />
        <label htmlFor="0">A</label>
        <br />
        <input
          type="radio"
          value="1"
          name="correctOption"
          onChange={handleRadioChange}
        />
        <label htmlFor="1">B</label>
        <br />
        <input
          type="radio"
          value="2"
          name="correctOption"
          onChange={handleRadioChange}
        />
        <label htmlFor="2">C</label>
        <br />
        <input
          type="radio"
          value="3"
          name="correctOption"
          onChange={handleRadioChange}
        />
        <label htmlFor="3">D</label>
        <br /> <br />
        <button type="submit">SEND</button>
      </form>
      <ul>
        <li>Data: {data}</li>
        <li>Loading: {loading}</li>
        <li>Error: {error}</li>
      </ul>
    </>
  );
};

export default CreateTest;
