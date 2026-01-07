import { useRef, useState } from 'react';
import CustomSelect from '../select/CustomSelect';
import { toast } from 'react-toastify';
import ReactDatePicker from 'react-datepicker';

const BookingTableForm = () => {

    const personOptions = [
        { value: '1', label: '1 Person' },
        { value: '2', label: '2 Person' },
        { value: '3', label: '3 Person' },
        { value: '4', label: '4 Person' },
        { value: '5', label: '5 Person' },
    ]

    const scheduleOptions = [
        { value: '10', label: '10:00 AM' },
        { value: '11', label: '11:00 AM' },
        { value: '12', label: '12:00 PM' },
        { value: '1', label: '1:00 PM' },
        { value: '2', label: '2:00 PM' },
    ]

    interface FormEventHandler {
        (event: React.FormEvent<HTMLFormElement>): void;
    }

    const handleBooking: FormEventHandler = (event) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement;
        form.reset()
        toast.success("Thanks For Booking")
    }

    const [startDate, setStartDate] = useState<Date | null>(null);
    const datePickerRef = useRef<ReactDatePicker | null>(null);

    return (
        <>
            <form onSubmit={handleBooking}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="form-group">
                            <input className="form-control no-arrows" id="phone" name="phone" placeholder="Phone" type="number" autoComplete='off' required />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="form-group">
                            <CustomSelect options={personOptions} selectValue={2} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="input-group date date-picker-one">
                            <ReactDatePicker
                                id='schedule'
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                placeholderText="Date"
                                ref={datePickerRef}
                            />
                            <span
                                className="input-group-addon"
                                onClick={() => datePickerRef.current && datePickerRef.current.setFocus()}
                            >
                                <i className="fas fa-calendar-alt"></i>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="form-group">
                            <CustomSelect options={scheduleOptions} selectValue={2} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <button type="submit" name="submit" id="submit">
                            Book A Table
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default BookingTableForm;