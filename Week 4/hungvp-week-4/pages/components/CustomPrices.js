import { useCallback, useState, useEffect } from "react";
import {
  ChoiceList,
  Form,
  FormLayout,
  InlineError,
  TextField,
} from "@shopify/polaris";
import store from "store-js";

const CustomPrices = ({
  isSave,
  // isCustomApproved,
  setIsSave,
  setIsCustomApproved,
}) => {
  const [customPricesType, setCustomPricesType] = useState(["apply"]);
  const [amount, setAmount] = useState(0);
  const [amountMess, setAmountMess] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isChoiceChanged, setIsChoiceChanged] = useState(false);
  // const [modifiedPriceArr, setModifiedPriceArr] = useState([])

  const checkValidation = useCallback(() => {
    // debugger
    let approved = false;
    if (customPricesType[0] === "decrease percentage") {
      if (amount < 0 || amount > 100) {
        setAmountMess("Percentage must be between 0 and 100");
        setIsValid(false);
        approved = false;
      } else {
        setAmountMess("");
        setIsValid(true);
        approved = true;
      }
    }
    if (customPricesType[0] === "apply") {
      if (amount < 0) {
        setAmountMess("Amount price must be larger or equal than 0");
        setIsValid(false);
        approved = false;
      } else {
        setAmountMess("");
        setIsValid(true);
        approved = true;
      }
    }
    if (customPricesType[0] === "decrease amount") {
      if (amount % 5 > 0 || amount < 0) {
        setAmountMess(
          `Fixed decreased amount price must be divisible by 5 and larger or equal than 0` +
            ". If it is greater than the original price, the original price will be kept"
        );
        setIsValid(false);
        approved = false;
      } else {
        setAmountMess("");
        setIsValid(true);
        approved = true;
      }
    }
    setIsCustomApproved(approved);
    setIsSave(approved);
  }, [customPricesType, amount, setIsCustomApproved, setIsSave]);
  // }, [customPricesType, amount]);

  const handleModPrice = useCallback(() => {
    // debugger
    let formatter = new Intl.NumberFormat("vn", {
      style: "currency",
      currency: "VND",
    });

    // setModifiedPriceArr(prev => {
    if (customPricesType[0] === "apply")
      store.set("modPrice", {
        text: "apply price " + formatter.format(amount),
        type: "amount",
        amount,
      });

    if (customPricesType[0] === "decrease amount")
      store.set("modPrice", {
        text: "all variant prices -" + formatter.format(amount),
        type: "decrease amount",
        amount,
      });

    if (customPricesType[0] === "decrease percentage")
      store.set("modPrice", {
        text: "all variant prices -" + amount + "%",
        type: "decrease percent",
        amount,
      });

    // })
  }, [customPricesType, amount]);

  useEffect(() => {
    // if (amount != 0) {
    //   checkValidation();
    // }
    // debugger
    (isSave || isChoiceChanged) &&
      checkValidation() &&
      setIsChoiceChanged(false);
    isSave && isValid && handleModPrice();
    // isValid && handleModPrice();
    // }, [handleModPrice, isSave, isValid, checkValidation]);
  }, [
    checkValidation,
    isValid,
    handleModPrice,
    isSave,
    customPricesType,
    isChoiceChanged,
  ]);

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
            setIsSave(false);
            setCustomPricesType(selected);
            setIsChoiceChanged(true);
            // checkValidation()
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
          onChange={(value) => {
            setIsSave(false);
            setAmount(value);
          }}
          onBlur={checkValidation}
          id="amount"
        />
        <InlineError message={amountMess} fieldID="priority" />
      </FormLayout>
    </Form>
  );
};

export default CustomPrices;
