import { useEffect } from "react";

function useCheckPayPal() {
  useEffect(() => {
    const checkPayPal = () => {
      if (window.paypal) {
        // console.log("PayPal is available");
        return true;
        // clearInterval(intervalId);
      } else {
        // console.log("PayPal is not available");
        return false;
      }
    };

    // Check immediately
    checkPayPal();

    // Optionally, you can set an interval to check periodically
    const intervalId = setInterval(checkPayPal, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this runs only once after mount
}

export default useCheckPayPal;
