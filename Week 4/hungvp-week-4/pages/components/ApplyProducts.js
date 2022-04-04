import { useCallback, useEffect, useState } from "react";
import {
  ChoiceList,
  Form,
  FormLayout,
  Toast,
  ResourceList,
  ResourceItem,
  TextStyle,
  Thumbnail,
} from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";
import store from "store-js";

const ApplyProducts = ({ 
  setIsAllProds, 
  setIsSave
  // setIsSelectionChanged 
}) => {
  const [applyProducts, setApplyProducts] = useState(["all"]);
  const [resrcPickerState, setResrcPickerState] = useState(false);
  const [resourceType, setResourceType] = useState("Product");
  const [selectedProds, setSelectedProds] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [notify, setNotify] = useState(false);
  const [showRsrcPckrForTags, setShowRsrcPckrForTags] = useState(false);
  const [isChoiceSelected, setIsChoiceSelected] = useState(false);

  // console.log(applyProducts[0]);
  // console.log(resrcPickerState);
  // console.log(resourceType);
  // console.log(selectedProds);
  // console.log(notify);
  // console.log(showRsrcPckrForTags);

  const handleProdsSelected = useCallback(
    (selectPayload) => {
      // debugger
      // console.log(applyProducts[0]);
      const selectItems = selectPayload.selection.map((item) => {
        // console.log(item);
        if (applyProducts[0] === "specific" || applyProducts[0] === "tags") {
          return {
            id: item.id,
            title: item.title,
            image: item.images[0].originalSrc,
          };
        }
        if (applyProducts[0] === "collections") {
          return {
            id: item.id,
            title: item.title,
            image: item.image?.originalSrc,
          };
        }
      });
      setResrcPickerState(false);
      // console.log(selectItems);

      if (applyProducts[0] === "collections"){
        setSelectedCollections(selectItems)
      }
      if (applyProducts[0] === "specific" || applyProducts[0] === "tags") {
        setSelectedProds(selectItems);
      }

      // store.set("items", 
      //   store.get('items') 
      //     ? [...store.get('items'), ...selectItems]
      //     : [...selectItems]
      // );

      store.set("items", [...selectItems])
      // setIsSelectionChanged(true);
    },
    // [applyProducts, setIsSelectionChanged]
    [applyProducts]
  );

  const removeItem = useCallback(
    (id) => {
      if (selectedProds.length > 0) {
        let items = applyProducts[0] === "collections"
          ? selectedCollections.filter((item) => {
            return item.id != id;
          })
          : selectedProds.filter((item) => {
            return item.id != id;
          })
        console.log(items);

        console.log(applyProducts[0]);
        if (applyProducts[0] === "collections"){
          setSelectedCollections(items)
        }
        if (applyProducts[0] === "specific" || applyProducts[0] === "tags") {
          setSelectedProds(items);
        }
        // store.remove("items");
        store.set("items", 
          store.get('items')
            ? store.get('items')
              .filter((value)=>{
                return value.id != id
              })
            : [...items]
        );
      }
    },
    [selectedProds, applyProducts, selectedCollections]
  );

  useEffect(() => {
    // debugger
    setIsSave(false)
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
        setNotify(true);
        if (showRsrcPckrForTags) {
          setResourceType("Product");
          setResrcPickerState(true);
          setIsAllProds(false);
          setNotify(false);
          setShowRsrcPckrForTags(false);
        }
      }
      if (applyProducts[0] === "all") {
        setResourceType("Product");
        setResrcPickerState(false);
        setIsAllProds(true);
      }
      // store.remove("items");
      setIsChoiceSelected(false);
    }
  }, [
    applyProducts,
    setIsAllProds,
    // resourceType,
    // resrcPickerState,
    showRsrcPckrForTags,
    isChoiceSelected,
    setIsSave
  ]);
  // console.log(notify, showRsrcPckrForTags);

  return (
    <Form>
      <FormLayout>
        <ChoiceList
          id="choice-list"
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
            // setSelectedProds([]);
          }}
        />
        {applyProducts[0] != "all" && resrcPickerState && (
          <ResourcePicker
            open={resrcPickerState}
            resourceType={resourceType}
            selectMultiple={8}
            showVariants={false}
            initialSelectionIds={resourceType === 'Product' ? selectedProds : selectedCollections}
            onCancel={() => {
              setResrcPickerState(false);
              setNotify(false);
              setShowRsrcPckrForTags(false);
            }}
            onSelection={(selectPayload) => {
              handleProdsSelected(selectPayload);
              setNotify(false);
              setShowRsrcPckrForTags(false);
            }}
          />
        )}
        {resourceType !== "all" && selectedProds?.length > 0 && (
          <ResourceList
            resourceName={{ singular: "item", plural: "items" }}
            items={resourceType === 'Product' ? selectedProds : selectedCollections}
            renderItem={(item) => {
              const { id, title, image } = item;
              const media = (
                <Thumbnail
                  source={
                    image
                      ? image
                      : "https://congnghedoluong.com/wp-content/uploads/woocommerce-placeholder.png"
                  }
                  alt={title + " image"}
                />
              );

              return (
                <ResourceItem
                  id={id}
                  url={"#choice-list"}
                  media={media}
                  accessibilityLabel={`View details for ${title}`}
                >
                  <h3>
                    <TextStyle variation="strong">{title}</TextStyle>
                  </h3>
                  <button
                    className="close-btn"
                    onClick={() => {
                      window.event.preventDefault();
                      window.event.stopPropagation();
                      removeItem(id);
                    }}
                  >
                    X
                  </button>
                </ResourceItem>
              );
            }}
          />
        )}
        {applyProducts[0] == "tags" && notify && (
          <Toast
            content={
              "Notice: Insert products tags into search input to find products with that tag"
            }
            duration={10000}
            action={{
              content: "Show Resource Picker",
              onAction: () => {
                setShowRsrcPckrForTags(true);
                setIsChoiceSelected(true);
              },
            }}
            onDismiss={() => {
              setNotify(false);
              setShowRsrcPckrForTags(false);
              setIsChoiceSelected(false);
            }}
          />
        )}
      </FormLayout>
    </Form>
  );
};

export default ApplyProducts;
