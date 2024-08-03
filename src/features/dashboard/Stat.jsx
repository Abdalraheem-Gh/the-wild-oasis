import styled from "styled-components";

const StyledStat = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 1.6rem;
  display: grid;
  grid-template-columns: 6.4rem 1fr;
  grid-template-rows: auto auto;
  column-gap: 1.6rem;
  row-gap: 0.4rem;

  @media (max-width: 768px){
    /* display: grid; */
    display: flex;
    flex-wrap: wrap;
    /* grid-template-columns:1fr auto; */
    /* grid-template-columns: repeat(4, 1fr); */
    /* grid-template-rows:1.5rem auto; */
    /* grid-auto-flow: row; */
    padding: 0.8rem ;
    column-gap: 0.8rem;
    row-gap: 0.2rem;
}

`;

const Icon = styled.div`
  grid-row: 1 / -1;
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* Make these dynamic, based on the received prop */
  background-color: var(--color-${(props) => props.color}-100);

  & svg {
    width: 3.2rem;
    height: 3.2rem;
    color: var(--color-${(props) => props.color}-700);
    @media (max-width: 768px){
      width: 1.7rem ;
      height: 1.7rem ;
    }
  }
`;

const Title = styled.h5`
  align-self: end;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-500);
  @media (max-width: 768px){
    font-size: 0.7rem ;
    font-weight: 900;

  }
`;

const Value = styled.p`
  font-size: 2.4rem;
  line-height: 1;
  font-weight: 500;
  @media (max-width: 768px){
    font-size: 1.2rem ;
    line-height: 0.75;
    font-weight: 300;
  }
`;

function Stat({ icon, title, value, color }) {
  return (
    <StyledStat>
      <Icon color={color}>{icon}</Icon>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </StyledStat>
  );
}

export default Stat;
