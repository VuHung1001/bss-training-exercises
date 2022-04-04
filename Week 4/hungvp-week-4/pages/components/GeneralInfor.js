import {
  Caption,
  Form,
  FormLayout,
  InlineError,
  Select,
  TextField,
} from "@shopify/polaris";
import { useState, useCallback, useEffect } from "react";

const GeneralInfor = ({
  isSave,
  // isGeneralApproved,
  setIsSave,
  setIsGeneralApproved,
}) => {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState(0);
  const [status, setStatus] = useState(true);
  const [nameMess, setNameMess] = useState("");
  const [priorityMess, setPriorityMess] = useState("");

  // const toggleActive = useCallback(() => setActive((active) => !active), []);

  const checkValidation = useCallback(() => {
    // debugger
    let approved = false;
    if (priority < 0 || priority > 99 || Math.floor(priority) != priority) {
      setPriorityMess("Priority must be natural number between 0 and 99");
      approved = false;
    } else {
      setPriorityMess("");
      approved = true;
    }

    if (name === "") {
      setNameMess("Name of Price Rule must be inputted");
      approved = false;
    } else {
      setNameMess("");
      approved = true;
    }
    setIsGeneralApproved(approved);
    setIsSave(approved);
  }, [name, priority, setIsGeneralApproved, setIsSave]);
  // }, [name, priority]);

  useEffect(() => {
    // debugger
    isSave && checkValidation();
  }, [checkValidation, isSave]);
  // }, []);

  return (
    <Form>
      <FormLayout>
        <TextField
          label="Name"
          autoComplete
          defaultValue={""}
          onChange={(value) => setName(value)}
          onBlur={checkValidation}
          value={name}
          id="name"
        />
        <InlineError message={nameMess} fieldID="name" />
        <TextField
          label="Priority"
          type="number"
          autoComplete
          min="0"
          max="99"
          defaultValue={0}
          placeholder="0"
          onChange={(value) => setPriority(value)}
          onBlur={checkValidation}
          value={priority}
          id="priority"
        />
        <InlineError message={priorityMess} fieldID="priority" />
        <Caption>
          Please insert an integer from 0 to 99. 0 is the highest priority
        </Caption>
        <Select
          label="Status"
          options={[
            { label: "Enable", value: true },
            { label: "Disable", value: false },
          ]}
          onChange={(selected) => setStatus(selected)}
          value={status}
        />
      </FormLayout>
    </Form>
  );
};

export default GeneralInfor;
