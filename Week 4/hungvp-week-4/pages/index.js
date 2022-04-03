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

export default function Index() {
  const [isAllProds, setIsAllProds] = useState(true);
  const [isSelectionChanged, setIsSelectionChanged] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [isSaveSuccess, setIsSaveSuccess] = useState(false);
  console.log(isSelectionChanged);

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
                  setIsSaveSuccess={setIsSaveSuccess}
                />
              </Card>
            </Layout.Section>
            <Layout.Section>
              <Card>
                <Heading>Apply to Products</Heading>

                <ApplyProducts
                  setIsAllProds={setIsAllProds}
                  setIsSelectionChanged={setIsSelectionChanged}
                />
              </Card>
            </Layout.Section>
            <Layout.Section>
              <Card>
                <Heading>Custom Prices</Heading>

                <CustomPrices
                  isSave={isSave}
                  setIsSaveSuccess={setIsSaveSuccess}
                  setIsSave={setIsSave}
                />
              </Card>
            </Layout.Section>
          </Layout>
          {/* {isSelectionChanged && ( */}
          <ContextualSaveBar
            message="Unsaved changes"
            saveAction={{
              onAction: () => setIsSave(true),
              // loading: false,
              // disabled: false,
            }}
            discardAction={{
              onAction: () => setIsSave(false),
            }}
          />
          {/* )} */}
        </Page>
      </Frame>

      <TablePrices
        isAllProds={isAllProds}
        isSaveSuccess={isSaveSuccess}
        isSave={isSave}
        isSelectionChanged={isSelectionChanged}
        setIsSelectionChanged={setIsSelectionChanged}
      />
    </div>
  );
}
