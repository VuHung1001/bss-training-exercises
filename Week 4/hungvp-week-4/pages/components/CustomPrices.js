import { useCallback, useState, useEffect } from "react";
import {
  ChoiceList,
  ContextualSaveBar,
  Form,
  FormLayout,
  InlineError,
  TextField,
} from "@shopify/polaris";
import store from "store-js";

const CustomPrices = ({ isSave, setIsSaveSuccess, setIsSave }) => {
  const [customPricesType, setCustomPricesType] = useState(["apply"]);
  const [amount, setAmount] = useState(0);
  const [amountMess, setAmountMess] = useState("");
  const [isValid, setIsValid] = useState(false);
  // const [modifiedPriceArr, setModifiedPriceArr] = useState([])
  // console.log(modifiedPriceArr);
  console.log(isValid);

  const checkValidation = useCallback(() => {
    if (customPricesType[0] === "decrease percentage") {
      if (amount < 1 || amount > 99 || Math.floor(amount) != amount) {
        setAmountMess("Percentage must be natural number between 1 and 99");
        setIsValid(false);
        setIsSaveSuccess(false);
      } else {
        setAmountMess("");
        setIsValid(true);
        setIsSaveSuccess(true);
      }
    }
    if (customPricesType[0] === "apply") {
      if (amount <= 0 || Math.floor(amount) != amount) {
        setAmountMess("Amount price must be natural number larger than 0");
        setIsValid(false);
        setIsSaveSuccess(false);
      } else {
        setAmountMess("");
        setIsValid(true);
        setIsSaveSuccess(true);
      }
    }
    if (customPricesType[0] === "decrease amount") {
      if (amount % 5 > 0 || amount <= 0 || Math.floor(amount) != amount) {
        setAmountMess(
          "Fixed decreased amount price must be natural number divisible by 5 and larger than 0"
        );
        setIsValid(false);
        setIsSaveSuccess(false);
      } else {
        setAmountMess("");
        setIsValid(true);
        setIsSaveSuccess(true);
      }
    }
  }, [customPricesType, amount, setIsSaveSuccess]);

  const handleModPrice = useCallback(() => {
    let formatter = new Intl.NumberFormat("vn", {
      style: "currency",
      currency: "VND",
    });

    // setModifiedPriceArr(prev => {
    if (customPricesType[0] === "apply")
      store.set("modPrice", formatter.format(amount));

    if (customPricesType[0] === "decrease amount")
      store.set("modPrice", "all variant prices -" + formatter.format(amount));

    if (customPricesType[0] === "decrease percentage")
      store.set("modPrice", "all variant prices -" + amount + "%");

    // })
  }, [customPricesType, amount]);

  useEffect(() => {
    // if (amount != 0) {
    //   checkValidation();
    // }

    isSave && checkValidation();
    isSave && isValid && handleModPrice();
  }, [handleModPrice, isSave, isValid, checkValidation]);

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
          onChange={(selected) => {
            setCustomPricesType(selected);
          }}
          // onBlur={checkValidation}
        />

        <TextField
          label={
            customPricesType[0] != "decrease percentage"
              ? "Amount"
              : "Percentage"
          }
          type="number"
          autoComplete="off"
          min={0}
          max={99}
          // min="0"
          // max="99"
          defaultValue={0}
          placeholder="0"
          value={amount}
          onChange={(value) => setAmount(value)}
          onBlur={checkValidation}
          id="amount"
        />
        <InlineError message={amountMess} fieldID="priority" />
      </FormLayout>
    </Form>
  );
};

export default CustomPrices;
