import {
  Heading,
  Page,
  Layout,
  Card,
  DisplayText,
  Form,
  FormLayout,
  TextField,
  Caption,
  Select,
  ChoiceList,
} from "@shopify/polaris";

export default function Index() {
  return (
    <Page>
      <DisplayText>New Pricing Rule</DisplayText>

      <Layout>
        <Layout.Section>
          <Card>
            <Heading>General Information</Heading>

            <Form>
              <FormLayout>
                <TextField label="Name" autoComplete="off" />
                <TextField
                  label="Priority"
                  type="number"
                  autoComplete="off"
                  // min={0} max={99}
                  min="0"
                  max="99"
                />
                <Caption>
                  Please insert an integer from 0 to 99. 0 is the highest
                  priority
                </Caption>
                <Select label="Status" options={["Enable", "Disable"]} />
              </FormLayout>
            </Form>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <Heading>Apply to Products</Heading>

            <Form>
              <FormLayout>
                <ChoiceList
                  title="Company name"
                  choices={[
                    { label: "Hidden", value: "hidden" },
                    { label: "Optional", value: "optional" },
                    { label: "Required", value: "required" },
                  ]}
                  selected={[
                    'hidden'
                  ]}
                />
              </FormLayout>
            </Form>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <Heading>Custom Prices</Heading>

            <Form>
              <FormLayout></FormLayout>
            </Form>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
