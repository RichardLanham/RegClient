const doUpdate = async (PayerId, paymentId, token, orderId, NODEURL) => {
  const response = await fetch(`${NODEURL}api/complete/`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderId, PayerId, paymentId, token }),
  });

  return await response.json();
};

const getUserInfo = async (paymentId, NODEURL) => {
  const response = await fetch(`${NODEURL}api/user-info/${paymentId}/`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
  });

  return await response.json();
};

const createOrder = async (items, NODEURL) => {
  console.log(items);
  try {
    // console.log(fieldsRef.current);
    // fieldsRef.current["createdOn"] = new Date().toISOString();
    const response = await fetch(`${NODEURL}api/create-paypal-order`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cartItems: items,
        payer: {
          payment_method: {
            credit_card: {
              number: "4111111111111111",
              type: "VISA",
              expire_month: "12",
              expire_year: "2023",
              cvv2: "123",
              first_name: "John",
              last_name: "Doe",
            },
          },
        },
      }),
    });

    const orderData = await response.json();

    if (!orderData.id) {
      const errorDetail = orderData.error_description;
      // const errorMessage = errorDetail
      //   ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
      //   : "Unexpected error occurred, please try again.";

      throw new Error(errorDetail);
    }
    return orderData.id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const onApprove = async (
  data,
  items,
  setTotal,
  setDetails,
  setEmail,
  setItems,
  resetItems,
  NODEURL
) => {
  const response = await fetch(`${NODEURL}api/orders/${data.orderID}/capture`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cartItems: items, orderID: data.orderID }),
  });
  const _details = await response.json();

  setDetails(_details);
  setEmail(_details.payer.email_address);

  resetItems();

  // console.log(_details);

  if (_details.status === "COMPLETED") {
    setTotal(0);
    setItems([]);
    //   setTimeout(() => {
    //     navigate("/", { state: { cartItems: [] } });
    //   }, 1000);
  }

  return await response.json();
};

const onError = (error) => error.message;

// const resetItems = (setItems, setTotal, price) => {
//   setItems([
//     {
//       firstname: "",
//       lastname: "",
//       email: "",
//       phone: "",
//       student: false,
//       housing: false,
//       dietary: "omnivore",
//       price,
//       unit_amount: price,
//       quantity: 1,
//       waltzattend: "select...",
//       name: "dance_admission",
//     },
//   ]);
//   setTotal(0);
// };

// const resetDetails = (setDetails) => {
//   setDetails(null);
// };

const handlePayment = async (total, cartItems, NODEURL) => {
  const response = await fetch(`${NODEURL}api/create-fallback-paypal`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: total, cart: cartItems }),
  });

  return await response.json();
};

const executeFallbackOrder = async (PayerId, paymentId, user, NODEURL) => {
  const response = await fetch(
    `${NODEURL}api/execute-fallback-paypal-payment/`,
    {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ PayerId, paymentId, user }),
    }
  );

  return response.ok;
};

export {
  doUpdate,
  getUserInfo,
  createOrder,
  onApprove,
  onError,
  //   resetItems,
  //   resetDetails,
  handlePayment,
  executeFallbackOrder,
};
