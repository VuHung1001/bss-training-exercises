import { useCallback, useEffect, useState } from "react";
import { ChoiceList, Form, FormLayout, Toast, Banner, ResourceList, Avatar, ResourceItem, TextStyle } from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";
import store from "store-js";

const ApplyProducts = ({ setIsAllProds }) => {
  const [applyProducts, setApplyProducts] = useState(["all"]);
  const [resrcPickerState, setResrcPickerState] = useState(false);
  const [resourceType, setResourceType] = useState("Product");
  const [isChoiceSelected, setIsChoiceSelected] = useState(false);

  const handleProdsSelected = useCallback((selectPayload) => {
    const idsFromResources = selectPayload.selection.map((item) => item.id);
    setResrcPickerState(false);
    store.set("ids", idsFromResources);
  }, []);
  

  useEffect(() => {
    if (isChoiceSelected) {
      if (applyProducts[0] === "specific") {
        setResourceType("Product");
        setResrcPickerState(true);
        setIsAllProds(false);
      }
      if (applyProducts[0] === "collections") {
        setResourceType("Collection");
        setResrcPickerState(true);
        setIsAllProds(false);
      }
      if (applyProducts[0] === "tags") {
        const timeout = setTimeout(()=>{
          setResourceType("Product");
          setResrcPickerState(true);
          setIsAllProds(false);
          window.clearTimeout(timeout)
        }, 2000)
      }
      if (applyProducts[0] === "all") {
        setResourceType("Product");
        setResrcPickerState(false);
        setIsAllProds(true);
      }
      store.remove("ids");
      setIsChoiceSelected(false);
    }

    const body = JSON.stringify({
      query: `
      {
        shop {
          products (first: 5){
            edges{
              node{
                title
                images (first:5) {
                  edges {
                    node {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
      `,
    });
    
    fetch('https://shopify-graphiql-app.shopifycloud.com/', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body,
    })
      .then((response) => response.json())
      .then((json) => console.log(JSON.stringify(json, null, 2)));    
  }, [
    applyProducts,
    setIsAllProds,
    resourceType,
    isChoiceSelected,
    resrcPickerState,
  ]);

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
          onChange={(selected) => {
            setIsChoiceSelected(true);
            setApplyProducts(selected);
          }}
        />
        {applyProducts[0] != "all" && resrcPickerState && (
          <ResourcePicker
            open={resrcPickerState}
            resourceType={resourceType}
            selectMultiple={10}
            showVariants={false}
            onCancel={() => setResrcPickerState(false)}
            onSelection={(selectPayload) => {
              handleProdsSelected(selectPayload);
            }}
          />
        )}
        <ResourceList
          resourceName={{ singular: "customer", plural: "customers" }}
          items={[
            {
              id: 100,
              url: "customers/341",
              name: "Mae Jemison",
              location: "Decatur, USA",
            },
            {
              id: 200,
              url: "customers/256",
              name: "Ellen Ochoa",
              location: "Los Angeles, USA",
            },
          ]}
          renderItem={(item) => {
            const { id, url, name, location } = item;
            const media = <Avatar customer size="medium" name={name} />;

            return (
              <ResourceItem
                id={id}
                url={url}
                media={media}
                accessibilityLabel={`View details for ${name}`}
              >
                <h3>
                  <TextStyle variation="strong">{name}</TextStyle>
                </h3>
                <div>{location}</div>
              </ResourceItem>
            );
          }}
        />
        {applyProducts[0] == "tags" && (
          <Toast content={"Insert products tag to select products with that tag"} duration={5000}/>
        )}        
      </FormLayout>
    </Form>
  );
};

export default ApplyProducts;
