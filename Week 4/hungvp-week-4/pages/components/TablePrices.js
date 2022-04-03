import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { Page, Layout, Banner, Card } from "@shopify/polaris";
import { Loading } from "@shopify/app-bridge-react";
import store from "store-js";

const GET_PRODUCTS_BY_ID = gql`
  query getProducts($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        title
        id
        variants(first: 1) {
          edges {
            node {
              price
            }
          }
        }
      }
    }
  }
`;

const GET_ALL_PRODUCTS = gql`
  query getProducts {
    products {
      title
      id
      variants(first: 1) {
        edges {
          node {
            price
          }
        }
      }
    }
  }
`;

const GET_PRODUCTS_BY_COLLECTION = gql`
  query getProducts($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Collection {
        title
        id
        products(first: 3) {
          edges {
            node {
              id
              title
            }
          }
        }
      }
    }
  }
`;

const TablePrices = ({
  isAllProds,
  isSelectionChanged,
  setIsSelectionChanged,
  isSave,
  isSaveSuccess,
}) => {
  const [itemsIds, setItemsIds] = useState([]);
  const [itemType, setItemType] = useState("Product");
  const [itemsCollections, setItemsCollections] = useState([]);
  const { loading, error, data, refetch } = useQuery(
    isAllProds
      ? GET_ALL_PRODUCTS
      : itemType === "Collection"
      ? GET_PRODUCTS_BY_COLLECTION
      : GET_PRODUCTS_BY_ID,
    !isAllProds
      ? {
          variables: { ids: itemsIds },
        }
      : {}
  );
  console.log(data);

  useEffect(() => {
    if (isSelectionChanged && isSave) {
      setItemsIds(store.get("items").map((value) => value.id));
      // console.log(store.get('items'));
      console.log(isAllProds);
      isSaveSuccess && setIsSelectionChanged(false);
      if (isAllProds) {
        setItemType("Product");
      }
      if (store.get("items")) {
        console.log(store?.get("items")[0]?.id?.includes("Product"));
        console.log(store?.get("items")[0]?.id?.includes("Collection"));
        if (store?.get("items")[0]?.id?.includes("Product")) {
          setItemType("Product");
        }
        if (store?.get("items")[0]?.id?.includes("Collection")) {
          setItemType("Collection");
        }
      }
    }

    if (data?.nodes) {
      let items = [];
      data?.nodes?.map((value) => {
        value?.products?.edges?.map((val, index) => {
          items.push(val.node.title);
        });
      });
      setItemsCollections(items);
    }
  }, [
    isAllProds,
    isSelectionChanged,
    setIsSelectionChanged,
    isSave,
    isSaveSuccess,
    data,
  ]);

  // if (loading) return <Loading />;

  // if (error) {
  //   console.warn(error);
  //   return (
  //     <Banner status="critical">There was an issue loading products.</Banner>
  //   );
  // }
  console.log(data?.nodes[0]?.products?.edges[0]?.node?.title);

  return (
    <div className="table-container">
      <div className="table-title">
        <p>Show product pricing details</p>
      </div>
      <table className="table-price">
        <thead>
          <tr>
            <td>Title</td>
            <td>Modified Price</td>
          </tr>
        </thead>
        <tbody>
          {itemType === "Product" && data?.nodes
            ? data?.nodes?.map((value, index) => (
                <tr key={index}>
                  <td>{value.title}</td>
                  <td>{store.get("modPrice")}</td>
                </tr>
              ))
            : itemsCollections?.map((value, index) => (
                <tr key={index}>
                  <td>{value}</td>
                  <td>{store.get("modPrice")}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablePrices;
