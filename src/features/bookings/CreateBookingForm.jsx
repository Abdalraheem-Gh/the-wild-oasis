import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import { useCreateBooking } from "./useCreateBooking";
import { useUpdateBooking } from "./useUpdateBooking";
import { getCabins } from '../../services/apiCabins';
import { getNames } from 'country-list';
import GuestDetailsForm from "./GuestDetailsForm";
import BookingDetailsForm from "./BookingDetailsForm";


const StyledSlider = styled(Slider)`
    .slick-prev, .slick-next {
        z-index: 100;
        top: 50%;
        width: auto;
        height: auto;
        color: var(--color-brand-600);
        @media (max-width:768px){
        display: none;
        }

    }

    .slick-prev::before, .slick-next::before {
        font-size: 30px;
        color: var(--color-brand-600);
        @media (max-width:768px){
        display: none;
        }
    }

    .slick-dots li.slick-active button:before {
        opacity: 0.75;
        color: var(--color-brand-600); 
    }

    .slick-dots li button:before {
        color: var(--color-grey-400); 
    }
    `;

    function CreateBookingForm({ bookingToEdit = {}, onCloseModal }) {
    const { isCreating, createBooking } = useCreateBooking();
    const { isUpdating, updateBooking } = useUpdateBooking();
    const { data: cabinOptions, error: cabinsError, isLoading: isLoadingCabins } = useQuery(['cabins'], getCabins);
    
    const isWorking = isCreating || isUpdating;
    const { id: updateId,guests,...editValues } = bookingToEdit;
    const isUpdateSession = Boolean(updateId);
    const { register, handleSubmit, reset, setValue, getValues, formState, control } = useForm({
        defaultValues: isUpdateSession ? { 
          guestName: guests?.fullName || '',
          guestEmail: guests?.email || '',
          nationality: guests?.nationality || '',
          nationalID: guests?.nationalID || '',
          ...editValues
        } : {
          guestName: '',
          guestEmail: '',
          nationality: '',
          nationalID: '',
          startDate:'',
          endDate:'',        
          cabinPrice:'',
          hasBreakfast:false,
          cabinId:'',
          numGuests:'',
          totalPrice:'',
          isPaid:false,
          status:'',
        },
      });
    const { errors } = formState;

    const countryOptions = getNames().map(country => ({
        value: country,
        label: country
    }));

    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);
    useEffect(() => {
        if (isUpdateSession && guests) {
          setValue('guestName', guests.fullName);
          setValue('guestEmail', guests.email);
          setValue('nationality', guests.nationality);
          setValue('nationalID', guests.nationalID);
        }
      }, [isUpdateSession, guests, setValue]);
    
    function onSubmit(data) {
        const bookingData = {
            guestName: data.guestName,
            guestEmail: data.guestEmail,
            nationality: data.nationality,
            nationalID: data.nationalID,
            startDate:data.startDate,
            endDate:data.endDate,        
            cabinPrice:data.cabinPrice,
            hasBreakfast:data.hasBreakfast,
            cabinId:data.cabinId,
            numGuests:data.numGuests,
            totalPrice:data.totalPrice,
            isPaid:data.isPaid,
            status:data.status,
        };

        if (isUpdateSession) {
        updateBooking({ newBookingData: bookingData, id: updateId }, {
            onSuccess: () => {
            reset();
            onCloseModal?.();
            }
        });
        } else {
        createBooking(bookingData, {
            onSuccess: () => {
            reset();
            onCloseModal?.();
            }
        });

        }
    }

    function onError(errors) {
        console.log(errors);
    }

    const sliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (current, next) => setCurrentSlide(next),
    };

    const handleNext = () => {
        if (sliderRef.current) {
        sliderRef.current.slickGoTo(currentSlide + 1);
        }
    };

    const handlePrevious = () => {
        if (sliderRef.current) {
        sliderRef.current.slickGoTo(currentSlide - 1);
        }
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'modal' : 'regular'}>
        <StyledSlider {...sliderSettings} ref={sliderRef}>
            {/* شريحة معلومات الضيف */}
            <GuestDetailsForm 
            control={control}
            errors={errors} 
            register={register} 
            countryOptions={countryOptions} 
            getValues={getValues} 
            setValue={setValue}
            editValues={editValues}
            />
            {/* شريحة بيانات الحجز */}
            <BookingDetailsForm 
            errors={errors}
            register={register}
            isLoadingCabins={isLoadingCabins}
            cabinOptions={cabinOptions}
            getValues={getValues}
            setValue={setValue}
            control={control}
            
            />
        </StyledSlider>

        <FormRow>
            {currentSlide > 0 && (
            <Button onClick={handlePrevious} variation="primary" size="large">
                Previous
            </Button>
            )}
            {currentSlide < 1 && (
            <Button onClick={handleNext} type="button" variation="primary" size="large">
                Next
            </Button>
            )}
            {currentSlide === 1 && (
            <Button disabled={isWorking} type="submit" variation="primary" size="large">
                {isUpdateSession ? 'Update Booking' : 'Create new Booking'}
            </Button>
            )}
        </FormRow>
        </Form>
    );
}

export default CreateBookingForm;
