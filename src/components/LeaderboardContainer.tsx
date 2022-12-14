import { useState } from "react";
import { useTestContract } from "../hooks/useTestContract";
import FormSelector from "./FormSelector";
import Leaderboard from "./Leaderboard";

const LeaderboardContainer: React.FC<{ account: any }> = ({ account }) => {
  const [formId, setFormId] = useState<number | null>(null);
  const { contract: test } = useTestContract();

  const loadForm = (id: number) => {
    setFormId(id);
  };

  return (
    <div>
      <h2>Leaderboard</h2>

      {!formId && formId !== 0 && <FormSelector onSubmit={loadForm} />}
      {(formId || formId === 0) && (
        <Leaderboard formId={formId} account={account} />
      )}
    </div>
  );
};

export default LeaderboardContainer;
