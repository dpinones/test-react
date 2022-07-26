import { useConnectors, useStarknet } from "@starknet-react/core";
import { Link, Route, Routes } from "react-router-dom";
import CreateTest from "./CreateTest";
import FormContainer from "./FormContainer";
import LeaderboardContainer from "./LeaderboardContainer";

export default function Main() {
  const { available, connect, disconnect } = useConnectors();
  const { account } = useStarknet();

  if (account) {
    return (
      <>
        <Link to="/">Complete Form</Link> &nbsp;
        <Link to="/create-test">Create Test</Link> &nbsp;
        <Link to="/leaderboard">Leaderboard</Link>
        <div>
          <p>Account: {account}</p>
          <button onClick={() => disconnect()}>Disconnect</button>
        </div>
        <br />
        <Routes>
          <Route path="/" element={<FormContainer />} />
          <Route path="/create-test" element={<CreateTest />} />
          <Route path="/leaderboard" element={<LeaderboardContainer account={account} />} />
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
