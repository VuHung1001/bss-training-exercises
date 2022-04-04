import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
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
    products(first: 8) {
      edges {
        node {
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
  }
`;

const GET_PRODUCTS_BY_COLLECTION = gql`
  query getProducts($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Collection {
        title
        id
        products(first: 4) {
          edges {
            node {
              id
              title
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
      }
    }
  }
`;

const TablePrices = ({
  isAllProds,
  // isSelectionChanged,
  // setIsSelectionChanged,
  isSave,
  isSaveSuccess,
}) => {
  const [itemsIds, setItemsIds] = useState([]);
  // const [collectionsIds, setCollectionsIds] = useState([]);
  const [itemType, setItemType] = useState("Product");
  const [itemsCollections, setItemsCollections] = useState([]);
  const [finalPrices, setFinalPrices] = useState([]);

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

  // console.log(itemsIds);
  // console.log(itemType);
  // console.log(itemsCollections);
  // console.log(data);

  useEffect(() => {
    // debugger
    // if (isSelectionChanged && isSave) {
    if (isSave && isSaveSuccess) {
      if (!isAllProds && store?.get("items")) {
        setItemsIds(store.get("items").map((value) => value.id));

        // store.get("items").map((value, index) => {
        //   if(value.id.includes('Collection')){
        //     setCollectionsIds(
        //       (prev) => {
        //         return [...prev, value.id]
        //       }
        //     )
        //   }
        //   else {
        //     setItemsIds(
        //       (prev) => {
        //         return [...prev, value.id]
        //       }
        //     )
        //   }
        // })
      }

      // isSaveSuccess && setIsSelectionChanged(false);

      if (isAllProds) {
        setItemType("Product");
      }
      if (store.get("items") && !isAllProds) {
        if (store?.get("items")[0]?.id?.includes("Product")) {
          setItemType("Product");
        }
        if (store?.get("items")[0]?.id?.includes("Collection")) {
          setItemType("Collection");
        }
      }

      if (data?.nodes && !isAllProds && store?.get("items")) {
        if (store?.get("items")[0]?.id?.includes("Collection")) {
          let items = [];
          data?.nodes?.map((value) => {
            value?.products?.edges?.map((val, index) => {
              items.push(val?.node?.title);
            });
          });
          setItemsCollections(items);
        }
      }

      if (data) {
        let formatter = new Intl.NumberFormat("vn", {
          style: "currency",
          currency: "VND",
        });
        let prices = [];

        if (store?.get("items") && !isAllProds) {
          if (store?.get("items")[0]?.id?.includes("Product"))
            data?.nodes?.map((value) => {
              store.get("modPrice").type === "amount" &&
                prices.push(formatter.format(store.get("modPrice").amount * 1));

              store.get("modPrice").type === "decrease amount" &&
                value?.variants?.edges.map((value) => {
                  prices.push(
                    formatter.format(
                      value.node.price * 1 - store.get("modPrice").amount * 1 >=
                        0
                        ? value.node.price * 1 -
                            store.get("modPrice").amount * 1
                        : value.node.price * 1
                    )
                  );
                });

              store.get("modPrice").type === "decrease percent" &&
                value?.variants?.edges.map((value) => {
                  prices.push(
                    formatter.format(
                      ((value.node.price * 1) / 100) *
                        (100 - store.get("modPrice").amount * 1)
                    )
                  );
                });
            });

          if (store?.get("items")[0]?.id?.includes("Collection"))
            data?.nodes?.map((value) => {
              value?.products?.edges?.map((val) => {
                store.get("modPrice").type === "amount" &&
                  prices.push(
                    formatter.format(store.get("modPrice").amount * 1)
                  );

                store.get("modPrice").type === "decrease amount" &&
                  val.node?.variants?.edges.map((v, index) => {
                    prices.push(
                      formatter.format(
                        v.node.price * 1 - store.get("modPrice").amount * 1 >= 0
                          ? v.node.price * 1 - store.get("modPrice").amount * 1
                          : v.node.price * 1
                      )
                    );
                  });

                store.get("modPrice").type === "decrease percent" &&
                  val.node?.variants?.edges.map((v, index) => {
                    prices.push(
                      formatter.format(
                        ((v.node.price * 1) / 100) *
                          (100 - store.get("modPrice").amount * 1)
                      )
                    );
                  });
              });
            });
        }

        if (isAllProds) {
          data?.products?.edges?.map((val) => {
            store.get("modPrice").type === "amount" &&
              prices.push(formatter.format(store.get("modPrice").amount * 1));

            store.get("modPrice").type === "decrease amount" &&
              val.node?.variants?.edges.map((v, index) => {
                prices.push(
                  formatter.format(
                    v.node.price * 1 - store.get("modPrice").amount * 1 >= 0
                      ? v.node.price * 1 - store.get("modPrice").amount * 1
                      : v.node.price * 1
                  )
                );
              });

            store.get("modPrice").type === "decrease percent" &&
              val.node?.variants?.edges.map((v, index) => {
                prices.push(
                  formatter.format(
                    ((v.node.price * 1) / 100) *
                      (100 - store.get("modPrice").amount * 1)
                  )
                );
              });
          });
        }

        prices.length > 0 && setFinalPrices(prices);
      }
    } else {
      setItemsIds([]);
      setFinalPrices([]);
    }
  }, [
    isAllProds,
    // isSelectionChanged,
    // setIsSelectionChanged,
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

  return (
    <div className="table-container">
      <div className="table-title">
        <p>Show product pricing details</p>
      </div>
      <table className="table-price">
        <thead>
          <tr>
            <td>Title</td>
            <td>Discount amount</td>
            <td>Final Price</td>
          </tr>
        </thead>
        <tbody>
          {data?.nodes &&
            isSave &&
            isSaveSuccess &&
            !isAllProds &&
            itemsCollections.length == 0 &&
            data?.nodes?.map((value, index) => (
              <tr key={index}>
                <td>{value.title}</td>
                <td>{store.get("modPrice").text}</td>
                <td>
                  {finalPrices[index]}
                  {/* {
                  store.get("modPrice").type === 'amount' 
                    && (<p>
                      {store.get("modPrice").amount*1}
                    </p>)
                }
                {
                  store.get("modPrice").type === 'decrease amount' 
                    && value?.variants?.edges.map((value, index) => (
                      <p key={index}>
                        {value.node.price*1 - store.get("modPrice").amount*1}
                      </p>
                    ))
                }
                {
                  store.get("modPrice").type === 'decrease percent' 
                    && value?.variants?.edges.map((value, index) => (
                      <p key={index}>
                        {value.node.price*1 / 100 * (100 - store.get("modPrice").amount*1)}
                      </p>
                    ))
                } */}
                </td>
              </tr>
            ))}

          {itemsCollections.length > 0 &&
            isSave &&
            isSaveSuccess &&
            !isAllProds &&
            itemsCollections?.map((value, index) => (
              <tr key={index}>
                <td>{value}</td>
                <td>{store.get("modPrice").text}</td>
                <td>{finalPrices[index]}</td>
              </tr>
            ))}

          {data?.products &&
            isAllProds &&
            isSave &&
            isSaveSuccess &&
            data?.products?.edges?.map((value, index) => (
              <tr key={index}>
                <td>{value?.node?.title}</td>
                <td>{store.get("modPrice").text}</td>
                <td>{finalPrices[index]}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablePrices;
