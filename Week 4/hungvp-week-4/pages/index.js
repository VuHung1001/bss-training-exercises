import {
  Heading,
  Page,
  Layout,
  Card,
  DisplayText,
  ContextualSaveBar,
  Frame,
} from "@shopify/polaris";
import GeneralInfor from "./components/GeneralInfor";
import ApplyProducts from "./components/ApplyProducts";
import CustomPrices from "./components/CustomPrices";
import TablePrices from "./components/TablePrices";
import { useEffect, useState } from "react";
import store from "store-js";

export default function Index() {
  const [isAllProds, setIsAllProds] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  // const [isSelectionChanged, setIsSelectionChanged] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [isSaveSuccess, setIsSaveSuccess] = useState(false);
  const [isGeneralApproved, setIsGeneralApproved] = useState(false);
  const [isCustomApproved, setIsCustomApproved] = useState(false);

  useEffect(() => {
    if (isFirstLoad) {
      store.remove("items");
      store.remove("modPrice");
      setIsFirstLoad(false);
    }
    if (isGeneralApproved && isCustomApproved) {
      setIsSaveSuccess(true);
    } else {
      setIsSaveSuccess(false);
    }
  }, [isFirstLoad, isGeneralApproved, isCustomApproved]);

  return (
    <div className="container">
      <Frame>
        <Page>
          <DisplayText>New Pricing Rule</DisplayText>

          <Layout>
            <Layout.Section>
              <Card>
                <Heading>General Information</Heading>

                <GeneralInfor
                  isSave={isSave}
                  // isGeneralApproved={isGeneralApproved}
                  setIsSave={setIsSave}
                  setIsGeneralApproved={setIsGeneralApproved}
                />
              </Card>
            </Layout.Section>
            <Layout.Section>
              <Card>
                <Heading>Apply to Products</Heading>

                <ApplyProducts
                  setIsAllProds={setIsAllProds}
                  setIsSave={setIsSave}
                  // setIsSelectionChanged={setIsSelectionChanged}
                />
              </Card>
            </Layout.Section>
            <Layout.Section>
              <Card>
                <Heading>Custom Prices</Heading>

                <CustomPrices
                  isSave={isSave}
                  // isCustomApproved={isCustomApproved}
                  setIsSave={setIsSave}
                  setIsCustomApproved={setIsCustomApproved}
                />
              </Card>
            </Layout.Section>
          </Layout>
          {/* {isSelectionChanged && ( */}
          <ContextualSaveBar
            message="Submit"
            saveAction={{
              content: "View Result",
              onAction: () => setIsSave(true),
              // loading: false,
              // disabled: false,
            }}
            discardAction={{
              content: "Toggle or Reload Result",
              onAction: () => setIsSave(false),
            }}
          />
          {/* )} */}
        </Page>
      </Frame>

      {isSaveSuccess && isSave && (
        <TablePrices
          isAllProds={isAllProds}
          isSaveSuccess={isSaveSuccess}
          isSave={isSave}
          // isSelectionChanged={isSelectionChanged}
          // setIsSelectionChanged={setIsSelectionChanged}
        />
      )}
    </div>
  );
}
