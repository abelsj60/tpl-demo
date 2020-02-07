import styled from "styled-components";
import { Link } from "react-router-dom";

export default styled(Link)`
  flex: ${p => p.grow && "1"};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  height: 2rem;
  min-width: 5rem;
  color: white;
  background-color: blue;
  border: none;
  text-decoration: none;
  text-align: center;
  font-size: 0.85rem;
`;
