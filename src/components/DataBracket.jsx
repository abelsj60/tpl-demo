import styled from "styled-components";

export default styled.div`
  flex: ${p => p.grow && "1"};
  display: flex;
  flex-direction: ${p => (!p.row ? "column" : "row")};
  font-weight: ${p => p.fontWeight && p.fontWeight};
  margin-top: ${p => p.marginTop && p.marginTop};
  margin-bottom: ${p => p.bottomMargin && "15px"};
  margin-left: ${p => p.marginLeft && p.marginLeft};
  margin-right: ${p => p.marginRight && p.marginRight};
`;
