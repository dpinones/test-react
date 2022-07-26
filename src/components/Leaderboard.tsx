import { useStarknetCall } from "@starknet-react/core";
import { useMemo, useState } from "react";
import { useTestContract } from "../hooks/useTestContract";
import './Leaderboard.css'
const Leaderboard: React.FC<{ formId: number; account: any }> = ({
  formId,
  account,
}) => {
  const { contract: test } = useTestContract();

  const { data: leaderboardResult } = useStarknetCall({
    contract: test,
    method: "view_score_test",
    args: [formId],
    options: { watch: true },
  });

  const [leaderboard, setLeaderboard] = useState<Array<any>>([]);

  useMemo(() => {
    if (leaderboardResult && leaderboardResult.length > 0) {
      let innerLeaderboard = [];
      for (let item of leaderboardResult) {
        innerLeaderboard.push({
          wallet: item[0] ? "0x" + item[0].toString(16) : "?",
          score: +item[1]?.toString(10),
        });
      }
      innerLeaderboard.sort((a, b) => b.score - a.score);
      setLeaderboard(innerLeaderboard);
    }
  }, [leaderboardResult]);

  return (
    <table>
      <thead>
        <tr>
          <th>Wallet</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {leaderboard.map((item) => {
          return item.wallet === account ? (
            <tr key={item.wallet} style={{color: 'green', fontWeight: 'bold'}}>
              <td>{item.wallet}</td>
              <td>{item.score}</td>
            </tr>
          ) : (
            <tr key={item.wallet}>
              <td>{item.wallet}</td>
              <td>{item.score}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Leaderboard;
