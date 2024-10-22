import styled from "styled-components";
import FormRow from "../../ui/FormRow"
import Select from "../../ui/Select";
import Input from "../../ui/Input";
import { Controller, useWatch } from "react-hook-form";
import { useSettings } from "../settings/useSettings";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";

const StyledBookingDetails=styled.div`
    display: flex;
    gap: 2rem;
    @media (max-width:768px){
      flex-wrap: wrap;
      gap: 1rem;
    }

`


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

const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
  width: 1.6rem;
  height: 1.6rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 0.2rem;
  appearance: none;
  cursor: pointer;
  margin-right: 0.8rem;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);

  &:checked {
    background-color: var(--color-red-800);
    border-color: var(--color-red-800);
  }

  &:hover {
    border-color: var(--color-primary-light);
  }

  &:focus {
    outline: 2px solid var(--color-primary-light);
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  cursor: pointer;
  color: var(--color-grey-700);

  @media (max-width: 764px) {
    font-size: 1rem;
  }
`;
function BookingDetailsForm({errors,register,isLoadingCabins,cabinOptions,getValues,setValue,control}) {
    const { settings, isLoading } = useSettings();
    const [totalPrice, setTotalPrice] = useState(0);

  // مشاهدة التغييرات على الحقول المطلوبة لحساب `totalPrice`
    const startDate = useWatch({ control, name: 'startDate' });
    const endDate = useWatch({ control, name: 'endDate' });
    const cabinPrice = useWatch({ control, name: 'cabinPrice' });
    const hasBreakfast = useWatch({ control, name: 'hasBreakfast' });

  // حساب `numNights` استنادًا إلى `startDate` و `endDate`
    useEffect(() => {
        if (startDate && endDate) {
        const numNights = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
        setValue('numNights', numNights >= 0 ? numNights : 0);
        } else {
        setValue('numNights', 0);
        }
    }, [startDate, endDate, setValue]);

  // حساب `totalPrice` استنادًا إلى عدد الليالي وسعر الغرفة وتكلفة الإفطار
  useEffect(() => {
    const numNights = getValues('numNights') || 0;
    const price = numNights * cabinPrice + (hasBreakfast ? settings?.breakfastPrice * numNights : 0);
    setTotalPrice(price);
    setValue('totalPrice', price);
  }, [startDate, endDate, cabinPrice, hasBreakfast, settings, setValue, getValues]);

  const statusArray=[{value:'unconfirmed',label:'Unconfirmed'},{value:'checked-in',label:'Checked-In'},{value:'checked-out',label:'Checked-Out'}]
  if (isLoading) return <Spinner />;


    return (
        <StyledBookingDetails>
        <div>

            <FormRow label='Cabin' error={errors?.cabinId?.message}>
                {isLoadingCabins ? (
            <p>Loading cabins...</p>
            ) : (
                <Controller
                control={control}
                name="cabinId"
                defaultValue=''
                placeholder="Select Cabin"
                rules={{ required: 'This field is required' }}
                render={({ field }) => (
                  <StyledSelect id="cabinId" options={cabinOptions || []} {...field}
                  />
                )}
              /> 

            )}
          </FormRow>

          <FormRow label='Start Date' error={errors?.startDate?.message}>
            <Input type="date" id="startDate" {...register('startDate', { required: 'This field is required ' })} />
          </FormRow>

          <FormRow label='End Date' error={errors?.endDate?.message}>
            <Input type="date" id="endDate" {...register('endDate', { required: 'This field is required ' })} />
          </FormRow>

            <Input disabled type="number" id="numNights" hidden {...register('numNights')}/>
          
          <FormRow label='Number of Guests' error={errors?.numGuests?.message}>
            <Input type="number" id="numGuests" {...register('numGuests', { required: 'This field is required ', min: { value: 1, message: 'Number of guests should be at least 1' } })} />
          </FormRow>

          </div>

            <div>

           {/* حقل cabinPrice */}
      <FormRow label='Cabin Price' error={errors?.cabinPrice?.message}>
        <Input type="number" id="cabinPrice" {...register('cabinPrice', { required: 'This field is required',min:{value:0}})} />
      </FormRow>

      {/* حقل hasBreakfast */}
      <FormRow  error={errors?.hasBreakfast?.message}>
      <CheckboxLabel htmlFor="hasBreakfast">
            <StyledCheckbox
              id="hasBreakfast"
              {...register("hasBreakfast")}
            />
            Breakfast Included
          </CheckboxLabel>      
          </FormRow>
            {/* حقل totalPrice */}

          <FormRow label='Total Price' error={errors?.totalPrice?.message}>
            <Input type="number" id="totalPrice" value={totalPrice} readOnly {...register('totalPrice', { required: 'This field is required ' })} />
          </FormRow>
  

      {/* حقل isPaid */}
      <FormRow error={errors?.isPaid?.message}>
      <CheckboxLabel htmlFor="isPaid">
            <StyledCheckbox id="isPaid" {...register("isPaid")} />
            Is Paid
            </CheckboxLabel>      
            </FormRow>

        {/* حقل status */}
        <FormRow label='Status' error={errors?.status?.message}>
            <Controller
            control={control}
            placeholder="Select Status"
            name="status"
            rules={{ required: 'This field is required' }}
            // defaultValue={statusArray[0].value}
            defaultValue=''
            render={({ field }) => (
                <StyledSelect id="status" options={statusArray} {...field}/>
            )}
            />      
        </FormRow>
        </div>

        </StyledBookingDetails>
    )
}

export default BookingDetailsForm
