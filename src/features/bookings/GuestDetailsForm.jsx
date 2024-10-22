import FormRow from "../../ui/FormRow"
import styled from "styled-components";
import Select from "../../ui/Select";
import Input from "../../ui/Input";
import { Controller } from "react-hook-form";


const StyledSelect = styled(Select)`
  font-size: 1.4rem;
  /* padding: 0 1.2rem; */
  border: 1px solid ${(props) =>
    props.type === "white" ? "var(--color-grey-100)" : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  color: var(--color-grey-500);
  font-weight: 500;
  box-shadow: var(--shadow-sm);

  @media (max-width: 764px) {
    font-size: 1rem;
    padding: 0.5rem 1rem;
    font-weight: 300;
  }
`;
function GuestDetailsForm({errors,register,countryOptions,control,getValues, setValue,editValues}) {
  
  return (
        <>
            <FormRow label='Guest Name' error={errors?.guestName?.message}>
            <Input type="text" id="guestName" {...register('guestName', { required: 'This field is required ' })} />
            </FormRow>

            <FormRow label='Guest Email' error={errors?.guestEmail?.message}>
              <Input type="email" id="guestEmail" {...register('guestEmail', { required: 'This field is required ' })} />
            </FormRow>

            <FormRow label='Country' error={errors?.country?.message}>
            <Controller
                control={control}
                name="nationality"
                defaultValue=""
                rules={{ required: 'This field is required' }}
                render={({ field }) => (
                  <StyledSelect id="nationality" options={countryOptions} {...field}                 
                  />
                )}
              />

            </FormRow>

              <FormRow label='National ID' error={errors?.nationalID?.message}>
              <Input type="text" id="nationalID" {...register('nationalID', { required: 'This field is required ' })} />
            </FormRow>
        </>
    )
}

export default GuestDetailsForm
