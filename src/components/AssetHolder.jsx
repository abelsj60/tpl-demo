import styled from "styled-components";

export default styled.div`
  flex: ${p => p.grow && "1"};
  background-color: white;
  margin: 10px;
  overflow: auto;
`;
