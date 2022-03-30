import { useState } from "react";
import { ChoiceList, Form, FormLayout } from "@shopify/polaris";

const ApplyProducts = () => {
  const [applyProducts, setApplyProducts] = useState(['all'])

  return (
    <Form>
      <FormLayout>
        <ChoiceList
          title=""
          choices={[
            { label: "All products", value: "all" },
            { label: "Specific products", value: "specific" },
            { label: "Products collections", value: "collections" },
            { label: "Products Tags", value: "tags" },
          ]}
          selected={applyProducts}
          onChange={(selected)=>{setApplyProducts(selected)}}
        />
      </FormLayout>
    </Form>
  );
};

export default ApplyProducts;
