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
import store from "store-js";
import { useEffect, useState } from "react";


export default function Index() {
  const [isAllProds, setIsAllProds] = useState(true);

  return (
    <div className="container">
      <Frame>
        <Page>
          <DisplayText>New Pricing Rule</DisplayText>

          <Layout>
            <Layout.Section>
              <Card>
                <Heading>General Information</Heading>

                <GeneralInfor />
              </Card>
            </Layout.Section>
            <Layout.Section>
              <Card>
                <Heading>Apply to Products</Heading>

                <ApplyProducts setIsAllProds={setIsAllProds} />
              </Card>
            </Layout.Section>
            <Layout.Section>
              <Card>
                <Heading>Custom Prices</Heading>

                <CustomPrices />
              </Card>
            </Layout.Section>
          </Layout>
          {/* <ContextualSaveBar
            message="Unsaved changes"
            saveAction={{
              onAction: () => console.log("add form submit logic"),
              loading: false,
              disabled: false,
            }}
            discardAction={{
              onAction: () => console.log("add clear form logic"),
            }}
          /> */}
        </Page>
      </Frame>

      <TablePrices />
    </div>
  );
}
