import React, { useEffect, useRef, memo } from "react";

export const CustomTradingViewWidget = ({ symbol }) => {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "container_id": "technical-analysis-chart-demo",
          "width": "100%",
          "height": "100%",
          "autosize": true,
          "symbol": "${symbol}",
          "interval": "D",
          "timezone": "exchange",
          "backgroundColor": "rgba(0, 0, 0, 1)",
          "theme": "dark",
          "style": "1",
          "withdateranges": true,
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "save_image": false,
          "hide_volume": true,
          "studies": [
            "MASimple@tv-basicstudies"
          ],
          "show_popup_button": true,
          "popup_width": "1000",
          "popup_height": "650",
          "support_host": "https://www.tradingview.com"
        }`;
    container?.current?.appendChild(script);

    // Clean up function
    return () => {
      container?.current?.removeChild(script);
    };
  }, []);

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{ height: "350px", width: "100%", backgroundColor: "black" }}
    >
      <div
        className="tradingview-widget-container__widget"
        style={{  width: "100%", backgroundColor: "black" }}
      ></div>
    </div>
  );
}

