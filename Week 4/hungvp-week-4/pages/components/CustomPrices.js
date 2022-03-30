import { useCallback, useState, useEffect } from 'react'
import { ChoiceList, Form, FormLayout, InlineError, TextField } from "@shopify/polaris";

const CustomPrices = () => {
  const [customPricesType, setCustomPricesType] = useState(['apply'])
  const [amount, setAmount] = useState(0)
  const [amountMess, setAmountMess] = useState('')


  const checkValidation = useCallback(()=>{
    if(customPricesType[0] === 'decrease percentage'){
      if(amount < 1 || amount > 100 ){
        setAmountMess('Percentage must be between 1 and 100')
      } else {
        setAmountMess('')
      }
    } else {
      if(amount < 0){
        setAmountMess('Amount price must be larger or equal than 0')
      } else{
        setAmountMess('')
      }
    }

  }, [customPricesType, amount])

  useEffect(()=>{
    if(amount != 0){
      checkValidation()
    }

  }, [checkValidation, amount])

  return (
    <Form>
    <FormLayout>
      <ChoiceList
        title=""
        choices={[
          {
            label: "Apply a price to selected products",
            value: "apply",
          },
          {
            label:
              "Decrease a fixed amount of the original prices of selected products",
            value: "decrease amount",
          },
          {
            label:
              "Decrease the original prices of selected products by a percentage (%)",
            value: "decrease percentage",
          },
        ]}
        selected={customPricesType}
        onChange={(selected)=> setCustomPricesType(selected)}
        // onBlur={checkValidation}
      />

      <TextField
        label={customPricesType[0] != 'decrease percentage' ? "Amount" : "Percentage"}
        type="number"
        autoComplete="off"
        // min={0} max={99}
        min="0"
        max="99"
        defaultValue={0}
        placeholder="0"
        value={amount}
        onChange={(value)=>setAmount(value)}
        onBlur={checkValidation}
        id='amount'
      />
      <InlineError message={amountMess} fieldID="priority" />
    </FormLayout>
  </Form>
  )
}

export default CustomPrices