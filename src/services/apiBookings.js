
  import { PAGE_SIZE } from "../utils/constants";
  import { getToday } from "../utils/helpers";
  import supabase from "./supabase";

  export async function updateGuest(guestId, guestData) {
    const { data: updatedGuestData, error: guestUpdateError } = await supabase
      .from('guests')
      .update(guestData)
      .eq('id', guestId)
      .select();

    if (guestUpdateError) {
      console.error(guestUpdateError);
      throw new Error('Guest could not be updated');
    }

    return updatedGuestData;
  }

  export async function createUpdateBooking(newBooking,id) {
  console.log(newBooking.cabinId)
    let query;
    // Check if guest already exists or create a new guest
    let guestId = newBooking.guestId;
    if (guestId) {
      await updateGuest(guestId, {
        fullName: newBooking.guestName,
        email: newBooking.guestEmail,
        nationality: newBooking.nationality,
        nationalID: newBooking.nationalID,
      });
    } else {
      const { data: guestData, error: guestError } = await supabase
        .from('guests')
        .insert([{
          fullName: newBooking.guestName,
          email: newBooking.guestEmail,
          nationality: newBooking.nationality,
          nationalID: newBooking.nationalID,
        }])
        .select();

      if (guestError) {
        console.error(guestError);
        throw new Error('Guest could not be created');
      }

      guestId = guestData[0].id;
    }

    console.log("cabinId:", newBooking.cabinId);

    // Verify that the cabinId exists in the cabins table
    const { data: cabinData, error: cabinError } = await supabase
      .from('cabins')
      .select('id')
      .eq('id',newBooking.cabinId);

    if (cabinError || cabinData.length === 0) {
      throw new Error('Invalid cabinId. Cabin does not exist.');
    }

    // If ID is provided, update the booking
    if (id) {
      query = supabase
        .from('bookings')
        .update({
          startDate: newBooking.startDate,
          endDate: newBooking.endDate,
          numNights: newBooking.numNights,
          numGuests: newBooking.numGuests,
          totalPrice: newBooking.totalPrice,
          status: newBooking.status,
          hasBreakfast:newBooking.hasBreakfast,
          isPaid:newBooking.isPaid,
          cabinPrice:newBooking.cabinPrice,
          guestId: guestId,
          cabinId: newBooking.cabinId
        })
        .eq('id', id)
        .select();
    
    
      } else {
      // If no ID, create a new booking
      query = supabase
        .from('bookings')
        .insert([{
          startDate: newBooking.startDate,
          endDate: newBooking.endDate,
          numNights: newBooking.numNights,
          numGuests: newBooking.numGuests,
          totalPrice: newBooking.totalPrice,
          status: newBooking.status,
          hasBreakfast:newBooking.hasBreakfast,
          isPaid:newBooking.isPaid,
          cabinPrice:newBooking.cabinPrice,
          guestId: guestId,
          cabinId: newBooking.cabinId
        }])
        .select();
    }

    const { data, error } = await query;

    if (error) {
      console.error(error);
      throw new Error('Booking could not be created/updated');
    }

    return { data };
  }



  export async function getBookings({filter,sortBy,page}){
    let query=supabase.from('bookings')
    .select('id,created_at,startDate,endDate,numNights,numGuests,status,totalPrice,cabins(name),guests(fullName,email)',{count:'exact'})
    // Filter
  if(filter) query=query[filter.method||'eq'](filter.field,filter.value)
    // Sort
  if(sortBy)
    query=query.order(sortBy.field,{ascending:sortBy.direction==='asc'})
    
  if(page){

    const from= (page-1)*PAGE_SIZE;
    const to=from+(PAGE_SIZE-1)
    query=query.range(from,to)
  }

  const {data,error,count}=await query;
    

  if(error) { console.error(error);
    throw new Error ('Bookings could not be loaded')}

  return {data,count};
  }

  export async function getBooking(id) {
    const { data, error } = await supabase
      .from("bookings")
      .select("*, cabins(*), guests(*)")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      throw new Error("Booking not found");
    }

    return data;
  }

  // Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
  //date:ISOString
  export async function getBookingsAfterDate(date) {
    const { data, error } = await supabase
      .from("bookings")
      .select("created_at, totalPrice, extrasPrice")
      .gte("created_at", date)
      .lte("created_at", getToday({ end: true }));

    if (error) {
      console.error(error);
      throw new Error("Bookings could not get loaded");
    }

    return data;
  }

  // Returns all STAYS that are were created after the given date
  export async function getStaysAfterDate(date) {
    const { data, error } = await supabase
      .from("bookings")
      .select("*, guests(fullName)")
      .gte("startDate", date)
      .lte("startDate", getToday());

    if (error) {
      console.error(error);
      throw new Error("Bookings could not get loaded");
    }

    return data;
  }

  // Activity means that there is a check in or a check out today
  export async function getStaysTodayActivity() {
    const { data, error } = await supabase
      .from("bookings")
      .select("*, guests(fullName, nationality)")
      .or(
        `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
      )
      .order("created_at");

    // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
    // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
    // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

    if (error) {
      console.error(error);
      throw new Error("Bookings could not get loaded");
    }
    return data;
  }

  export async function updateBooking(id, obj) {
    const { data, error } = await supabase
      .from("bookings")
      .update(obj)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(error);
      throw new Error("Booking could not be updated");
    }
    return data;
  }

  export async function deleteBooking(id) {
    // REMEMBER RLS POLICIES
    const { data, error } = await supabase.from("bookings").delete().eq("id", id);

    if (error) {
      console.error(error);
      throw new Error("Booking could not be deleted");
    }
    return data;
  }
