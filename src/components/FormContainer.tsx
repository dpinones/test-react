import { useStarknetInvoke } from "@starknet-react/core";
import { useState } from "react";
import { useTestContract } from "../hooks/useTestContract";
import Form from "./Form";
import FormSelector from "./FormSelector";

const FormContainer = () => {
  const [formId, setFormId] = useState<number | null>(null);
  const { contract: test } = useTestContract();
  const { data, loading, error, reset, invoke } = useStarknetInvoke({
    contract: test,
    method: "send_answer",
  });

  const loadForm = (id: number) => {
    setFormId(id);
  };

  const submitHandler = (result: string) => {
    console.log("formId", formId);
    console.log("result", result);
    const args = [formId, [+result]];
    invoke({ args })
      .then((response) => {
        console.log(response);
        setFormId(null);
      })
      .catch((e) => {
        alert("Error");
        console.error("error", e);
      });
  };

  return (
    <div>
      {!formId && formId !== 0 && <FormSelector onSubmit={loadForm} />}
      {(formId || formId === 0) && (
        <Form id={formId} onSubmit={submitHandler} />
      )}
    </div>
  );
};

export default FormContainer;
