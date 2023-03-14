import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';

const Notification = () => {
    const notification = useSelector((state: RootState) => state.notification);
    return (
        <div className={`notification ${notification.visible ? "opacity-100" : "opacity-0"} ${notification.type}`}>
            <p>{notification.text}</p>
        </div>
    )
}


export default Notification;