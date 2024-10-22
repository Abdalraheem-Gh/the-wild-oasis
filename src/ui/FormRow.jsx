
import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 10rem 1fr 1.2fr;
  gap: 2.4rem;
  padding: 1.2rem 1.4rem;
@media (max-width:768px) {
  grid-template-columns:1fr 1fr;
  gap: 1.5rem;
  padding: 1rem 1.2rem;
  
}

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    margin-top: 2rem;
    gap: 1.2rem;
    @media (max-width:768px) {
      gap: 1rem;  
      margin-top: 2rem;
      font-size: 1rem;
    }
  }
`;

const Label = styled.label`
  font-weight: 500;
  @media (max-width:768px) {
    font-weight: 300;
    font-size: 1rem;
  }
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
  @media (max-width:768px) {
    /* font-weight: 300; */
    font-size: 1rem;
    
  }
`;
function FormRow({label,error,children}) {
    return (
        <StyledFormRow>
        {label && <Label htmlFor={children.props?.id}>{label}</Label>}
            {children}
            {error&&<Error>{error}</Error>}
        </StyledFormRow>
    )
}

export default FormRow
