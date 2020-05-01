import React from "react";
import FlexRow from "./flexRow";
import Card from "./card";

function IconAttribution(props) {
  return (
    <Card>
      <FlexRow
        style={{ flexWrap: "wrap", justifyContent: "center", fontSize: "12px" }}
      >
        <div>
          Icons made by{" "}
          <a
            href="https://www.flaticon.com/authors/made-by-made"
            title="Made by Made"
          >
            Made by Made
          </a>
          {""}
        </div>
        /
        <div>
          <a
            href="https://www.flaticon.com/authors/pongsakornred"
            title="pongsakornRed"
          >
            pongsakornRed
          </a>{" "}
        </div>
        /
        <div>
          <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
            Freepik
          </a>{" "}
        </div>
        /
        <div>
          <a href="https://www.flaticon.com/authors/srip" title="srip">
            srip
          </a>{" "}
        </div>
        /
        <div>
          <a href="https://www.flaticon.com/authors/iconixar" title="iconixar">
            iconixar
          </a>{" "}
        </div>
        /
        <div>
          <a href="https://www.flaticon.com/authors/eucalyp" title="Eucalyp">
            Eucalyp
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
      </FlexRow>
    </Card>
  );
}

export default IconAttribution;
