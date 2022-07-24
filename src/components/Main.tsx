import { useConnectors, useStarknet } from "@starknet-react/core";
import { Link, Route, Routes } from "react-router-dom";
import CreateTest from "./CreateTest";
import FormContainer from "./FormContainer";

export default function Main() {
  const { available, connect, disconnect } = useConnectors();
  const { account } = useStarknet();

  if (account) {
    return (
      <>
        <Link to="/">Complete Form</Link> &nbsp;
        <Link to="/create-test">Create Test</Link>
        <div>
          <p>Account: {account}</p>
          <button onClick={() => disconnect()}>Disconnect</button>
        </div>
        <Routes>
          <Route path="/" element={<FormContainer />} />
          <Route path="/create-test" element={<CreateTest />} />
        </Routes>
      </>
    );
  }

  return (
    <div>
      {available.map((connector) => (
        <button key={connector.id()} onClick={() => connect(connector)}>
          {`Connect ${connector.name()}`}
        </button>
      ))}
    </div>
  );
}
