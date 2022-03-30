import { Caption, Form, FormLayout, InlineError, Select, TextField } from "@shopify/polaris";
import {useState, useCallback, useEffect} from "react";

const GeneralInfor = () => {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState(0);
  const [status, setStatus] = useState("");
  const [nameMess, setNameMess] = useState('');
  const [priorityMess, setPriorityMess] = useState('');

  // const toggleActive = useCallback(() => setActive((active) => !active), []);

  const checkValidation = useCallback(()=>{
    if(priority < 0 || priority > 99){
      setPriorityMess('Priority must be between 0 and 99')
    }
    else{
      setPriorityMess('')
    }

    if(name === ''){
      setNameMess('Name of Price Rule must be inputted')
    }
    else{
      setNameMess('')
    }
  }, [name, priority])


  // useEffect(()=>{
  //   checkValidation()
  // }, [checkValidation])

  return (
    <Form>
      <FormLayout>
        <TextField
          label="Name"
          autoFocus={true}
          autoComplete="off"
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
        <Select label="Status" options={["Enable", "Disable"]} onChange={(selected) => setStatus(selected)} value={status}/>
      </FormLayout>
    </Form>
  );
};

export default GeneralInfor;
