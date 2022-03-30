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

export default function Index() {
  return (
    <div className="container">
      <Page>
        <Frame>
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

              <ApplyProducts />
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card>
              <Heading>Custom Prices</Heading>

              <CustomPrices />
            </Card>
          </Layout.Section>
        </Layout>
        <ContextualSaveBar
          message="Unsaved changes"
          saveAction={{
            onAction: () => console.log("add form submit logic"),
            loading: false,
            disabled: false,
          }}
          discardAction={{
            onAction: () => console.log("add clear form logic"),
          }}
        />
      </Frame>
      </Page>

      <TablePrices />
    </div>
  );
}
