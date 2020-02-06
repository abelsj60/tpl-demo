import styled from "styled-components";

export default styled.div`
  flex: ${p => p.grow && "1"};
  display: flex;
  flex-direction: ${p => (!p.row ? "column" : "row")};
  margin-bottom: ${p => p.bottomMargin && "15px"};
`;
